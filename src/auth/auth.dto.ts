import { IsEmail, IsString } from 'class-validator';

export class authPayloadDto {
  @IsEmail()
  email: string;

  @IsString()
  plainPassword: string;
}
