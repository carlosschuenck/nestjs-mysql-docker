import {Injectable, OnModuleInit} from '@nestjs/common';
import {Interviewer} from "./entity/interviewer.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class InterviewerRepository implements OnModuleInit {

    constructor(@InjectRepository(Interviewer) private repository: Repository<Interviewer>) {
    }

    public async isExist(id: string): Promise<boolean> {
        return await this.repository.count({where: {id}}) == 1;
    }

    async onModuleInit() {
        await this.repository.save({id: '18f59d10-b146-4540-84bc-1764697e5543', name: 'Ines'});
        await this.repository.save({id: '98d0b396-d56b-4025-99fa-d2a53f6bf572', name: 'Ingrid'});
    }
}
