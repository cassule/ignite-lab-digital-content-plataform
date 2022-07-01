import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) { }

  listAllEnrollments() {
    return this.prisma.erollment.findMany({
      where: {
        caceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
