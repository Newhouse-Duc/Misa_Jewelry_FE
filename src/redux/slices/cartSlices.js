import { createSlice } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (error) {
        console.error("Could not load cart", error);
        return [];
    }
};


const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (error) {
        console.error("Could not save cart", error);
    }
};

const calculateTotals = (items) => {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + item.totalPrice, 0);
    return { totalQuantity, totalAmount };
};
const initialState = {
    cartItems: loadCartFromLocalStorage(),
    isLoading: false,
    ...calculateTotals(loadCartFromLocalStorage()),

}


export const cartSlice = createSlice({


    name: 'cart',
    initialState,

    reducers: {
        addTocart(state, action) {
            const newitemcart = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newitemcart.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.cartItems.push({
                    id: newitemcart.id,
                    name: newitemcart.productName,
                    img: newitemcart.img,
                    price: newitemcart.price,
                    quantity: newitemcart.quantity,
                    totalPrice: newitemcart.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newitemcart.price;
            }
            const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
            state.totalQuantity = totalQuantity;
            state.totalAmount = totalAmount;
            saveCartToLocalStorage(state.cartItems);
        },

        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            }

            const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
            state.totalQuantity = totalQuantity;
            state.totalAmount = totalAmount;
            saveCartToLocalStorage(state.cartItems);
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            localStorage.removeItem('cart');
        },
        increasequantity(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
                const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
                state.totalQuantity = totalQuantity;
                state.totalAmount = totalAmount;
                saveCartToLocalStorage(state.cartItems);
            }
        },

        decreasequantity(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.price;
                }
                const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
                state.totalQuantity = totalQuantity;
                state.totalAmount = totalAmount;
                saveCartToLocalStorage(state.cartItems);
            }
        }

    },

    extraReducers: (builder) => {

    }


})



export const { addTocart, removeFromCart, clearCart, increasequantity, decreasequantity } = cartSlice.actions
export default cartSlice.reducer