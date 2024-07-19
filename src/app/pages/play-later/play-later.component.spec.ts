import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayLaterComponent } from './play-later.component';

describe('PlayLaterComponent', () => {
  let component: PlayLaterComponent;
  let fixture: ComponentFixture<PlayLaterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlayLaterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
