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
    switch (event) {
      case 'name':
        this.productList = signal(this.productList().sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'price':
        this.productList = signal(this.productList().sort((a, b) => a.price - b.price));
        break;
        default:
        this.productList = this.productStore.productList;
        break;
    }
  }

  onSearchChange(event: string): void {
    let word = event.trim().toLowerCase();
    const list = this.productStore.productList().filter(i => {
      const pName = i.name.toLowerCase().trim();
      return pName.includes(word)
    });
    if(word){
      this.productList = signal(list);
    } else {
      this.productList = this.productStore.productList;
    }
  }

  deleteProduct(event: string): void {
    this.productStore.deleteProductFromProductList(event);
    this.productList = this.productStore.productList;
  }

  saveProduct(event: IProduct): void {
    this.productStore.addOrEditProductToProductList(event);
  }
}
