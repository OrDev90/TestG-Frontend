export class ProjectUpdatePayload {

    name: string;
    type: string;
    description: string;

    constructor(name: string, type: string, description: string) {
        this.name = name;
        this.type = type;
        this.description = description;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getDescription(): string {
        return this.description;
    }
}