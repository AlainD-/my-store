import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';

@Component({
  selector: 'app-header',
})
class MockHeaderComponent {}

@Component({
  selector: 'app-main',
})
class MockMainComponent {}

@Component({
  selector: 'app-footer',
})
class MockFooterComponent {}

@Component({
  selector: 'app-error-dialog',
})
class MockErrorDialogComponent {}

@Component({
  selector: 'app-notification-toast',
})
class MockNotificationToastComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        MockHeaderComponent,
        MockMainComponent,
        MockFooterComponent,
        MockErrorDialogComponent,
        MockNotificationToastComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
