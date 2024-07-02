import { z } from "zod";

const schema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    categoryId: z.string().min(1, { message: "You must select a category." }),
    numberInStock: z
      .number({ invalid_type_error: "Stock must be a number." })
      .min(1, { message: "Stock must be at least 1." })
      .max(100, { message: "Stock cannot be higher than 100." }),
    price: z
      .number({ invalid_type_error: "Price must be a number." })
      .min(1, { message: "Price must be at least 1." })
      .max(20, { message: "Price cannot be higher than 20." }),
  })
  .strict();

type FormData = z.infer<typeof schema>;

export function validate(body: FormData) {
  return schema.safeParse(body);
}
