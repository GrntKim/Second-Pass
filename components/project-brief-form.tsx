"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createProject,
  type ProjectFormState,
} from "@/app/projects/new/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ProjectFormState = {};

function FieldError({
  state,
  name,
}: {
  state: ProjectFormState;
  name: string;
}) {
  const message = state.errors?.[name]?.[0];
  return message ? <p className="text-sm text-destructive">{message}</p> : null;
}

export function ProjectBriefForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" placeholder="Project Name" required />
        <FieldError state={state} name="name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productSummary">One-line product description</Label>
        <textarea
          id="productSummary"
          name="productSummary"
          className="min-h-24 w-full rounded-md border p-3"
          required
        />
        <FieldError state={state} name="productSummary" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetUser">Primary user and context</Label>
        <textarea
          id="targetUser"
          name="targetUser"
          className="min-h-24 w-full rounded-md border p-3"
          required
        />
        <FieldError state={state} name="targetUser" />
      </div>

      <div className="space-y-2">
        <Label>Desired first impression (up to 3)</Label>
        {[0, 1, 2].map((index) => (
          <Input
            key={index}
            name="desiredImpression"
            placeholder={`Impression ${index + 1}`}
          />
        ))}
        <FieldError state={state} name="desiredImpressions" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="differentiator">What makes this product distinct?</Label>
        <textarea
          id="differentiator"
          name="differentiator"
          className="min-h-24 w-full rounded-md border p-3"
          required
        />
        <FieldError state={state} name="differentiator" />
      </div>

      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <div className="flex gap-1">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating project..." : "Create project"}
          </Button>
      </div>
    </form>
  );
}
