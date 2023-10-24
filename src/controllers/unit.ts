import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { randomUUID } from "crypto";

const createUnit = async (req: Request, res: Response) => {
  const { id, name, lead, scheduleId } = req.body;
  console.log(req.body);
  try {
    const schedule = await prisma.schedule.findUnique({
      where: {
        id: scheduleId,
      },
    });

    if (!schedule) {
      throw new Error(`Schedule not found`);
    }

    const unit = await prisma.unit.create({
      data: {
        id: `${id}${randomUUID()}`,
        name,
        lead,
        scheduleId,
      },
      select: {
        shifts: true
      }
    });
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUnit = async (req: Request, res: Response) => {
  const { unitname } = req.params;

  try {
    const unit = await prisma.unit.findUnique({
      where: {
        name: unitname,
      },
      include: {
        shifts: {
          include: {
            employee: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    // console.log(unit);
    res.status(200).json(unit);
  } catch (error) {}
};

export { getUnit, createUnit };
