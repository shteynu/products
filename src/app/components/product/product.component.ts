import {ChangeDetectionStrategy, Component, computed, input, output, signal} from '@angular/core';
import {IProduct} from '../../product-store';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  product = input.required<IProduct>()
  index = input.required<number>()
  imageScr = computed(() => `https://picsum.photos/seed/${this.product().id}/200/300`);
  productData = computed(() => this.product());
  deleteProductEmitter = output<string>()

  deleteCard(iProduct: IProduct): void {
    this.deleteProductEmitter.emit(iProduct.id);

  }
}
