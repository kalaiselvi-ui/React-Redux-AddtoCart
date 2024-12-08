const INIT_STATE = {
  carts: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        // Item already exists in the cart; increase its quantity
        const updatedCarts = [...state.carts]; // Create a copy of the carts array
        updatedCarts[itemIndex] = {
          ...updatedCarts[itemIndex], // Copy the current item
          qnty: updatedCarts[itemIndex].qnty + 1, // Increment quantity
        };
        console.log("Updated Carts:", updatedCarts);
        return {
          ...state,
          carts: updatedCarts, // Replace carts with the updated array
        };
      } else {
        const temp = { ...action.payload, qnty: 1 };
        console.log("Adding New Item:", temp);

        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }
    case "REMOVE_CART":
      console.log("Action payload:", action.payload);
      const data = state.carts.filter((item) => item.id !== action.payload);
      console.log("Updated Cart: ", data);

      return {
        ...state,
        carts: data,
      };

    case "REMOVE_ONE":
      const itemIndexDEC = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndexDEC >= 0) {
        const updatedCarts = [...state.carts]; // Create a copy of the carts array

        if (updatedCarts[itemIndexDEC].qnty > 1) {
          // Decrease quantity if greater than 1
          updatedCarts[itemIndexDEC] = {
            ...updatedCarts[itemIndexDEC],
            qnty: updatedCarts[itemIndexDEC].qnty - 1,
          };
        } else {
          // Remove item if quantity becomes 0
          updatedCarts.splice(itemIndexDEC, 1);
        }

        return {
          ...state,
          carts: updatedCarts,
        };
      }
      break;

    default:
      return state;
  }
};
