import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuizesComponent } from './load-quizes.component';

describe('LoadQuizesComponent', () => {
  let component: LoadQuizesComponent;
  let fixture: ComponentFixture<LoadQuizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadQuizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
