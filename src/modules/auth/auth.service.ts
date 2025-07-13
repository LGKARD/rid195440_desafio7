import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from 'generated/prisma';
import { AuthLoginDto } from './domain/dto/authLogin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.services';
import { CreateUserDTO } from '../users/domain/dto/createUser.dto';
import { AuthRegisterDTO } from './domain/dto/authRegister.dto';
import { AuthResetPasswordDTO } from './domain/dto/authResetPassword.dto';
import { ValidateTokenDTO } from './domain/dto/validateToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
  generateJwtToken(user: User, expiresIn: string = '1d') {
    const payload = {
      sub: user.id,
      name: user.name,
    };
    const options = {
      expiresIn: expiresIn,
      issuer: 'rid195440_desafio7',
      audience: 'users',
    };
    return { access_token: this.jwtService.sign(payload, options) };
  }

  async login({ email, password }: AuthLoginDto) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return this.generateJwtToken(user);
  }

  async register(body: AuthRegisterDTO) {
    const newUser: CreateUserDTO = {
      email: body.email!,
      name: body.name!,
      password: body.password!,
      role: body.role ?? Role.USER,
    };
    const user = await this.userService.create(newUser);
    return this.generateJwtToken(user);
  }

  async resetPassword({ token, password }: AuthResetPasswordDTO) {
    const { valid, decoded } = await this.validateToken(token);

    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');
    const user = await this.userService.update(Number(decoded.sub), {
      password,
    });

    return this.generateJwtToken(user);
  }
  async forgot(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email not found');
    const token = this.generateJwtToken(user, '30m');
    return token;
  }

  async validateToken(token: string): Promise<ValidateTokenDTO> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'rid195440_desafio7',
        audience: 'users',
      });
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }
}
