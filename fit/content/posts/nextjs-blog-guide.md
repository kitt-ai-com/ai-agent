---
title: "Next.js로 개발자 블로그 만들기"
date: "2026-02-10"
description: "Next.js App Router와 Markdown을 활용하여 나만의 개발자 블로그를 구축하는 방법을 알아봅니다."
tags: ["Next.js", "React", "Blog"]
category: "Tutorial"
---

## 왜 Next.js인가?

개발자 블로그를 만들 때 선택할 수 있는 프레임워크는 많습니다. Gatsby, Hugo, Jekyll 등 다양한 옵션이 있지만, **Next.js**는 React 생태계의 강력한 기능과 뛰어난 개발자 경험을 제공합니다.

> Next.js는 프로덕션을 위한 React 프레임워크입니다. 하이브리드 정적 및 서버 렌더링, TypeScript 지원, 스마트 번들링, 라우트 프리페칭 등 다양한 기능을 제공합니다.

### Next.js의 주요 장점

- **App Router**: 파일 시스템 기반 라우팅으로 직관적인 페이지 구성
- **서버 컴포넌트**: 기본적으로 서버에서 렌더링되어 성능 최적화
- **정적 생성**: 빌드 타임에 HTML을 생성하여 빠른 로딩 속도
- **이미지 최적화**: `next/image`를 통한 자동 이미지 최적화
- **SEO 친화적**: 메타데이터 API를 통한 손쉬운 SEO 설정

## 프로젝트 설정

먼저 새로운 Next.js 프로젝트를 생성합니다:

```bash
npx create-next-app@latest my-blog --typescript --tailwind --app --src-dir
```

### 디렉토리 구조

프로젝트의 기본 구조는 다음과 같습니다:

```
my-blog/
├── content/
│   └── posts/          # 마크다운 포스트
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   └── [slug]/ # 동적 라우팅
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── blog/       # 블로그 컴포넌트
│   └── lib/
│       └── markdown.ts # MD 파싱 유틸리티
└── package.json
```

## Markdown 파싱 구현

블로그 포스트는 Markdown 파일로 작성합니다. `gray-matter`를 사용하여 frontmatter를 파싱하고, `next-mdx-remote`로 렌더링합니다.

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...data,
      };
    });

  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
```

## 블로그 포스트 페이지

동적 라우팅을 활용하여 각 포스트를 렌더링합니다:

```tsx
import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <MDXRemote source={post.content} />
    </article>
  );
}
```

### 코드 하이라이팅

개발자 블로그에서 코드 하이라이팅은 필수입니다. `rehype-highlight`를 사용하면 자동으로 구문 강조가 적용됩니다.

## 마무리

Next.js로 블로그를 만들면 React의 컴포넌트 기반 개발의 장점을 살리면서도 뛰어난 성능과 SEO를 얻을 수 있습니다. Vercel을 통해 간편하게 배포할 수도 있어, 개발자에게 최적의 블로그 플랫폼이 됩니다.

다음 포스트에서는 다크 모드 구현과 RSS 피드 설정에 대해 알아보겠습니다.
