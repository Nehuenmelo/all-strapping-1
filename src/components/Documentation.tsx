import React, { useState } from 'react';
import { Lock, User, Mail, FileText, UserPlus } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', reason: '' });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginForm);
    // Handle login logic here
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration request:', registerForm);
    // Handle registration logic here
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden rounded-3xl mb-16">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5723255/pexels-photo-5723255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
          <div className="relative px-8 py-16 lg:px-16 lg:py-24">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-yellow-400">Documentación</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl">
              Debe estar logueado para acceder a esta sección
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              <button
                onClick={() => setActiveTab('login')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                <Lock className="h-5 w-5 inline mr-2" />
                Iniciar Sesión
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                <UserPlus className="h-5 w-5 inline mr-2" />
                Solicitar Usuario
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Login/Register Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {activeTab === 'login' ? (
                <div>
                  <div className="text-center mb-8">
                    <div className="bg-blue-700 p-4 rounded-2xl inline-block mb-4">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
                    <p className="text-gray-600 mt-2">Accede a tu área de documentación</p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre de usuario
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={loginForm.username}
                          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ingrese su usuario"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ingrese su contraseña"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Acceder
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <div className="bg-yellow-400 p-4 rounded-2xl inline-block mb-4">
                      <UserPlus className="h-8 w-8 text-gray-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Solicitar Usuario</h2>
                    <p className="text-gray-600 mt-2">Complete el formulario para solicitar acceso</p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre y apellido
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Ingrese su nombre completo"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="correo@empresa.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Motivo
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                          value={registerForm.reason}
                          onChange={(e) => setRegisterForm({ ...registerForm, reason: e.target.value })}
                          rows={4}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                          placeholder="Describa el motivo de su solicitud..."
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Enviar Solicitud
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Information Panel */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Información de Acceso</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h4 className="font-bold text-lg mb-3">Para Clientes Existentes</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Si ya posee credenciales de acceso, utilice el formulario de inicio de sesión 
                    para acceder a su documentación técnica y manuales.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h4 className="font-bold text-lg mb-3">Nuevos Usuarios</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Complete el formulario de solicitud con sus datos y el motivo de acceso. 
                    Nuestro equipo evaluará su solicitud y le proporcionará las credenciales correspondientes.
                  </p>
                </div>

                <div className="bg-yellow-400/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
                  <h4 className="font-bold text-lg mb-3 text-yellow-300">Documentación Disponible</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Manuales de usuario</li>
                    <li>• Guías de mantenimiento</li>
                    <li>• Especificaciones técnicas</li>
                    <li>• Catálogos de repuestos</li>
                    <li>• Videos instructivos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;