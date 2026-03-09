import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-12 mb-4 scroll-mt-20 text-2xl font-bold tracking-tight text-foreground"
      {...props}
    />
  );
}

function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="mt-10 mb-3 scroll-mt-20 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  );
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="mb-6 leading-7 text-foreground/90 [&:not(:first-child)]:mt-4"
      {...props}
    />
  );
}

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "#";
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }

  return (
    <Link
      href={href}
      className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
    >
      {props.children}
    </Link>
  );
}

function BlockQuote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="my-6 border-l-4 border-primary/50 bg-muted/50 py-3 pl-6 pr-4 italic text-muted-foreground [&>p]:mb-0"
      {...props}
    />
  );
}

function InlineCode(props: ComponentPropsWithoutRef<"code">) {
  const isInsidePre =
    typeof props.className === "string" && props.className.startsWith("hljs");

  if (isInsidePre) {
    return <code {...props} />;
  }

  return (
    <code
      className="rounded-md bg-muted px-[0.4em] py-[0.2em] font-mono text-[0.875em] text-foreground"
      {...props}
    />
  );
}

function Pre(props: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 text-sm leading-relaxed"
      {...props}
    />
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  );
}

function TableHead(props: ComponentPropsWithoutRef<"thead">) {
  return <thead className="border-b border-border" {...props} />;
}

function TableRow(props: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className="border-b border-border transition-colors hover:bg-muted/50"
      {...props}
    />
  );
}

function TableHeader(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th className="px-4 py-2 text-left font-semibold text-foreground" {...props} />
  );
}

function TableCell(props: ComponentPropsWithoutRef<"td">) {
  return <td className="px-4 py-2 text-foreground/90" {...props} />;
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-foreground/90 [&>li]:pl-1"
      {...props}
    />
  );
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-foreground/90 [&>li]:pl-1"
      {...props}
    />
  );
}

function HorizontalRule() {
  return <hr className="my-8 border-border" />;
}

export const mdxComponents = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  a: Anchor,
  blockquote: BlockQuote,
  code: InlineCode,
  pre: Pre,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  ul: UnorderedList,
  ol: OrderedList,
  hr: HorizontalRule,
};
