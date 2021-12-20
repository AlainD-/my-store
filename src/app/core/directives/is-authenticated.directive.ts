import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIsAuthenticated]',
})
export class IsAuthenticatedDirective implements OnInit, OnDestroy {
  private isAuthenticated = false;
  private isHidden = true;
  private subscription!: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private template: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.authenticationService.currentUser$.subscribe({
      next: (user: User | null) => {
        this.isAuthenticated = user !== null;
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
    if (this.isAuthenticated) {
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
