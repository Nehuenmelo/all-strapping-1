import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Send, User, Check, X, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import background from '../assets/SAM_0261.jpg';

const Contact: React.FC = () => {
  interface ContactFormData {
    name: string;
    company: string;
    address: string;
    city: string;
    province: string;
    country: string;
    phone: string;
    email: string;
    message: string;
  }

  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    company: '',
    address: '',
    city: '',
    province: '',
    country: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS service ID, template ID, and public key
    const serviceId = 'service_enc7g5u';
    const templateId = 'template_rrrrlvo';
    const publicKey = '5L4jH4ocVgwz3qDBI';

    if (!form.current) {
      setSubmitStatus({ success: false, message: 'Error al enviar el formulario. Por favor, intente nuevamente.' });
      setIsSubmitting(false);
      return;
    }

    // Crear un objeto con los datos del formulario
    const templateParams = {
      name: contactForm.name,
      company: contactForm.company,
      address: contactForm.address,
      city: contactForm.city,
      province: contactForm.province,
      country: contactForm.country,
      phone: contactForm.phone,
      email: contactForm.email,
      message: contactForm.message,
    };

    // Usar send en lugar de sendForm para mayor control
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
          console.log('Email sent successfully!', result.text);
          setSubmitStatus({ 
            success: true, 
            message: '¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad.' 
          });
          form.current?.reset();
          setContactForm({
            name: '',
            company: '',
            address: '',
            city: '',
            province: '',
            country: '',
            phone: '',
            email: '',
            message: '',
          });
      }, (error) => {
          console.error('Error sending email:', error.text);
          setSubmitStatus({ 
            success: false, 
            message: 'Error al enviar el mensaje. Por favor, intente nuevamente más tarde.' 
          });
      })
      .finally(() => {
          setIsSubmitting(false);
      });
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      details: ['Gral. Fructuoso Rivera 2376', 'Ciudad Autónoma de Buenos Aires'],
    },
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['11 6012 2549'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@allstrapping.com', 'mariano.tedone@allstrapping.com'],
    },
    {
      icon: Clock,
      title: 'Horario de Atención',
      details: ['Lunes a Viernes: 8:00 - 17:00'],
    },
  ];

  const serviceAreas = [
    'Flejadoras Semiautomáticas',
    'Flejadoras Automáticas (Estándar y Especiales)',
    'Zunchadoras Manuales o a Batería',
    'Consumibles',
    'Otra información',
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 text-white overflow-hidden rounded-3xl mb-16">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${background})` }}
          ></div>
          <div className="relative px-8 py-16 lg:px-16 lg:py-24">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Ubicación / <span className="text-yellow-400">Contacto</span>
            </h1>
            <p className="text-xl lg:text-2xl text-sky-100 mb-8 max-w-2xl">
              Estamos aquí para ayudarle con todas sus necesidades de embalaje
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="bg-sky-400 p-4 rounded-2xl inline-block mb-4">
                  <Send className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Formulario de Contacto</h2>
                <p className="text-gray-600 mt-2">Complete sus datos para recibir información personalizada</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Razón Social
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nombre de la empresa"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Persona de Contacto
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nombre del contacto"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Domicilio
                    </label>
                    <input
                      type="text"
                      value={contactForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Dirección completa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={contactForm.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Ciudad"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Provincia
                    </label>
                    <input
                      type="text"
                      value={contactForm.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Provincia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      País
                    </label>
                    <input
                      type="text"
                      value={contactForm.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="País"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Teléfono fijo"
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
                        value={contactForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="correo@empresa.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Describa sus necesidades o consultas..."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting ? 'bg-sky-500' : 'bg-sky-400 hover:bg-sky-500'
                    } text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform ${
                      !isSubmitting && 'hover:scale-105'
                    } shadow-lg flex items-center justify-center space-x-2 disabled:opacity-80`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Enviar Consulta</span>
                      </>
                    )}
                  </button>
                  
                  {submitStatus && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    } flex items-center space-x-2`}>
                      {submitStatus.success ? (
                        <Check className="h-5 w-5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 flex-shrink-0" />
                      )}
                      <span>{submitStatus.message}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-sky-400 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Se busca información sobre:</h3>
              <div className="space-y-3">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sky-100">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 bg-gradient-to-r from-sky-400 to-sky-500">
            <h3 className="text-2xl font-bold text-white mb-2">Nuestra Ubicación</h3>
            <p className="text-sky-100">Gral. Fructuoso Rivera 2376, CABA</p>
          </div>
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52511.18457917786!2d-58.43383232397405!3d-34.65598998041976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb96987d2203%3A0xff936f27a7e4eabc!2sAll%20Strapping!5e0!3m2!1ses!2sar!4v1750719392157!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de All Strapping"
              className="rounded-b-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;