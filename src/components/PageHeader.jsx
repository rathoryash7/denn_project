import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DehnLogo from './DehnLogo';
import LoginModal from './LoginModal';

/**
 * PageHeader Component
 * Header with login button and user menu
 */
function PageHeader() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="border-b border-gray-200 bg-white fixed z-30 print:hidden w-full" style={{ top: '40px' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')}>
              <DehnLogo size="md" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-100"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={() => navigate('/notepad')}
                  className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-100"
                >
                  Notepad
                </button>
                <span className="text-sm text-gray-600">
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        redirectPath={window.location.pathname}
      />
    </>
  );
}

export default PageHeader;

