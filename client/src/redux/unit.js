const initialState = {
  units: [],
  error: null,
  loading: true,
};

export const unit = (state = initialState, action) => {
  switch (action.type) {
    case "load/units/pending":
      return {
        ...state,
        loading: true,
      };

    case "load/units/fulfilled":
      return {
        ...state,
        error: "",
        loading: false,
        units: action.payload,
      };

    case "load/units/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "create/unit/pending":
      return {
        ...state,
        loading: true,
      };

    case "create/unit/fulfilled":
      return {
        ...state,
        error: "",
        loading: false,
        units: [...state.units, action.payload],
      };

    case "create/unit/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "edit/unit/pending":
      return {
        ...state,
        loading: true,
      };

    case "edit/unit/fulfilled":
      return {
        ...state,
        error: "",
        loading: false,
        units: state.units.map((unit) => {
          if (unit._id === action.payload._id) {
            unit = action.payload;
            return unit;
          }
          return unit;
        }),
      };

    case "edit/unit/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "remove/unit/pending":
      return {
        ...state,
        loading: true,
      };

    case "remove/unit/fulfilled":
      return {
        ...state,
        error: "",
        loading: false,
        units: state.units.filter((i) => i._id !== action.payload),
      };

    case "remove/unit/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
