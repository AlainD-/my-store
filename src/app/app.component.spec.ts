import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './core/services/authentication.service';
import { CategoryService } from './core/services/category.service';
import { NotificationService } from './core/services/notification.service';
import { ProductService } from './core/services/product.service';
import { AppComponent } from './app.component';

class MockAuthenticationService {}
class MockCategoryService {}
class MockNotificationService {}
class MockProductService {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
        {
          provide: CategoryService,
          useClass: MockCategoryService,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
