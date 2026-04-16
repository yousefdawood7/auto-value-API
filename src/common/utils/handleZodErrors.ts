import z from 'zod';

export const handleZodErrors = function (zodError: z.ZodError) {
  const errorOjbects = {};

  Object.entries(z.flattenError<unknown>(zodError).fieldErrors).forEach(
    (fieldError) =>
      (errorOjbects[fieldError[0]] = (fieldError[1] as string[])[0]), // to get first error from the zod error
  );

  return { fieldErrors: errorOjbects };
};
