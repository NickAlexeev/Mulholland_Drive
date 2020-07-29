import React from 'react';
import { connect } from 'react-redux';
import './CartHeader.scss';
// import { selectNumberOfCartItems } from '../../../redux/cartItems/cartItems.selectors';
import { selectIsCurrentUserLoggedIn } from '../../../redux/user/users.selectors';

function CartHeader(props) {
    const { currentUser, cartItemsNumber } = props;
    console.log('~~~~~~~~~~~~~~~ShoppingBag Header.jsx~~~~~~~~~~~~~~~')
    return (
        <React.Fragment>
            <div className="sb-header">
                <div className="sb-upper-header">
                    <div className="flex-grow-1">
                        <h2>{currentUser ? `Welcome ${currentUser.name}` : 'You are not logged in'}</h2>
                    </div>
                    <div className="welcome-message shrink">
                        <h4>Shopping Bag
                        <span>{cartItemsNumber} items</span>
                        </h4>

                    </div>
                </div>
                <div className="sb-header-description">
                    <p className="flex-grow-1">Item</p>
                    <div className="shrink">
                        <span>Price</span>
                        <span>Quantity</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    console.log('!!!!!!mapStateToProps-Cart-Header!!!!!!!');
    return {
        currentUser: selectIsCurrentUserLoggedIn(state),
        cartItemsNumber: state.cartItems.shoppingBagItems.reduce(
            (acc, currentQuantityOfItems) => acc + currentQuantityOfItems.quantity, 0)
    }
}



export default connect(mapStateToProps, null)(CartHeader)