import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Interviewer} from "./entity/interviewer.entity";
import {InterviewerService} from "./interviewer.service";
import {InterviewerRepository} from "./interviewer.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Interviewer])],
    providers: [InterviewerService, InterviewerRepository],
    exports: [InterviewerService]
})
export class InterviewerModule {}
