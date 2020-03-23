class ProductsService {
    constructor() {
        if (!ProductsService._instance) ProductsService._instance = this;
        return ProductsService._instance;
    }
    async getProducts() {
        if (!this.products) {
            const response = await fetch('products.json');
            const data = await response.json();
            data.sort( (a, b) => a.price - b.price );
            this.products = data;
        }
        return this.products;
    }
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find( product => product.id === id );
    }
}
