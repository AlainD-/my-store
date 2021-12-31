import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() category!: Category;
  @ViewChild('form', { static: false }) form!: NgForm;
  showDialog = false;
  submitted = false;
  editedItem!: Category;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onEdit(): void {
    this.showDialog = true;
    this.editedItem = { ...this.category };
  }

  onClose(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.showDialog = false;
    this.editedItem = { id: -1, name: '' };
    this.submitted = false;
    if (this.form) {
      this.form.reset();
    }
  }

  update(): void {
    this.submitted = true;
    if (this.form.valid && this.editedItem.id > 0) {
      this.subscriptions.add(
        this.categoryService.update$(this.editedItem.id, this.editedItem).subscribe({
          next: (category: Category) => {
            this.categoryService.stateUpdateCategory(category);
            this.resetForm();
          },
          error: (error) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }
}
