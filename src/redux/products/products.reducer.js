
import getProductsTypes from './products.types';

const INITIAL_STATE = {
    productCategory: [],
    storedProducts: [],
    isFetching: false,
    errorMessage: ''
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case getProductsTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true
            }
        case getProductsTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                storedProducts: action.payload
            }
        case getProductsTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case getProductsTypes.ADD_PRODUCT_CATEGORY:
            return {
                ...state,
                productCategory: action.payload
            }

    }
    return state
}

export default productsReducer