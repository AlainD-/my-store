import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCartFormComponent } from './submit-cart-form.component';

describe('SubmitCartFormComponent', () => {
  let component: SubmitCartFormComponent;
  let fixture: ComponentFixture<SubmitCartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitCartFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
