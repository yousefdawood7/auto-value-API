import z from 'zod';
import 'reflect-metadata';
import { PARAM_KEY, ZOD_KEY } from '../keys/keys';

type ParamsTypes = Array<{
  [key: string]: any;
  name: string;
}>;

export const ZodSchema = function (schema: z.ZodType) {
  return (target: object, key: string, descriptor: PropertyDescriptor) => {
    const [dtoType] = Reflect.getMetadata(
      PARAM_KEY,
      target,
      key,
    ) as ParamsTypes;

    Reflect.defineMetadata(ZOD_KEY, schema, descriptor.value as object);

    Reflect.defineMetadata(ZOD_KEY, schema, dtoType);
  };
};

export const getZodSchema = (dtoValue: object): undefined | z.ZodType =>
  Reflect.getMetadata(ZOD_KEY, dtoValue) as undefined | z.ZodType;
