import { Component, Input, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent implements OnDestroy {
  @Input() categoryId!: number;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  deleteItem(event: Event): void {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: 'Are you sure you want to delete this category?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, delete!',
      rejectLabel: 'No, cancel',
      defaultFocus: 'reject',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.subscriptions.add(
          this.categoryService.delete$(this.categoryId).subscribe({
            next: (category: Category) => {
              this.categoryService.stateRemoveCategory(category);
            },
            error: (error) => {
              this.notificationService.notifyError(error);
            },
          })
        );
      },
    });
  }
}
