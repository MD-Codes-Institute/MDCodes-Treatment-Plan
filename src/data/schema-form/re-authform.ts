import z from "zod";

export const reAuth = z.object({
  email: z.email("Your email addres is incorrect"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});
