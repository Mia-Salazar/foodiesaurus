import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { DeleteAccountUseCase } from "@/server/application/delete-account/delete-account.usecase";
import { PrismaAccountRepository } from "@/server/infraestructure/repositories/prisma-account.repository";

export async function DELETE() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await new DeleteAccountUseCase(new PrismaAccountRepository()).execute(userId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
