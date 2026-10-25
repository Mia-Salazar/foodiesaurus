import {
  RestaurantRepository,
  UserScore,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class ListUserScoresUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  execute(userId: string): Promise<UserScore[]> {
    return this.repository.findScoresByUser(userId);
  }
}
