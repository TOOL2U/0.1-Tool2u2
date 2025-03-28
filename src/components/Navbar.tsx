import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { ShoppingCart, Menu, X, Package, User, Wrench } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const { orders } = useOrders();
  const location = useLocation();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const pendingOrders = orders.filter(order => 
    order.status === 'pending' || 
    order.status === 'processing' || 
    order.status === 'payment_verification'
  ).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 w-auto" />
          <span className="ml-2 text-xl font-bold text-gray-900">Tool2U</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-[#FFD700] transition-colors">
            Home
          </Link>
          <Link to="/tools" className="text-gray-700 hover:text-[#FFD700] transition-colors flex items-center">
            <Wrench className="w-4 h-4 mr-1" />
            Tools
          </Link>
          <Link to="/orders" className="text-gray-700 hover:text-[#FFD700] transition-colors flex items-center">
            <Package className="w-4 h-4 mr-1" />
            Orders
            {pendingOrders > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingOrders}
              </span>
            )}
          </Link>
          <Link to="/staff" className="text-gray-700 hover:text-[#FFD700] transition-colors flex items-center">
            <User className="w-4 h-4 mr-1" />
            Staff
          </Link>
          <Link to="/basket" className="text-gray-700 hover:text-[#FFD700] transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/basket" className="text-gray-700 mr-4 relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-[#FFD700] transition-colors py-2">
                Home
              </Link>
              <Link to="/tools" className="text-gray-700 hover:text-[#FFD700] transition-colors py-2 flex items-center">
                <Wrench className="w-4 h-4 mr-2" />
                Tools
              </Link>
              <Link to="/orders" className="text-gray-700 hover:text-[#FFD700] transition-colors py-2 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Orders
                {pendingOrders > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingOrders}
                  </span>
                )}
              </Link>
              <Link to="/staff" className="text-gray-700 hover:text-[#FFD700] transition-colors py-2 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Staff
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
