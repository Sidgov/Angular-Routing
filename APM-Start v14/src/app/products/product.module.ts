import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { productResolver, productsResolver } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { authCanActivate } from '../user/auth.guard';
import { productEditCanDeactivate } from './product-edit/product-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
        resolve: { products: productsResolver },
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { product: productResolver }
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: { product: productResolver },
        canDeactivate: [productEditCanDeactivate],
        children: [
          {
            path: '', redirectTo: 'info', pathMatch: 'full'
          },
          {
            path: 'info', component: ProductEditInfoComponent
          },
          {
            path: 'tags', component: ProductEditTagsComponent
          }
        ]
      },
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule { }
