import { Component, inject } from '@angular/core';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  customerService = inject(CustomerService);
  categoryList:Category[]=[];
  authService = inject(AuthService);
  searchTerm!:string;
  loading: boolean = true;
  loginSubscription!: Subscription;

  ngOnInit() {
    this.loadCategories();

    // Subscribe to login state changes
    this.loginSubscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.loadCategories(); // Reload categories after login
      }
    });
  }

  loadCategories() {
    this.customerService.getCategories().subscribe((result) => {
      this.categoryList = result;
      this.loading = false;
    });
  }

  router = inject(Router)
  
  onSearch(e:any) {
    if(e.target.value) {
      this.router.navigateByUrl("/products?search="+e.target.value)
    }
  }

  searchCategory(id:string) {
    this.searchTerm="";    
    this.router.navigateByUrl("/products?categoryId="+id!)
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login")
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
