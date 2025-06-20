import React from 'react';
import { Package, Home, Settings, Users, FileText, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const navigationLinks = [
    { label: 'Inicio', icon: Home },
    { label: 'Productos', icon: Package },
    { label: 'Servicios', icon: Settings },
    { label: 'Clientes', icon: Users },
    { label: 'Documentación', icon: FileText },
    { label: 'Ubicación / Contacto', icon: MapPin },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Pantech Partnership Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-lg">
                <Package className="h-8 w-8 text-teal-600" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  Comercializamos productos de <span className="text-yellow-300">Pantech International Inc.</span>
                </p>
              </div>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 border border-white/30">
              MÁS INFORMACIÓN
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Company Information */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-700 text-white p-3 rounded-lg">
                  <Package className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">All Strapping</h3>
                  <p className="text-gray-400">Máquinas Flejadoras</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Una empresa que piensa en su empresa. Contamos con un servicio técnico y de 
                post venta de reconocida experiencia.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Nuestras máquinas se fabrican de acuerdo a la necesidad de cada cliente.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-xl font-bold text-yellow-400 mb-6">Navegación</h4>
              <div className="grid grid-cols-2 gap-3">
                {navigationLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-xl font-bold text-yellow-400 mb-6">Información de contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="text-gray-300">Dónde estamos:</p>
                    <p className="text-white font-semibold">Gral. Fructuoso Rivera 2376</p>
                    <p className="text-gray-400">Ciudad Autónoma de Buenos Aires</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-gray-300">Teléfono:</p>
                    <p className="text-white font-semibold">(011) 4919-7233</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-gray-300">Email:</p>
                    <p className="text-white font-semibold">info@allstrapping.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              ALL-STRAPPING ® | Arte - Diseño & Desarrollo Web
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              © 2024 All Strapping. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;