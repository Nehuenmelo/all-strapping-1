import React, { useState } from 'react';
import { 
  Package, Search, ChevronRight, ChevronDown, ChevronUp, 
  ShoppingCart, X, Plus, Minus, Trash2, Send
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ProductDetail from './ProductDetail';
import OrderSummaryModal from './OrderSummaryModal';
import { useCart } from '../contexts/CartContext';
import { OrderFormData } from '../types/order';
import tensorManual from '../assets/tensor-manual.jpg';
import flejadoraManual from '../assets/flejadora-manual.jpg';
import zunchadoraABateria from '../assets/zunchadora-a-bateria.jpg';
import zunchadoraNeumatica from '../assets/zunchadora-neumatica.jpg';
import zunchadoraAutomatica from '../assets/Automatic-Strapping-Machine1.jpg';
import zunchadoraSemiautomatica from '../assets/IMG_0156.jpg';
import precintoMetalico from '../assets/precinto-metalico.jpg';
import hebillas from '../assets/hebillas.jpeg';
import flejeCristal from '../assets/fleje-cristal.jpg';
import flejePet from '../assets/fleje-pet.jpg';
import flejeSemiautomaticoNegro from '../assets/fleje-semiautomatico-negro.jpg';
import serviciosTecnicos from '../assets/IMG_0157.jpg';
import productsHeroBg from '../assets/IMG_0157.jpg'; // Reusing the same image or replace with a products-specific one

interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
  subcategory: string;
  inStock: boolean;
  specs?: string[];
}

const Products: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity, itemCount, clearCart } = useCart();
  
  // Categories data
  const categories: Category[] = [
    {
      id: 'flejes',
      name: 'Flejes',
      subcategories: [],
    },
    {
      id: 'hebillas',
      name: 'Hebillas',
      subcategories: [],
    },
    {
      id: 'maquinas',
      name: 'Máquinas',
      subcategories: [
        { id: 'automaticas', name: 'Automáticas' },
        { id: 'semiautomaticas', name: 'Semiautomáticas' },
        { id: 'manuales', name: 'Manuales' },
        { id: 'neumaticas', name: 'Neumáticas' },
        { id: 'bateria', name: 'A Batería' },
      ],
    },
    {
      id: 'servicios',
      name: 'Servicios Técnicos',
      subcategories: [],
    },
  ];

  // Initialize all categories as expanded by default
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({
      ...acc,
      [category.id]: true,
      ...(category.subcategories?.reduce((subAcc, subcategory) => ({
        ...subAcc,
        [subcategory.id]: true
      }), {}) || {})
    }), {})
  );

  // Sample products data - replace with your actual products
  const products: Product[] = [
    // Flejes
    {
      id: 'fleje-9mm-semiauto-negro',
      name: 'Fleje 9 mm semiautomatico negro',
      price: 'A consultar',
      description: 'El **fleje de 9 mm semiautomático color negro** es una solución **eficiente y económica** para el embalaje y aseguramiento de cargas en líneas de flejado semiautomáticas. Fabricado en **polipropileno (PP)** de alta calidad, ofrece una excelente combinación de **resistencia, flexibilidad y facilidad de uso**.\n\nDiseñado especialmente para **máquinas flejadoras semiautomáticas**, su acabado liso y sus propiedades mecánicas aseguran un **desempeño confiable**, evitando atascos y garantizando una **aplicación rápida y segura** del fleje.',
      image: flejeSemiautomaticoNegro,
      category: 'flejes',
      subcategory: '',
      inStock: true,
      specs: [
        'Ancho: 9 mm',
        'Tipo: fleje de polipropileno (PP)',
        'Color: negro',
        'Uso: compatible con máquinas flejadoras semiautomáticas',
        'Bobinado uniforme que facilita el uso continuo sin interrupciones.',
        'Ligero, resistente y fácil de manipular.'
      ]
    },
    {
      id: 'fleje-12mm-semiauto-negro',
      name: 'Fleje 12 mm semiautomatico negro',
      price: 'A consultar',
      description: 'El **fleje de 12 mm semiautomático color negro** es una solución **eficiente y económica** para el embalaje y aseguramiento de cargas en líneas de flejado semiautomáticas. Fabricado en **polipropileno (PP)** de alta calidad, ofrece una excelente combinación de **resistencia, flexibilidad y facilidad de uso**.\n\nDiseñado especialmente para **máquinas flejadoras semiautomáticas**, su acabado liso y sus propiedades mecánicas aseguran un **desempeño confiable**, evitando atascos y garantizando una **aplicación rápida y segura** del fleje.',
      image: flejeSemiautomaticoNegro,
      category: 'flejes',
      subcategory: '',
      inStock: true,
      specs: [
        'Ancho: 12 mm',
        'Tipo: fleje de polipropileno (PP)',
        'Color: negro',
        'Uso: compatible con máquinas flejadoras semiautomáticas',
        'Bobinado uniforme que facilita el uso continuo sin interrupciones.',
        'Ligero, resistente y fácil de manipular.'
      ]
    },
    {
      id: 'fleje-9mm-auto-cristal',
      name: 'Fleje 9 mm automático cristal',
      price: 'A consultar',
      description: 'El **fleje de 9 mm automático cristal** está diseñado especialmente para su uso en **máquinas flejadoras automáticas**, ofreciendo un rendimiento superior en líneas de embalaje de alta velocidad. Fabricado en **polipropileno (PP)** de alta calidad, este fleje combina **resistencia, flexibilidad y estabilidad**, asegurando un amarre eficiente y sin interrupciones. Su superficie uniforme y sus dimensiones precisas permiten una alimentación fluida dentro del equipo, reduciendo atascos y aumentando la productividad. Es ideal para el **embalaje automatizado de cajas, paquetes y productos en serie**.',
      image: flejeCristal,
      category: 'flejes',
      subcategory: '',
      inStock: true,
      specs: [
        'Ancho: 9 mm',
        'Material: polipropileno (PP)',
        'Color: cristal',
        'Tipo: apto para máquinas flejadoras automáticas',
        'Alta resistencia a la tensión con excelente rendimiento en ciclos rápidos.',
        'Acabado liso para un deslizamiento suave en el sistema de alimentación.'
      ]
    },
    {
      id: 'fleje-12mm-auto-cristal',
      name: 'Fleje 12 mm automático cristal',
      price: 'A consultar',
      description: 'El **fleje de 12 mm automático cristal** está diseñado especialmente para su uso en **máquinas flejadoras automáticas**, ofreciendo un rendimiento superior en líneas de embalaje de alta velocidad. Fabricado en **polipropileno (PP)** de alta calidad, este fleje combina **resistencia, flexibilidad y estabilidad**, asegurando un amarre eficiente y sin interrupciones. Su superficie uniforme y sus dimensiones precisas permiten una alimentación fluida dentro del equipo, reduciendo atascos y aumentando la productividad. Es ideal para el **embalaje automatizado de cajas, paquetes y productos en serie**.',
      image: flejeCristal,
      category: 'flejes',
      subcategory: '',
      inStock: true,
      specs: [
        'Ancho: 12 mm',
        'Material: polipropileno (PP)',
        'Color: cristal',
        'Tipo: apto para máquinas flejadoras automáticas',
        'Alta resistencia a la tensión con excelente rendimiento en ciclos rápidos.',
        'Acabado liso para un deslizamiento suave en el sistema de alimentación.'
      ]
    },
    {
      id: 'fleje-pet-12mm',
      name: 'Fleje PET 12 mm',
      price: 'A consultar',
      description: 'El **fleje PET de 12 mm** es una alternativa resistente y ecológica al fleje de acero, ideal para el **embalaje de cargas medianas y pesadas**. Fabricado en **tereftalato de polietileno (PET)**, este fleje ofrece **alta resistencia a la tracción**, gran estabilidad dimensional y excelente desempeño frente a condiciones climáticas adversas. Gracias a su elasticidad controlada, mantiene la tensión sobre la carga durante más tiempo sin deformarse ni romperse, lo que lo hace ideal para asegurar pallets, cajas y materiales industriales de forma segura y eficiente.',
      image: flejePet,
      category: 'flejes',
      subcategory: 'PET',
      inStock: true,
      specs: [
        'Ancho: 12 mm',
        'Material: PET (tereftalato de polietileno)',
        'Alta resistencia a la tensión',
        'No se oxida ni corta el producto flejado',
        'Compatible con herramientas manuales, neumáticas o a batería.',
        'Apto para uso en interiores y exteriores.',
      ]
    },
    {
      id: 'fleje-pet-16mm',
      name: 'Fleje PET 16 mm',
      price: 'A consultar',
      description: 'El **fleje PET de 16 mm** es una alternativa resistente y ecológica al fleje de acero, ideal para el **embalaje de cargas medianas y pesadas**. Fabricado en **tereftalato de polietileno (PET)**, este fleje ofrece **alta resistencia a la tracción**, gran estabilidad dimensional y excelente desempeño frente a condiciones climáticas adversas. Gracias a su elasticidad controlada, mantiene la tensión sobre la carga durante más tiempo sin deformarse ni romperse, lo que lo hace ideal para asegurar pallets, cajas y materiales industriales de forma segura y eficiente.',
      image: flejePet,
      category: 'flejes',
      subcategory: 'PET',
      inStock: true,
      specs: [
        'Ancho: 16 mm',
        'Material: PET (tereftalato de polietileno)',
        'Mayor resistencia a la tensión',
        'Ideal para cargas pesadas',
        'Compatible con herramientas manuales, neumáticas o a batería.',
        'Apto para uso en interiores y exteriores.',
      ]
    },
    
    // Hebillas
    {
      id: 'hebilla-13mm',
      name: 'Hebillas de 13 mm para fleje manual',
      price: 'A consultar',
      description: 'Las **hebillas de 13 mm para fleje manual** son accesorios esenciales para asegurar cargas con fleje plástico de forma rápida, resistente y sin el uso de herramientas complejas. Están diseñadas para trabajar en conjunto con tensores manuales, permitiendo un **sujeción firme y confiable** del fleje sobre bultos, cajas o pallets. Fabricadas en **acero galvanizado de alta resistencia**, estas hebillas ofrecen una excelente capacidad de agarre, incluso bajo tensión elevada. Su diseño abierto facilita el enganche del fleje y el tensado manual, ideal para operaciones portátiles o en lugares sin acceso a energía eléctrica.',
      image: hebillas,
      category: 'hebillas',
      subcategory: '',
      inStock: true,
      specs: [
        'Medida: 13 mm (compatibles con flejes de 12 a 13 mm de ancho).',
        'Material: acero galvanizado resistente a la corrosión.',
        'Tipo: hebilla abierta para tensado manual.',
        'Reutilizables en muchas aplicaciones.',
        'Excelente agarre y sujeción bajo tensión.',
      ]
    },
    {
      id: 'hebilla-16mm',
      name: 'Hebillas de 16 mm para fleje manual',
      price: 'A consultar',
      description: 'Las **hebillas de 16 mm para fleje manual** son accesorios esenciales para asegurar cargas con fleje plástico de forma rápida, resistente y sin el uso de herramientas complejas. Están diseñadas para trabajar en conjunto con tensores manuales, permitiendo un **sujeción firme y confiable** del fleje sobre bultos, cajas o pallets. Fabricadas en **acero galvanizado de alta resistencia**, estas hebillas ofrecen una excelente capacidad de agarre, incluso bajo tensión elevada. Su diseño abierto facilita el enganche del fleje y el tensado manual, ideal para operaciones portátiles o en lugares sin acceso a energía eléctrica.',
      image: hebillas,
      category: 'hebillas',
      subcategory: '',
      inStock: true,
      specs: [
        'Medida: 16 mm (compatibles con flejes de 16 mm de ancho).',
        'Material: acero galvanizado resistente a la corrosión.',
        'Tipo: hebilla abierta para tensado manual.',
        'Reutilizables en muchas aplicaciones.',
        'Excelente agarre y sujeción bajo tensión.',
      ]
    },
    {
      id: 'hebilla-19mm',
      name: 'Hebillas de 19 mm para fleje manual',
      price: 'A consultar',
      description: 'Las **hebillas de 19 mm para fleje manual** son accesorios esenciales para asegurar cargas con fleje plástico de forma rápida, resistente y sin el uso de herramientas complejas. Están diseñadas para trabajar en conjunto con tensores manuales, permitiendo un **sujeción firme y confiable** del fleje sobre bultos, cajas o pallets. Fabricadas en **acero galvanizado de alta resistencia**, estas hebillas ofrecen una excelente capacidad de agarre, incluso bajo tensión elevada. Su diseño abierto facilita el enganche del fleje y el tensado manual, ideal para operaciones portátiles o en lugares sin acceso a energía eléctrica.',
      image: hebillas,
      category: 'hebillas',
      subcategory: '',
      inStock: true,
      specs: [
        'Medida: 19 mm (compatibles con flejes de 19 mm de ancho).',
        'Material: acero galvanizado resistente a la corrosión.',
        'Tipo: hebilla abierta para tensado manual.',
        'Reutilizables en muchas aplicaciones.',
        'Excelente agarre y sujeción bajo tensión.',
      ]
    },
    {
      id: 'precinto-pet-12mm',
      name: 'Precinto metálico PET 12 mm',
      price: 'A consultar',
      description: 'El **precinto metálico para fleje manual de 12 mm** es una pieza esencial para asegurar el cierre firme y seguro de flejes en tareas de embalaje manual. Fabricado en **acero galvanizado**, este precinto está diseñado para resistir altas tensiones y mantener la carga estable durante el transporte o almacenamiento. Compatible con **flejes de poliéster (PET) o polipropileno (PP)** de 12 mm de ancho, se aplica fácilmente con tensores manuales, sin necesidad de herramientas eléctricas o neumáticas. Ideal para aplicaciones que requieren **resistencia, durabilidad y practicidad** en el flejado.',
      image: precintoMetalico,
      category: 'hebillas',
      subcategory: '',
      inStock: true,
      specs: [
        'Material: acero galvanizado de alta resistencia.',
        'Ancho compatible: 12 mm.',
        'Aplicación: uso manual con tensor y cortador.',
        'Alta resistencia a la tracción y al desgaste.',
        'Ideal para asegurar cargas medianas y pesadas.',
      ]
    },
    {
      id: 'precinto-pet-16mm',
      name: 'Precinto metálico PET 16 mm',
      price: 'A consultar',
      description: 'El **precinto metálico para fleje manual de 16 mm** es una pieza esencial para asegurar el cierre firme y seguro de flejes en tareas de embalaje manual. Fabricado en **acero galvanizado**, este precinto está diseñado para resistir altas tensiones y mantener la carga estable durante el transporte o almacenamiento. Compatible con **flejes de poliéster (PET) o polipropileno (PP)** de 16 mm de ancho, se aplica fácilmente con tensores manuales, sin necesidad de herramientas eléctricas o neumáticas. Ideal para aplicaciones que requieren **resistencia, durabilidad y practicidad** en el flejado.',
      image: precintoMetalico,
      category: 'hebillas',
      subcategory: '',
      inStock: true,
      specs: [
        'Material: acero galvanizado de alta resistencia.',
        'Ancho compatible: 16 mm.',
        'Aplicación: uso manual con tensor y cortador.',
        'Alta resistencia a la tracción y al desgaste.',
        'Ideal para asegurar cargas medianas y pesadas.',
      ]
    },
    {
      id: 'precinto-pet-19mm',
      name: 'Precinto metálico PET 19 mm',
      price: 'A consultar',
      description: 'El **precinto metálico para fleje manual de 19 mm** es una pieza esencial para asegurar el cierre firme y seguro de flejes en tareas de embalaje manual. Fabricado en **acero galvanizado**, este precinto está diseñado para resistir altas tensiones y mantener la carga estable durante el transporte o almacenamiento. Compatible con **flejes de poliéster (PET) o polipropileno (PP)** de 19 mm de ancho, se aplica fácilmente con tensores manuales, sin necesidad de herramientas eléctricas o neumáticas. Ideal para aplicaciones que requieren **resistencia, durabilidad y practicidad** en el flejado.',
      image: precintoMetalico,
      category: 'hebillas',
      subcategory: '',
      inStock: true,
      specs: [
        'Material: acero galvanizado de alta resistencia.',
        'Ancho compatible: 19 mm.',
        'Aplicación: uso manual con tensor y cortador.',
        'Alta resistencia a la tracción y al desgaste.',
        'Ideal para asegurar cargas medianas y pesadas.',
      ]
    },
    
    // Máquinas - Semiautomáticas
    {
      id: 'maquina-semi-x22',
      name: 'Máquina Zunchadora Semiautomática para Fleje de Polipropileno X22',
      price: 'Consultar',
      description: 'La **Máquina Zunchadora Semiautomática X22** está diseñada para facilitar y optimizar el proceso de embalaje con fleje de polipropileno (PP). Ideal para entornos industriales, comerciales y logísticos, esta máquina combina eficiencia, rapidez y facilidad de uso, convirtiéndola en una herramienta esencial para asegurar cargas de manera segura y profesional. Con un diseño compacto y robusto, la X22 permite realizar el flejado de cajas, paquetes y bultos con mínima intervención del operador. Solo se necesita posicionar el fleje y la máquina automáticamente realiza el tensado, sellado térmico y corte, garantizando un cierre firme y duradero.',
      image: zunchadoraSemiautomatica,
      category: 'maquinas',
      subcategory: 'semiautomaticas',
      inStock: true,
      specs: [
        'Compatible con fleje de polipropileno (PP) de distintos anchos.',
        'Operación semiautomática: requiere mínima intervención manual.',
        'Ajuste de tensión de fleje según el tipo de paquete.',
        'Sistema de sellado térmico que elimina el uso de grapas o uniones externas.',
        'Estructura resistente, ideal para uso continuo en líneas de embalaje.',
        'Fácil mantenimiento y bajo consumo energético.',
      ]
    },
    
    // Máquinas - Automáticas
    {
      id: 'maquina-auto-ex5000',
      name: 'Máquina Zunchadora Automática para Fleje de Polipropileno EX5000',
      price: 'A consultar',
      description: 'La **EX5000** es una **zunchadora automática de alto rendimiento**, especialmente diseñada para operaciones intensivas de flejado con **fleje de polipropileno (PP)**. Gracias a su funcionamiento completamente automatizado, esta máquina garantiza ciclos rápidos, precisos y uniformes sin requerir intervención del operador, lo que la convierte en una excelente opción para líneas de producción con alto flujo de trabajo. Su sistema inteligente permite el tensado, sellado térmico y corte del fleje en un solo paso, ofreciendo máxima eficiencia y fiabilidad. Con un diseño robusto y de bajo mantenimiento, la EX5000 está pensada para brindar un rendimiento consistente incluso en entornos industriales exigentes.',
      image: zunchadoraAutomatica,
      category: 'maquinas',
      subcategory: 'automaticas',
      inStock: true,
      specs: [
        'Automatización total del ciclo de flejado para mayor productividad.',
        'Compatible con diferentes medidas de fleje de polipropileno.',
        'Regulación de tensión adaptable a diversas cargas o paquetes.',
        'Unión por calor rápida y segura, sin elementos adicionales.',
        'Construcción sólida y duradera, apta para trabajo continuo.',
        'Ideal para integrar en procesos de embalaje automatizados.',
      ]
    },
    
    // Máquinas - Neumáticas
    {
      id: 'maquina-neu-aqd19',
      name: 'Máquina Zunchadora Manual Neumática para Fleje PET AQD19',
      price: 'A consultar',
      description: 'La **Máquina Zunchadora Manual Neumática AQD19** está diseñada para **aplicaciones industriales de flejado** que requieren potencia, rapidez y precisión. Funciona con **fleje de poliéster (PET)** y utiliza presión de aire para **tensar, sellar por fricción y cortar** el fleje de forma eficiente, reduciendo el esfuerzo del operador y mejorando la productividad en el proceso de embalaje. Gracias a su estructura compacta, resistente y fácil de operar, la AQD19 es ideal para cargas medianas y pesadas, brindando una sujeción segura y profesional. Se adapta perfectamente a líneas de embalaje manual donde se busca **automatización parcial** sin invertir en equipos completamente automáticos.',
      image: zunchadoraNeumatica,
      category: 'maquinas',
      subcategory: 'neumaticas',
      inStock: true,
      specs: [
        'Compatible con flejes PET de 13 a 19 mm de ancho.',
        'Operación neumática para tensado y sellado por fricción.',
        'Unión sin grapas, resistente y segura.',
        'Alta fuerza de tensión ajustable (hasta 3500 N aprox.).',
        'Diseño ergonómico que reduce la fatiga del operario.',
        'Cuerpo de aleación metálica de alta durabilidad.',
        'Ideal para embalaje de pallets, cajas grandes, materiales de construcción, electrodomésticos y más.',
        'Requiere: Conexión a compresor de aire.',
      ]
    },
    
    // Máquinas - A Batería
    {
      id: 'maquina-bateria-bt16jd',
      name: 'Máquina Zunchadora Manual a Batería (para Fleje PET) BT 16JD',
      price: 'A consultar',
      description: 'La **BT 16JD** es una **máquina sunchadora manual a batería** diseñada para el flejado profesional con **fleje de poliéster (PET)**. Ofrece una solución moderna, portátil y de alto rendimiento para el aseguramiento de cargas, combinando la practicidad de una herramienta inalámbrica con la eficiencia de un equipo industrial. Gracias a su **motor alimentado por batería recargable**, permite **tensar, sellar por fricción y cortar** el fleje en un solo paso, sin necesidad de conexión neumática o eléctrica constante. Ideal para entornos de trabajo dinámicos, donde se requiere rapidez, autonomía y libertad de movimiento.',
      image: zunchadoraABateria,
      category: 'maquinas',
      subcategory: 'bateria',
      inStock: true,
      specs: [
        'Compatible con flejes PET de 13 a 16 mm de ancho.',
        'Funcionamiento totalmente inalámbrico, con batería recargable de litio.',
        'Sellado por fricción: resistente y sin uso de grapas.',
        'Regulación electrónica de la tensión y el tiempo de sellado.',
        'Diseño compacto, liviano y ergonómico para uso prolongado sin fatiga.',
        'Alta velocidad de flejado, ideal para tareas repetitivas.',
        'Incluye: 1 batería recargable de litio, 1 cargador rápido y Manual de usuario.',
      ]
    },
    
    // Máquinas - Manuales
    {
      id: 'tensor-manual-as04',
      name: 'Tensor Manual AS04',
      price: 'A consultar',
      description: 'El **Tensor Manual AS04** es una herramienta robusta y confiable, diseñada para el **tensado de flejes plásticos** (como PET o PP) de forma manual. Su funcionamiento mecánico permite un uso simple y efectivo, ideal para entornos donde se requiere **sujetar cargas de forma segura** sin necesidad de energía eléctrica o neumática. Este tensor es una excelente opción para operaciones de **bajo a mediano volumen de flejado**, brindando un ajuste preciso del fleje sobre bultos, cajas o pallets. Su construcción metálica y diseño ergonómico garantizan durabilidad y comodidad durante el uso prolongado.',
      image: tensorManual,
      category: 'maquinas',
      subcategory: 'manuales',
      inStock: true,
      specs: [
        'Apto para flejes plásticos (PET o PP) de hasta 19 mm de ancho.',
        'Tensado mecánico por sistema de trinquete.',
        'Fácil de operar y mantener.',
        'Construcción resistente, ideal para uso industrial.',
        'Mango ergonómico para mayor comodidad y control.',
        'Compatible con herramientas de sellado manuales por grapas o fricción (según necesidad).',
      ]
    },
    {
      id: 'flejadora-manual-h42',
      name: 'Flejadora Manual H-42',
      price: 'A consultar',
      description: 'La **Flejadora Manual H-42** es una herramienta práctica y eficiente para el **flejado manual de cargas** con fleje plástico (PP o PET). Diseñada para ofrecer una **solución económica y confiable**, permite **tensar, sellar con grapas metálicas y cortar** el fleje en un solo proceso, ideal para trabajos de embalaje de bajo a mediano volumen. Con una estructura compacta y resistente, la H-42 se adapta a distintos entornos de trabajo, brindando firmeza en la sujeción de productos sobre pallets, cajas o bultos. Su operación sencilla la convierte en una herramienta ideal tanto para uso ocasional como regular.',
      image: flejadoraManual,
      category: 'maquinas',
      subcategory: 'manuales',
      inStock: true,
      specs: [
        'Compatible con flejes de polipropileno (PP) o poliéster (PET) de 12 a 16 mm.',
        'Funcionamiento 100 % manual, sin necesidad de energía eléctrica ni aire comprimido.',
        'Sistema de sellado con **grapas metálicas tipo “punch”**, firme y seguro.',
        'Fácil de usar y transportar.',
        'Cuerpo metálico duradero y palancas ergonómicas.',
      ]
    },
    
    // Servicios Técnicos
    {
      id: 'servicio-tecnico',
      name: 'Servicio Técnico para máquinas zunchadoras',
      price: 'A consultar',
      description: 'Ofrecemos un **servicio técnico especializado** en el mantenimiento, reparación y puesta a punto de **máquinas zunchadoras manuales, semiautomáticas y automáticas** para flejes de polipropileno (PP) y PET. Nuestro equipo de técnicos cuenta con amplia experiencia en diagnóstico, ajuste y reparación de equipos de distintas marcas y modelos, garantizando un servicio rápido, confiable y con repuestos originales o compatibles de alta calidad.',
      image: serviciosTecnicos,
      category: 'servicios',
      subcategory: '',
      inStock: true,
      specs: [
        'Diagnóstico y reparación de fallas mecánicas, eléctricas o electrónicas.',
        'Mantenimiento preventivo y correctivo.',
        'Puesta en marcha y calibración de equipos nuevos.',
        'Venta e instalación de repuestos y accesorios.',
        'Asesoramiento técnico personalizado.',
        'Atención rápida y profesional.',
        'Servicio en taller o in situ (según disponibilidad).',
        'Garantía por los trabajos realizados.',
        'Soporte post-servicio y seguimiento.',
        'Confíe en nuestra experiencia para mantener sus equipos en óptimas condiciones, reducir tiempos de inactividad y prolongar la vida útil de su maquinaria.'
      ]
    }
  ];

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Close product detail
  const closeProductDetail = () => {
    // Store current scroll position before closing
    const scrollPosition = window.scrollY;
    setSelectedProduct(null);
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    // Store current scroll position
    const scrollPosition = window.scrollY;
    setSelectedProduct(product);
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Optional: Show a toast or notification here
  };

  // Helper function to format numbers with fallback to dash
  const formatNumber = (value: any, decimals: number = 2): string => {
    const num = parseFloat(value);
    return isNaN(num) ? '-' : num.toFixed(decimals);
  };

  // Handle order submission
  const handleSubmitOrder = async (formData: OrderFormData) => {
    try {
      // Pre-calculate subtotals for each item
      const itemsWithSubtotals = cartItems.map(item => ({
        ...item,
        subtotal: (parseFloat(item.price) * item.quantity).toFixed(2)
      }));

      // Calculate total
      const total = itemsWithSubtotals
        .reduce((sum, item) => sum + parseFloat(item.subtotal), 0)
        .toFixed(2);

      // Format items as plain text for the email
      const itemsText = itemsWithSubtotals.map(item => 
        `${item.name} - Cantidad: ${item.quantity} - Precio: $${formatNumber(item.price)} - Subtotal: $${formatNumber(item.subtotal)}`
      ).join('\n');

      // Prepare order data for email - using simple text format
      const orderData = {
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString('es-AR'),
        company: formData.company,
        contactName: formData.contactName,
        phone: formData.phone,
        email: formData.email,
        notes: formData.notes || 'Sin notas adicionales',
        items: itemsText,
        total: formatNumber(total),
        subject: `Nuevo Pedido de ${formData.company || 'Cliente'} (ORD-${Date.now()})`
      };

      console.log('Sending to EmailJS:', JSON.stringify(orderData, null, 2));

      await import('@emailjs/browser').then(({ default: emailjs }) => {
        return emailjs.send(
          'service_enc7g5u',
          'template_a7gr1jq',
          orderData,
          '5L4jH4ocVgwz3qDBI'
        );
      });
      
      // Clear cart on success - don't close modal here, let the OrderSummaryModal handle it
      clearCart();
      
      // Return success status - the OrderSummaryModal will handle the success message
      return true;
    } catch (error) {
      console.error('Error submitting order:', error);
      // Return error status - the OrderSummaryModal will handle the error message
      throw new Error('Error al enviar el pedido');
    }
  };

  // Filter products based on search and selected category/subcategory
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  // Get breadcrumb items
  const getBreadcrumbs = () => {
    const items: Array<{ name: string; id: string | null }> = [{ name: 'Inicio', id: null }];
    
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        items.push({ name: category.name, id: category.id });
        
        if (selectedSubcategory) {
          const subcategory = category.subcategories?.find(sub => sub.id === selectedSubcategory);
          if (subcategory) {
            items.push({ name: subcategory.name, id: subcategory.id });
          }
        }
      }
    }
    
    return items;
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string, subcategoryId?: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId || null);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
  };
  // Render the component
  const breadcrumbs = getBreadcrumbs();
  const hasActiveFilters = selectedCategory || searchQuery;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 text-white overflow-hidden rounded-3xl mb-16">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${productsHeroBg})` }}
          ></div>
          <div className="relative px-8 py-16 lg:px-16 lg:py-24">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Nuestros <span className="text-yellow-400">Productos</span>
            </h1>
            <p className="text-xl lg:text-2xl text-sky-100 mb-8 max-w-2xl">
              Soluciones profesionales para todas sus necesidades de flejado y embalaje.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-lg">
              <p className="text-lg text-sky-100">
                Ofrecemos una amplia gama de máquinas flejadoras, flejes y accesorios de la más alta calidad para satisfacer todas sus necesidades de embalaje industrial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Floating Cart Button */}
        <div className="fixed right-6 top-24 z-40 transition-all duration-300 hover:scale-105">
        <button 
          onClick={() => setShowCart(true)}
          className={`group relative flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-200 ${
            itemCount > 0 
              ? 'bg-sky-500 hover:bg-sky-600' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          aria-label={`Ver carrito (${itemCount} ${itemCount === 1 ? 'producto' : 'productos'})`}
        >
          <ShoppingCart 
            className={`h-6 w-6 transition-colors duration-200 ${
              itemCount > 0 ? 'text-white' : 'text-gray-600'
            }`} 
          />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white shadow-sm">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Ver carrito ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})</span>
        </button>
        
        {/* Tooltip */}
        {itemCount === 0 && (
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Ver carrito
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
          </div>
        )}
        </div>
      </div>
      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform ${showCart ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Carrito de Compras</h2>
            <button 
              onClick={() => setShowCart(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Cerrar carrito"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.price}</p>
                      <div className="flex items-center mt-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-sky-600 p-1"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-sky-600 p-1"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between font-medium text-lg mb-4">
                <span>Total:</span>
                <span>A consultar</span>
              </div>
              <button 
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center"
                onClick={() => setIsOrderModalOpen(true)}
              >
                <Send className="h-5 w-5 mr-2" />
                Generar pedido
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={closeProductDetail}
          onAddToCart={handleAddToCart}
        />
      )}
      
      {/* Order Summary Modal */}
      <OrderSummaryModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, quantity) => {
          if (quantity <= 0) {
            removeFromCart(id);
          } else {
            updateQuantity(id, quantity);
          }
        }}
        onRemoveItem={removeFromCart}
        onSubmitOrder={handleSubmitOrder}
      />

      {/* Overlay */}
      {(selectedProduct || showCart) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            setSelectedProduct(null);
            setShowCart(false);
          }}
        />
      )}
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item.id || 'home'}>
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
              <button
                onClick={() => {
                  if (index === 0) {
                    clearFilters();
                  } else if (index === 1) {
                    handleCategorySelect(breadcrumbs[1].id as string);
                  }
                }}
                className={`hover:text-sky-500 transition-colors ${
                  index === breadcrumbs.length - 1 ? 'font-semibold text-gray-900' : ''
                }`}
              >
                {item.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center justify-between">
                  <span>Categorías</span>
                  {hasActiveFilters && (
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-sky-500 hover:text-sky-700"
                    >
                      Limpiar
                    </button>
                  )}
                </h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.id} className="mb-1">
                      <button
                        onClick={() => {
                          if (category.subcategories && category.subcategories.length > 0) {
                            toggleCategory(category.id);
                          }
                          handleCategorySelect(category.id);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                          selectedCategory === category.id ? 'bg-sky-50 text-sky-600' : 'hover:bg-gray-50'
                        } ${category.subcategories && category.subcategories.length > 0 ? 'justify-between' : ''}`}
                      >
                        <span>{category.name}</span>
                        {category.subcategories && category.subcategories.length > 0 && (
                          expandedCategories[category.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        )}
                      </button>
                      {expandedCategories[category.id] && category.subcategories && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.id}>
                              <button
                                onClick={() => handleCategorySelect(category.id, subcategory.id)}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded-md flex items-center ${
                                  selectedSubcategory === subcategory.id
                                    ? 'bg-sky-100 text-sky-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {subcategory.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory 
                  ? categories.find(c => c.id === selectedCategory)?.name + 
                    (selectedSubcategory 
                      ? ` > ${categories
                          .find(c => c.id === selectedCategory)?.subcategories
                          ?.find(s => s.id === selectedSubcategory)?.name}`
                      : '')
                  : 'Todos los productos'}
                <span className="text-gray-500 text-lg font-normal ml-2">
                  ({filteredProducts.length} productos)
                </span>
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Ordenar por:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-sky-400 focus:border-transparent">
                  <option>Relevancia</option>
                  <option>Precio: Menor a mayor</option>
                  <option>Precio: Mayor a menor</option>
                  <option>Mejor valorados</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500 mb-4">Intenta con otros filtros o términos de búsqueda.</p>
                <button
                  onClick={clearFilters}
                  className="bg-sky-400 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                  >
                    <div 
                      className="relative h-48 bg-gray-100 cursor-pointer"
                      onClick={() => handleProductSelect(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 
                        className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer" 
                        style={{ height: '3em' }}
                        onClick={() => handleProductSelect(product)}
                      >
                        {product.name}
                      </h3>
                      <div 
                        className="text-gray-600 text-sm mb-2 line-clamp-3 cursor-pointer prose prose-sm max-w-none" 
                        style={{ height: '4.5em', overflow: 'hidden' }}
                        onClick={() => handleProductSelect(product)}
                      >
                        <ReactMarkdown>
                          {product.description.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </ReactMarkdown>
                      </div>
                      <div className="mt-auto pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-sky-600">{product.price}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                              // Show a small notification or feedback
                              const button = e.currentTarget;
                              const originalText = button.textContent;
                              button.textContent = '¡Agregado!';
                              button.classList.add('bg-green-500', 'hover:bg-green-600');
                              button.classList.remove('bg-sky-500', 'hover:bg-sky-600');
                              
                              setTimeout(() => {
                                button.textContent = originalText;
                                button.classList.add('bg-sky-500', 'hover:bg-sky-600');
                                button.classList.remove('bg-green-500', 'hover:bg-green-600');
                              }, 1500);
                            }}
                            disabled={!product.inStock}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${
                              product.inStock
                                ? 'bg-sky-500 hover:bg-sky-600 text-white'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {product.inStock ? 'Agregar' : 'Sin stock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;