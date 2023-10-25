import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { randomUUID } from "crypto";

const createUnit = async (req: Request, res: Response) => {
  const { lead, scheduleDate, description, boardName } = req.body;
  try {
    const unit = await prisma.unit.create({
      data: {
        id: `uni_${randomUUID()}`,
        lead,
        schedule: {
          connectOrCreate: {
            create: {
              id: `sch_${scheduleDate}`,
              name: "New schedule",
              date: new Date(),
              description,
            },
            where: {
              id: `sch_${scheduleDate}`,
            },
          },
        },
        board: {
          connectOrCreate: {
            create: {
              id: `boa_${randomUUID()}`,
              name: boardName,
            },
            where: {
              name: boardName,
            },
          },
        },
      },
    });

    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUnits = async (req: Request, res: Response) => {
  const { boardname, sch_id } = req.query;
  console.log(boardname)
  try {
    const unit = await prisma.unit.findMany({
      where: {
        AND: {
          scheduleId: sch_id as string,
          board: {
            name: boardname as string,
          }
        }
      },
      include: {
        shifts: true
      },
    });
    // console.log(unit);
    res.status(200).json(unit);
  } catch (error) {}
};

export { createUnit, getUnits };
