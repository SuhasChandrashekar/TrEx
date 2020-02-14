import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrexlandingComponent } from './trexlanding.component';

describe('TrexlandingComponent', () => {
  let component: TrexlandingComponent;
  let fixture: ComponentFixture<TrexlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrexlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrexlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
