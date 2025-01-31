import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductCardComponent, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  customerService = inject(CustomerService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  route = inject(ActivatedRoute);
  product! : Product;
  mainImage! : string;
  similarProducts : Product[]=[];

  ngOnInit() {
    this.route.params.subscribe((x:any) => {
      this.getProductDetail(x.id);
    });

    window.scrollTo({
      top: 150,
      behavior: 'smooth'
    });
  }

  getProductDetail(id:string) {
    this.customerService.getProductById(id).subscribe(result => {
      this.product = result;
      this.mainImage = this.product.images[0];

      this.customerService.getProducts('', this.product.categoryId,'',-1,'',1,4).subscribe(result=> {
        this.similarProducts = result;
      })
    })
  }

  changeImage(url: string) {
    this.mainImage = url;
  }

  get sellingPrice() {
    return Math.round(this.product.price - (this.product.price*this.product.discount)/100)
  }

  addToWishlist(product: Product) {
    if (this.isInWishlist(product)) {
      this.wishlistService.removeFromWishlists(product._id!).subscribe((result) => {
        this.wishlistService.init();
      })
    }else {
      this.wishlistService.addInWishlists(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product) {
    let isExists = this.wishlistService.wishlists.find(
      (x) => x._id == product._id);
  
  if (isExists) return true;
  else return false;
  }

  addToCart(product: Product) {
    if(!this.isProductInCart(product._id!)){
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
      });
    }else {
      this.cartService.removefromCart(product._id!).subscribe(() => {
        this.cartService.init();
      });
    }
  }

  isProductInCart(productId: string) {
    if(this.cartService.items.find(x=>x.product._id==productId)) {
      return true;
    }else {
      return false;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
