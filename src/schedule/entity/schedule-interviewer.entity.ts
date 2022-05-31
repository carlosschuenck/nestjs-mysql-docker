import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Interviewer} from "../../interviewer/entity/interviewer.entity";
import {Schedule} from "./schedule.entity";

@Entity({name: 'schedule_interviewer'})
export class ScheduleInterviewer {
    @PrimaryColumn({type: 'uuid', name: 'interviewer_id'})
    @ManyToOne(()=> Interviewer,(interviewer) => interviewer.scheduleInterviewer, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'interviewer_id'})
    interviewer: Interviewer;

    @PrimaryColumn({type: 'uuid', name: 'schedule_id'})
    @ManyToOne(()=> Schedule,(schedule) => schedule.scheduleInterviewer, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'schedule_id'})
    schedule: Schedule;

    constructor(interviewerId: string, scheduleId: string) {
        this.interviewer = new Interviewer(interviewerId);
        this.schedule = new Schedule(scheduleId);
    }
}