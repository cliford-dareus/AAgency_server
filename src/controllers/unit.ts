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

  try {
    const unit = await prisma.unit.findMany({
      where: {
        AND: {
          scheduleId: sch_id as string,
          board: {
            name: boardname as string,
          },
        },
      },
      include: {
        shifts: true,
      },
    });
    
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUnit = async (req: Request, res: Response) => {
  const { newLead, newUnitName, sch_id, boardname } = req.body;

  try {
    const unit = await prisma.unit.findFirst({
      where: {
        AND: {
          scheduleId: `sch_${sch_id}`,
          board: {
            name: boardname as string,
          },
        },
      },
    });

    console.log(unit);

    if (!unit) {
      throw new Error("Unit not found");
    }

    if (newLead) {
      const newUnit = await prisma.unit.update({
        data: {
          lead: newLead,
        },
        where: {
          id: unit.id,
        },
      });

      res.status(200).json(newUnit);
    }

    if (newUnitName) {
      const newUnit = await prisma.board.update({
        data: {
          name: newUnitName,
        },
        where: {
          id: unit.boardId!,
        },
      });

      res.status(200).json(newUnit);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { createUnit, getUnits, updateUnit };
