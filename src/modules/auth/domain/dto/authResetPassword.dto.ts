import { IsString, IsNotEmpty, IsJWT } from 'class-validator';

export class AuthResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsJWT()
  @IsNotEmpty()
  token: string;
}
