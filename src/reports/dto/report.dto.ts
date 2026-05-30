import { Exclude, Expose, Transform } from 'class-transformer';
import { User } from '../../user/entities/user.entity';

type ReportObjectType = {
  value: {
    id: number;
  };

  obj: {
    user: {
      id: number;
    };
  };
};
export class ReportDto {
  manufacturer: string;

  model: string;

  year: number;

  mileage: number;

  price: number;

  lat: number;

  lng: number;

  @Exclude()
  isApproved: boolean;

  @Expose({ name: 'userId' })
  @Transform(({ value, obj }: ReportObjectType) => obj.user.id || value)
  user: User;
}
