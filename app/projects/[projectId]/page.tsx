import { Suspense } from "react";
import { ProjectDetail } from "@/components/project-detail";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<p className="p-6">Loading project...</p>}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}
