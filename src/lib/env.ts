import { z, ZodError } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().min(1).refine(
    (url) => !!url,
    { message: "NEXT_PUBLIC_API_URL is required and must be a valid URL." }
  ),
});

let env;
try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    console.error("Environment variable validation failed:", error.errors);
  } else {
    console.error("An unexpected error occurred:", error);
  }
  throw new Error("Failed to load environment variables. Please check your .env file.");
}

export const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
