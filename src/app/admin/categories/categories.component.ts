import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../core/models/category';
import { CategoryService } from '../../core/services/category.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild('table') table!: Table;
  @ViewChild('formNew', { static: false }) formNew!: NgForm;
  @ViewChild('formEdit', { static: false }) formEdit!: NgForm;
  categories$!: Observable<Category[]>;
  selectedItems: Category[] = [];
  loading = false;
  showNew = false;
  showEdit = false;
  newSubmitted = false;
  editSubmitted = false;
  newItem!: Partial<Category>;
  editedItem!: Category;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$;
    this.resetEditForm();
    this.resetNewForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private resetEditForm(): void {
    this.showEdit = false;
    this.editedItem = { id: -1, name: '' };
    this.editSubmitted = false;
    if (this.formEdit) {
      this.formEdit.reset();
    }
  }

  private resetNewForm(): void {
    this.showNew = false;
    this.newItem = { name: '' };
    this.newSubmitted = false;
    if (this.formNew) {
      this.formNew.reset();
    }
  }

  deleteItem(event: Event, id: number): void {
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
          this.categoryService.delete$(id).subscribe({
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

  globalFilter(event: Event): void {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onEdit(category: Category): void {
    this.showEdit = true;
    this.editedItem = { ...category };
  }

  onEditClose(): void {
    this.resetEditForm();
  }

  onNew(): void {
    this.showNew = true;
  }

  onNewClose(): void {
    this.resetNewForm();
  }

  create(): void {
    this.newSubmitted = true;
    if (this.formNew.valid) {
      this.subscriptions.add(
        this.categoryService.create$(this.formNew.value as Partial<Category>).subscribe({
          next: (category: Category) => {
            this.categoryService.stateAddCategory(category);
            this.resetNewForm();
          },
          error: (error) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }

  update(): void {
    this.editSubmitted = true;
    if (this.formEdit.valid && this.editedItem.id > 0) {
      this.subscriptions.add(
        this.categoryService.update$(this.editedItem.id, this.editedItem).subscribe({
          next: (category: Category) => {
            this.categoryService.stateUpdateCategory(category);
            this.resetEditForm();
          },
          error: (error) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }
}
