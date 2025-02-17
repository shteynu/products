import {ChangeDetectionStrategy, Component, inject, signal, Signal} from '@angular/core';
import {IProduct, ProductStore} from './product-store';
import {ProductComponent} from './components/product/product.component';
import {ActionBarComponent} from './components/action-bar/action-bar.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

@Component({
  selector: 'app-root',
  imports: [
    ProductComponent,
    ActionBarComponent,
    ProductDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public detailsOpen = signal<boolean>(false);

  private productStore = inject(ProductStore);
  private productList = this.productStore.productList();



  public getProductList(): IProduct[] {
    return this.productList;
  }

  selectProduct(product: IProduct): void {
    console.log(product);
    this.detailsOpen.set(!this.detailsOpen());

  }

  addProduct(event: string): void {
    console.log(event);

  }

  onSortChange(event: string): void {
    console.log(event);

  }

  onSearchChange(event: string): void {
    console.log(event);
  }

  deleteProduct(event: string): void {
    console.log(event)
  }
}
