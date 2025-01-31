import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  registerForm = this.formbuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.minLength(5)]],
  });

  router = inject(Router);
  authService = inject(AuthService);
  register() {
    let value = this.registerForm.value;
    this.authService.register(value.name!, value.email!, value.password!).subscribe(result => {
      alert("User Registered");
      this.router.navigateByUrl('/login')
    })
  }
}
