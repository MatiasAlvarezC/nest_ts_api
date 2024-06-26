
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) //la respuesta va a tener el codigo 200
  @Post('login') //maneja las peticiones de inicio de sesion
  signIn( @Body() signInDto: Record<string, any>) {  //los datos del body cadena o cualquier tipo 
    return this.authService.signIn(signInDto.id, signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)  //aplica el guarda de autentificacion
  @Get('profile') //define la ruta con el metodo
  getProfile(@Request() req) {
    return req.user; //retorna los datos del usuario autentificado
  }
}