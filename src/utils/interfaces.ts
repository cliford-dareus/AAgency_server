import { $Enums, Employee, Prisma, Shift } from "@prisma/client";
import { type } from "os";
import { JwtFromRequestFunction } from "passport-jwt";

export interface PassportOptions {
  secretOrKey: string;
  jwtFromRequest: JwtFromRequestFunction;
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  role: $Enums.user_role;
  position: string;
}

export interface TokenPayLoadInterface {}

export interface ShiftWithEmployee {
  employee: Employee[]
}

export interface EmployeeInterface {
  getSiftById(shiftId: string): Promise<ShiftWithEmployee | null>;
  getAllSiftByDate(scheduleId: string): Promise<ShiftWithEmployee[] | null>;
}
