"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/require-user";
import { projectSchema } from "@/lib/validation/project";

export type ProjectFormState = {
    errors?: Record<string, string[] | undefined>;
    message?: string;
};

function values(formData: FormData, field: string) {
    return formData
        .getAll(field)
        .map((value) => String(value).trim())
        .filter(Boolean);
}

export async function createProject(
    _: ProjectFormState,
    formData: FormData,
): Promise<ProjectFormState> {
    const parsed = projectSchema.safeParse({
        name: formData.get("name"),
        productSummary: formData.get("productSummary"),
        targetUser: formData.get("targetUser"),
        desiredImpressions: values(formData, "desiredImpression"),
        avoidImpressions: values(formData, "avoidImpression"),
        differentiator: formData.get("differentiator"),
        referenceUrls: values(formData, "referenceUrl"),
    });

    if (!parsed.success) {
        return { errors: z.flattenError(parsed.error).fieldErrors };
    }

    const { supabase, userId } = await requireUser();

    const { error } = await supabase.from("projects").insert({
        user_id: userId,
        name: parsed.data.name,
        product_summary: parsed.data.productSummary,
        target_user: parsed.data.targetUser,
        desired_impressions: parsed.data.desiredImpressions,
        avoid_impressions: parsed.data.avoidImpressions,
        differentiator: parsed.data.differentiator,
        reference_urls: parsed.data.referenceUrls,
    });

    if (error) {
        return { message: "Could not save project. Please try again." };
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}
