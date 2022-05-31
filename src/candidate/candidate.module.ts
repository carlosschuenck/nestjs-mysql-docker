import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CandidateService} from "./candidate.service";
import {Candidate} from "./entity/candidate.entity";
import {CandidateRepository} from "./candidate.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Candidate])],
    providers: [CandidateService, CandidateRepository],
    exports: [CandidateService]
})
export class CandidateModule {}
