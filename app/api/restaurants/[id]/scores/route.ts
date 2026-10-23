import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { AddRestaurantScoreUseCase } from "@/server/application/add-restaurant-score/add-restaurant-score.usecase";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { addRestaurantScoreSchema } from "@/server/infraestructure/validators/add-restaurant-score.validator";
import { restaurantIdSchema } from "@/server/infraestructure/validators/get-restaurant-by-id.validator";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsedId = restaurantIdSchema.safeParse(await context.params);
    const body = await request.json().catch(() => null);
    const parsedScore = addRestaurantScoreSchema.safeParse(body);

    if (!parsedId.success || !parsedScore.success) {
      return NextResponse.json(
        {
          error: {
            ...parsedId.error?.flatten().fieldErrors,
            ...parsedScore.error?.flatten().fieldErrors,
          },
        },
        { status: 400 },
      );
    }

    const useCase = new AddRestaurantScoreUseCase(new PrismaRestaurantRepository());
    const score = await useCase.execute({
      ...parsedScore.data,
      restaurantId: parsedId.data.id,
      userId,
    });

    if (!score) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json({ data: score }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
