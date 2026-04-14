import {
  ArgumentMetadata,
  BadRequestException,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';
import { SchemaService } from '../schema/schema.service';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schemaService: SchemaService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype?.name) throw new InternalServerErrorException();

    const schema = this.schemaService
      .get(metadata.metatype.name)
      ?.safeParse(value);

    console.log(schema?.error?.flatten().fieldErrors);

    if (schema?.error)
      throw new BadRequestException(undefined, { description: 'Error' });

    return value;
  }
}
