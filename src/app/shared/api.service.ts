/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-restricted-imports */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject  } from '@angular/fire/compat/database';
import { Maintenance } from '../shared/Maintenance';



@Injectable({
  providedIn: 'root'
})


export class ApiService {

  

  productListRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;
  maintRef: AngularFireObject<any>;


  data=[];
  users: any;
  msgData: any;
  ref: any;
  profileUrl: any;
  images: any;

  constructor(private db: AngularFireDatabase) { }


  // Get Single
  getProduct(id: string) {
    this.productRef = this.db.object('/Brands/' + id);
    return this.productRef;
  }

  // Get List
  getProductList() {
    this.productListRef = this.db.list('/Brands');
    return this.productListRef;
  }

  //create maintenance request

  createBooking(maint: Maintenance, name, email) {
    //this.data=[];
    this.maintRef=this.db.object('Maintenance/'+name);
    return this.maintRef.set({
      brand: maint.brand,
      model: maint.model,
      year: maint.year,
      phone: maint.phone,
      description: maint.description,
      email: email
    
    });
  }

 


 


  

}
