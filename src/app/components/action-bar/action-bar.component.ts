import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, output, viewChild} from '@angular/core';
import {debounceTime, fromEvent, map} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-action-bar',
  imports: [],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent implements AfterViewInit{

  searchChangeValue = viewChild<ElementRef>('inputSearch');
  addProductEmitter = output<string>();
  sortProductsEmitter = output<string>();
  searchProductsEmitter = output<string>();

  addProduct(): void {
    const newId = uuidv4();
    this.addProductEmitter.emit(newId);
  }

  onSortChange(event: string): void {
    this.sortProductsEmitter.emit(event);
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchChangeValue()?.nativeElement, 'input').pipe(
      map((event: unknown) => event as {target: {value: string}}),
      debounceTime(300),
    ).subscribe((event: {target: {value: string}}) => {
      const target = event.target.value;
      if(target)this.searchProductsEmitter.emit(event.target.value);
    });
  }
}
