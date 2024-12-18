import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ProductDetails {
  id: number;
  title: string;
  price: { amount: number; currency: string };
  weight: number;
  weightUnit: string;
  status: string;
  tax: { name: string; rate: number } | null;
  discount: { name: string; amount: number } | null;
  variants: { size: string; price: number }[] | null;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<ProductDetails | null>(null);

  // Fetch the details of the selected product
  const fetchProductDetails = async (productId: string) => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch product details');
      }

      const data = await response.json();
      setProduct(data);
      setUpdatedProduct(data); // Initialize the updatedProduct state
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedProduct(product); // Reset to original product details
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (updatedProduct) {
      setUpdatedProduct((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [field]:
            field === 'price'
              ? { ...prev.price, amount: parseFloat(e.target.value) }
              : e.target.value,
        };
      });
    }
  };

  const handleSaveChanges = async () => {
    if (!updatedProduct) return;

    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      setIsEditing(false);
      setProduct(updatedProduct); // Update product with the new data
      alert('Product updated successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Product Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      {product ? (
        <div>
          <h2>{isEditing ? 'Edit Product' : product.title}</h2>
  
          <p><strong>ID:</strong> {product.id}</p>
  
          {isEditing ? (
            <>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={updatedProduct?.title || ''}
                  onChange={(e) => handleInputChange(e, 'title')}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={updatedProduct?.price?.amount || 0}
                  onChange={(e) => handleInputChange(e, 'price')}
                />
              </div>
              <div>
                <label>Weight:</label>
                <input
                  type="number"
                  value={updatedProduct?.weight || 0}
                  onChange={(e) => handleInputChange(e, 'weight')}
                />
              </div>
              <div>
                <label>Weight Unit:</label>
                <input
                  type="text"
                  value={updatedProduct?.weightUnit || ''}
                  onChange={(e) => handleInputChange(e, 'weightUnit')}
                />
              </div>
              <div>
                <label>Status:</label>
                <input
                  type="text"
                  value={updatedProduct?.status || ''}
                  onChange={(e) => handleInputChange(e, 'status')}
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Price:</strong> {product.price.amount.toFixed(2)} €</p>
              <p><strong>Weight:</strong> {product.weight} {product.weightUnit}</p>
              <p><strong>Status:</strong> {product.status}</p>
            </>
          )}
  
          {/* Tax Info */}
          <div>
            <h3>Tax</h3>
            {product.tax ? (
              <p><strong>{product.tax.name}:</strong> {product.tax.rate}%</p>
            ) : (
              <p><strong>Tax:</strong> Not available</p>
            )}
          </div>
  
          {/* Discount Info */}
          <div>
            <h3>Discount</h3>
            {product.discount ? (
              <p><strong>{product.discount.name}:</strong> {product.discount.amount} €</p>
            ) : (
              <p><strong>Discount:</strong> Not available</p>
            )}
          </div>
  
          {/* Edit and Save/Cancel buttons */}
          {isEditing ? (
            <>
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
  
};

export default ProductDetails;
