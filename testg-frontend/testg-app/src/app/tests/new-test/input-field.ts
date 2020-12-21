import { Parameter } from './parameters/Parameter'; 
import { Condition } from './conditions/Condition';


export class InputField {
    
    id: number;
    projectName: string;
    projectId: string;
    parameters: Parameter[];
    conditions: Condition[];

    constructor(projectName: string, projectId: string, parameters: Parameter[], conditions: Condition[]) {
        this.projectName = projectName;
        this.projectId = projectId;
        this.parameters = parameters;
        this.conditions = conditions;
    } 
}