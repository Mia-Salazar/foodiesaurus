// server/domain/restaurant/entities/restaurant.entity.ts
export class Restaurant {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly province: string,
    public readonly address: string,
    public readonly zip?: string,
    public readonly url?: string,
    public readonly phone?: string,
    public readonly foodType?: string,
    public readonly latitude?: number,
    public readonly longitude?: number,
  ) {}
}