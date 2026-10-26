import { AccountRepository } from "@/server/domain/account/repositories/account.repository";
import { prisma } from "../database/prisma";

export class PrismaAccountRepository implements AccountRepository {
  async deleteAccount(userId: string): Promise<void> {
    await prisma.$transaction([
      prisma.score.deleteMany({ where: { userId } }),
      prisma.$executeRaw`UPDATE "restaurants" SET "ownerId" = NULL WHERE "ownerId" = ${userId}`,
      prisma.user.delete({ where: { id: userId } }),
    ]);
  }
}
