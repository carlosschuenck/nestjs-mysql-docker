import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";
import {ScheduleDTO} from "./dto/schedule.dto";
import {AvailabityDTO} from "./dto/availabity.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {IntervalDTO} from "./dto/interval.dto";

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {

    constructor(private service: ScheduleService) {
    }

    @ApiResponse({type: [IntervalDTO]})
    @Post('/interviewer')
    async saveInterviewer(@Body() scheduleDTO: ScheduleDTO): Promise<IntervalDTO[]> {
        return await this.service.saveInterviewerSchedule(scheduleDTO);
    }

    @ApiResponse({type: [IntervalDTO]})
    @Post('/candidate')
    async saveCandidate(@Body() scheduleDTO: ScheduleDTO): Promise<IntervalDTO[]> {
        return await this.service.saveCandidateSchedule(scheduleDTO);
    }

    @ApiResponse({type: AvailabityDTO})
    @Get('/availability/candidate/:candidateId/interviewers/:interviewers')
    async get(@Param('candidateId') candidateId: string, @Param('interviewers') interviewers: string): Promise<AvailabityDTO> {
        return await this.service.getAvailability(candidateId, interviewers?.trim().split(','));
    }
}
