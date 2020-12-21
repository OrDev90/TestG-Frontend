import { Combination } from './combination'

export class Test {

    name: string;
    type: string;
    projectId: number;
    projectName: string;
    combinations: Combination[];

    constructor(name: string, type: string, projectId: number, projectName: string, combinations: Combination[]) {
        this.name = name;
        this.type = type;
        this.projectId = projectId;
        this.projectName = projectName;
        this.combinations = combinations;
    }
}