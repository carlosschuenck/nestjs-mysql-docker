import {ScheduleDTO} from "./schedule.dto";
import {ApiProperty} from "@nestjs/swagger";

export class AvailabityDTO {

    @ApiProperty()
    candidateId: string;
    @ApiProperty({type: [ScheduleDTO]})
    interviewerAvailabilities: ScheduleDTO[];

    constructor(candidateId: string, interviewerAvailabilities: ScheduleDTO[]) {
        this.candidateId = candidateId;
        this.interviewerAvailabilities = interviewerAvailabilities;
    }
}