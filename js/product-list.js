class ProductList {
    constructor(cart) {
        this.cart = cart;
        this.container = document.querySelector('.products_box');
        this.productService = new ProductsService();
        this.productService
            .getProducts()
            .then(() => this.renderProducts())
            .then(() => this.addEventListeners());
    }
    async renderProducts() {
        let productListDomString = '';
        const products = await this.productService.getProducts();
        products.forEach(product => {
            productListDomString +=
                `<div class="card product">
                    <div class="product__img" data-id="${product.id}">
                        <img src="img/web/shoes/${product.image}" alt="${product.title}" data-toggle="modal" data-target="#productInfoModal" data-id="${product.id}">
                    </div>
                    <div class="product__details">
                        <div class="product__details__price">
                            <p class="price">$${product.price}</p>
                            <div data-id="${product.id}">
                                <div class="d-flex justify-content-around">
                                    <button class="plus buy" data-id="${product.id}">
                                       <span data-id="${product.id}">+</span> <i class="fas fa-shopping-bag" data-id="${product.id}"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="product__details__name">
                            <h4>${product.title}</h4>
                            <p>${product.subtitle}</p>
                        </div>
                    </div>
                </div>`;
        });
        this.container.innerHTML = productListDomString;
    }
    addEventListeners() {
        document
            .querySelectorAll('.product .product__img')
            .forEach(button =>
                button.addEventListener('click', event =>
                    this.handleProductInfoClick(event)
                )
            );
        document
            .querySelectorAll(
                '.card.product button.buy, #productInfoModal button.buy'
            )
            .forEach(button =>
                button.addEventListener('click', event =>
                    this.handleProductBuyClick(event)
                )
            );
    }
    async handleProductInfoClick(event) {
        const button = event.target; // Button that triggered the modal
        const id = button.dataset.id; // Extract info from data-* attributes
        const product = await this.productService.getProductById(id);
        const modal = document.querySelector('#productInfoModal');
        const productImg = modal.querySelector('.modal-body .card-img-top');
        productImg.setAttribute('src', 'img/web/shoes/' + product.image);
        productImg.setAttribute('alt', product.title);
        modal.querySelector('.modal-body .card-title').innerText = product.title;
        modal.querySelector('.modal-body .card-text').innerText =
            product.description;
        const btnBuy = modal.querySelector('button.buy');
        btnBuy.innerText = `$${product.price} - Buy`;
        btnBuy.dataset.id = id;
    }
    handleProductBuyClick(event) {
        const button = event.target;
        const id = button.dataset.id;
        this.cart.addProduct(id);
        window.showAlert('Product added to cart');
    }
}
