import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityParticipantsComponent } from './activity-participants.component';

describe('ActivityParticipantsComponent', () => {
  let component: ActivityParticipantsComponent;
  let fixture: ComponentFixture<ActivityParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
