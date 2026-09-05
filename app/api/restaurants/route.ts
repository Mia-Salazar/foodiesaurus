// app/api/restaurants/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GetRestaurantsByProvinceUseCase } from "@/server/application/get-restaurants-by-province/get-restaurants-by-province.usecase";
import { getRestaurantsByProvinceSchema } from "@/server/infraestructure/validators/get-restaurants-by-province.validator";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = getRestaurantsByProvinceSchema.safeParse({
      province: searchParams.get("province"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const repository = new PrismaRestaurantRepository();
    const useCase = new GetRestaurantsByProvinceUseCase(repository);
    const restaurants = await useCase.execute(parsed.data.province);

    return NextResponse.json({ data: restaurants }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}