import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { JobApplication } from './entities/job-application.entity';
import { Country } from '../country/entities/country.entity';
import { City } from '../city/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, Country, City])],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}
