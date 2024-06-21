import axios from 'axios'

// export const BACKEND_URI = 'https://salesobe.onrender.com'
export const BACKEND_URI = 'http://localhost:8080'

// authAPI
export const loginAPI = `${BACKEND_URI}/auth/login`
export const registerAPI = `${BACKEND_URI}/auth/register`

// productAPI
export const getProducts = async (accessToken) => {
  try {
    const response = await axios.post(
      `${BACKEND_URI}/product/get-products`,
      {},
      {
        headers: {
          accessToken: accessToken,
        },
      },
    )
    return response.data.products
  } catch (error) {
    console.error('Error fetching products:', error.message)
    throw error
  }
}

export const addProduct = async (accessToken, productData) => {
  try {
    const response = await axios.post(`${BACKEND_URI}/product/add-product`, productData, {
      headers: {
        accessToken: accessToken,
        'Content-Type': 'application/json',
      },
    })
    return response.data // Return whatever response structure your API returns
  } catch (error) {
    console.error('Error adding product:', error.message)
    throw error
  }
}

export const updateRole = async (accessToken) => {
  try {
    const response = await axios.post(
      `${BACKEND_URI}/user/update-role`,
      {},
      {
        headers: {
          accessToken: accessToken,
        },
      },
    )
    return response.data // Return whatever response structure your API returns
  } catch (error) {
    console.error('Error updating user role:', error.message)
    throw error
  }
}
