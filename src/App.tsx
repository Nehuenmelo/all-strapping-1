import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import Documentation from './components/Documentation';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

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
      case 'documentacion':
        return <Documentation />;
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
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-20">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;