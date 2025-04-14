import { z } from "zod";

export const PostAdminCreateBrand = z.object({
  name: z.string(),
})