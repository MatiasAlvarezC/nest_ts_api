import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()  //puede ser inyectado en otras partes del sistema
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {} //inyecta jwt para manejar los token
  
    async canActivate(context: ExecutionContext): Promise<boolean> { //si da acceso a la ruta o no
      const request = context.switchToHttp().getRequest(); //obtiene el objeto de la solicitud
      const token = this.extractTokenFromHeader(request); //extrae el token
      if (!token) {
        throw new UnauthorizedException();  //lanza excepcion si el usuario no esta autorizado
      }
      try {
        const payload = await this.jwtService.verifyAsync( //verifica de forma asincronica el token
          token,
          {
            secret: jwtConstants.secret //proporciona la clave secreta para verificar el token
          }
        );
        //el profe agrego una condicion "Ra" para que solo pueda acceder ese usuario.
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined { //metodo auxiliar para ectraer el encabezado del token
      const [type, token] = request.headers.authorization?.split(' ') ?? []; //obtiene el encabezado
      return type === 'Bearer' ? token : undefined; //lo devuelve si es tipo bearer
    }
  }