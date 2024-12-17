import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: { amount: number; currency: string };
  status: string;
  weight: number;
  weightUnit: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: { amount: 0, currency: '' },
    weight: 0,
    weightUnit: '',
    status: 0, 
  });

  const fetchProducts = async () => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5282/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    }
  };
  const navigate = useNavigate(); 

  const handleViewDetailsClick = (product: Product) => {
    navigate(`/product-details/${product.id}`);
  };
  

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    const newProductData = {
      categoryId: null, 
      discountId: null, 
      taxId: null, 
      title: newProduct.title,
      price: {
        amount: newProduct.price.amount,
        currency: 0, 
      },
      weight: newProduct.weight,
      weightUnit: newProduct.weightUnit,
      status: newProduct.status, 
    };

    console.log('Product data being sent:', newProductData);  
    try {
      const response = await fetch('http://localhost:5282/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      setNewProduct({
        title: '',
        price: { amount: 0, currency: '' },
        weight: 0,
        weightUnit: '',
        status: 0,
      });

      fetchProducts(); 
      alert('Product added successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      fetchProducts(); 
      alert('Product deleted successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Product List */}
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Weight</th>
              <th>Weight Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price.amount.toFixed(2)} €</td>
                <td>{product.status}</td>
                <td>{product.weight}</td>
                <td>{product.weightUnit}</td>
                <td>
                  <button onClick={() => handleViewDetailsClick(product)}>View Details</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}

      {/* Product Details Section */}
      {viewProduct && (
        <div>
          <h2>Product Details</h2>
          <p><strong>ID:</strong> {viewProduct.id}</p>
          <p><strong>Title:</strong> {viewProduct.title}</p>
          <p><strong>Price:</strong> {viewProduct.price.amount.toFixed(2)} {viewProduct.price.currency}</p>
          <p><strong>Status:</strong> {viewProduct.status}</p>
          <p><strong>Weight:</strong> {viewProduct.weight}</p>
          <p><strong>Weight Unit:</strong> {viewProduct.weightUnit}</p>
        </div>
      )}

      {/* Add Product Form */}
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProductSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={newProduct.price.amount}
            onChange={(e) => setNewProduct({ ...newProduct, price: { ...newProduct.price, amount: parseFloat(e.target.value) } })}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={newProduct.weight}
            onChange={(e) => setNewProduct({ ...newProduct, weight: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Weight Unit:</label>
          <input
            type="text"
            value={newProduct.weightUnit}
            onChange={(e) => setNewProduct({ ...newProduct, weightUnit: e.target.value })}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="number"
            value={newProduct.status}
            onChange={(e) => setNewProduct({ ...newProduct, status: parseInt(e.target.value) })}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductManagement;
