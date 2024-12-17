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
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  return (
    <div>
      <h1>Product Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {product ? (
        <div>
          <h2>{product.title}</h2>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Price:</strong> {product.price.amount.toFixed(2)} €</p>
          <p><strong>Weight:</strong> {product.weight} {product.weightUnit}</p>
          <p><strong>Status:</strong> {product.status}</p>

          {/* Tax Information */}
          {product.tax && (
            <div>
              <h3>Tax</h3>
              <p><strong>{product.tax.name}:</strong> {product.tax.rate}%</p>
            </div>
          )}

          {/* Discount Information */}
          {product.discount && (
            <div>
              <h3>Discount</h3>
              <p><strong>{product.discount.name}:</strong> {product.discount.amount} €</p>
            </div>
          )}

          {/* Variants Information */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3>Variants</h3>
              <ul>
                {product.variants.map((variant, index) => (
                  <li key={index}>
                    <p><strong>Size:</strong> {variant.size} | <strong>Price:</strong> {variant.price.toFixed(2)} €</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
