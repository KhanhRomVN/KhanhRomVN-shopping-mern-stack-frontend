import axios from 'axios'

export const BACKEND_URI = 'https://salesobe.onrender.com'
// export const BACKEND_URI = 'http://localhost:8080'

// authAPI
export const loginAPI = `${BACKEND_URI}/auth/login`
export const registerAPI = `${BACKEND_URI}/auth/register`

// productAPI
export const fetchProducts = async (accessToken) => {
  try {
    const response = await axios.post(`${BACKEND_URI}/product/products`, {}, { headers: { accessToken } })
    return response.data.products
  } catch (error) {
    throw new Error('Error fetching products')
  }
}

export const addProduct = async (accessToken, productData) => {
  try {
    const response = await axios.post(`${BACKEND_URI}/product/add-product`, productData, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
    })
    return response
  } catch (error) {
    throw new Error('Error adding product')
  }
}

export const updateUserRole = async (accessToken) => {
  try {
    const response = await axios.post(
      `${BACKEND_URI}/user/update-role`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken,
        },
      },
    )
    return response
  } catch (error) {
    throw new Error('Error updating user role')
  }
}
