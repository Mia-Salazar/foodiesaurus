import { AccountRepository } from "@/server/domain/account/repositories/account.repository";
import { InMemoryRestaurantRepository } from "./in-memory-restaurant.repository";

export class InMemoryAccountRepository implements AccountRepository {
  readonly deletedUserIds: string[] = [];

  constructor(private readonly restaurants: InMemoryRestaurantRepository) {}

  async deleteAccount(userId: string): Promise<void> {
    this.restaurants.deleteScoresByUser(userId);
    this.restaurants.unlinkOwner(userId);
    this.deletedUserIds.push(userId);
  }
}
