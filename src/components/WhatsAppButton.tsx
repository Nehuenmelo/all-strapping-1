import { MessageCircleMore } from 'lucide-react';
import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '5491160122549'; // Argentina number with country code
  const message = 'Hola, me gustaría hacer una consulta sobre sus productos/servicios.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Chatear por WhatsApp"
      >
        <MessageCircleMore className="h-7 w-7" />
      </a>
      <div className="absolute right-16 bottom-1/2 transform translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        ¡Chateá con nosotros!
        <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
