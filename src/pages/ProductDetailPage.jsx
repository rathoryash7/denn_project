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
        setError(null);
        let response;
        
        // If productId is provided, fetch that specific product
        // Otherwise, fetch all products and use the first one
        if (productId) {
          try {
            response = await fetch(`${API_BASE_URL}/products/${productId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } catch (fetchError) {
            console.error('❌ DETAILED FETCH ERROR:');
            console.error('  Error Name:', fetchError.name);
            console.error('  Error Message:', fetchError.message);
            console.error('  Error Type:', typeof fetchError);
            console.error('  API URL:', `${API_BASE_URL}/products/${productId}`);
            console.error('  Frontend Origin:', window.location.origin);
            console.error('  Backend URL:', API_BASE_URL);
            
            let detailedMsg = `Network Error: ${fetchError.message}\n\n`;
            detailedMsg += `Error Type: ${fetchError.name}\n`;
            detailedMsg += `API URL: ${API_BASE_URL}/products/${productId}\n`;
            detailedMsg += `Frontend: ${window.location.origin}\n`;
            detailedMsg += `Backend: ${API_BASE_URL}\n\n`;
            detailedMsg += `Possible Causes:\n`;
            detailedMsg += `1. CORS not configured - Backend blocking requests from ${window.location.origin}\n`;
            detailedMsg += `2. Backend unreachable - Check if ${API_BASE_URL} is accessible\n`;
            detailedMsg += `3. Network issue - Check internet connection\n\n`;
            detailedMsg += `Solution: Update backend CORS to allow ${window.location.origin}`;
            throw new Error(detailedMsg);
          }
        } else {
          console.log('🔍 DEBUG: Fetching products');
          console.log('📍 API URL:', `${API_BASE_URL}/products`);
          console.log('🌐 API_BASE_URL:', API_BASE_URL);
          console.log('🌍 Frontend Origin:', window.location.origin);
          
          try {
            response = await fetch(`${API_BASE_URL}/products`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log('✅ Fetch completed');
            console.log('📊 Status:', response.status, response.statusText);
            const corsHeader = response.headers.get('Access-Control-Allow-Origin');
            console.log('🔐 CORS Header:', corsHeader || '❌ MISSING - CORS NOT CONFIGURED!');
          } catch (fetchError) {
            console.error('❌ DETAILED FETCH ERROR:');
            console.error('  Error Name:', fetchError.name);
            console.error('  Error Message:', fetchError.message);
            console.error('  Error Type:', typeof fetchError);
            console.error('  API URL:', `${API_BASE_URL}/products`);
            console.error('  Frontend Origin:', window.location.origin);
            console.error('  Backend URL:', API_BASE_URL);
            console.error('  Full Error:', fetchError);
            
            const isCorsError = fetchError.message.includes('CORS') || 
                               fetchError.message.includes('fetch') ||
                               fetchError.name === 'TypeError';
            
            let detailedMsg = `Network Error: ${fetchError.message}\n\n`;
            detailedMsg += `═══════════════════════════════════════\n`;
            detailedMsg += `ERROR DETAILS\n`;
            detailedMsg += `═══════════════════════════════════════\n\n`;
            detailedMsg += `Error Type: ${fetchError.name}\n`;
            detailedMsg += `Error Message: ${fetchError.message}\n\n`;
            detailedMsg += `API URL: ${API_BASE_URL}/products\n`;
            detailedMsg += `Frontend Origin: ${window.location.origin}\n`;
            detailedMsg += `Backend URL: ${API_BASE_URL}\n\n`;
            
            if (isCorsError) {
              detailedMsg += `🚨 CORS ERROR DETECTED!\n\n`;
              detailedMsg += `The backend at ${API_BASE_URL} is BLOCKING requests\n`;
              detailedMsg += `from your frontend at ${window.location.origin}\n\n`;
              detailedMsg += `═══════════════════════════════════════\n`;
              detailedMsg += `SOLUTION - UPDATE BACKEND CORS\n`;
              detailedMsg += `═══════════════════════════════════════\n\n`;
              detailedMsg += `1. Open your backend code\n`;
              detailedMsg += `2. Find CORS configuration (search for 'cors')\n`;
              detailedMsg += `3. Replace with:\n\n`;
              detailedMsg += `   const corsOptions = {\n`;
              detailedMsg += `     origin: function (origin, callback) {\n`;
              detailedMsg += `       if (!origin) return callback(null, true);\n`;
              detailedMsg += `       if (origin.includes('.vercel.app')) return callback(null, true);\n`;
              detailedMsg += `       if (origin.includes('localhost')) return callback(null, true);\n`;
              detailedMsg += `       callback(null, true);\n`;
              detailedMsg += `     },\n`;
              detailedMsg += `     credentials: true\n`;
              detailedMsg += `   };\n`;
              detailedMsg += `   app.use(cors(corsOptions));\n`;
              detailedMsg += `   app.options('*', cors(corsOptions)); // CRITICAL!\n\n`;
              detailedMsg += `4. Deploy backend\n`;
              detailedMsg += `5. Test frontend again\n\n`;
            } else {
              detailedMsg += `Possible Causes:\n\n`;
              detailedMsg += `1. Backend Not Accessible\n`;
              detailedMsg += `   Test: Open ${API_BASE_URL}/products in browser\n`;
              detailedMsg += `   If it fails → Backend is down\n\n`;
              detailedMsg += `2. Network Connectivity Issue\n`;
              detailedMsg += `   Check your internet connection\n`;
              detailedMsg += `   Check if backend URL is correct\n\n`;
              detailedMsg += `3. DNS Resolution Failed\n`;
              detailedMsg += `   Backend domain might not be resolving\n\n`;
            }
            
            detailedMsg += `═══════════════════════════════════════\n`;
            detailedMsg += `DEBUGGING STEPS\n`;
            detailedMsg += `═══════════════════════════════════════\n\n`;
            detailedMsg += `1. Open Browser Console (F12)\n`;
            detailedMsg += `2. Check Network Tab (F12 → Network)\n`;
            detailedMsg += `3. Look for request to backend\n`;
            detailedMsg += `4. Check Status and Response headers\n`;
            detailedMsg += `5. Test backend URL directly in browser\n`;
            
            throw new Error(detailedMsg);
          }
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Products API error:', response.status, errorText);
            throw new Error(`API Error: ${response.status} - ${errorText}`);
          }
          
          const data = await response.json();
          console.log('Products response:', data);
          
          if (data.success && data.data && data.data.length > 0) {
            // Use first product if no specific ID provided
            const firstProduct = data.data[0];
            try {
              response = await fetch(`${API_BASE_URL}/products/${firstProduct._id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            } catch (fetchError) {
              console.error('Fetch error (network/CORS):', fetchError);
              throw new Error(`Network error: ${fetchError.message}. Check if backend is accessible and CORS is configured.`);
            }
          } else if (data.success && data.data && data.data.length === 0) {
            throw new Error('No products available in database');
          } else {
            throw new Error(data.error || 'Failed to fetch products');
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Product API error:', response.status, errorText);
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Product data:', data);
        
        if (data.success && data.data) {
          setArticleData(data.data);
        } else {
          setError(data.error || 'Product not found');
        }
      } catch (err) {
        console.error('❌ ERROR FETCHING PRODUCT:');
        console.error('  Error:', err);
        console.error('  Message:', err.message);
        console.error('  Name:', err.name);
        console.error('  Stack:', err.stack);
        setError(err.message || 'Failed to load product. Check browser console (F12) for detailed error information.');
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
        <PageHeader />
        <div className="px-6 pb-8" style={{ paddingTop: '104px' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-red-600 mb-4 font-semibold text-lg">❌ Error Loading Product</div>
            
            {/* Detailed Error Message */}
            <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg mb-4 text-left">
              <pre className="text-xs whitespace-pre-wrap font-mono text-red-800 overflow-auto max-h-96">
                {error || 'Product not found'}
              </pre>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
              <p className="font-semibold text-blue-900 mb-2">🔧 Quick Actions:</p>
              <div className="space-y-2 text-sm text-blue-800">
                <p>1. <strong>Test Backend:</strong>{' '}
                  <a 
                    href={`${API_BASE_URL}/products`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline font-mono text-blue-600 hover:text-blue-800"
                  >
                    {API_BASE_URL}/products
                  </a>
                </p>
                <p>2. <strong>Open Console (F12)</strong> - Check for detailed logs with 🔍 markers</p>
                <p>3. <strong>Check Network Tab (F12 → Network)</strong> - See failed requests</p>
                <p>4. <strong>Look for OPTIONS request</strong> - If it fails, it's a CORS preflight issue</p>
              </div>
            </div>
            
            {/* System Information */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left text-sm">
              <p className="font-semibold mb-2">📊 System Information:</p>
              <div className="space-y-1 font-mono text-xs">
                <p><strong>Frontend Origin:</strong> {window.location.origin}</p>
                <p><strong>Backend API URL:</strong> {API_BASE_URL}</p>
                <p><strong>Full Products URL:</strong> {API_BASE_URL}/products</p>
              </div>
            </div>
            
            {/* CORS Fix Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4 text-sm">
              <p className="font-semibold text-yellow-900 mb-2">💡 Most Likely Issue: CORS</p>
              <p className="text-yellow-800 mb-2">Your backend is blocking requests from your frontend.</p>
              <p className="text-yellow-800 font-semibold">Solution:</p>
              <ol className="list-decimal list-inside space-y-1 text-yellow-800 ml-2">
                <li>Open your backend code</li>
                <li>Find CORS configuration</li>
                <li>Add: <code className="bg-yellow-100 px-1 rounded">app.options('*', cors())</code></li>
                <li>Allow Vercel domains in origin check</li>
                <li>Deploy backend</li>
              </ol>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
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
