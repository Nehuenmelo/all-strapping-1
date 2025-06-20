import React from 'react';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5723255/pexels-photo-5723255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Máquinas 
              <span className="text-yellow-400"> Flejadoras</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
              Automáticas y semi-automáticas.<br />
              Reparaciones y repuestos. Servicio técnico multimarca.
            </p>
            <button className="group bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>MÁS INFORMACIÓN</span>
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
                    <p className="text-blue-100">Gral. Fructuoso Rivera 2376 - CABA</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold">Teléfono:</p>
                    <p className="text-blue-100">(011) 4919-7233</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-semibold">Consultas:</p>
                    <p className="text-blue-100">info@allstrapping.com</p>
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