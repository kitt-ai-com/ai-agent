import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export function BlogCard({ slug, title, date, description, tags }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-base">
            {description}
          </CardDescription>
        </CardHeader>
        {tags.length > 0 && (
          <CardFooter className="gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
