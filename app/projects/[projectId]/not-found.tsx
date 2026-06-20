import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-6">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Project not found</h1>
      <p className="mt-3 text-muted-foreground">
        This project does not exist or you do not have access to it.
      </p>

      <Button asChild className="mt-6">
        <Link href="/dashboard">Back to projects</Link>
      </Button>
    </main>
  );
}
