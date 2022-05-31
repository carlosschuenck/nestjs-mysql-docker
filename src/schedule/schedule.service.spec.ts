import {ScheduleService} from './schedule.service';

import * as Moment from 'moment';
import {extendMoment} from 'moment-range';
import {ScheduleInterviewer} from "./entity/schedule-interviewer.entity";
import {ScheduleCandidate} from "./entity/schedule-candidate.entity";


const moment = extendMoment(Moment);


describe('ScheduleService', () => {
    let service: ScheduleService;

    beforeEach(async () => {
        /*      const module: TestingModule = await Test.createTestingModule({
                  controllers: [ScheduleController],
                  providers: [ScheduleService, ScheduleRepository]
              }).compile();

              service = module.get<ScheduleService>(ScheduleService);*/
        service = new ScheduleService(null, null, null);
    });

    it('Should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Generating schedule', () => {
        it('Should create slots of 1 hour', function () {
            const dates = [
                {
                    startDate: moment().startOf('day').add(1, 'days').hours(9),
                    endDate: moment().startOf('day').add(1, 'days').hours(10)
                },
                {
                    startDate: moment().startOf('day').add(2, 'days').hours(14),
                    endDate: moment().startOf('day').add(2, 'days').hours(17)
                }
            ];
            const slots = service.generateSchedule(dates);
            expect(slots.length).toEqual(4);
        });
    })

    describe('Generating interviewer availabilities', () => {
        it('Should generate valid interviewer availabilities', function () {
            const scheduleInterviewer: ScheduleInterviewer[] = [{
                schedule: {
                    id: '1',
                    scheduleInterviewer: undefined,
                    startDate: moment().startOf('day').add(2, 'days').hours(10).toDate(),
                    endDate: moment().startOf('day').add(2, 'days').hours(11).toDate()
                },
                interviewer: {id: '1', scheduleInterviewer: undefined, name: 'interviewer'}
            },
                {
                    schedule: {
                        id: '2',
                        scheduleInterviewer: undefined,
                        startDate: moment().startOf('day').add(2, 'days').hours(11).toDate(),
                        endDate: moment().startOf('day').add(2, 'days').hours(12).toDate()
                    },
                    interviewer: {id: '1', scheduleInterviewer: undefined, name: 'interviewer'}
                },
                {
                    schedule: {
                        id: '3',
                        scheduleInterviewer: undefined,
                        startDate: moment().startOf('day').add(2, 'days').hours(12).toDate(),
                        endDate: moment().startOf('day').add(2, 'days').hours(13).toDate()
                    },
                    interviewer: {id: '1', scheduleInterviewer: undefined, name: 'interviewer'}
                }];

            const scheduleCandidate: ScheduleCandidate[] = [{
                schedule: {
                    id: '1',
                    scheduleInterviewer: undefined,
                    startDate: moment().startOf('day').add(2, 'days').hours(10).toDate(),
                    endDate: moment().startOf('day').add(2, 'days').hours(11).toDate()
                },
                candidate: {id: '1', name: 'candidate'}
            },
                {
                    schedule: {
                        id: '2',
                        scheduleInterviewer: undefined,
                        startDate: moment().startOf('day').add(2, 'days').hours(11).toDate(),
                        endDate: moment().startOf('day').add(2, 'days').hours(12).toDate()
                    },
                    candidate: {id: '1', name: 'candidate'}
                }];

            const slots = service.extractInterviewerAvailabilities(scheduleInterviewer, scheduleCandidate);
            expect(slots).not.toEqual([]);
            expect(slots.length).toEqual(1);
            expect(slots[0].id).toEqual('1');
            expect(slots[0].intervals).not.toEqual([]);
            expect(slots[0].intervals.length).toEqual(2);
        });

        it('Should not generate interviewer availabilities', function () {
            const scheduleInterviewer: ScheduleInterviewer[] = [{
                schedule: {
                    id: '2',
                    scheduleInterviewer: undefined,
                    startDate: moment().startOf('day').add(2, 'days').hours(10).toDate(),
                    endDate: moment().startOf('day').add(2, 'days').hours(11).toDate()
                },
                interviewer: {id: '1', scheduleInterviewer: undefined, name: 'interviewer'}
            }];
            const scheduleCandidate: ScheduleCandidate[] = [{
                schedule: {
                    id: '1',
                    scheduleInterviewer: undefined,
                    startDate: moment().startOf('day').add(2, 'days').hours(9).toDate(),
                    endDate: moment().startOf('day').add(2, 'days').hours(10).toDate()
                },
                candidate: {id: '1', name: 'candidate'}
            }];

            const slots = service.extractInterviewerAvailabilities(scheduleInterviewer, scheduleCandidate);
            expect(slots).toEqual([]);
        });
    })

    describe('Checking period of time', () => {
        it('When the period of time is valid', () => {
            const startDate = moment().startOf('day').add(1, 'days').set("hour", 9).set("minute", 0);
            const endDate = moment().startOf('day').add(1, 'days').set("hour", 18).set("minute", 0);
            expect(() => service.checkIfDateRangeIsValid(startDate, endDate)).not.toThrow()
        });

        it('When the period of time does not spread from the beginning of any hour until the beginning of the next hour', () => {
            const startDate = moment().startOf('day').add(1, 'days').set("hour", 9).set("minute", 10);
            const endDate = moment().startOf('day').add(1, 'days').set("hour", 18).set("minute", 45);
            expect(() => service.checkIfDateRangeIsValid(startDate, endDate)).toThrowError(service.MSG_INVALID_DATE_RANGE)
        });

        it('When the start date is after the end date', () => {
            const startDate = moment().startOf('day').add(1, 'days').set("hour", 15).set("minute", 0);
            const endDate = moment().startOf('day').add(1, 'days').set("hour", 12).set("minute", 35);
            expect(() => service.checkIfDateRangeIsValid(startDate, endDate)).toThrowError(service.MSG_END_DATE_BEFORE_START_DATE)
        });

        it('When some date is before the current date and time', () => {
            const startDate = moment().startOf('day').subtract(1, 'days').set("hour", 11).set("minute", 0);
            const endDate = moment().startOf('day').add(1, 'days').set("hour", 15).set("minute", 0);
            expect(() => service.checkIfDateRangeIsValid(startDate, endDate)).toThrowError(service.MSG_BEFORE_CURRENT_DATE)
        });
    })
});
