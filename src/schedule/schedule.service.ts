import {BadRequestException, Injectable} from '@nestjs/common';
import * as Moment from 'moment';
import {extendMoment} from 'moment-range';
import {ScheduleDTO} from "./dto/schedule.dto";
import {plainToInstance} from "class-transformer";
import {IntervalDTO} from "./dto/interval.dto";
import {Schedule} from "./entity/schedule.entity";
import {ScheduleInterviewer} from "./entity/schedule-interviewer.entity";
import {ScheduleCandidate} from "./entity/schedule-candidate.entity";
import {AvailabityDTO} from "./dto/availabity.dto";
import {ScheduleRepository} from "./schedule.repository";
import {ScheduleResultDTO} from "./dto/schedule-result.dto";
import {InterviewerService} from "../interviewer/interviewer.service";
import {CandidateService} from "../candidate/candidate.service";

const moment = extendMoment(Moment);


@Injectable()
export class ScheduleService {

    public readonly MSG_END_DATE_BEFORE_START_DATE = 'Start date must be after end date';
    public readonly MSG_INVALID_DATE_RANGE = 'The slot must spreads from the beginning of any hour until the beginning of the next hour. e.g. 9:00 – 10:00';
    public readonly MSG_BEFORE_CURRENT_DATE = 'The start date and end date must be after current date and time';

    constructor(private scheduleRepository: ScheduleRepository,
                private interviewerService: InterviewerService,
                private candidateService: CandidateService) {
    }

    async saveInterviewerSchedule({id, intervals}: ScheduleDTO): Promise<IntervalDTO[]> {
        await this.interviewerService.checkIfExist(id);
        const newSchedule = this.generateSchedule(intervals);
        return await this.scheduleRepository.saveInterviewerSchedule(id, newSchedule);
    }


    async saveCandidateSchedule({id, intervals}: ScheduleDTO): Promise<IntervalDTO[]> {
        await this.candidateService.checkIfExist(id);
        const newSchedule = this.generateSchedule(intervals);
        return await this.scheduleRepository.saveCandidateSchedule(id, newSchedule);
    }

    async getAvailability(candidateId: string, interviewerIds: string[]): Promise<AvailabityDTO> {
        const scheduleCandidate = await this.scheduleRepository.getCandidateSchedule(candidateId);
        const scheduleInterviewer = await this.scheduleRepository.getInterviewerSchedule(interviewerIds);
        const interviewerAvailabilities = this.extractInterviewerAvailabilities(scheduleInterviewer, scheduleCandidate);
        return new AvailabityDTO(candidateId, interviewerAvailabilities);
    }

    extractInterviewerAvailabilities(scheduleInterviewer: ScheduleInterviewer[], scheduleCandidate: ScheduleCandidate[]) {
        const schedulesThatMatch = this.getSchedulesThatMatch(scheduleInterviewer, scheduleCandidate);
        return this.compileInterviewerAvailabilities(schedulesThatMatch);
    }

    private compileInterviewerAvailabilities(rr: ScheduleInterviewer[]) {
        return rr.reduce<ScheduleResultDTO[]>((interviewerAvailabilities,
                                               {interviewer, schedule}) => {
            const interviewerAvailability = interviewerAvailabilities.find(ia => ia.id == interviewer.id);
            if (interviewerAvailability) {
                interviewerAvailability.intervals.push({
                    startDate: moment(schedule.startDate).utc(true),
                    endDate: moment(schedule.endDate).utc(true)
                })
                return interviewerAvailabilities;
            }
            interviewerAvailabilities.push({
                id: interviewer.id,
                name: interviewer.name,
                intervals: [{
                    startDate: moment(schedule.startDate).utc(true),
                    endDate: moment(schedule.endDate).utc(true)
                }]
            })
            return interviewerAvailabilities;
        }, []);
    }

    private getSchedulesThatMatch(scheduleInterviewer: ScheduleInterviewer[], scheduleCandidate: ScheduleCandidate[]) {
        return scheduleInterviewer.filter(scheduleInterviewer =>
            scheduleCandidate.find(scheduleCandidate =>
                ScheduleService.isDatesMatch(scheduleCandidate.schedule, scheduleInterviewer.schedule)));
    }

    static isDatesMatch(candidateSchedule: Schedule, interviewerSchedule: Schedule): boolean {
        return moment(candidateSchedule.startDate).isSame(interviewerSchedule.startDate) &&
            moment(candidateSchedule.endDate).isSame(interviewerSchedule.endDate);
    }

    public generateSchedule(intervalsDTO: IntervalDTO[]): Schedule[] {
        const intervals = plainToInstance(IntervalDTO, intervalsDTO);
        return intervals.reduce((schedule, {startDate, endDate}) => {
            this.checkIfDateRangeIsValid(startDate, endDate)
            const timeSlots = ScheduleService.generateTimeSlots(startDate, endDate);
            const newSchedule = this.convertTimeSlotsInSchedule(timeSlots)
            return schedule.concat(newSchedule);
        }, []);
    }

    checkIfDateRangeIsValid(startDate: Moment.Moment, endDate: Moment.Moment): void {
        if (startDate.isBefore(moment()) || endDate.isBefore(moment()))
            throw new BadRequestException(this.MSG_BEFORE_CURRENT_DATE);
        if (endDate.isBefore(startDate))
            throw new BadRequestException(this.MSG_END_DATE_BEFORE_START_DATE);
        if (startDate.minutes() != 0 || endDate.minutes() != 0)
            throw new BadRequestException(this.MSG_INVALID_DATE_RANGE);
    }

    static generateTimeSlots(startDate: moment.Moment, endDate: moment.Moment): Moment.Moment[] {
        const dateRange = moment.range(startDate, endDate);
        return Array.from(dateRange.by('hours', {step: 1}));
    }

    convertTimeSlotsInSchedule(timeSlots: moment.Moment[]): Schedule[] {
        const schedule: Schedule[] = [];
        timeSlots.forEach((startDate, index) => {
            const endDate = timeSlots[index + 1];
            if (endDate) schedule.push(new Schedule(undefined, startDate.toDate(), endDate.toDate()))
        })
        return schedule;
    }
}
