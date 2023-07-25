import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.componant';

const CartDropdown = () => {
    const {cartItems, isCartOpen, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
       navigate('/checkout');
       setIsCartOpen(false);
    };

    return (
        <div className='cart-dropdown-container'>
          <div className='cart-items'>
          {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
          </div>
          <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;