import {ApiProperty} from "@nestjs/swagger";
import {ScheduleDTO} from "./schedule.dto";

export class ScheduleResultDTO extends ScheduleDTO{

    @ApiProperty()
    name: string;
}