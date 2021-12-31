import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  @ViewChild('form', { static: false }) form!: NgForm;
  showDialog = false;
  submitted = false;
  newItem!: Partial<Category>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  create(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.subscriptions.add(
        this.categoryService.create$(this.form.value as Partial<Category>).subscribe({
          next: (category: Category) => {
            this.categoryService.stateAddCategory(category);
            this.resetForm();
          },
          error: (error) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }

  onNew(): void {
    this.showDialog = true;
  }

  onClose(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.showDialog = false;
    this.newItem = { name: '' };
    this.submitted = false;
    if (this.form) {
      this.form.reset();
    }
  }
}
