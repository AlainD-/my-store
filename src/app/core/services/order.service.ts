import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { User } from '../models/user';
import { OrderStatus } from '../types/order-status.type';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private activeOrder: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(null);
  readonly activeOrder$: Observable<Order | null> = this.activeOrder.asObservable();

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  getAll$(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
  }

  private getUserOrders$({ id: userId }: User, status?: OrderStatus): Observable<Order[]> {
    const params: { status: OrderStatus } | undefined = status ? { status } : undefined;
    return this.http.get<Order[]>(`${environment.apiUrl}/users/${userId}/orders`, { params });
  }

  getUserActiveOrders$(user: User): Observable<Order[]> {
    return this.getUserOrders$(user, 'active');
  }

  getUserCompletedOrders$(user: User): Observable<Order[]> {
    return this.getUserOrders$(user, 'complete');
  }

  getUserOrderById$({ id: userId }: User, orderId: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/users/${userId}/orders/${orderId}`);
  }

  createUserOrders$({ id: userId }: User): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/users/${userId}/orders`, { userId });
  }

  updateUserOrders$({ id: userId }: User, order: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.apiUrl}/users/${userId}/orders/${order.id}`, order);
  }

  addItemToUserOrder$(
    { id: userId }: User,
    order: Order,
    data: Partial<OrderItem>
  ): Observable<OrderItem> {
    return this.http.post<OrderItem>(
      `${environment.apiUrl}/users/${userId}/orders/${order.id}/items`,
      data
    );
  }

  updateItemInUserOrder$(
    { id: userId }: User,
    order: Order,
    orderItem: OrderItem
  ): Observable<OrderItem> {
    return this.http.put<OrderItem>(
      `${environment.apiUrl}/users/${userId}/orders/${order.id}/items/${orderItem.id}`,
      orderItem
    );
  }

  removeItemFromUserOrder$(
    { id: userId }: User,
    order: Order,
    orderItem: OrderItem
  ): Observable<OrderItem> {
    return this.http.delete<OrderItem>(
      `${environment.apiUrl}/users/${userId}/orders/${order.id}/items/${orderItem.id}`
    );
  }

  stateGetActiveOrder(): Order | null {
    return this.activeOrder.getValue();
  }

  stateSetActiveOrder(order: Order | null): void {
    this.activeOrder.next(order);
  }

  stateAddItemToActiveOrder(orderItem: OrderItem): void {
    const activeOrder: Order | null = this.stateGetActiveOrder();
    if (activeOrder) {
      const foundItem: OrderItem | undefined = activeOrder.items?.find(
        (item) => item.id === orderItem.id
      );
      if (!foundItem) {
        this.stateSetActiveOrder({
          ...activeOrder,
          items: [...(activeOrder.items ? activeOrder.items : []), orderItem],
        });
      } else {
        this.notificationService.notifyErrorWithMessage(
          'Unexpected error: This product has already been placed in the order. The cart has not been updated!'
        );
      }
    } else {
      this.notificationService.notifyErrorWithMessage(
        'Unexpected error: It seems that there is no active order at the moment. No product has been added to the cart!'
      );
    }
  }

  stateRemoveItemFromActiveOrder(orderItem: OrderItem): void {
    const activeOrder: Order | null = this.stateGetActiveOrder();
    if (activeOrder) {
      const foundItem: OrderItem | undefined = activeOrder.items?.find(
        (item) => item.id === orderItem.id
      );
      if (foundItem && activeOrder.items) {
        this.stateSetActiveOrder({
          ...activeOrder,
          items: [...activeOrder.items.filter((item) => item.id !== orderItem.id)],
        });
      } else {
        this.notificationService.notifyErrorWithMessage(
          'Unexpected error: This product is not placed in the order yet. The cart has not been updated!'
        );
      }
    } else {
      this.notificationService.notifyErrorWithMessage(
        'Unexpected error: It seems that there is no active order at the moment. Nothing has been changed!'
      );
    }
  }

  stateUpdateItemInActiveOrder(orderItem: OrderItem): void {
    const activeOrder: Order | null = this.stateGetActiveOrder();
    if (activeOrder) {
      const foundItem: OrderItem | undefined = activeOrder.items?.find(
        (item) => item.id === orderItem.id
      );
      if (foundItem && activeOrder.items) {
        this.stateSetActiveOrder({
          ...activeOrder,
          items: [
            ...activeOrder.items.map((item) => (item.id === orderItem.id ? orderItem : item)),
          ],
        });
      } else {
        this.notificationService.notifyErrorWithMessage(
          'Unexpected error: This product is not placed in the order yet. The cart has not been updated!'
        );
      }
    } else {
      this.notificationService.notifyErrorWithMessage(
        'Unexpected error: It seems that there is no active order at the moment. No product has been added to the cart!'
      );
    }
  }
}
