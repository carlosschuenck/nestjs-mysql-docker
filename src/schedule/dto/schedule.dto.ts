import {IntervalDTO} from "./interval.dto";
import {ApiProperty} from "@nestjs/swagger";

export class ScheduleDTO {

    @ApiProperty({example: '18f59d10-b146-4540-84bc-1764697e5543'})
    id: string;
    @ApiProperty({type: [IntervalDTO]})
    intervals: IntervalDTO[]
}