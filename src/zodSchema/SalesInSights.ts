import { z } from "zod";

export const SalesInSightsSchema = z.object({
  plan: z.string(),
  dateRange: {
    from: z.date().nullable(),
    to: z.date().nullable(),
  },
});
