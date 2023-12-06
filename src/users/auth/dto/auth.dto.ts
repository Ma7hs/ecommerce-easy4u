import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { sign } from 'jsonwebtoken';

export class SignUpDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SignInDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

export class RefreshToken {
  id: number;
  userId: number;
  userAgent: string;
  ipAddress: string;

  sign(): string {
    return sign({ ...this }, "gsadihq289u0-deuhd0ewiofhis8-wq7217bdioq-26w8a");
  }

  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }
}

export class GoogleTokenDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}