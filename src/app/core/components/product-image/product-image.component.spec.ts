import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageModule } from 'primeng/image';
import { ProductImageComponent } from './product-image.component';

describe('ProductImageComponent', () => {
  let component: ProductImageComponent;
  let fixture: ComponentFixture<ProductImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductImageComponent],
      imports: [ImageModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
