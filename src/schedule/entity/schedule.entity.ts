import {CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ScheduleInterviewer} from "./schedule-interviewer.entity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({name: 'start_date'})
    startDate: Date;
    @CreateDateColumn({name: 'end_date'})
    endDate: Date;

    @OneToMany(() => ScheduleInterviewer, scheduleInterview => scheduleInterview.schedule)
    public scheduleInterviewer!: ScheduleInterviewer[];


    constructor(id: string, startDate?: Date, endDate?: Date)
    constructor(id: string, startDate: Date, endDate: Date) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}