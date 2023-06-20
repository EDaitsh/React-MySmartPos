export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartCount = (state) => state.cart.cartItems.reduce((acumelator, currentValue) => acumelator + parseInt(currentValue.quantity), 0);

export const selectCartTotal =(state) => 
     state.cart.cartItems.reduce((total, item) => 
         total +((item.quantity * item.price) - (item.promotion? item.promotion.amount :0)),0)
