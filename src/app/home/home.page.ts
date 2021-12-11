/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IonicAuthService } from '../ionic-auth.service';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';

  bookingRef: AngularFireObject<any>;
  

 
  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  signUp(value) {
    this.ionicAuthService.createUser(value)
      .then(async (response) => {
        const toast = await this.toastCtrl.create({
          header: `Sucessfully Registered`,
          duration: 2000,
          position:'middle',
          color:"success",
          buttons: [{
            text: 'Close',
            role: 'cancel'
          }]
        });
        await toast.present();
        this.router.navigateByUrl('welcome');
      }, async error => {

        const toast = await this.toastCtrl.create({
          header: `Invalid Input`,
          duration: 2000,
          position:'middle',
          color:"danger",
          buttons: [{
            text: 'Close',
            role: 'cancel'
          }]
        });
        await toast.present();
        
      });
     
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }


}
