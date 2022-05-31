import {BadRequestException, Injectable} from '@nestjs/common';
import {CandidateRepository} from "./candidate.repository";

@Injectable()
export class CandidateService {

    constructor(private repository: CandidateRepository) {}

    async checkIfExist(id: string): Promise<void> {
        if(await this.repository.isExist(id)) return;
        throw new BadRequestException('Interviewer does not exist');
    }
}
