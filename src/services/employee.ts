import prisma from "../lib/prisma";
import { EmployeeInterface, ShiftWithEmployee } from "../utils/interfaces";

class EmployeeService implements EmployeeInterface {
  constructor() {}

  async getSiftById(shiftId: string) {
    const shift = await prisma.shift.findUnique({
      where: {
        id: shiftId,
      },
      select: {
        employee: true,
      },
    });

    return shift ? shift : null;
  }

  async getAllSiftByDate(scheduleId: string) {
    const allShiftByDate = await prisma.shift.findMany({
      where: {
        unit: {
          scheduleId,
        },
      },
      select: {
        employee: true,
      },
    });

    return allShiftByDate ? allShiftByDate : null;
  }

  
}

export const checkUnitForEmployee = (
  shifts: ShiftWithEmployee[],
  userId: string
) => {
  let vs = [] as number[];

  shifts?.forEach((x) => {
    const b = x.employee.filter((emp) => {
      return emp.userId === userId;
    });

    if (b?.length > 0) {
      vs.push(1);
    }
  });

  return vs;
};

export const checkShiftForEmployee = (
  shift: ShiftWithEmployee,
  userId: string
) => {
  return shift?.employee.filter((employee) => employee.userId === userId);
};

export const employeeService = new EmployeeService();
