import { Expose } from 'class-transformer';

export class UserResponceDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Expose()
  createdAt: Date;
}
