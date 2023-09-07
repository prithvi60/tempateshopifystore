'use server';

import Cookies from 'js-cookie';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';

export const addItem = async (variantId: string | undefined): Promise<String | undefined> => {
  let cartId = Cookies.get('cartId');
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    Cookies.set('cartId', cartId);
  }

  if (!variantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
  } catch (e) {
    return 'Error adding item to cart';
  }
};

export const removeItem = async (lineId: string): Promise<String | undefined> => {
  const cartId = Cookies.get('cartId');

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return 'Error removing item from cart';
  }
};

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<String | undefined> => {
  const cartId = Cookies.get('cartId');

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
  } catch (e) {
    return 'Error updating item quantity';
  }
};
