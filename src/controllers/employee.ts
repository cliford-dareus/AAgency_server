import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { randomUUID } from "crypto";
import {
  checkShiftForEmployee,
  checkUnitForEmployee,
  employeeService,
} from "../services/employee";

const createEmployee = async (req: Request, res: Response) => {
  const { userId, shiftId, scheduleId } = req.body;

  const shift = await employeeService.getSiftById(shiftId);
  const allShiftByDate = await employeeService.getAllSiftByDate(scheduleId);

  const vs = checkUnitForEmployee(allShiftByDate!, userId);
  const isAlready = checkShiftForEmployee(shift!, userId);

  if (isAlready?.length !== 0 || vs.length > 0) {
    res.status(204).json({ msg: "Employee already in the shift" });
    return;
  }

  const employee = await prisma.employee.create({
    data: {
      id: `emp_${randomUUID()}`,
      shiftId,
      userId,
    },
  });

  res.status(200).json(employee);
};

export { createEmployee };
