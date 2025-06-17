
import React, { useState } from 'react';
import { Menu, X, Calculator, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMenu}
        className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 min-w-[200px] p-4">
          <nav className="space-y-3">
            <Link
              to="/client-calc"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
            >
              <Calculator className="w-5 h-5 text-brand-orange" />
              <span>Калькулятор</span>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
            >
              <User className="w-5 h-5 text-brand-purple" />
              <span>Профиль</span>
            </Link>
            
            <Link
              to="/admin-login"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
            >
              <LogIn className="w-5 h-5 text-brand-darkBlue" />
              <span>Админ</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
