import React from 'react';
import { Award, Users, Wrench, Clock } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Calidad Garantizada',
      description: 'Máquinas de alta calidad para el mercado del embalaje',
    },
    {
      icon: Users,
      title: 'Experiencia',
      description: 'Desde 2001 desarrollamos y comercializamos soluciones',
    },
    {
      icon: Wrench,
      title: 'Servicio Técnico',
      description: 'Servicio técnico y post venta de reconocida trayectoria',
    },
    {
      icon: Clock,
      title: 'Atención Personalizada',
      description: 'Trato directo y personalizado con cada cliente',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Acerca de <span className="text-blue-700">Nosotros</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Desde 2001 desarrollamos y comercializamos máquinas de calidad para el mercado del embalaje. 
            Entre nuestros clientes contamos con empresas que han confiado en nosotros en mercados tan 
            diversos como el de la alimentación, envases, pesca, y construcción.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 text-center">
          <p className="text-xl text-white mb-6">
            Nos diferenciamos, fundamentalmente, por el trato directo y personalizado con el cliente 
            en la búsqueda constante de soluciones prácticas y eficaces para satisfacer sus necesidades; 
            y por poseer un servicio técnico y de post venta de reconocida trayectoria.
          </p>
          <div className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg inline-block font-bold shadow-lg">
            Una empresa que piensa en su empresa
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;