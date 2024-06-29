import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { BACKEND_URI } from '~/API';
import { useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm';

const MyProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const isSeller = currentUser?.role === 'seller';

  useEffect(() => {
    fetchProducts();
  }, [accessToken]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URI}/product/get-products`,
        {},
        {
          headers: {
            accessToken: accessToken
          }
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBecomeSeller = async () => {
    try {
      await axios.post(
        `${BACKEND_URI}/user/update-user-field`,
        { field: 'role', value: 'seller' },
        { headers: { accessToken: accessToken } }
      );
      currentUser.role = 'seller';
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      window.location.reload();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleAddProduct = () => {
    setShowAddProductForm(true);
  };

  const handleCancelAddProduct = () => {
    setShowAddProductForm(false);
  };

  const handleProductAdded = () => {
    setShowAddProductForm(false);
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    console.log(newRow);
    console.log(oldRow);
    try {
      await axios.post(
        `${BACKEND_URI}/product/update-product`,
        { product: newRow },
        { headers: { accessToken: accessToken } }
      );
      return newRow;
    } catch (error) {
      console.error('Error updating product:', error);
      return oldRow;
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => <img src={params.value} alt={params.row.name} style={{ width: '50px', height: '50px' }} />, editable: true },
    { field: 'description', headerName: 'Description', width: 200, editable: true },
    { field: 'price', headerName: 'Price', width: 100, editable: true },
    { field: 'category', headerName: 'Category', width: 150, editable: true },
    { field: 'inventory', headerName: 'Inventory', width: 100, editable: true },
    { field: 'units_sold', headerName: 'Units Sold', width: 100 },
    { field: 'is_active', headerName: 'Active', width: 100, editable: true },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ];

  return (
    <Box sx={{ height: '100vh', width: '100%', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search…"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
        />
        <Box>
          {!isSeller && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBecomeSeller}
              sx={{ mr: 2 }}
            >
              Become Seller
            </Button>
          )}
          {isSeller && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          )}
        </Box>
      </Box>
      {showAddProductForm && isSeller && (
        <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, zIndex: 999 }}>
          <AddProductForm accessToken={accessToken} onProductAdded={handleProductAdded} onCancel={handleCancelAddProduct} />
        </Box>
      )}
      <DataGrid
        rows={filteredProducts}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={loading}
        getRowId={(row) => row._id}
        processRowUpdate={handleProcessRowUpdate}
      />
    </Box>
  );
};

export default MyProductPage;
