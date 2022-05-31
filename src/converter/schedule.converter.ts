import {Schedule} from "../schedule/entity/schedule.entity";
import {extendMoment} from "moment-range";
import * as Moment from "moment";
import {IntervalDTO} from "../schedule/dto/interval.dto";
const moment = extendMoment(Moment);

export function scheduleToScheduleResultDTO({startDate, endDate}: Schedule): IntervalDTO{
    return new IntervalDTO(moment(startDate).utc(true), moment(endDate).utc(true));
}