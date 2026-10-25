import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { UpdateUserScoreUseCase } from "@/server/application/update-user-score/update-user-score.usecase";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { addRestaurantScoreSchema } from "@/server/infraestructure/validators/add-restaurant-score.validator";
import { restaurantIdSchema } from "@/server/infraestructure/validators/get-restaurant-by-id.validator";

export async function PATCH(
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

    const score = await new UpdateUserScoreUseCase(
      new PrismaRestaurantRepository(),
    ).execute(parsedId.data.id, userId, parsedScore.data);

    if (!score) {
      return NextResponse.json({ error: "Score not found" }, { status: 404 });
    }

    return NextResponse.json({ data: score }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
