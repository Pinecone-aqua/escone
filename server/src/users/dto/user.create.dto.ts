import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: boolean;
  @ApiProperty()
  favorites: string[];
  @ApiProperty()
  created_date: Date;
}
