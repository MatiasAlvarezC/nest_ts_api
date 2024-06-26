import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true, //global al proyecto que estemos haciendo
      secret: jwtConstants.secret, //forma que se utiliza para llamar
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}