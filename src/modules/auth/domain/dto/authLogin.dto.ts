import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
