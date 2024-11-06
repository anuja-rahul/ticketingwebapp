import zod from "zod";

const envScheme = zod.object({
  API_URL: zod.string().min(1),
});

export const env = envScheme.parse(process.env);
