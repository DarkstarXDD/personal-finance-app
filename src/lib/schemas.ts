import * as z from "zod"

export const idSchema = z.object({ id: z.cuid() })
export type Id = z.infer<typeof idSchema>
