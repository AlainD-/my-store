import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { UserService } from '../../core/services/user.service';
import { UsersComponent } from './users.component';

class MockUserService {}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [CardModule, TableModule],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
