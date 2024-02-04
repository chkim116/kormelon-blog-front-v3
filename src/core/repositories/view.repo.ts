import prisma from '@core/lib/prisma';
import { date } from '@core/lib/date';
import { prismaResolveHandler } from '@core/network/payloadHandler';
import { ViewRepository } from './view.repo.type';

class ViewRepositoryImpl implements ViewRepository {
  private getCurrentData() {
    const year = date().year();
    const month = date().month() + 1;
    const days = date().date();

    const fullDate = `${year}-${month}-${days}`;

    return {
      year,
      month,
      days,
      fullDate,
    };
  }

  async fetchView() {
    const { days, fullDate, month, year } = this.getCurrentData();

    let view = await prisma.view.findUnique({
      where: {
        fullDate,
      },
      select: {
        count: true,
      },
    });

    if (!view) {
      view = await prisma.view.create({
        data: {
          fullDate,
          year,
          month,
          date: days,
          count: 1,
        },
      });
    }

    const {
      _sum: { count: total },
    } = await prisma.view.aggregate({
      _sum: {
        count: true,
      },
    });

    return prismaResolveHandler({
      total: total || view.count,
      today: view.count,
    });
  }

  async addView() {
    const { fullDate, days, month, year } = this.getCurrentData();

    await prisma.view.upsert({
      where: {
        fullDate,
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        fullDate,
        year,
        month,
        date: days,
        count: 1,
      },
    });

    return prismaResolveHandler();
  }
}

export const viewRepository = new ViewRepositoryImpl();
