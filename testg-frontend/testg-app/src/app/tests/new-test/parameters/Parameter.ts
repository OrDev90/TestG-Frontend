export class Parameter {

    name: string;
    type: string;
    notes: string;
    values: string[];
    from?: string;
    to?: string;
    interval?: string;

    constructor(name: string, type: string, notes: string, values: string[], from?: string, to?: string, interval?: string) {
        this.name = name;
        this.type = type;
        this.notes = notes;
        this.values = values;
        this.from = from;
        this.to = to;
        this.interval = interval;
    }
}