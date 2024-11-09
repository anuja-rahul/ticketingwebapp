import zod from "zod";

export const envScheme = zod.object({
  API_URL: zod.string().min(1),
});

export const envVar = envScheme.parse(process.env);

// TODO: fix this
