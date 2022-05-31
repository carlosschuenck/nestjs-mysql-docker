import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {ScheduleInterviewer} from "../../schedule/entity/schedule-interviewer.entity";

@Entity()
export class Interviewer {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ScheduleInterviewer, scheduleInterview => scheduleInterview.interviewer)
    public scheduleInterviewer!: ScheduleInterviewer[];

    constructor(id: string, name?:string)
    constructor(id: string, name:string)
     {
       this.id = id;
       this.name = name;
    }
}