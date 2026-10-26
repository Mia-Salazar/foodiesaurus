export interface AccountRepository {
  deleteAccount(userId: string): Promise<void>;
}
