import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { ProductService } from "./product.service";
import { ProductResolved, ProductsResolved } from "./product";

export const productsResolver: ResolveFn<ProductsResolved> = 
    (): Observable<ProductsResolved> => {
        return inject(ProductService).getProducts().pipe(
            map(products => ({products})),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                console.error(message);
                return of({products: null, error: message})
            })
        );
    }

export const productResolver: ResolveFn<ProductResolved> = 
    (route: ActivatedRouteSnapshot): Observable<ProductResolved> => {
        const id = route.paramMap.get('id') || NaN;

        if (isNaN(+id)) {
            const message = `error id nan :${id}`
            console.error(message)
            return of({product: null, error: message});
        }

        return inject(ProductService).getProduct(+id).pipe(
            map(product => ({product})),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                console.error(message);
                return of({product: null, error: message})
            })
        );
    }