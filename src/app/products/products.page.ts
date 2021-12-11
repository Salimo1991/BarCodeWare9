/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../shared/api.service';
import {Product} from '../shared/Product';
import { IonicAuthService } from '../ionic-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  Products = [];
  userDetail: string;

  constructor(
    private apiService: ApiService,
    private ionicAuthService: IonicAuthService,
    private router: Router,
    

  ) {
    
   }

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
  

    let productRes = this.apiService.getProductList();
    console.log('you are here1');
    productRes.snapshotChanges().subscribe(res => {
      this.Products = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Products.push(a as Product);

      });
    });
  }

  //fetchProducts() {
   // this.apiService.getProductList().valueChanges().subscribe(res => {
     // console.log(res);
  //  });
 // }


}
