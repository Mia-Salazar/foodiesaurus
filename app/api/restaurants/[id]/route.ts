import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { GetRestaurantByIdUseCase } from "@/server/application/get-restaurant-by-id/get-restaurant-by-id.usecase";
import { UpdateHandCreatedRestaurantUseCase } from "@/server/application/update-hand-created-restaurant/update-hand-created-restaurant.usecase";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { createRestaurantSchema } from "@/server/infraestructure/validators/create-restaurant.validator";
import { restaurantIdSchema } from "@/server/infraestructure/validators/get-restaurant-by-id.validator";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const parsed = restaurantIdSchema.safeParse({ id });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const repository = new PrismaRestaurantRepository();
    const useCase = new GetRestaurantByIdUseCase(repository);
    const restaurant = await useCase.execute(parsed.data.id);

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: restaurant }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const ownerId = session?.user?.id;
    if (!ownerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsedId = restaurantIdSchema.safeParse(await context.params);
    const body = await request.json().catch(() => null);
    const parsedEdits = createRestaurantSchema.safeParse(body);
    if (!parsedId.success || !parsedEdits.success) {
      return NextResponse.json(
        {
          error: {
            ...parsedId.error?.flatten().fieldErrors,
            ...parsedEdits.error?.flatten().fieldErrors,
          },
        },
        { status: 400 },
      );
    }

    const restaurant = await new UpdateHandCreatedRestaurantUseCase(
      new PrismaRestaurantRepository(),
    ).execute(parsedId.data.id, ownerId, parsedEdits.data);

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json({ data: restaurant }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
