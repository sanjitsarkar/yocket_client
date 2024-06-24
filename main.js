class Product {
  _products = []
  _addedProducts = []
  _filteredProducts = {}
  _budget = 500;
  _allowedCategories = ["electronics",
    "jewelry",
    "men's clothing",
    "women's clothing"]
  async fetchProducts() {
    try {
      let response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
      response = await response.json()
      this._products = response

    }
    catch (error) {
      throw new Error(error)
    }
  }

  checkout() {

    this._products.forEach((product) => {
      if (this._allowedCategories.includes(product.category)) {
        if (!this._filteredProducts[product.category]) {
          this._filteredProducts[product.category] = [product]
        }
        else {
          this._filteredProducts[product.category].push(product);

        }
      }
    })

    // this._products.filter(each => this._allowedCategories.includes(each.category)).forEach((product) => {



    //   if (this._budget < product.price) {
    //     return this._addedProducts;
    //   }

    //   this._addedProducts = [...this._addedProducts, product]
    //   this._budget -= product.price;


    // })
  }


  get products() {
    return this._products
  }

}

const product = new Product();
(async () => {

  await product.fetchProducts()
  product.checkout()

})()