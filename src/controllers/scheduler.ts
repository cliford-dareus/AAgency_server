import { Request, Response } from "express";
import prisma from "../lib/prisma";

const getAllSchedules = async (req: Request, res: Response) => {
  try {
    const schedule = await prisma.schedule.findMany({
      include: {
        units: {
          select: {
            id: true,
          },
        },
      },
    });
    res.status(200).json(schedule);
  } catch (error) {}
};

const getSchedule = async (req: Request, res: Response) => {};

const createSchedule = async (req: Request, res: Response) => {
  const { id, name, description } = req.body;

  const schedule = await prisma.schedule.create({
    data: {
      id,
      name,
      description,
      date: new Date(),
    },
  });
  res.status(200).json(schedule);
};

// const updateSchedule = async (req: Request, res: Response) => {
//   const schedule = await prisma.schedule.update({
//     data: {
//       units: 
//     },
//     where: {
//       id: req.params.id,
//     }
//   })
// };

const deleteSchedule = async (req: Request, res: Response) => {};

export { getAllSchedules, createSchedule };
