export class DirectoryRestaurant {
  constructor(
    public readonly sourceId: string,
    public readonly name: string,
    public readonly address: string,
    public readonly province?: string,
    public readonly zip?: string,
    public readonly latitude?: number,
    public readonly longitude?: number,
  ) {}
}
