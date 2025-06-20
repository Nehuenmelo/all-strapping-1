import React from 'react';
import { Settings, Phone, Wrench, Users, CheckCircle, Award } from 'lucide-react';

const Services: React.FC = () => {
  const technicalServices = [
    { name: 'Strapex', category: 'Marca Premium' },
    { name: 'Tajpack', category: 'Soluciones Industriales' },
    { name: 'Oms', category: 'Equipos Especializados' },
    { name: 'Legamatic', category: 'Tecnología Avanzada' },
    { name: 'CykIop', category: 'Sistemas Automáticos' },
    { name: 'Reisopack', category: 'Embalaje Profesional' },
    { name: 'Sorsa', category: 'Maquinaria Industrial' },
  ];

  const serviceAreas = [
    {
      icon: Settings,
      title: 'Servicio Técnico Multimarca',
      description: 'Soporte especializado para múltiples marcas y modelos',
      services: technicalServices.slice(0, 4),
    },
    {
      icon: Phone,
      title: 'Servicio de Post Venta',
      description: 'Atención personalizada después de la compra',
      services: [
        { name: 'Consultoría técnica', category: 'Asesoramiento' },
        { name: 'Mantenimiento preventivo', category: 'Cuidado' },
        { name: 'Capacitación de personal', category: 'Formación' },
        { name: 'Soporte telefónico', category: 'Comunicación' },
      ],
    },
    {
      icon: Wrench,
      title: 'Asesoramiento Técnico Comercial',
      description: 'Orientación especializada para la mejor solución',
      services: [
        { name: 'Análisis de necesidades', category: 'Evaluación' },
        { name: 'Selección de equipos', category: 'Optimización' },
        { name: 'Configuración personalizada', category: 'Adaptación' },
        { name: 'Instalación profesional', category: 'Implementación' },
      ],
    },
    {
      icon: Users,
      title: 'Proyectos e Ingeniería',
      description: 'Desarrollo de soluciones integrales personalizadas',
      services: [
        { name: 'Diseño de líneas', category: 'Planificación' },
        { name: 'Integración de sistemas', category: 'Conexión' },
        { name: 'Automatización', category: 'Tecnología' },
        { name: 'Optimización de procesos', category: 'Mejora' },
      ],
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden rounded-3xl mb-16">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5723255/pexels-photo-5723255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
          <div className="relative px-8 py-16 lg:px-16 lg:py-24">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Nuestros <span className="text-yellow-400">Servicios</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl">
              All Strapping, una empresa que piensa en su empresa.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-lg">
              <p className="text-lg text-blue-100">
                Contamos con un servicio técnico y de post venta de reconocida experiencia.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {serviceAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-yellow-400 p-3 rounded-xl">
                      <Icon className="h-8 w-8 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{area.title}</h3>
                      <p className="text-blue-100">{area.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid gap-3">
                    {area.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-700" />
                          <span className="font-semibold text-gray-900">{service.name}</span>
                        </div>
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          {service.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Images */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.pexels.com/photos/5723254/pexels-photo-5723254.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
              alt="Servicio técnico especializado"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h4 className="text-white text-xl font-bold mb-2">Servicio Técnico</h4>
              <p className="text-gray-200">Reparación y mantenimiento especializado</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.pexels.com/photos/5723255/pexels-photo-5723255.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
              alt="Instalación y configuración"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h4 className="text-white text-xl font-bold mb-2">Instalación Profesional</h4>
              <p className="text-gray-200">Configuración y puesta en marcha</p>
            </div>
          </div>
        </div>

        {/* Quality Guarantee */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Award className="h-12 w-12 text-gray-900 mr-4" />
            <h3 className="text-3xl font-bold text-gray-900">Garantía de Calidad</h3>
          </div>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Nuestras máquinas se fabrican de acuerdo a la necesidad de cada cliente, 
            garantizando la máxima eficiencia y durabilidad en cada proyecto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;