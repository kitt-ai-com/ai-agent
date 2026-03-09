---
title: "React Hooks 심층 분석"
date: "2026-02-01"
description: "React Hooks의 동작 원리와 실전 활용법을 깊이 있게 분석합니다."
tags: ["React", "Hooks", "Frontend"]
category: "Development"
---

## React Hooks란?

React 16.8에서 도입된 Hooks는 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 함수입니다. 클래스 컴포넌트 없이도 React의 모든 기능을 활용할 수 있습니다.

> Hooks는 React의 철학을 더 잘 반영합니다. UI는 상태의 함수이며, Hooks는 이 상태를 관리하는 가장 자연스러운 방법입니다.

## 기본 Hooks 비교

| Hook | 용도 | 리렌더링 발생 | 정리(cleanup) |
|:-----|:-----|:------------|:-------------|
| `useState` | 상태 관리 | O | X |
| `useEffect` | 사이드 이펙트 | X | O |
| `useRef` | 가변 참조 | X | X |
| `useMemo` | 값 메모이제이션 | X | X |
| `useCallback` | 함수 메모이제이션 | X | X |
| `useContext` | 컨텍스트 소비 | O | X |

## useState 심층 분석

### 지연 초기화

초기값 계산이 비용이 많이 드는 경우, 함수를 전달하여 최초 렌더링에서만 실행되도록 합니다.

```tsx
// 매 렌더링마다 expensiveCompute 실행
const [value, setValue] = useState(expensiveCompute());

// 최초 렌더링에서만 실행
const [value, setValue] = useState(() => expensiveCompute());
```

### 함수형 업데이트

이전 상태를 기반으로 업데이트할 때는 반드시 함수형 업데이트를 사용합니다.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // 잘못된 방식: 클로저 문제 발생 가능
    // setCount(count + 1);

    // 올바른 방식: 항상 최신 상태 기반
    setCount((prev) => prev + 1);
  };

  // 여러 번 호출해도 안전
  const incrementThree = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return <button onClick={incrementThree}>Count: {count}</button>;
}
```

## useEffect 패턴

### 의존성 배열의 중요성

```tsx
// 1. 매 렌더링마다 실행
useEffect(() => {
  console.log("매번 실행");
});

// 2. 마운트 시 한 번만 실행
useEffect(() => {
  console.log("마운트 시 실행");
}, []);

// 3. 특정 값이 변경될 때만 실행
useEffect(() => {
  console.log(`userId 변경: ${userId}`);
}, [userId]);
```

### 정리(Cleanup) 함수

구독이나 타이머 등을 설정한 경우 반드시 정리해야 메모리 누수를 방지할 수 있습니다.

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const res = await fetch(`/api/user/${id}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err);
      }
    }
  }

  fetchData();

  // 컴포넌트 언마운트 시 요청 취소
  return () => controller.abort();
}, [id]);
```

## 커스텀 Hooks

커스텀 Hook을 만들면 로직을 재사용할 수 있습니다.

### useLocalStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore =
      value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

// 사용 예시
const [theme, setTheme] = useLocalStorage("theme", "light");
```

### useDebounce

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 검색 입력에 활용
function SearchComponent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // API 호출은 300ms 후에만 실행
      searchApi(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

## React 19의 새로운 Hooks

| Hook | 설명 | 주요 용도 |
|:-----|:-----|:---------|
| `use` | Promise/Context 소비 | 데이터 페칭 간소화 |
| `useActionState` | 폼 액션 상태 | 서버 액션 연동 |
| `useFormStatus` | 폼 제출 상태 | 로딩 표시 |
| `useOptimistic` | 낙관적 업데이트 | 즉시 UI 반영 |

## 마무리

React Hooks는 단순해 보이지만, 올바르게 사용하려면 클로저, 참조 동일성, 렌더링 사이클에 대한 깊은 이해가 필요합니다. 핵심 원칙은 다음과 같습니다:

1. **의존성 배열을 정직하게 작성**하세요
2. **함수형 업데이트**를 활용하세요
3. **커스텀 Hook**으로 로직을 추출하세요
4. **정리 함수**를 잊지 마세요

이 원칙들을 지키면 예측 가능하고 유지보수하기 쉬운 컴포넌트를 작성할 수 있습니다.
