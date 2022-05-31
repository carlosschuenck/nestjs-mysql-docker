import {Transform, Type} from "class-transformer";
import * as moment from "moment";
import {ApiProperty} from "@nestjs/swagger";

export class IntervalDTO {
    @Type(() => Date)
    @Transform(({ value }) => moment(value) )
    @ApiProperty({type: Date, example: '2022-05-30 09:00'})
    startDate: moment.Moment;

    @Type(() => Date)
    @Transform(({ value }) => moment(value) )
    @ApiProperty({type: Date, example: '2022-05-30 18:00'})
    endDate: moment.Moment;

    constructor(startDate: moment.Moment, endDate: moment.Moment) {
        this.startDate = startDate;
        this.endDate = endDate
    }
}