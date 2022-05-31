import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewerModule } from './interviewer/interviewer.module';
import { CandidateModule } from './candidate/candidate.module';
import { ScheduleModule } from './schedule/schedule.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'calendar',
    password: process.env.DB_PW || 'calendar',
    database: process.env.DB_NAME || 'calendar-db',
    autoLoadEntities: true,
    synchronize: true
  }),
    InterviewerModule,
    CandidateModule,
    ScheduleModule],
})
export class AppModule {}
