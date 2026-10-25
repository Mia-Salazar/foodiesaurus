import {
  RestaurantRepository,
  UserScore,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class GetUserScoreUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  execute(id: number, userId: string): Promise<UserScore | null> {
    return this.repository.findScoreByUser(id, userId);
  }
}
