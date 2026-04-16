import z from 'zod';
import 'reflect-metadata';

const ZOD_KEY = 'zod:schema';

export const ZodSchema = function (schema: z.ZodType) {
  return (target: object) => Reflect.defineMetadata(ZOD_KEY, schema, target);
};

export const getZodSchema = (target: object): undefined | z.ZodType =>
  Reflect.getMetadata(ZOD_KEY, target) as undefined | z.ZodType;
