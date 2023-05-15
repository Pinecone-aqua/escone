import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { CheckRoleGuard } from './role.guard';

Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: CheckRoleGuard }],

  controllers: [],
});

export class RoleModule {}
