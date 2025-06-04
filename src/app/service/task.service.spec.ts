import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // import this
import { TaskService } from './task.service'; // or your actual service
import { Task } from '../models/task.model';

describe('TaskService', (): void => {
  let service: TaskService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- add this here
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should get a list of tasks Empty', (): void => {
    expect(service.tasks).toEqual([]);
  });
});
