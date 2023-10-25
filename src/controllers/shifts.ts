import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { randomUUID } from "crypto";

export const createShift = async (req: Request, res: Response) => {
  const { name, time, unitId, lead = "Bezos" } = req.body;
  const { sch, boa } = req.query;
  const description = "description";

  try {
    const unit = await prisma.unit.findFirst({
      where: {
        id: unitId,
      },
    });

    if (!unit) {
      // Create a new unit with Board and schedule
      console.log(sch, boa, name, time, lead, unitId);
      const unit = await prisma.unit.create({
        data: {
          id: `uni_${randomUUID()}`,
          lead,
          schedule: {
            connectOrCreate: {
              create: {
                id: `sch_${sch}`,
                name: "New schedule",
                date: new Date(),
                description,
              },
              where: {
                id: `sch_${sch}`,
              },
            },
          },
          board: {
            connectOrCreate: {
              create: {
                id: `boa_${randomUUID()}`,
                name: boa as string,
              },
              where: {
                name: boa as string,
              },
            },
          },
        },
      });

      console.log(unit);

      // Create a new unit if unit exist
      const shift = await prisma.shift.create({
        data: {
          id: `shi_${randomUUID()}`,
          name,
          time,
          unitId: unit.id,
        },
      });

      res.status(201).json(shift);
    } else {
      const shift = await prisma.shift.create({
        data: {
          id: `shi_${randomUUID()}`,
          name,
          time,
          unitId: unit.id,
        },
      });

      res.status(201).json(shift);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const getShifts = async (req: Request, res: Response) => {
  const { unitId } = req.params;
  const shift = await prisma.shift.findMany({
    where: {
      unitId,
    },
    include: {
      employee: true,
    },
  });
  res.status(200).json(shift);
};
