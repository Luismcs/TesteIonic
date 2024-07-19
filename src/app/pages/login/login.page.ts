import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonIcon,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    ReactiveFormsModule,
    RouterLink
  ],
})
export class LoginPage implements OnInit {
  myForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('LoginPage initialized');
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });
    await loading.present();

    const { email, password } = this.myForm.value;

    this.loginService.login(email, password).subscribe(async (user) => {
      await loading.dismiss();
      if (user) {
        localStorage.setItem('login', 'true');
        this.router.navigate(['/loja']);
      } else {
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: 'Incorrect email or password.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}
