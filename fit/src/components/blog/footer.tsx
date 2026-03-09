import Link from "next/link"
import { Github, Twitter, Rss } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevLog. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter className="size-5" />
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link
              href="/feed"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="RSS 피드"
            >
              <Rss className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
