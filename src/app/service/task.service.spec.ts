import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // import this
import { TaskService } from './task.service'; // or your actual service

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
});
