import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "소개",
  description: "DevLog - 개발자 소개",
};

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "Git",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          소개
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          안녕하세요, DevLog를 운영하는 개발자입니다
        </p>
      </section>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">About Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              웹 개발에 열정을 가진 소프트웨어 엔지니어입니다.
              새로운 기술을 배우고 이를 실제 프로젝트에 적용하는 것을 좋아합니다.
              이 블로그를 통해 개발 과정에서 얻은 경험과 지식을 공유하고자 합니다.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              주로 프론트엔드 개발을 하고 있으며, React와 Next.js 생태계에
              깊은 관심을 가지고 있습니다. 클린 코드와 좋은 사용자 경험을
              만드는 것을 중요하게 생각합니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">기술 스택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">연락처</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">이메일:</span>{" "}
              hello@devlog.dev
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">GitHub:</span>{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                github.com/devlog
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
