import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { FindRestaurantForScoringUseCase } from "@/server/application/find-restaurant-for-scoring/find-restaurant-for-scoring.usecase";
import { NominatimSpainRestaurantDirectory } from "@/server/infraestructure/directory/nominatim-spain-restaurant.directory";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { findRestaurantForScoringSchema } from "@/server/infraestructure/validators/find-restaurant-for-scoring.validator";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = findRestaurantForScoringSchema.safeParse({
      term: request.nextUrl.searchParams.get("term") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const useCase = new FindRestaurantForScoringUseCase(
      new PrismaRestaurantRepository(),
      new NominatimSpainRestaurantDirectory(),
    );
    const result = await useCase.execute(parsed.data.term);

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
