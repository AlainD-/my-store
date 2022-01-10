import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlreadyInCartComponent } from './already-in-cart.component';

describe('AlreadyInCartComponent', () => {
  let component: AlreadyInCartComponent;
  let fixture: ComponentFixture<AlreadyInCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlreadyInCartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
