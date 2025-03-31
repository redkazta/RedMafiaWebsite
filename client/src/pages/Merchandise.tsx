import { useState } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, Tag, Heart, ChevronDown, Filter, Check } from 'lucide-react';

export default function Merchandise() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  const products = [
    {
      id: 1,
      name: 'Camiseta Tour 2023',
      category: 'camisetas',
      price: 350,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Rojo'],
      images: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: true,
      isSoldOut: false
    },
    {
      id: 2,
      name: 'Gorra Red Mafia Clásica',
      category: 'accesorios',
      price: 250,
      sizes: ['Única'],
      colors: ['Negro', 'Rojo', 'Blanco'],
      images: [
        'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: false,
      isSoldOut: false
    },
    {
      id: 3,
      name: 'Sudadera Logo Vintage',
      category: 'sudaderas',
      price: 650,
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Negro', 'Gris'],
      images: [
        'https://images.unsplash.com/photo-1578768079050-7b5e476d3f08?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: true,
      isSoldOut: false
    },
    {
      id: 4,
      name: 'Vinilo "Sangre y Fuego"',
      category: 'musica',
      price: 450,
      sizes: ['Única'],
      colors: ['Negro'],
      images: [
        'https://images.unsplash.com/photo-1603048588665-709f3e9a145c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1620963509016-0e2b59e36e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: false,
      isSoldOut: false
    },
    {
      id: 5,
      name: 'Pulsera Red Mafia',
      category: 'accesorios',
      price: 120,
      sizes: ['Única'],
      colors: ['Negro', 'Rojo'],
      images: [
        'https://images.unsplash.com/photo-1613746203812-717e7c10a7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: false,
      isSoldOut: true
    },
    {
      id: 6,
      name: 'CD "Renacimiento" + Booklet',
      category: 'musica',
      price: 280,
      sizes: ['Única'],
      colors: ['Estándar'],
      images: [
        'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1604162551902-3a90856b8e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: true,
      isSoldOut: false
    },
    {
      id: 7,
      name: 'Póster Gira 2023',
      category: 'accesorios',
      price: 180,
      sizes: ['50x70cm'],
      colors: ['Estándar'],
      images: [
        'https://images.unsplash.com/photo-1561225297-a5e8be5d8673?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1583591900414-7031eb309cb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: false,
      isSoldOut: false
    },
    {
      id: 8,
      name: 'Camiseta "Renacimiento"',
      category: 'camisetas',
      price: 380,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Rojo', 'Blanco'],
      images: [
        'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      isNew: true,
      isSoldOut: false
    }
  ];
  
  const categories = [
    { id: 'todos', name: 'Todos los productos' },
    { id: 'camisetas', name: 'Camisetas' },
    { id: 'sudaderas', name: 'Sudaderas' },
    { id: 'accesorios', name: 'Accesorios' },
    { id: 'musica', name: 'Música' }
  ];
  
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'Única'];
  const colors = ['Negro', 'Rojo', 'Blanco', 'Gris', 'Estándar'];
  
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  
  const filteredProducts = products.filter(product => {
    const categoryMatch = activeCategory === 'todos' || product.category === activeCategory;
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const colorMatch = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
    
    return categoryMatch && sizeMatch && colorMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1508252592163-5d3c3c559269?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000] to-transparent z-20"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-l from-[#FF0000] to-transparent z-20"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl red-mafia-title mb-6">
              TIENDA OFICIAL
            </h1>
            <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
            <p className="text-[#F5F5F5] text-xl leading-relaxed mb-8 max-w-2xl">
              Lleva un pedazo de RED MAFIA contigo. Desde camisetas y sudaderas hasta ediciones 
              especiales de nuestros álbumes y accesorios únicos.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#productos" 
                className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium red-mafia-glow"
              >
                <ShoppingCart size={18} className="mr-2" />
                Ver Productos
              </a>
              <Link 
                href="/contacto" 
                className="bg-transparent border-2 border-[#950101] hover:border-[#FF0000] hover:text-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium"
              >
                <Tag size={18} className="mr-2" />
                Pedidos Especiales
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Section */}
      <section id="productos" className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-6">
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)} 
              className="w-full bg-[#1E1E1E] border border-[#950101]/30 text-[#F5F5F5] py-3 px-4 rounded-md flex justify-between items-center"
            >
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                Filtros
              </span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar / Filters */}
            <div 
              className={`${
                filtersOpen ? 'block' : 'hidden'
              } md:block w-full md:w-1/4 lg:w-1/5`}
            >
              <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-6 space-y-8 sticky top-24">
                <div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Categorías</h3>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left py-2 px-3 rounded-md flex items-center justify-between ${
                            activeCategory === category.id 
                              ? 'bg-[#950101]/20 text-[#FF0000] font-medium' 
                              : 'text-[#F5F5F5]/80 hover:bg-[#2D0000]/20'
                          }`}
                        >
                          {category.name}
                          {activeCategory === category.id && (
                            <Check size={16} className="text-[#FF0000]" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Tallas</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-1 px-3 rounded-md border transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-[#950101] text-white border-[#950101]' 
                            : 'border-[#950101]/30 text-[#F5F5F5]/80 hover:border-[#950101]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Colores</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`py-1 px-3 rounded-md border transition-colors ${
                          selectedColors.includes(color)
                            ? 'bg-[#950101] text-white border-[#950101]' 
                            : 'border-[#950101]/30 text-[#F5F5F5]/80 hover:border-[#950101]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">Precio</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F5F5]/80">Min:</span>
                      <span className="text-[#F5F5F5]">$0</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      className="w-full accent-[#FF0000] bg-[#2D0000]"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F5F5]/80">Max:</span>
                      <span className="text-[#F5F5F5]">$1000</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[#2D0000]">
                  <button 
                    onClick={() => {
                      setActiveCategory('todos');
                      setSelectedSizes([]);
                      setSelectedColors([]);
                    }}
                    className="w-full bg-[#1E1E1E] border border-[#950101] hover:bg-[#950101] text-[#F5F5F5] py-2 rounded-md transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl red-mafia-title">
                  {activeCategory === 'todos' ? 'TODOS LOS PRODUCTOS' : categories.find(c => c.id === activeCategory)?.name.toUpperCase()}
                </h2>
                <div className="text-[#F5F5F5]/80">
                  Mostrando {filteredProducts.length} productos
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="bg-[#1E1E1E] rounded-lg p-8 text-center">
                  <p className="text-[#F5F5F5] text-lg mb-4">No se encontraron productos con los filtros seleccionados.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('todos');
                      setSelectedSizes([]);
                      setSelectedColors([]);
                    }}
                    className="bg-[#950101] hover:bg-[#FF0000] text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg overflow-hidden group"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="relative aspect-square">
                        <img 
                          src={product.images[hoveredProduct === product.id ? 1 : 0]} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-opacity duration-500"
                        />
                        {product.isNew && (
                          <div className="absolute top-3 left-3 bg-[#FF0000] text-white text-xs font-bold px-2 py-1 rounded">
                            NUEVO
                          </div>
                        )}
                        {product.isSoldOut && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">AGOTADO</span>
                          </div>
                        )}
                        <button 
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF0000]/80 transition-colors"
                        >
                          <Heart size={16} />
                        </button>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-[#F5F5F5] font-bold text-lg mb-1">{product.name}</h3>
                        <div className="text-[#F5F5F5]/50 text-sm mb-3">{categories.find(c => c.id === product.category)?.name}</div>
                        <div className="flex justify-between items-center">
                          <div className="text-[#FF0000] font-bold">${product.price} MXN</div>
                          <button 
                            className={`px-3 py-1.5 rounded ${
                              product.isSoldOut 
                                ? 'bg-[#2D0000]/50 text-[#F5F5F5]/50 cursor-not-allowed' 
                                : 'bg-[#950101] hover:bg-[#FF0000] text-white transition-colors'
                            }`}
                            disabled={product.isSoldOut}
                          >
                            {product.isSoldOut ? 'Agotado' : 'Añadir'}
                          </button>
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
      
      {/* Featured Collection */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl red-mafia-title mb-4 text-center">
              COLECCIÓN "RENACIMIENTO"
            </h2>
            <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
            <p className="text-[#F5F5F5]/80 text-lg text-center max-w-3xl mb-8">
              Descubre nuestra colección más reciente inspirada en nuestro último álbum. Diseños 
              exclusivos con edición limitada que capturan la esencia del renacimiento musical de RED MAFIA.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Colección Renacimiento"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl text-white font-bold mb-2">Edición Especial</h3>
                <p className="text-[#F5F5F5]/80 mb-4">Disponible por tiempo limitado</p>
                <a 
                  href="#productos" 
                  className="bg-white text-[#950101] hover:bg-[#F5F5F5] px-6 py-2 rounded-md font-medium inline-block w-max transition-colors"
                >
                  Ver Colección
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-4 hover:border-[#FF0000] transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Camiseta Renacimiento"
                  className="w-full h-auto mb-4 rounded"
                />
                <h3 className="text-[#F5F5F5] font-bold">Camiseta "Renacimiento"</h3>
                <p className="text-[#FF0000] font-bold mt-1">$380 MXN</p>
              </div>
              
              <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-4 hover:border-[#FF0000] transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1620963509016-0e2b59e36e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Vinilo Edición Especial"
                  className="w-full h-auto mb-4 rounded"
                />
                <h3 className="text-[#F5F5F5] font-bold">Vinilo Edición Especial</h3>
                <p className="text-[#FF0000] font-bold mt-1">$550 MXN</p>
              </div>
              
              <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-4 hover:border-[#FF0000] transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1598403031688-e7cfd2c222c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Sudadera Limitada"
                  className="w-full h-auto mb-4 rounded"
                />
                <h3 className="text-[#F5F5F5] font-bold">Sudadera Limitada</h3>
                <p className="text-[#FF0000] font-bold mt-1">$750 MXN</p>
              </div>
              
              <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-4 hover:border-[#FF0000] transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1613746203812-717e7c10a7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Pulsera Exclusiva"
                  className="w-full h-auto mb-4 rounded"
                />
                <h3 className="text-[#F5F5F5] font-bold">Pulsera Exclusiva</h3>
                <p className="text-[#FF0000] font-bold mt-1">$180 MXN</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-6 hover:border-[#FF0000] transition-colors">
              <h3 className="text-2xl red-mafia-title mb-4">ENVÍOS</h3>
              <div className="h-1 w-12 bg-[#FF0000] mb-6"></div>
              <p className="text-[#F5F5F5]/80 mb-4">
                Realizamos envíos a todo México. Los pedidos se procesan en 2-3 días hábiles y son 
                enviados por paquetería con seguimiento.
              </p>
              <ul className="space-y-2 text-[#F5F5F5]/80">
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Envío estándar (5-7 días): $120 MXN
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Envío express (2-3 días): $200 MXN
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Envíos internacionales: Consultar tarifas
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-6 hover:border-[#FF0000] transition-colors">
              <h3 className="text-2xl red-mafia-title mb-4">PAGOS</h3>
              <div className="h-1 w-12 bg-[#FF0000] mb-6"></div>
              <p className="text-[#F5F5F5]/80 mb-4">
                Ofrecemos múltiples métodos de pago seguros para tu comodidad. Todas las 
                transacciones están protegidas y cifradas.
              </p>
              <ul className="space-y-2 text-[#F5F5F5]/80">
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Tarjetas de crédito/débito
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  PayPal
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Transferencia bancaria
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Pago en OXXO
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-6 hover:border-[#FF0000] transition-colors">
              <h3 className="text-2xl red-mafia-title mb-4">DEVOLUCIONES</h3>
              <div className="h-1 w-12 bg-[#FF0000] mb-6"></div>
              <p className="text-[#F5F5F5]/80 mb-4">
                Tu satisfacción es nuestra prioridad. Si tienes algún problema con tu compra, 
                contamos con política de devoluciones.
              </p>
              <ul className="space-y-2 text-[#F5F5F5]/80">
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  30 días para devoluciones
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Producto debe estar sin usar y con etiquetas
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2">•</span>
                  Reembolso o cambio por otro producto
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-[#950101] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            ACCESO EXCLUSIVO
          </h2>
          <p className="text-white/90 text-xl mx-auto max-w-2xl mb-8">
            Suscríbete para recibir ofertas exclusivas, acceso anticipado a nuevos lanzamientos y un 10% de descuento en tu primera compra.
          </p>
          <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow bg-white/10 border border-white/30 text-white placeholder:text-white/50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-[#950101] hover:bg-[#F5F5F5] px-6 py-3 rounded-md font-bold transition-colors"
            >
              SUSCRIBIRSE
            </button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}