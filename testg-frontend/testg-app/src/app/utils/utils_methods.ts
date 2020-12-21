export class UtilsMethods {
    
    public static generateRandomID(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    public static getRandomNumberInRangeInclusive(min: string, max: string): string {
        min = String(Math.ceil(Number(min)));
        max = String(Math.floor(Number(max)));
        return String(Math.floor(Math.random() * (Number(max) - Number(min) + 1) + Number(min)));
    }

    public static getIterationsAmount(to: string, interval: string): number {
        interval = interval.slice(0, -1);
        return ((Number(interval) / 100) * Number(to));
    }
}