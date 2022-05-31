import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Schedule} from "./entity/schedule.entity";
import {ScheduleService} from "./schedule.service";
import {ScheduleController} from "./schedule.controller";
import {ScheduleInterviewer} from "./entity/schedule-interviewer.entity";
import {ScheduleCandidate} from "./entity/schedule-candidate.entity";
import {ScheduleRepository} from "./schedule.repository";
import {InterviewerModule} from "../interviewer/interviewer.module";
import {CandidateModule} from "../candidate/candidate.module";


@Module({
    imports: [TypeOrmModule.forFeature([Schedule, ScheduleInterviewer, ScheduleCandidate]), InterviewerModule, CandidateModule],
    controllers: [ScheduleController],
    providers: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
