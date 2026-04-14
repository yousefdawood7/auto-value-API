import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class SchemaService {
  schemas: Map<string, z.ZodType> = new Map();

  register(key: string, schema: z.ZodType) {
    this.schemas.set(key, schema);
  }

  get(key: string): z.ZodType | undefined {
    return this.schemas.get(key);
  }
}
