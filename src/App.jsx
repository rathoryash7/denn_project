import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotepadProvider } from './context/NotepadContext';
import { AuthProvider } from './context/AuthContext';
import ProductDetailPage from './pages/ProductDetailPage';
import NotepadPage from './pages/NotepadPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * App Component
 * Main application component with routing and context providers
 */
function App() {
  // Use /dehn basename only in production, not in development
  const basename = import.meta.env.PROD ? '/dehn' : '';
  
  return (
    <AuthProvider>
      <NotepadProvider>
        <Router basename={basename}>
          <Routes>
            <Route path="/" element={<ProductDetailPage />} />
            <Route 
              path="/notepad" 
              element={
                <ProtectedRoute>
                  <NotepadPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </NotepadProvider>
    </AuthProvider>
  );
}

export default App;

