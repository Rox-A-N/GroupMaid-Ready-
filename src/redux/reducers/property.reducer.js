const propertyReducer = (state = [], action) => {
    if (action.type === 'SET_PROPERTIES') {
        return action.payload;
      }
      return state;
  };
  
  export default propertyReducer;