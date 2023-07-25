import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dateScheduleValidationSchema } from 'validationSchema/date-schedules';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.date_schedule
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDateScheduleById();
    case 'PUT':
      return updateDateScheduleById();
    case 'DELETE':
      return deleteDateScheduleById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDateScheduleById() {
    const data = await prisma.date_schedule.findFirst(convertQueryToPrismaUtil(req.query, 'date_schedule'));
    return res.status(200).json(data);
  }

  async function updateDateScheduleById() {
    await dateScheduleValidationSchema.validate(req.body);
    const data = await prisma.date_schedule.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDateScheduleById() {
    const data = await prisma.date_schedule.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
