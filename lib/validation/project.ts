import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(1).max(80),
  productSummary: z.string().trim().min(1).max(500),
  targetUser: z.string().trim().min(1).max(500),
  desiredImpressions: z.array(z.string().trim().min(1)).min(1).max(3),
  avoidImpressions: z.array(z.string().trim().min(1)).max(3),
  differentiator: z.string().trim().min(1).max(500),
  referenceUrls: z.array(z.url()).max(3),
});

export type ProjectInput = z.infer<typeof projectSchema>;
