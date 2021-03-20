import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { UsersModule } from '../modules/users/users.module'
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ACCESS_TOKEN_SECRET } from '../environments';
import { AuthController } from './auth.controller';
import { UsersService } from '../modules/users/users.service';

@Module({
  imports: [
    // UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET!,
      signOptions: { expiresIn: '30d' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
