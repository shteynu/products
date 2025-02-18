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

  detailsOpen = signal<boolean>(false);
  selectedProduct = signal<{ product: IProduct, imgSrc: string } | null>(null);
  productStore = inject(ProductStore);
  productList = this.productStore.productList;


  private deleted = false;


  selectProduct(product: IProduct, imgSrc: string): void {
        if (this.selectedProduct()?.product.id === product.id) {
          this.detailsOpen.set(!this.detailsOpen());
        } else {
          this.detailsOpen.set(true);
          this.selectedProduct.set({product, imgSrc});
        }
  }

  addProduct(event: string): void {
    const newProduct: IProduct = {
      id: event,
      name: '',
      description: '',
      price: 0,
      creationDate: new Date().toISOString()
    }
    this.selectProduct(newProduct, `https://picsum.photos/seed/${newProduct.id}/200/300`);
  }

  onSortChange(event: string): void {
    console.log(event);

  }

  onSearchChange(event: string): void {
    console.log(event);
  }

  deleteProduct(event: string): void {
    this.productStore.deleteProductFromProductList(event);
    console.log(this.productStore.productList());
  }

  saveProduct(event: IProduct): void {
    this.productStore.addOrEditProductToProductList(event);
    console.log(this.productStore.productList());

  }
}
