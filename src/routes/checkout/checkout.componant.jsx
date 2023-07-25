import './checkout.styles.scss';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const Checkout = () =>{
    const {cartItems, addItemToCart} = useContext(CartContext);

   return (
    <div>
        <h1>This is your checkout page.</h1>
        <h2>Keep Shopping</h2>
        <div>
            {
                cartItems.map((cartItem) =>{
                    const {id, name, quantity} = cartItem;
                    return (
                        <div key={id}> 
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <br />
                            <span>Decrement</span>
                            <span onClick={()=> addItemToCart(cartItem)}>Increment</span>
                        </div>
                    )
                })
            }
        </div>
    </div>
   );
};

export default Checkout;