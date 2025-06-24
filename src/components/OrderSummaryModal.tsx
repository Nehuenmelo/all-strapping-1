import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Send, ShoppingCart, Package } from 'lucide-react';
import { CartItem, OrderFormData, OrderSummaryProps } from '../types/order';

const OrderSummaryModal: React.FC<OrderSummaryProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    company: '',
    contactName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    // Reset form state when closing
    setFormData({
      company: '',
      contactName: '',
      phone: '',
      email: '',
      notes: '',
    });
    setSubmitStatus(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.company.trim() || !formData.contactName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setSubmitStatus({
        success: false,
        message: 'Por favor complete todos los campos obligatorios.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        success: false,
        message: 'Por favor ingrese un email válido.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await onSubmitOrder(formData);
      // If we get here, the submission was successful
      setSubmitStatus({
        success: true,
        message: '¡Pedido enviado con éxito! Nos pondremos en contacto a la brevedad.',
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitStatus({
        success: false,
        message: 'Error al enviar el pedido. Por favor, intente nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        <div className="flex justify-between items-center border-b border-gray-200 p-5 bg-gradient-to-r from-sky-50 to-white">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-sky-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Resumen del Pedido</h2>
              <p className="text-sm text-gray-500 mt-1">{totalItems} {totalItems === 1 ? 'producto' : 'productos'} en el carrito</p>
            </div>
          </div>
          <button 
            onClick={handleClose} 
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 md:flex gap-8">
          {/* Order Items */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100">Tus Productos</h3>
            <div className="space-y-4 pr-2 max-h-[calc(100vh-18rem)] overflow-y-auto custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No hay productos en el carrito</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        {(item.category || item.subcategory) && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.category} {item.subcategory ? `• ${item.subcategory}` : ''}
                          </p>
                        )}
                        <p className="text-lg font-semibold text-sky-600 mt-2">{item.price}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(item.id, item.quantity - 1);
                            }}
                            disabled={item.quantity <= 1}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-gray-500 hover:bg-sky-50 hover:text-sky-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center font-medium text-gray-700">{item.quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(item.id, item.quantity + 1);
                            }}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-gray-500 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveItem(item.id);
                          }}
                          className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2 md:border-l md:pl-8">
            <div className="sticky top-0 bg-white pb-1 z-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Datos de Contacto</h3>
              <p className="text-sm text-gray-500 mb-5">Complete sus datos para continuar con el pedido</p>
            </div>
            
            {submitStatus ? (
              <div className={`p-5 rounded-xl ${
                submitStatus.success 
                  ? 'bg-green-50 border border-green-100 text-green-800' 
                  : 'bg-red-50 border border-red-100 text-red-800'
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {submitStatus.success ? (
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{submitStatus.message}</p>
                    {submitStatus.success && (
                      <button
                        onClick={handleClose}
                        className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                      >
                        Cerrar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Empresa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors px-4 py-2.5 text-sm border"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                    Nombre del Contacto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors px-4 py-2.5 text-sm border"
                    placeholder="Su nombre y apellido"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors px-4 py-2.5 text-sm border"
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors px-4 py-2.5 text-sm border"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notas adicionales
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors px-4 py-2.5 text-sm border"
                    placeholder="¿Alguna indicación especial para tu pedido?"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Enviar Pedido</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryModal;
