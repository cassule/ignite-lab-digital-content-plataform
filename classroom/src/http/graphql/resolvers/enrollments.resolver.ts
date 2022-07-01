import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsServices: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) { }

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsServices.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollments: Enrollment) {
    return this.studentsService.getStudentById(enrollments.studentId);
  }

  @ResolveField()
  course(@Parent() enrollments: Enrollment) {
    return this.coursesService.getCourseById(enrollments.courseId);
  }
}
