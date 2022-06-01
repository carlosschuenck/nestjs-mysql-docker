import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";
import {ScheduleDTO} from "./dto/schedule.dto";
import {AvailabityDTO} from "./dto/availabity.dto";
import {ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {IntervalDTO} from "./dto/interval.dto";

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {

    constructor(private service: ScheduleService) {
    }

    @ApiResponse({type: [IntervalDTO], description: 'the schedule created override the previous one'})
    @Post('/interviewer')
    async saveInterviewer(@Body() scheduleDTO: ScheduleDTO): Promise<IntervalDTO[]> {
        return await this.service.saveInterviewerSchedule(scheduleDTO);
    }

    @ApiResponse({type: [IntervalDTO], description: 'the schedule created override the previous one'})
    @Post('/candidate')
    async saveCandidate(@Body() scheduleDTO: ScheduleDTO): Promise<IntervalDTO[]> {
        return await this.service.saveCandidateSchedule(scheduleDTO);
    }


    @ApiParam({
        name: 'candidateId',
        required: true,
        example: 'ec2de694-c538-4a9a-8840-d26e5eedf96d',
        schema: {oneOf: [{type: 'string'}]}
    })
    @ApiParam({
        name: 'interviewers',
        required: true,
        example: '18f59d10-b146-4540-84bc-1764697e5543, 98d0b396-d56b-4025-99fa-d2a53f6bf572',
        schema: {oneOf: [{type: 'string'}]}
    })
    @ApiResponse({type: AvailabityDTO})
    @Get('/availability/candidate/:candidateId/interviewers/:interviewers')
    async get(@Param('candidateId') candidateId: string, @Param('interviewers') interviewers: string): Promise<AvailabityDTO> {
        return await this.service.getAvailability(candidateId, interviewers?.trim().split(','));
    }
}
