import * as z from "zod";

// export const ThreadValidation = z.object({
//   thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
//   accountId: z.string(),
// });

export const ThreadValidation = z.object({
  thread: z
    .string()
    .nonempty({ message: "Thread cannot be empty." })
    .min(3, { message: "Minimum 3 characters." })
    .max(140, { message: "Maximum 140 characters." }), // Enforce maximum length
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
