import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { randomUUID } from "crypto";

export const createShift = async (req: Request, res: Response) => {
  const { id, name, time, unitId } = req.body;

  const shift = await prisma.shift.create({
    data: {
      id: `${id}${randomUUID()}`,
      name,
      time,
      unitId,
    },
  });

  res.status(200).json(shift);
};

export const getShifts = async (req: Request, res: Response) =>{
    const {unitId} = req.params
    const shift = await prisma.shift.findMany({
        where: {
            unitId
        },
        include:{
            employee: true
        }
    })
    res.status(200).json(shift)
}
