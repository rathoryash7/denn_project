import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotepadProvider } from './context/NotepadContext';
import ProductDetailPage from './pages/ProductDetailPage';
import NotepadPage from './pages/NotepadPage';

/**
 * App Component
 * Main application component with routing and context providers
 */
function App() {
  // Use /dehn basename only in production, not in development
  const basename = import.meta.env.PROD ? '/dehn' : '';
  
  return (
    <NotepadProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<ProductDetailPage />} />
          <Route path="/notepad" element={<NotepadPage />} />
        </Routes>
      </Router>
    </NotepadProvider>
  );
}

export default App;

