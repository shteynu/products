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
  deleteProductEmitter = output<string>();
  onCardClickEmitter = output<IProduct>();

  deleteCard(event: MouseEvent, iProduct: IProduct): void {
    event.stopPropagation();
    this.deleteProductEmitter.emit(iProduct.id);

  }

  onCardClick(event: MouseEvent) {
    this.onCardClickEmitter.emit(this.product());
  }
}
