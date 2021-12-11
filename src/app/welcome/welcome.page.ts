/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { IonicAuthService } from '../ionic-auth.service';
// import { AppointmentService } from '../appointment.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  userDetail: string;
  bookingRef: AngularFireStorage;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    // private aptService: AppointmentService
  ) { }

  ngOnInit() {
   
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

  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      });
  }

}
