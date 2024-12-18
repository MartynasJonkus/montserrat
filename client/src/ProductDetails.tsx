import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ProductDetails {
  id: number;
  title: string;
  price: { amount: number; currency: string };
  weight: number;
  weightUnit: string;
  status: string;
  tax: { id: number; title: string; percentage: number } | null;
  discount: { id: number; title: string; percentage: number } | null;
  variants: { size: string; price: number }[] | null;
}

interface Tax {
  id: number;
  title: string;
  percentage: number;
  status: string;
}

interface Discount {
  id: number;
  title: string;
  percentage: number;
  status: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<ProductDetails | null>(null);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

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
      setUpdatedProduct(data);  // Initialize the updatedProduct state
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Fetch available taxes and discounts
  const fetchTaxesAndDiscounts = async () => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const taxesResponse = await fetch(`http://localhost:5282/api/taxes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!taxesResponse.ok) {
        throw new Error('Failed to fetch taxes');
      }

      const taxesData = await taxesResponse.json();
      setTaxes(taxesData);

      const discountsResponse = await fetch(`http://localhost:5282/api/discounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!discountsResponse.ok) {
        throw new Error('Failed to fetch discounts');
      }

      const discountsData = await discountsResponse.json();
      setDiscounts(discountsData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
      fetchTaxesAndDiscounts();
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
    if (updatedProduct) { // Ensure updatedProduct is not null
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct!,
        [field]: field === 'price' 
          ? { ...prevProduct!.price, amount: parseFloat(e.target.value) } 
          : e.target.value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
    if (updatedProduct) { // Ensure updatedProduct is not null
      const selectedValue = e.target.value;
      if (field === 'tax') {
        const selectedTax = taxes.find(tax => tax.id.toString() === selectedValue) || null;
        setUpdatedProduct((prevProduct) => ({
          ...prevProduct!,
          tax: selectedTax,
        }));
      } else if (field === 'discount') {
        const selectedDiscount = discounts.find(discount => discount.id.toString() === selectedValue) || null;
        setUpdatedProduct((prevProduct) => ({
          ...prevProduct!,
          discount: selectedDiscount,
        }));
      }
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
      setProduct(updatedProduct);  // Update product with the new data
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
                  value={updatedProduct?.price.amount || ''}
                  onChange={(e) => handleInputChange(e, 'price')}
                />
              </div>
              <div>
                <label>Weight:</label>
                <input
                  type="number"
                  value={updatedProduct?.weight || ''}
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
              <div>
                <label>Tax:</label>
                <select 
                  value={updatedProduct?.tax?.id || ''}
                  onChange={(e) => handleSelectChange(e, 'tax')}
                >
                  <option value="">None</option>
                  {taxes.map(tax => (
                    <option key={tax.id} value={tax.id}>
                      {tax.title} ({tax.percentage}%)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Discount:</label>
                <select 
                  value={updatedProduct?.discount?.id || ''}
                  onChange={(e) => handleSelectChange(e, 'discount')}
                >
                  <option value="">None</option>
                  {discounts.map(discount => (
                    <option key={discount.id} value={discount.id}>
                      {discount.title} ({discount.percentage}%)
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <p><strong>Price:</strong> {product.price.amount.toFixed(2)} €</p>
              <p><strong>Weight:</strong> {product.weight} {product.weightUnit}</p>
              <p><strong>Status:</strong> {product.status}</p>
              <p><strong>Tax:</strong> {product.tax ? `${product.tax.title} (${product.tax.percentage}%)` : 'None'}</p>
              <p><strong>Discount:</strong> {product.discount ? `${product.discount.title} (${product.discount.percentage}%)` : 'None'}</p>
            </>
          )}

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
