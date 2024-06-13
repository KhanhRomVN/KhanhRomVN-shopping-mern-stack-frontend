export const initialState = {
  user: null,
  showForm: false,
  formData: {
    name: '',
    price: '',
    discount: '',
    category: '',
    image: null,
  },
  products: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'TOGGLE_FORM':
      return { ...state, showForm: !state.showForm }
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } }
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }
    default:
      return state
  }
}
