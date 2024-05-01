import * as cartRepository from "../localStorage/cart-repository";
import { Order, OrderItem } from "../types/order";
import { Product } from "../types/product";

export function saveCart(cart: Order) {
  cartRepository.save(cart);
}

export function getCart(): Order {
  return cartRepository.get();
}

export function addProduct(product: Product) {
  const cart = cartRepository.get();
  const item = cart.items.find((x) => x.productId === product.id);
  if (!item) {
    const newItem = new OrderItem(
      product.id,
      1,
      product.name,
      product.price,
      product.imageUrl
    );
    cart.items.push(newItem);
    cartRepository.save(cart);
  }
}

export function increaseItem(productId: number) {
  const cart = cartRepository.get();
  const item = cart.items.find((x) => x.productId === productId);
  if (item) {
    item.quantity++;
  }
  cartRepository.save(cart);
}

export function decreaseItem(productId: number) {
  const cart = cartRepository.get();
  const item = cart.items.find((x) => x.productId === productId);
  if (item) {
    item.quantity--;
    if (item.quantity < 1) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
    }
    cartRepository.save(cart);
  }
}

export function clearCart() {
  cartRepository.remove();
}
