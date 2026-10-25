import { ScoreAnswers, toStoredScore } from "@/server/domain/restaurant/lib/toStoredScore";
import {
  RestaurantRepository,
  UserScore,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class UpdateUserScoreUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  execute(
    id: number,
    userId: string,
    answers: ScoreAnswers,
  ): Promise<UserScore | null> {
    return this.repository.updateScoreByUser(id, userId, toStoredScore(answers));
  }
}
