import React, { useState } from 'react';
import { X, ShoppingCart, ChevronLeft, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Product } from './Products';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (isAdded) return;
    
    setIsAdding(true);
    onAddToCart(product);
    
    // Animation sequence
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset after animation completes
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 1000);
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl w-full max-w-[95vw] h-[auto] max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="relative">
            <button 
              onClick={onClose}
              className="fixed top-6 right-6 bg-white/90 hover:bg-gray-100 rounded-full p-2 z-10 shadow-lg"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
              <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-[70vh]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto max-h-[60vh] object-contain p-6"
                />
              </div>
              
              <div className="py-2">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <button 
                    onClick={onClose}
                    className="flex items-center text-sky-500 hover:text-sky-600 mr-2"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Volver
                  </button>
                  <span>•</span>
                  <span className="ml-2 capitalize">{product.category}</span>
                  {product.subcategory && (
                    <>
                      <span className="mx-1">/</span>
                      <span className="capitalize">{product.subcategory}</span>
                    </>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <div className="text-2xl font-bold text-sky-600 mb-6">
                  {product.price}
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
                  <div className="prose max-w-none text-gray-700">
                    <ReactMarkdown>{product.description}</ReactMarkdown>
                  </div>
                </div>
                
                {product.specs && product.specs.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Especificaciones</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {product.specs.map((spec: string, index: number) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding || isAdded}
                    className={`relative flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden ${
                      product.inStock && !isAdded
                        ? 'bg-sky-500 hover:bg-sky-600 text-white transform hover:scale-105'
                        : isAdded
                        ? 'bg-green-500 text-white cursor-default'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {/* Loading bar */}
                    {(isAdding || isAdded) && (
                      <span className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
                        <span 
                          className={`absolute bottom-0 left-0 h-full bg-white transition-all duration-1000 ${isAdded ? 'w-full' : 'w-0'}`}
                          style={{
                            animation: isAdding ? 'loading 1s ease-out forwards' : 'none'
                          }}
                        />
                      </span>
                    )}
                    
                    <span className={`flex items-center transition-all duration-300 ${isAdding || isAdded ? 'opacity-0' : 'opacity-100'}`}>
                      {product.inStock ? (
                        <>
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Agregar al carrito
                        </>
                      ) : (
                        'No hay stock disponible'
                      )}
                    </span>
                    
                    {/* Checkmark icon when added */}
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isAdded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                      <Check className="h-6 w-6 mr-2" />
                      <span>¡Agregado!</span>
                    </span>
                    
                    {/* Keyframes for the loading animation */}
                    <style dangerouslySetInnerHTML={{
                      __html: `
                        @keyframes loading {
                          0% { width: 0; }
                          100% { width: 100%; }
                        }
                      `
                    }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
