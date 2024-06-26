import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ //forRoot: configurar servicios que se necesitan una sola vez en la aplicacion: como la configuracion a la base de adtos 
      type: 'mysql',
      host: 'localhost', //tambien podemos poner 127.0.0.1
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_db',
      entities: [User], // esto lo configuramos en user.entity.ts a medida que agregamos tablas se guardan aca
      synchronize: true, // para que vayan guardando los cambios en tiempo real 
    }),
     UsersModule,
     AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
