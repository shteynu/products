import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';

export const ProductListMock: IProduct[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Product 1 description',
    price: 5,
    creationDate: new Date().toISOString()

  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Product 2 description',
    price: 6,
    creationDate: new Date().toISOString()

  },
  {
    id: '3',
    name: 'Product 3',
    description: 'Product 3 description',
    price: 7,
    creationDate: new Date().toISOString()
  }
]


export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  creationDate: string;
}

interface IProductState {
  productList: IProduct[];
  activeProductId: string
}

const initialState: IProductState = {
  productList: ProductListMock,
  activeProductId: ''
}

export const ProductStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withMethods((store)=>({
    setProductList(list: IProduct[] | []): void {
      patchState(store, {
        productList: list,
      })
    },

    addOrEditProductToProductList(product: IProduct): void {
      const existingProduct = store.productList().find(i => i.id === product.id);
      if(existingProduct) {
        this.editProductToProductList(product);
      } else {
        this.addProductToProductList(product);
      }
    },

    addProductToProductList(product: IProduct): void {
      const list: IProduct[] = store.productList();
      list.push(product);
      patchState(store, {
        productList: list,
      })
    },

    editProductToProductList(product: IProduct): void {
      const list: IProduct[] = store.productList().filter(i => i.id !== product.id);
      list.push(product);
      patchState(store, {
        productList: list,
      })
    },

    deleteProductFromProductList(productId: string): void {
      patchState(store, {
        productList: [...store.productList().filter(i => i.id !== productId)],
      })
    }

  }))
)


