import React, { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Products from './components/Products';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Custom hook to handle scroll to top when active section changes
const useScrollToTop = (activeSection: string) => {
  useEffect(() => {
    // Scroll to top whenever activeSection changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [activeSection]);
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  
  // Use the scroll to top hook
  useScrollToTop(activeSection);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero />
            <About />
          </>
        );
      case 'productos':
        return <Products />;
      case 'servicios':
        return <Services />;
      case 'contacto':
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <About />
          </>
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="pt-20">
          {activeSection === 'home' ? (
            <>
              <Hero onNavigate={setActiveSection} />
              <About />
            </>
          ) : (
            renderContent()
          )}
          <WhatsAppButton />
        </main>
        <Footer setActiveSection={setActiveSection} />
      </div>
    </CartProvider>
  );
}

export default App;