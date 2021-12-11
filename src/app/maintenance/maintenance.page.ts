/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { IonicAuthService } from '../ionic-auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

  bookingRef: AngularFireObject<any>;
  userDetail: string;

  maintForm: FormGroup;
  

  constructor(
    private apiService: ApiService,
    private router: Router,
    public fb: FormBuilder,
   // private db: AngularFireDatabase,
    private ionicAuthService: IonicAuthService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {

    this.maintForm = this.fb.group({
      brand: ['',Validators.required],
      model: ['',Validators.required],
      year: ['',Validators.required],
      phone: ['',Validators.required],
      name: ['',Validators.required],
      description: ['',Validators.required],
     
    });

    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetail = response.email;
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    });
  }

  async formSubmit() {
    if (!this.maintForm.valid) {
      console.log('error');

      const toast = await this.toastCtrl.create({
        header: `Invalid input!!`,
        duration: 3000,
        position:'middle',
        color:"danger",
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });
      await toast.present();
      
      return false;
    } else {

      this.apiService.createBooking(this.maintForm.value,this.maintForm.value.name, this.userDetail).then(async res => {
        console.log(res);
        this.maintForm.reset();
        const toast = await this.toastCtrl.create({
          header: `Your problem has been received.`,
          duration: 3000,
          position:'middle',
          color:"success",
          buttons: [{
            text: 'Close',
            role: 'cancel'
          }]
        });
        await toast.present();
        this.router.navigate(['welcome']);
        
      })
        .catch(error => console.log(error));  
        
        

    }

  }


}
