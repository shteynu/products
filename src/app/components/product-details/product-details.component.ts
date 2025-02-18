import {ChangeDetectionStrategy, Component, effect, input, OnInit, output, signal} from '@angular/core';
import {IProduct} from '../../product-store';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {

  prodImg = input< string >('');
  product = input<IProduct | undefined>(undefined);
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
  });
  saveProduct = output<IProduct>();

  constructor() {
    effect(() => {
      const product = this.product();
      if(product) {
        this.setFormValues();
      }
    });
  }

  onSubmit(): void {
    const product = this.product();
    if(product && this.productForm.valid) {
      product.name = this.productForm.get('name')?.value || '';
      product.description = this.productForm.get('description')?.value || '';
      product.price = this.productForm.get('price')?.value || '';
      this.saveProduct.emit(product);
    }

  }

  private setFormValues() {
    this.productForm.setValue({
      name: this.product()?.name || '',
      description: this.product()?.description || '',
      price: this.product()?.price.toString() || '',
    });
  }


}
