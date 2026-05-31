import { z } from 'zod';
import { zodIssue } from '../../common/utils/zod-utils';

export const reportSchema = z.object({
  manufacturer: z
    .string({
      error: zodIssue(
        'Manufacturer name is required',
        'Manufacturer name must be string ',
      ),
    })
    .min(3, { error: 'Manufacturer must be at least 3 characters' }),

  model: z
    .string({
      error: zodIssue('Model name is required', 'Model name must be string '),
    })
    .min(3, { error: 'Model must be at least 3 characters' }),

  year: z
    .number({
      error: zodIssue('Year is required', 'Year must be number'),
    })
    .min(1900, { error: 'Year must be at least from 1900' })
    .max(2050, { error: 'Year must be at most from 2050' }),

  price: z
    .number({
      error: zodIssue('Price is required', 'Price must be number'),
    })
    .min(500, { error: 'Year must be at least 500$' }),

  mileage: z
    .number({
      error: zodIssue('Mileage is required', 'Mileage must be number'),
    })
    .min(500, { error: 'Mileage must be at least 500KM' }),

  lat: z
    .number({
      error: zodIssue('latitude is required', 'latitude name must be number'),
    })
    .pipe(
      z.coerce
        .string<number>()
        .regex(
          /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
          {
            error: 'Invalid latitude',
          },
        ),
    ),

  lng: z
    .number({
      error: zodIssue('latitude is required', 'latitude name must be number'),
    })
    .pipe(
      z.coerce
        .string<number>()
        .regex(
          /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
          { error: 'Invalid longitude' },
        ),
    ),
});
