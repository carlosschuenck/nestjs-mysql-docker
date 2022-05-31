import {BadRequestException, Injectable} from '@nestjs/common';
import {InterviewerRepository} from "./interviewer.repository";

@Injectable()
export class InterviewerService{

    constructor(private repository: InterviewerRepository) {}

    async checkIfExist(id: string): Promise<void> {
        if(await this.repository.isExist(id)) return;
        throw new BadRequestException('Interviewer does not exist');
    }

}
