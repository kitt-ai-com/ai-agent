import { getAllPosts, getAllTags } from "@/lib/markdown";
import { BlogCard } from "@/components/blog/blog-card";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag} | DevLog`,
    description: `${decodedTag} 태그의 포스트 목록`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) => post.tags.includes(decodedTag));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Tag: <span className="text-primary">{decodedTag}</span>
      </h1>
      <p className="text-muted-foreground mb-8">{posts.length}개의 포스트</p>
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
    </div>
  );
}
