import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';  // Import of for error handling

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent, CarouselModule, RouterLink], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }

  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: Product[] = [];
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  errorMessage: string = '';

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe({
      next: (result) => {
        this.featuredProducts = result;
        this.bannerImages.push(...result);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
      }
    });

    this.customerService.getNewProducts().subscribe({
      next: (result) => {
        this.newProducts = result;
        this.bannerImages.push(...result);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
      }
    });
  }
}
