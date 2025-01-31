import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    formbuilder = inject(FormBuilder);
    loginForm = this.formbuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.minLength(5)]],
    });

    authService = inject(AuthService)
    router = inject(Router);
    
    login() {
      this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe((result : any)=> {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigateByUrl("/");
      })
    }
}
