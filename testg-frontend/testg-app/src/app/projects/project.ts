export class Project {

    id: number;
    name: string;
    type: string;
    description: string;
    existingTests: number;

    constructor(name: string, type: string, description: string, existingTests: number) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.existingTests = existingTests;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setExistingTests(existingTests: number): void {
        this.existingTests = existingTests;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getId(): number {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public getExistingTests(): number {
        return this.existingTests;
    }
}