import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, //trabaja con users.service.ts
    private jwtService: JwtService //viene creado 
  ) {}

  async signIn(   //signIn es lo que recibe
    id: number,
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> { // devuelve una promesa que es un token de tipo string
    const user = await this.usersService.findOne(id);
    const payload = { sub: user.id, user: user.user }; // toda la info que contiene el token
    console.log(payload);
    return {
      access_token : await this.jwtService.sign(payload) //se espera para la creación del token
    };
  }
}