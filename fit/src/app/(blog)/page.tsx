import { getAllPosts } from "@/lib/markdown";
import { BlogCard } from "@/components/blog/blog-card";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          DevLog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          개발하며 배운 것들을 기록하고 공유합니다
        </p>
      </section>

      {/* Blog Post List */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          최근 포스트
        </h2>
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            아직 작성된 포스트가 없습니다.
          </p>
        )}
      </section>
    </div>
  );
}
