import React, { useState } from 'react';
import ProductInfo from '../components/ProductInfo';
import ImageGallery from '../components/ImageGallery';
import AdditionalInformation from '../components/AdditionalInformation';
import TechnicalDataTable from '../components/TechnicalDataTable';
import CertificatesSection from '../components/CertificatesSection';
import AccessoryButton from '../components/AccessoryButton';
import AddToNotepad from '../components/AddToNotepad';
import PriceContainer from '../components/PriceContainer';
import CopperPriceMarquee from '../components/CopperPriceMarquee';

/**
 * ProductDetailPage Component
 * Main product detail page with all product information
 * Manages quantity state and passes it to child components
 */
function ProductDetailPage() {
  // Article data/state
  const [articleData] = useState({
    id: '927210',
    name: 'BCO ML2 B 180',
    fullName: 'BCO ML2 B 180',
    description: 'Arrester for 2 single cores BLITZDUCTORconnect w. fault indication',
    price: 125.50,
    moq: 100,
    currency: 'AED',
    partNumber: '927210 BCO ML2 B 180',
    gtin: '4013364405585',
    customsTariff: '85363010',
    grossWeight: '57.75 g',
    pu: '1.00 pc(s)',
  });

  // Quantity state for price calculation
  const [quantity, setQuantity] = useState(1);

  // Handle quantity change - updates quantity and triggers price recalculation
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // Prepare product object for notepad
  const productForNotepad = {
    id: articleData.id,
    partNumber: articleData.partNumber,
    name: articleData.fullName,
    description: articleData.description,
    fullDescription: 'Space-saving, modular lightning current arrester with a width of 6 mm and push-in connection technology with status indication for protecting two single lines for lightning equipotential bonding as well as indirect earthing of shielded cables. With signal disconnection for maintenance purposes.',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Copper Price Marquee Banner - Top of page */}
      <CopperPriceMarquee />
      
      <div className="py-8 px-6">
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
          <AddToNotepad
            product={productForNotepad}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            unitPrice={articleData.price}
            currency={articleData.currency}
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

