import React from 'react';
import { Package, Wrench, Layers, Zap } from 'lucide-react';

const Products: React.FC = () => {
  const productCategories = [
    {
      icon: Package,
      title: 'Flejadoras semiautomáticas',
      description: 'Máquinas eficientes para volúmenes medianos de producción',
    },
    {
      icon: Zap,
      title: 'Flejadoras automáticas estándar y especiales',
      description: 'Soluciones automatizadas para alta producción',
    },
    {
      icon: Wrench,
      title: 'Sunchadoras manuales',
      description: 'Herramientas manuales para trabajos específicos',
    },
    {
      icon: Layers,
      title: 'Consumibles',
      description: 'Flejes, hebillas y accesorios de calidad',
    },
  ];

  const additionalProducts = [
    'Flejes poliéster',
    'Flejes polipropileno',
    'Flejes manuales',
    'Hebillas / film stretch / etc.',
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden rounded-3xl mb-16">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5723255/pexels-photo-5723255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
          <div className="relative px-8 py-16 lg:px-16 lg:py-24">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Nuestros <span className="text-yellow-400">Productos</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl">
              Nuestras máquinas se fabrican de acuerdo a la necesidad de cada cliente.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {productCategories.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Products */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Productos Adicionales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-yellow-400"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
                  <span className="font-semibold text-gray-900">{product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Images Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.pexels.com/photos/5723255/pexels-photo-5723255.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
              alt="Máquina flejadora automática"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h4 className="text-white text-xl font-bold mb-2">Flejadoras Automáticas</h4>
              <p className="text-gray-200">Alta eficiencia y productividad</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.pexels.com/photos/5723254/pexels-photo-5723254.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
              alt="Máquina flejadora semiautomática"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h4 className="text-white text-xl font-bold mb-2">Máquinas Semiautomáticas</h4>
              <p className="text-gray-200">Versatilidad y control manual</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;