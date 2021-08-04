export function calcSubPrice(product){
    return product.count * product.item.price
}

export function calcTotalPrice(products) {
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.subPrice
    });
    return totalPrice;
}


export function getCountProductsInCart(){
    let cart = JSON.parse(localStorage.getItem('cart'))
    return cart ? cart.products.length : 0
}