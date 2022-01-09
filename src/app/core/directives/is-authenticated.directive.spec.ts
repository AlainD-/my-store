import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../services/authentication.service';
import { IsAuthenticatedDirective } from './is-authenticated.directive';

describe('IsAuthenticatedDirective', () => {
  let authenticationService: AuthenticationService;
  let templateRef: TemplateRef<unknown>;
  let viewContainer: ViewContainerRef;

  beforeEach(() => {
    authenticationService = TestBed.inject(AuthenticationService);
    templateRef = TestBed.inject(TemplateRef);
    viewContainer = TestBed.inject(ViewContainerRef);
  });

  it('should create an instance', () => {
    const directive = new IsAuthenticatedDirective(
      authenticationService,
      templateRef,
      viewContainer
    );
    expect(directive).toBeTruthy();
  });
});
