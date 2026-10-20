import { GetRestaurantByIdUseCase } from "@/server/application/get-restaurant-by-id/get-restaurant-by-id.usecase";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { restaurantIdSchema } from "@/server/infraestructure/validators/get-restaurant-by-id.validator";
import { NextRequest, NextResponse } from "next/server";

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
