import { SetMetadata } from '@nestjs/common';

export function CheckRole(...roles: any) {
  return SetMetadata('roles', roles);
}
