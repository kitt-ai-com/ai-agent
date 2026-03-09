import Link from "next/link";
import { getAllTags } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Tags | DevLog",
  description: "모든 태그 목록",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <Badge variant="secondary" className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
              {tag} ({count})
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
