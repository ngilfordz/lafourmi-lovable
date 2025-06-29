import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import LoadingSpiral from '@/components/LoadingSpiral';
import LimelightNavigation from '@/components/LimelightNavigation';
import AnimatedHeroSection from '@/components/AnimatedHeroSection';
import EnhancedProductCategories from '@/components/EnhancedProductCategories';
import AboutGallery from '@/components/AboutGallery';
import TestimonialsSection from '@/components/TestimonialsSection';
import DeliveryTracker from '@/components/DeliveryTracker';
import ContactSection from '@/components/ContactSection';
import AnimatedFooter from '@/components/AnimatedFooter';
import { BackgroundPaths } from '@/components/ui/background-paths';
import PremiumSpotifyPlayer from '@/components/PremiumSpotifyPlayer';
import CartSidebar from '@/components/CartSidebar';
import LoginModal from '@/components/LoginModal';
import ScrollingProductCards from '@/components/ScrollingProductCards';
import { useCart } from '@/App';

interface CartItem {
  id: string;
  name: string;
  price: number;
  priceLBP: number;
  quantity: number;
  image: string;
  description: string;
}

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showBackgroundPaths, setShowBackgroundPaths] = useState(false);
  const { setTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { cartItems, updateCartQuantity, getTotalItems } = useCart();

  useEffect(() => {
    setTheme('dark');
    
    const timer = setTimeout(() => {
      setLoading(false);
      // Show background paths shortly after loading
      setTimeout(() => setShowBackgroundPaths(true), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show background paths after scrolling just 200px
      if (scrollY > 200 && !showBackgroundPaths) {
        setShowBackgroundPaths(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showBackgroundPaths]);

  const handleLogin = (username: string, password: string) => {
    if (username === 'Elie' && password === 'lafourmi') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      alert('Thank you for your purchase! Your order has been confirmed.');
      // Clear cart by setting all items to 0 quantity
      cartItems.forEach(item => updateCartQuantity(item.id, 0));
      setIsCartOpen(false);
    } else {
      setIsCartOpen(false);
      setIsLoginOpen(true);
    }
  };

  if (loading) {
    return <LoadingSpiral isLoading={loading} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Paths - Always visible after load/scroll */}
      <BackgroundPaths />
      
      {/* Navigation */}
      <LimelightNavigation 
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
      />
      
      {/* Floating Spotify Player */}
      <PremiumSpotifyPlayer />
      
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
      />
      
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      
      {/* Hero Section with Lamp Background */}
      <AnimatedHeroSection />
      
      {/* Scrolling Cards Section - About La Fourmi */}
      <ScrollingProductCards />
      
      {/* Main Content - with transparent/semi-transparent backgrounds */}
      <div className="relative z-10">
        <section id="products" className="bg-background/60 backdrop-blur-sm">
          <EnhancedProductCategories />
        </section>
        
        <section className="bg-background/60 backdrop-blur-sm">
          <AboutGallery />
        </section>
        
        <section className="bg-background/60 backdrop-blur-sm">
          <TestimonialsSection />
        </section>
        
        <section className="bg-background/60 backdrop-blur-sm">
          <DeliveryTracker />
        </section>
        
        <section id="contact" className="bg-background/60 backdrop-blur-sm">
          <ContactSection />
        </section>
        
        <AnimatedFooter />
      </div>
    </div>
  );
};

export default Index;
