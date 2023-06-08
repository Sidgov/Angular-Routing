import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ProductEditComponent } from "./product-edit.component";
import { Observable } from "rxjs";

export const productEditCanDeactivate: CanDeactivateFn<ProductEditComponent> = (
    component: ProductEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean => {
    
    if (component.isDirty) {
      const productName = component.product?.productName || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`)
    }
    return true;
  }
