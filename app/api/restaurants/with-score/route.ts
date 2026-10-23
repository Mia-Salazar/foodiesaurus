import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { AddDirectoryRestaurantScoreUseCase } from "@/server/application/add-directory-restaurant-score/add-directory-restaurant-score.usecase";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { addDirectoryRestaurantScoreSchema } from "@/server/infraestructure/validators/add-directory-restaurant-score.validator";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const parsed = addDirectoryRestaurantScoreSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const useCase = new AddDirectoryRestaurantScoreUseCase(
      new PrismaRestaurantRepository(),
    );
    const saved = await useCase.execute({ ...parsed.data, userId });

    return NextResponse.json({ data: { id: saved.restaurantId } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
