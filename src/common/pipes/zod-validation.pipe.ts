import {
  ArgumentMetadata,
  BadRequestException,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';
import z from 'zod';
import { getZodSchema } from '../decorators/zod-schema.decorator';
import { ERROR_CONFIG } from '../configs/error.config';
import { handleZodErrors } from '../utils/zod-utils';

export class ZodValidationPipe implements PipeTransform {
  transform(value: z.ZodType, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // prettier-ignore
    if (!metatype)
      throw new InternalServerErrorException();

    const schema = getZodSchema(metatype);

    // prettier-ignore
    if (!schema)
      throw new InternalServerErrorException();

    const { error } = schema.safeParse(value);
    if (error)
      throw new BadRequestException({
        ...ERROR_CONFIG.VALIDATION_ERROR,
        details: { ...handleZodErrors(error) },
      });

    return value;
  }
}
