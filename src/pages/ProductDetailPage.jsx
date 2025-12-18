import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import ImageGallery from '../components/ImageGallery';
import AdditionalInformation from '../components/AdditionalInformation';
import TechnicalDataTable from '../components/TechnicalDataTable';
import CertificatesSection from '../components/CertificatesSection';
import AccessoryButton from '../components/AccessoryButton';
import AddToNotepad from '../components/AddToNotepad';
import PriceContainer from '../components/PriceContainer';
import CopperPriceMarquee from '../components/CopperPriceMarquee';
import PageHeader from '../components/PageHeader';

import { API_BASE_URL } from '../config/api';

/**
 * ProductDetailPage Component
 * Main product detail page with all product information
 * Fetches product data from MongoDB API
 */
function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  // Default to first product or use productId from URL
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        let response;
        
        // If productId is provided, fetch that specific product
        // Otherwise, fetch all products and use the first one
        if (productId) {
          response = await fetch(`${API_BASE_URL}/products/${productId}`);
        } else {
          response = await fetch(`${API_BASE_URL}/products`);
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            // Use first product if no specific ID provided
            const firstProduct = data.data[0];
            response = await fetch(`${API_BASE_URL}/products/${firstProduct._id}`);
          } else {
            throw new Error('No products available');
          }
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setArticleData(data.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // Prepare product object for notepad
  const productForNotepad = articleData ? {
    id: articleData._id,
    partNumber: articleData.partNumber,
    name: articleData.fullName || articleData.name,
    description: articleData.description,
    fullDescription: articleData.fullDescription || articleData.description,
  } : null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <CopperPriceMarquee />
        <PageHeader />
        <div className="px-6 pb-8" style={{ paddingTop: '104px' }}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-gray-600">Loading product...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !articleData) {
    return (
      <div className="min-h-screen bg-white">
        <CopperPriceMarquee />
        <div className="pt-[40px] py-8 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-red-600 mb-4">{error || 'Product not found'}</div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Copper Price Marquee Banner - Fixed at top-center, visible while scrolling */}
      <CopperPriceMarquee />
      
      {/* Page Header with Login */}
      <PageHeader />
      
      {/* Add padding-top to account for fixed marquee (40px) + header height (~64px) */}
      <div className="px-6 pb-8" style={{ paddingTop: '104px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Product Info Section */}
          <ProductInfo articleData={articleData} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Images */}
            <div className="lg:col-span-1">
              <ImageGallery />
            </div>

            {/* Middle Column - Additional Information */}
            <div className="lg:col-span-1">
              <AdditionalInformation />
              {/* Price Container - Separate container below Additional Information */}
              <PriceContainer articleData={articleData} />
            </div>

            {/* Right Column - Technical Data */}
            <div className="lg:col-span-1">
              <TechnicalDataTable />
            </div>
          </div>

          {/* Certificates Section - Below Images and Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <CertificatesSection />
            </div>
          </div>

          {/* Bottom Section - Accessory and Add to Notepad */}
          <div className="flex items-center justify-between mt-6">
            <AccessoryButton />
            {productForNotepad && (
              <AddToNotepad
                product={productForNotepad}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                unitPrice={articleData.price}
                currency={articleData.currency || 'AED'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
