import { AccountRepository } from "@/server/domain/account/repositories/account.repository";

export class DeleteAccountUseCase {
  constructor(private readonly accounts: AccountRepository) {}

  execute(userId: string): Promise<void> {
    return this.accounts.deleteAccount(userId);
  }
}
