import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatRadioModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  cartService = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);

  ngOnInit() {
    this.cartService.init();
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price*product.discount) / 100);
  }

  get cartItems() {
    return this.cartService.items; 
  }
  
  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId,quantity).subscribe(() => {
      const item = this.cartService.items.find(i => i.product._id === productId);
      if (item) {
        item.quantity += quantity;

        if (item.quantity <= 0) {
          this.cartService.items = this.cartService.items.filter(i => i.product._id !== productId);
        }
      }
    },
    (error) => {
    });
  }

  get totalAmount() {
    let amount = 0;
    for ( let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      amount+= this.sellingPrice(element.product)*element.quantity
    }
    return amount;
  }

  orderStep : number = 0;

  checkout() {
    this.orderStep = 1
  }

  formbuilder = inject(FormBuilder);
  paymentType = 'cash';
  addressForm = this.formbuilder.group({
    address1: [''],
    address2: [''],
    city: [''],
    pincode : [''],
  });

  addAddress() {
    this.orderStep = 2;
  }

  completeOrder() {
    let order : Order = {
      items : this.cartItems,
      paymentType : this.paymentType,
      address : this.addressForm.value,
      date : new Date(),
    };
    this.orderService.addOrder(order).subscribe(result => {
      alert("Your order is completed");
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl("/orders");
    });
  }
}
