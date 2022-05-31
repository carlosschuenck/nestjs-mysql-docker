import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Schedule} from "./entity/schedule.entity";
import {getManager, Repository} from "typeorm";
import {ScheduleInterviewer} from "./entity/schedule-interviewer.entity";
import {ScheduleCandidate} from "./entity/schedule-candidate.entity";
import {scheduleToScheduleResultDTO} from "../converter/schedule.converter";
import {IntervalDTO} from "./dto/interval.dto";


@Injectable()
export class ScheduleRepository {

    constructor(
        @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
        @InjectRepository(ScheduleInterviewer) private scheduleInterviewerRepository: Repository<ScheduleInterviewer>,
        @InjectRepository(ScheduleCandidate) private scheduleCandidateRepository: Repository<ScheduleCandidate>) {
    }


    public async getCandidateSchedule(candidateId: string): Promise<ScheduleCandidate[]> {
        return await this.scheduleCandidateRepository.createQueryBuilder('sc')
            .innerJoinAndSelect("sc.candidate", "candidate")
            .innerJoinAndSelect("sc.schedule", "schedule")
            .where("candidate.id = :id", {id: candidateId})
            .orderBy("schedule.startDate", 'ASC')
            .getMany();
    }

    public async getInterviewerSchedule(interviewerIds: string[]): Promise<ScheduleInterviewer[]> {
        return await this.scheduleInterviewerRepository.createQueryBuilder('si')
            .innerJoinAndSelect("si.interviewer", "interviewer")
            .innerJoinAndSelect("si.schedule", "schedule")
            .where("interviewer.id IN (:ids)", {ids: interviewerIds})
            .orderBy("schedule.startDate", 'ASC')
            .getMany();
    }


    public async saveInterviewerSchedule(id: string, newSchedule: Schedule[]): Promise<IntervalDTO[]> {
        await this.deleteInterviewerOldSchedule(id);
        const schedule = await this.scheduleRepository.save(newSchedule);
        const scheduleInterviewer = schedule.map(s => new ScheduleInterviewer(id, s.id));
        await this.scheduleInterviewerRepository.save(scheduleInterviewer);
        return schedule.map(schedule => scheduleToScheduleResultDTO(schedule));
    }

    private async deleteInterviewerOldSchedule(id: string) {
        await getManager().query('delete s from schedule s ' +
            'inner join schedule_interviewer si on s.id = si.schedule_id ' +
            'where si.interviewer_id = ?', [id])
    }

    public async saveCandidateSchedule(id: string, newSchedule: Schedule[]): Promise<IntervalDTO[]> {
        await this.deleteCandidateOldSchedule(id);
        const schedule = await this.scheduleRepository.save(newSchedule);
        const scheduleCandidate = schedule.map(s => new ScheduleCandidate(id, s.id))
        await this.scheduleCandidateRepository.save(scheduleCandidate);
        return schedule.map(schedule => scheduleToScheduleResultDTO(schedule));
    }

    private async deleteCandidateOldSchedule(id: string) {
        await getManager().query('delete s from schedule s ' +
            'inner join schedule_candidate sc on s.id = sc.schedule_id ' +
            'where sc.candidate_id = ?', [id])
    }
}