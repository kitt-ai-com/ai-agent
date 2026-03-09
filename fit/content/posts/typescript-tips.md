---
title: "TypeScript 실전 팁 모음"
date: "2026-02-05"
description: "실무에서 바로 활용할 수 있는 TypeScript 팁과 패턴을 정리했습니다."
tags: ["TypeScript", "JavaScript", "Tips"]
category: "Development"
---

## 1. 유틸리티 타입 활용하기

TypeScript의 내장 유틸리티 타입을 활용하면 코드를 더 간결하고 안전하게 작성할 수 있습니다.

### Partial과 Required

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// 모든 필드를 선택적으로
type UpdateUserDto = Partial<User>;

// 모든 필드를 필수로
type StrictUser = Required<User>;

function updateUser(id: number, data: Partial<User>) {
  // id만 있어도 되고, name만 있어도 됨
  console.log(`Updating user ${id}`, data);
}
```

### Pick과 Omit

```typescript
// 특정 필드만 선택
type UserPreview = Pick<User, "id" | "name">;

// 특정 필드 제외
type UserWithoutId = Omit<User, "id">;

// 조합 활용
type CreateUserDto = Omit<User, "id"> & { password: string };
```

## 2. 타입 가드 패턴

타입 가드를 사용하면 런타임에서 타입을 안전하게 좁힐 수 있습니다.

```typescript
interface Cat {
  type: "cat";
  meow(): void;
}

interface Dog {
  type: "dog";
  bark(): void;
}

type Animal = Cat | Dog;

// 판별 유니온을 활용한 타입 가드
function handleAnimal(animal: Animal) {
  switch (animal.type) {
    case "cat":
      animal.meow(); // Cat 타입으로 추론
      break;
    case "dog":
      animal.bark(); // Dog 타입으로 추론
      break;
  }
}
```

### 커스텀 타입 가드

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // 여기서 value는 string 타입
    console.log(value.toUpperCase());
  }
}
```

## 3. Template Literal Types

TypeScript 4.1부터 도입된 템플릿 리터럴 타입은 문자열 타입을 조합할 때 유용합니다.

```typescript
type Color = "red" | "blue" | "green";
type Size = "sm" | "md" | "lg";

// 자동으로 모든 조합 생성
type ButtonVariant = `${Color}-${Size}`;
// "red-sm" | "red-md" | "red-lg" | "blue-sm" | ...

type EventName = `on${Capitalize<string>}`;
// "onClick", "onChange" 등의 패턴 강제
```

## 4. const assertion 활용

`as const`를 사용하면 리터럴 타입을 유지할 수 있습니다.

```typescript
// as const 없이
const colors = ["red", "green", "blue"]; // string[]

// as const 사용
const colors = ["red", "green", "blue"] as const;
// readonly ["red", "green", "blue"]

type Color = (typeof colors)[number]; // "red" | "green" | "blue"

// 객체에도 적용 가능
const config = {
  api: "https://api.example.com",
  timeout: 5000,
} as const;
```

## 5. 조건부 타입

제네릭과 조건부 타입을 조합하면 강력한 타입 추론이 가능합니다.

```typescript
type IsArray<T> = T extends Array<infer U> ? U : never;

type A = IsArray<string[]>; // string
type B = IsArray<number>; // never

// API 응답 타입 자동 추론
type ApiResponse<T> = T extends "user"
  ? User
  : T extends "post"
    ? Post
    : never;

function fetchData<T extends "user" | "post">(
  endpoint: T
): Promise<ApiResponse<T>> {
  return fetch(`/api/${endpoint}`).then((res) => res.json());
}

// 반환 타입이 자동으로 추론됨
const user = await fetchData("user"); // User
const post = await fetchData("post"); // Post
```

## 6. satisfies 연산자

TypeScript 4.9에서 도입된 `satisfies`는 타입 검증과 추론을 동시에 할 수 있습니다.

```typescript
type Route = {
  path: string;
  children?: Route[];
};

// satisfies로 타입 검증하면서 리터럴 타입 유지
const routes = [
  {
    path: "/",
    children: [
      { path: "/about" },
      { path: "/blog" },
    ],
  },
] satisfies Route[];

// routes[0].path는 "/"로 추론됨 (string이 아님)
```

> TypeScript를 잘 활용하면 런타임 에러를 대폭 줄이고, IDE의 자동완성과 리팩토링 지원을 최대한 활용할 수 있습니다.

## 마무리

이 팁들을 프로젝트에 적용하면 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있습니다. TypeScript의 타입 시스템은 매우 강력하므로, 꾸준히 새로운 패턴을 학습하는 것을 추천합니다.
