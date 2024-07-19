import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      avatar: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async handleFormSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Registrando...',
      });
      await loading.present();

      this.registerService.addUser(this.registerForm.value).subscribe({
        next: async (product: any) => {
          console.table(product);
          await loading.dismiss();
          this.router.navigate(['login']);
        },
        error: async (error: any) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Ocorreu um erro ao registrar. Por favor, tente novamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }
  }
}
