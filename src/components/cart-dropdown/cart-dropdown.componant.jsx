import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.componant';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
          <div className='cart-items'>
          { cartItems.length ? (
            cartItems.map((item) => {
            <CartItem key={item.id} cartItem={item}/>
          })) : (
            <span className='empty-message'>Your cart is Empty</span>
          )
          }
          </div>
          <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;