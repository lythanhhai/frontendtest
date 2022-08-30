const initialState = {
  listSelectedCode: [],
  listSelectedName: [],
};

const getSelectedPrefCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getSelectedPrefCodeAction":
      return {
        ...state,
        listSelectedCode: action.payload,
      };
    case "getSelectedPrefNameAction":
      return {
        ...state,
        listSelectedName: action.payload,
      };
    default:
      return state;
  }
};

export default getSelectedPrefCodeReducer;
