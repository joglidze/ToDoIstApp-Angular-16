import { TestBed } from '@angular/core/testing';

import { TodayStoreService } from './today-store.service';

describe('TodayStoreService', () => {
  let service: TodayStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodayStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
