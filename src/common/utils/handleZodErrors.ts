import z from 'zod';

export const handleZodErrors = function (zodError: z.ZodError) {
  const errorObjects: Record<string, string> = {};

  Object.entries(z.flattenError<unknown>(zodError).fieldErrors).forEach(
    (fieldError) =>
      (errorObjects[fieldError[0]] = (fieldError[1] as string[])[0]), // to get first error from the zod error
  );

  return { fieldErrors: errorObjects };
};
