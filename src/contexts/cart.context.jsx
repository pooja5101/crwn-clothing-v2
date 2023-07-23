import { createContext, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    //check if product already added
    const existingCartItem = cartItems.find(item => item.id === productToAdd);

    //if found increase quantity
    if (existingCartItem) {
    return cartItems.map((cartItem) => 
         cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity+1} : cartItem
    );
    }

    //return new array with modified cartItems / new cartItems
    return [...cartItems, {...productToAdd, quantity: 1}];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () =>{},
  cartItems: [],
  addCartItems: () =>{},
});

export const CartProvider =({children}) =>{
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState();

   const addItemToCart =(productToAdd)=>{
       setCartItems(addCartItem(cartItems,productToAdd));
   }
   const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};
   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};