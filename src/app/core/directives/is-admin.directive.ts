import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIsAdmin]',
})
export class IsAdminDirective implements OnInit, OnDestroy {
  private isAdmin = false;
  private isHidden = true;
  private subscription!: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private template: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.authenticationService.currentUser$
      .pipe(map((user) => user?.isAdmin ?? false))
      .subscribe({
        next: (isAdmin) => {
          this.isAdmin = isAdmin;
          this.updateView();
        },
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateView(): void {
    if (this.isAdmin) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.template);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }
}
