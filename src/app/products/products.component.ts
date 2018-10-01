import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { PRODUCTSDATA } from '../mock-products';
import { Observable } from 'rxjs';
import { Product } from '../product'; 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
 
export class ProductsComponent implements OnInit {
 
  products : any;
  items :any;
  inv :any;
  constructor(private apiService: ApiService) { }
 
  ngOnInit() {
    this.apiService.getProducts()
    .subscribe(
      data => {
        this.items = data;
        let evilResponseProps = Object.values(this.items.data.inventories);
        evilResponseProps.forEach(inventory => {  
          this.items = inventory;
          this.items.images = "https://pandayg-images.azureedge.net/thumbs245/"+this.items.images[0];
        });
        this.products = evilResponseProps;
      },
      error => {
          console.log("Error", error);
      });
  }
}