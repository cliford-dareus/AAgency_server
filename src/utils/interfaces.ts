import { $Enums, Prisma } from "@prisma/client";
import { JwtFromRequestFunction } from "passport-jwt";


export interface PassportOptions {
  secretOrKey: string;
  jwtFromRequest: JwtFromRequestFunction;
}

export interface LoginInterface {
    username : string;
    password : string;
}

export interface RegisterInterface {
    username: string;
    email: string;
    password: string;
    role: $Enums.user_role;
    position: string;
}

export interface TokenPayLoadInterface {
    
}