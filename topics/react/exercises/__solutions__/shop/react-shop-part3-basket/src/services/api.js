import axios from 'axios';
import eventBus from 'pubsub-js';

import { ProductModel } from '../models/product';
import { BasketModel } from '../models/basket';
import { RequestError, NoConnectionError } from '../core/errors';

const instance = axios.create({
  timeout: 5000,
  baseURL: 'https://euri-test-api.now.sh/api',
});

const userKey = 'myKey1234';

// Add a request log interceptor
instance.interceptors.request.use(config => {
  console.log('config', config.url);
  return config;
});

// Add error transform interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (
      Object.prototype.hasOwnProperty.call(error.config, 'handleError') &&
      error.config.handleError === true
    ) {
      // the error will be handled locally
      return Promise.reject(error);
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      eventBus.publish('error', new RequestError(error.response, error.config.url));
    } else if (error.request) {
      // The request was made but no response was received
      // Typically there is a network error or no internet connection
      // console.log(error.request);
      eventBus.publish('error', new NoConnectionError());
    } else {
      // Something happened in setting up the request that triggered an Error
      eventBus.publish('error', error);
    }

    return Promise.reject(error);
  },
);
export default {
  base: instance,
  products: {
    getAll(page = 0, sortExpression = '') {
      const config = {
        params: {
          page: page.toString(),
          sort: sortExpression,
        },
      };
      return instance.get(`/products`, config).then(res => {
        const products = res.data.selectedProducts;
        products.total = res.data.total;
        return products.map(prod => {
          return new ProductModel(prod);
        });
      });
    },
    getById(id) {
      return instance.get(`products/${id}`).then(res => new ProductModel(res.data));
    },
    save(product) {
      if (product.isNew) {
        return instance.put(`products/${product.id}`, product);
      }
      return instance.post(`products`, product);
    },
  },
  basket: {
    get() {
      return instance.get(`basket/${userKey}`).then(res => new BasketModel(res.data));
    },
    addProduct(product, quantity) {
      return instance
        .post(`basket/${userKey}/product/${product.id}`, {
          quantity,
        })
        .then(res => res.data);
    },
    clear() {
      return instance.delete(`basket/${userKey}`);
    },
  },
};
