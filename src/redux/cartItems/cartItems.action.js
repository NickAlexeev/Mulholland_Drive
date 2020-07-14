import cartItemsTypes from './cartItems.types';


export const action_newShoppingBagItem = (item) => ({
    type: cartItemsTypes.ADD_ITEM,
    payload: item
})
export const action_removeShoppingBagItem = (id) => ({
    type: cartItemsTypes.REMOVE_ITEM,
    payload: id
})
export const action_cartItemsNumber = () => ({
    type: cartItemsTypes.CART_ITEMS_NUMBER,
})
export const action_updateCartItem = (item) => ({
    type: cartItemsTypes.UPDATE_CART_ITEMS,
    payload: item
})
export const action_deliverTotalSum = (totalSum) => ({
    type: cartItemsTypes.TOTAL_SUM,
    payload: totalSum
})