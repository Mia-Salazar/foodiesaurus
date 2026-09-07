
import { SearchRestaurantsUseCase } from "@/server/application/get-restaurants-by-province/get-restaurants-by-province.usecase";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { searchRestaurantsSchema } from "@/server/infraestructure/validators/get-restaurants-by-province.validator";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = searchRestaurantsSchema.safeParse({
      province: searchParams.get("province"),
      term: searchParams.get("term") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const repository = new PrismaRestaurantRepository();
    const useCase = new SearchRestaurantsUseCase(repository);
    const restaurants = await useCase.execute(parsed.data);

    return NextResponse.json({ data: restaurants }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}