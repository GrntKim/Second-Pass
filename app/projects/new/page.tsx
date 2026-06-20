import { ProjectBriefForm } from "@/components/project-brief-form";

export default function NewProjectPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-semibold">New project</h1>
      <p className="mt-2 text-muted-foreground">
        Start by defining what this screen should make people feel.
      </p>

      <div className="mt-8">
        <ProjectBriefForm />
      </div>
    </main>
  );
}
