# MyStore

![MyStore](https://raw.githubusercontent.com/AlainD-/my-store/master/src/assets/logo-name.svg)

MyStore is a light e-commerce like front-end application, built with Angular.

The most significant list of features are:

- View the list of products available in the store
- View the details of a product
- Authorization:
  - Registration and Login
  - Add a product to the shopping cart
  - Modify the quantity to buy
  - Confirmation of the order
- Permissions:
  - An administration section allows admin-users only to manage the list of categories, products, orders and registererd users
- Routing:
  - Routes
  - Guards

## Getting started

### Pre-requisites: Backend server

This application has been developped to be working with the backend [StoreFront API](https://github.com/AlainD-/storefront-api).

Please refer to its [installation instructions](https://github.com/AlainD-/storefront-api#installation) to have that server up and running before running MyStore.

### Installation

Execute `npm install` or `npm i` from the root folder in order to install the required packages.

### Configuration

The url and port of the backend server is set in the files:

- `src/environments/environment.ts` for the localhost development server
- `src/environments/environment.prod.ts` for the production build

Update the value of `apiUrl` according to your installation in the [Pre-requistes](https://github.com/AlainD-/my-store#pre-requisites-backend-server) above.

Example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
};
```

### Run

You can start a local server of the application by running `npm start` or `ng serve`.
Navigate to `http://localhost:4200` in a browser to view it.

### Build

Run `npm run build` or `ng build` to build the project for production. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Authors

- **Alain D'EURVEILHER** - _Initial work_ - [AlainD.](https://github.com/AlainD-)
