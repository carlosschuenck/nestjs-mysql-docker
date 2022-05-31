import {Injectable, OnModuleInit} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Candidate} from "./entity/candidate.entity";

@Injectable()
export class CandidateRepository implements OnModuleInit{

    constructor(@InjectRepository(Candidate) private repository: Repository<Candidate>) {
    }

    public async isExist(id: string): Promise<boolean> {
        return await this.repository.count({ where: { id }}) == 1;
    }

    async onModuleInit() {
        await this.repository.save({id: 'ec2de694-c538-4a9a-8840-d26e5eedf96d', name: 'Carl'});
    }
}
