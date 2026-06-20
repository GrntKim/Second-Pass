import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/require-user";
type ProjectDetailProps = {
  params: Promise<{ projectId: string }>;
};

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 border-t pt-6">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="text-base leading-7">{children}</div>
    </div>
  );
}

export async function ProjectDetail({ params }: ProjectDetailProps) {
  const { projectId } = await params;
  const { supabase, userId } = await requireUser();

  const { data: project, error } = await supabase
    .from("projects")
    .select(
      "id, name, product_summary, target_user, desired_impressions, avoid_impressions, differentiator, reference_urls, created_at",
    )
    .eq("id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !project) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Button asChild variant="ghost" className="-ml-3">
        <Link href="/dashboard">Back to projects</Link>
      </Button>

      <header className="mt-8 border-b pb-8">
        <p className="text-sm text-muted-foreground">Project brief</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {project.product_summary}
        </p>
      </header>

      <section className="mt-8 space-y-6">
        <DetailSection title="Primary user and context">
          {project.target_user}
        </DetailSection>

        <DetailSection title="Desired first impression">
          <ul className="list-disc space-y-1 pl-5">
            {project.desired_impressions.map((impression, index) => (
              <li key={`${impression}-${index}`}>{impression}</li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection title="What makes this product distinct?">
          {project.differentiator}
        </DetailSection>

        {project.avoid_impressions.length > 0 && (
          <DetailSection title="Impressions to avoid">
            <ul className="list-disc space-y-1 pl-5">
              {project.avoid_impressions.map((impression, index) => (
                <li key={`${impression}-${index}`}>{impression}</li>
              ))}
            </ul>
          </DetailSection>
        )}

        {project.reference_urls.length > 0 && (
          <DetailSection title="References">
            <ul className="space-y-1">
              {project.reference_urls.map((url, index) => (
                <li key={`${url}-${index}`}>
                  <a
                    className="underline underline-offset-4"
                    href={url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </DetailSection>
        )}
      </section>
    </main>
  );
}
