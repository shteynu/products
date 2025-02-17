import {Component, input, signal} from '@angular/core';
import {IProduct} from '../../product-store';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  prodImg = input<string>('');
  product = input<IProduct | null>(null);

}
