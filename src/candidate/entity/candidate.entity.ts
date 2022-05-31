import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Candidate {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    constructor(id: string, name?:string)
    constructor(id: string, name:string)
    {
        this.id = id;
        this.name = name;
    }
}