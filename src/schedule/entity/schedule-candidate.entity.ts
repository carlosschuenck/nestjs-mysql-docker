import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Schedule} from "./schedule.entity";
import {Candidate} from "../../candidate/entity/candidate.entity";

@Entity({name: 'schedule_candidate'})
export class ScheduleCandidate {
    @PrimaryColumn({type: 'uuid', name: 'candidate_id'})
    @ManyToOne(()=> Candidate,(candidate) => candidate.id, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'candidate_id'})
    candidate: Candidate;

    @PrimaryColumn({type: 'uuid', name: 'schedule_id'})
    @ManyToOne(()=> Schedule,(schedule) => schedule.id, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'schedule_id'})
    schedule: Schedule;

    constructor(candidateId: string, scheduleId: string) {
        this.candidate = new Candidate(candidateId);
        this.schedule = new Schedule(scheduleId);
    }

}