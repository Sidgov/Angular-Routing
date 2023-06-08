import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  pageTitle = 'Product Detail';
  product: Product | null = null;
  errorMessage = '';

  constructor(private route: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        const retrievedData: ProductResolved = data['product'];
        this.errorMessage = retrievedData.error || '';
        if (retrievedData.product) this.onProductRetrieved(retrievedData.product);
      },
      error: (err) => {
        
      },
    })
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
