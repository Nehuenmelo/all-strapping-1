import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import portada2 from '../assets/portada2.jpg';
interface HeroProps {
  onNavigate?: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const words = ['Flejadoras', 'Zunchadoras'];
  const currentWord = words[currentWordIndex];
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const type = () => {
      const currentIndex = isDeleting ? displayText.length - 1 : displayText.length;
      const newText = isDeleting 
        ? currentWord.substring(0, currentIndex - 1)
        : currentWord.substring(0, currentIndex + 1);
      
      setDisplayText(newText);
      
      if (!isDeleting && newText === currentWord) {
        // Pause at the end of typing before starting to delete
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && newText === '') {
        // Switch to the next word after deleting
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setTypingSpeed(150);
      } else {
        // Continue typing or deleting
        const speed = isDeleting ? 75 : 150;
        setTypingSpeed(speed);
        timeout = setTimeout(type, speed);
      }
    };
    
    timeout = setTimeout(type, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, currentWord, isDeleting, typingSpeed, words.length]);
  
  // Add blinking cursor effect
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  return (
    <section className="relative bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${portada2})` }}
        ></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Máquinas{' '}
              <span className="text-yellow-400 relative">
                {displayText}
                <span 
                  className={`absolute bottom-1.5 h-10 w-1 ml-1 bg-yellow-400 transition-opacity duration-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                />
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-sky-100 leading-relaxed">
              Automáticas y semi-automáticas.<br />
              Reparaciones y repuestos. Servicio técnico multimarca.
            </p>
            <button 
              onClick={() => onNavigate && onNavigate('productos')}
              className="group bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>VER TODOS LOS PRODUCTOS</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="lg:pl-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold">Dónde estamos:</p>
                    <p className="text-sky-100">Gral. Fructuoso Rivera 2376 - CABA</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold">Teléfono:</p>
                    <p className="text-sky-100">11 6012 2549</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold">Consultas:</p>
                    <p className="text-sky-100">info@allstrapping.com</p>
                    <p className="text-sky-100">mariano.tedone@allstrapping.com</p>
                  </div>
                </div>
                {/*Horarios*/}
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold">Horarios:</p>
                    <p className="text-sky-100">Lunes a Viernes: 8:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
    </section>
  );
};

export default Hero;