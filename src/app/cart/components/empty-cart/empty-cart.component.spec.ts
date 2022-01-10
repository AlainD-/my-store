import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesModule } from 'primeng/messages';
import { EmptyCartComponent } from './empty-cart.component';

describe('EmptyCartComponent', () => {
  let component: EmptyCartComponent;
  let fixture: ComponentFixture<EmptyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyCartComponent],
      imports: [MessagesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
