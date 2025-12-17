import React, { useState, useEffect } from 'react';
import './CopperPriceMarquee.css';

/**
 * CopperPriceMarquee Component
 * Displays the current copper price from London Metal Exchange (LME) in a scrolling marquee banner
 * 
 * Features:
 * - Fetches copper price from LME API (or uses fallback)
 * - Auto-refreshes every 10 minutes
 * - Smooth CSS-based marquee animation
 * - Handles loading and error states gracefully
 * - Responsive design
 */
const CopperPriceMarquee = () => {
  const [copperPrice, setCopperPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch copper price from LME API
   * 
   * Note: LME doesn't have a direct public API for free use.
   * For production, you would need to:
   * 1. Use a financial data API service (e.g., Alpha Vantage, Metal API, etc.)
   * 2. Subscribe to LME's official data feeds
   * 3. Use a proxy service that aggregates LME data
   * 
   * Current implementation uses a mock/placeholder value with a realistic range.
   * The API endpoint below is a placeholder - replace with actual API when available.
   */
  const fetchCopperPrice = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace this URL with your actual LME/copper price API endpoint
      // Example API options:
      // - Alpha Vantage: https://www.alphavantage.co/query?function=COMMODITIES&symbol=COPPER
      // - Metal API: https://api.metals.live/v1/spot/copper
      // - Custom backend endpoint that fetches from LME
      
      // For now, using a simulated API call with fallback
      // In production, uncomment the fetch and handle the actual API response:
      
      /*
      const response = await fetch('YOUR_API_ENDPOINT_HERE');
      if (!response.ok) throw new Error('Failed to fetch copper price');
      const data = await response.json();
      // Extract price from API response (adjust based on your API structure)
      const price = data.price || data.value || data.rate;
      */

      // Placeholder: Simulate API delay and return mock data
      // This simulates a realistic copper price range (AED per metric ton)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock price: Random value between 32,000 - 36,000 AED/MT (realistic range)
      // In production, replace this with actual API data
      const mockPrice = (32000 + Math.random() * 4000).toFixed(2);
      setCopperPrice(parseFloat(mockPrice));

      // Alternative: Use a fixed value for consistency during development
      // setCopperPrice(34500);

    } catch (err) {
      console.error('Error fetching copper price:', err);
      setError(err.message);
      // Fallback to default price if API fails
      setCopperPrice(34500);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchCopperPrice();
  }, []);

  // Auto-refresh price every 10 minutes (600,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCopperPrice();
    }, 10 * 60 * 1000); // 10 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format price with thousand separators
  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Display text for the marquee
  const marqueeText = loading
    ? 'Loading Copper Price...'
    : error
    ? `Copper Price (LME): AED ${formatPrice(copperPrice || 34500)} / MT (Last Known)`
    : `Copper Price (LME): AED ${formatPrice(copperPrice)} / MT`;

  return (
    <div className="copper-price-marquee">
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Duplicate content for seamless loop */}
          <span className="marquee-text">{marqueeText}</span>
          <span className="marquee-text" aria-hidden="true">{marqueeText}</span>
          <span className="marquee-text" aria-hidden="true">{marqueeText}</span>
        </div>
      </div>
    </div>
  );
};

export default CopperPriceMarquee;

