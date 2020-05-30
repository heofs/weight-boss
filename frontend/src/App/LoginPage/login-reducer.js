export const initialState = {
  selection: 'login',
  email: { value: '', valid: true },
  password: { value: '', valid: true },
  password2: { value: '', valid: true },
  remember: false,
  message: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleRemember':
      return { ...state, remember: !state.remember };
    case 'setMessage':
      return { ...state, message: action.payload };
    case 'setEmail':
      return {
        ...state,
        email: {
          value:
            action.payload.value !== undefined
              ? action.payload.value
              : state.email.value,
          valid:
            action.payload.valid !== undefined ? action.payload.valid : true,
        },
      };
    case 'setPassword':
      return {
        ...state,
        password: {
          value:
            action.payload.value !== undefined
              ? action.payload.value
              : state.password.value,
          valid:
            action.payload.valid !== undefined ? action.payload.valid : true,
        },
      };
    case 'setPassword2':
      return {
        ...state,
        password: { ...state.password, valid: true },
        password2: { value: action.payload.value, valid: true },
      };
    case 'allValid':
      return {
        ...state,
        email: { ...state.email, valid: action.payload },
        password: { ...state.password, valid: action.payload },
      };
    case 'setSelection':
      return {
        ...state,
        selection: action.payload.selection || action.payload,
        message:
          action.payload.message !== undefined ? action.payload.message : false,
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};
