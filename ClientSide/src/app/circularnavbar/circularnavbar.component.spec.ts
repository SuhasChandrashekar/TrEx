import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularnavbarComponent } from './circularnavbar.component';

describe('CircularnavbarComponent', () => {
  let component: CircularnavbarComponent;
  let fixture: ComponentFixture<CircularnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
