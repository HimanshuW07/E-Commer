import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss'
})
export class WishlistsComponent {

  wishlists: Product[]=[];
  wishlistService = inject(WishlistService);

  router = inject(Router)

  ngOnInit() {
    this.wishlistService.init();
  }

}
