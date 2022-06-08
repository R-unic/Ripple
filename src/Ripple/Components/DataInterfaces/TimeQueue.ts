export class TimeQueue {
    public readonly Added: number;

    public constructor(
        public readonly Tag: string,
        public Length: number
    ) {
        this.Added = Date.now() / 1000;
        this.Length /= 1000;
    }
}