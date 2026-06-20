import Link from "next/link";
import { Suspense } from "react";
import { requireUser } from "@/lib/auth/require-user";
import { Button } from "@/components/ui/button";

async function ProjectsList() {
  const { supabase, userId } = await requireUser();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, product_summary, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Could not load projects.");
  }

  if (!projects?.length) {
    return (
      <p className="mt-12 text-muted-foreground">
            No projects yet.
      </p>
    );
  }

  return (
    <ul className="mt-8 space-y-3">
      {projects.map((project) => (
        <li key={project.id} className="rounded-lg border p-4">
          <Link href={`/projects/${project.id}`} className="font-medium">{project.name}</Link>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.product_summary}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ProjectsFallback() {
  return (
    <p className="mt-12 text-muted-foreground">
        Loading projects..
    </p>
  );
}

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your design intent and reviews.
          </p>
        </div>

        <Button asChild>
          <Link href="/projects/new">New project</Link>
        </Button>
      </div>

      <Suspense fallback={<ProjectsFallback />}>
        <ProjectsList />
      </Suspense>
    </main>
  );
}
