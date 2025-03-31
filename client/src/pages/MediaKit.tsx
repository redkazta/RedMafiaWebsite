import { useState } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileDown, Image, BookOpen, Mail, Printer, Facebook, Instagram, Twitter, Copy, Check } from 'lucide-react';

export default function MediaKit() {
  const [activeTab, setActiveTab] = useState<'bio' | 'fotos' | 'prensa' | 'contacto'>('bio');
  const [copiedLink, setCopiedLink] = useState('');
  
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => {
      setCopiedLink('');
    }, 3000);
  };
  
  const mediaReleases = [
    {
      id: 1,
      title: 'RED MAFIA ANUNCIA GIRA INTERNACIONAL 2023',
      date: '15 Enero, 2023',
      excerpt: 'La banda mexicana RED MAFIA anuncia su primera gira internacional que incluirá ciudades clave de América Latina y Estados Unidos.',
      pdf: '#',
    },
    {
      id: 2,
      title: 'LANZAMIENTO DEL NUEVO ÁLBUM "RENACIMIENTO"',
      date: '22 Marzo, 2023',
      excerpt: 'RED MAFIA presenta su segundo álbum de estudio "RENACIMIENTO", una evolución sonora que marca un antes y después en su carrera.',
      pdf: '#',
    },
    {
      id: 3,
      title: 'COLABORACIÓN ESPECIAL CON PRODUCTORES INTERNACIONALES',
      date: '5 Mayo, 2023',
      excerpt: 'La banda anuncia su trabajo con reconocidos productores de la escena internacional para sus próximos lanzamientos.',
      pdf: '#',
    },
    {
      id: 4,
      title: 'RED MAFIA EN EL FESTIVAL ROCK EN ROJO 2023',
      date: '30 Junio, 2023',
      excerpt: 'La agrupación se presenta como uno de los actos principales del reconocido festival Rock en Rojo en la Ciudad de México.',
      pdf: '#',
    }
  ];
  
  const photos = [
    {
      id: 1,
      title: 'RED MAFIA - Sesión Oficial 2023',
      photographer: 'Alejandro Meres',
      thumbnails: [
        'https://images.unsplash.com/photo-1499364615646-a1c7ed9f9ae2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1508252592163-5d3c3c559269?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      downloadLink: '#'
    },
    {
      id: 2,
      title: 'Presentación Festival Vive Latino',
      photographer: 'Marina Rosales',
      thumbnails: [
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      downloadLink: '#'
    },
    {
      id: 3,
      title: 'Grabación Álbum "Renacimiento"',
      photographer: 'Daniel Fuentes',
      thumbnails: [
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1598387992619-f86d5293bace?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1594623274890-6b631e351f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1508664521053-2b8d4db617e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ],
      downloadLink: '#'
    }
  ];
  
  const pressContacts = [
    {
      name: 'Ana García',
      role: 'Relaciones Públicas',
      email: 'prensa@redmafia.com',
      phone: '+52 55 1234 5678'
    },
    {
      name: 'Martín López',
      role: 'Manager',
      email: 'manager@redmafia.com',
      phone: '+52 55 8765 4321'
    },
    {
      name: 'Claudia Morales',
      role: 'Booking',
      email: 'booking@redmafia.com',
      phone: '+52 55 2468 1357'
    }
  ];
  
  const socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com/redmafia', icon: Facebook },
    { platform: 'Instagram', url: 'https://instagram.com/redmafia.oficial', icon: Instagram },
    { platform: 'Twitter', url: 'https://twitter.com/redmafia', icon: Twitter }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1504680177321-2e6a879aac86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000] to-transparent z-20"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl red-mafia-title mb-6">
              MEDIA KIT
            </h1>
            <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
            <p className="text-[#F5F5F5] text-xl leading-relaxed mb-8 max-w-2xl">
              Recursos oficiales para medios de comunicación, periodistas y profesionales de la industria. 
              Encuentra biografías, fotos de alta resolución, comunicados de prensa y material promocional.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#resources" 
                className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium red-mafia-glow"
              >
                <FileDown size={18} className="mr-2" />
                Descargar Recursos
              </a>
              <a 
                href="#contact" 
                className="bg-transparent border-2 border-[#950101] hover:border-[#FF0000] hover:text-[#FF0000] transition-colors px-6 py-3 rounded-md text-[#F5F5F5] inline-flex items-center font-medium"
              >
                <Mail size={18} className="mr-2" />
                Contacto para Prensa
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources Section */}
      <section id="resources" className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl red-mafia-title mb-8 text-center">
              RECURSOS PARA MEDIOS
            </h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                onClick={() => setActiveTab('bio')}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === 'bio' 
                    ? 'bg-[#950101] text-white' 
                    : 'bg-[#1E1E1E] text-[#F5F5F5]/80 hover:bg-[#2D0000] hover:text-[#F5F5F5]'
                }`}
              >
                <BookOpen size={18} className="inline mr-2" />
                Biografía
              </button>
              <button
                onClick={() => setActiveTab('fotos')}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === 'fotos' 
                    ? 'bg-[#950101] text-white' 
                    : 'bg-[#1E1E1E] text-[#F5F5F5]/80 hover:bg-[#2D0000] hover:text-[#F5F5F5]'
                }`}
              >
                <Image size={18} className="inline mr-2" />
                Fotos
              </button>
              <button
                onClick={() => setActiveTab('prensa')}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === 'prensa' 
                    ? 'bg-[#950101] text-white' 
                    : 'bg-[#1E1E1E] text-[#F5F5F5]/80 hover:bg-[#2D0000] hover:text-[#F5F5F5]'
                }`}
              >
                <Printer size={18} className="inline mr-2" />
                Comunicados
              </button>
              <button
                onClick={() => setActiveTab('contacto')}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === 'contacto' 
                    ? 'bg-[#950101] text-white' 
                    : 'bg-[#1E1E1E] text-[#F5F5F5]/80 hover:bg-[#2D0000] hover:text-[#F5F5F5]'
                }`}
              >
                <Mail size={18} className="inline mr-2" />
                Contacto
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-8">
              {/* Bio Tab */}
              {activeTab === 'bio' && (
                <div>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6">Biografía Oficial</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 space-y-4 text-[#F5F5F5]/80">
                      <p>
                        <span className="text-[#FF0000] font-bold">RED MAFIA</span> es una banda de rock alternativo originaria de Guadalajara, México, 
                        formada en 2015 por Carlos Vega (voz/guitarra), Miguel Ángel Durán (batería), 
                        Lucía Martínez (bajo) y Roberto Sánchez (guitarra).
                      </p>
                      <p>
                        Con un sonido que fusiona la intensidad del rock con elementos de música urbana y 
                        electrónica, RED MAFIA se ha consolidado como una de las propuestas más innovadoras 
                        y auténticas de la escena musical latinoamericana.
                      </p>
                      <p>
                        Su álbum debut "SANGRE Y FUEGO" (2018) los catapultó a la fama nacional, destacando 
                        sencillos como "Noche Eterna" y "El Ritual" que rápidamente se convirtieron en himnos 
                        entre sus seguidores. Tras una exitosa gira por México en 2020, la banda expandió 
                        sus horizontes colaborando con artistas de Argentina, España y Estados Unidos.
                      </p>
                      <p>
                        En 2023, RED MAFIA lanzó su segundo álbum "RENACIMIENTO", marcando una evolución 
                        en su sonido al incorporar elementos electrónicos y experimentales que reflejan su 
                        madurez creativa. El álbum ha sido aclamado por la crítica por su innovación sonora 
                        y la profundidad de sus letras.
                      </p>
                      <p>
                        Actualmente, la banda se encuentra en su primera gira internacional, llevando 
                        su música a escenarios de América Latina y Estados Unidos, consolidando su 
                        proyección internacional.
                      </p>
                    </div>
                    
                    <div>
                      <div className="bg-[#0A0A0A] border border-[#950101]/30 rounded-lg p-6">
                        <h4 className="text-xl font-bold text-[#F5F5F5] mb-4">Versiones para descargar</h4>
                        <div className="space-y-4">
                          <a 
                            href="#" 
                            className="flex items-center justify-between bg-[#1E1E1E] hover:bg-[#2D0000] p-3 rounded-md text-[#F5F5F5] transition-colors"
                          >
                            <span>Biografía Completa</span>
                            <FileDown size={18} />
                          </a>
                          <a 
                            href="#" 
                            className="flex items-center justify-between bg-[#1E1E1E] hover:bg-[#2D0000] p-3 rounded-md text-[#F5F5F5] transition-colors"
                          >
                            <span>Biografía Corta</span>
                            <FileDown size={18} />
                          </a>
                          <a 
                            href="#" 
                            className="flex items-center justify-between bg-[#1E1E1E] hover:bg-[#2D0000] p-3 rounded-md text-[#F5F5F5] transition-colors"
                          >
                            <span>Fact Sheet</span>
                            <FileDown size={18} />
                          </a>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-[#0A0A0A] border border-[#950101]/30 rounded-lg p-6">
                        <h4 className="text-xl font-bold text-[#F5F5F5] mb-4">Datos breves</h4>
                        <ul className="space-y-3 text-[#F5F5F5]/80">
                          <li className="flex items-start">
                            <span className="text-[#FF0000] mr-2">•</span>
                            <div>
                              <span className="font-bold text-[#F5F5F5]">Género:</span> Rock Alternativo / Fusión
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF0000] mr-2">•</span>
                            <div>
                              <span className="font-bold text-[#F5F5F5]">Origen:</span> Guadalajara, México
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF0000] mr-2">•</span>
                            <div>
                              <span className="font-bold text-[#F5F5F5]">Formación:</span> 2015
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FF0000] mr-2">•</span>
                            <div>
                              <span className="font-bold text-[#F5F5F5]">Discografía:</span> 2 álbumes, 1 EP
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Photos Tab */}
              {activeTab === 'fotos' && (
                <div>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6">Fotos Oficiales</h3>
                  <p className="text-[#F5F5F5]/80 mb-8">
                    Imágenes oficiales de RED MAFIA para uso en medios de comunicación. 
                    Haz clic en "Descargar Pack" para obtener todas las fotos de cada sesión en alta resolución.
                    <span className="block mt-2 text-[#FF0000]/80 italic">
                      Por favor, incluye los créditos de fotografía correspondientes en todas las publicaciones.
                    </span>
                  </p>
                  
                  <div className="space-y-10">
                    {photos.map((photoSet) => (
                      <div key={photoSet.id} className="border-b border-[#2D0000] pb-10 last:border-b-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                          <div>
                            <h4 className="text-xl font-bold text-[#F5F5F5] mb-1">{photoSet.title}</h4>
                            <p className="text-[#F5F5F5]/60 text-sm">Fotografía: {photoSet.photographer}</p>
                          </div>
                          <a 
                            href={photoSet.downloadLink} 
                            className="mt-4 md:mt-0 bg-[#950101] hover:bg-[#FF0000] transition-colors px-4 py-2 rounded-md text-[#F5F5F5] inline-flex items-center font-medium"
                          >
                            <FileDown size={16} className="mr-2" />
                            Descargar Pack
                          </a>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {photoSet.thumbnails.map((thumbnail, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                              <img 
                                src={thumbnail} 
                                alt={`${photoSet.title} - Imagen ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button className="bg-white text-[#950101] hover:bg-[#F5F5F5] w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                  <FileDown size={18} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Press Tab */}
              {activeTab === 'prensa' && (
                <div>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6">Comunicados de Prensa</h3>
                  <p className="text-[#F5F5F5]/80 mb-8">
                    Comunicados oficiales sobre noticias, lanzamientos y actividades de RED MAFIA. 
                    Haz clic en el título para ver el comunicado completo o en "Descargar PDF" para obtener la versión para imprimir.
                  </p>
                  
                  <div className="space-y-6">
                    {mediaReleases.map((release) => (
                      <div 
                        key={release.id}
                        className="bg-[#0A0A0A] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg p-6 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <h4 className="text-xl font-bold text-[#F5F5F5]">{release.title}</h4>
                          <span className="text-[#F5F5F5]/60 text-sm mt-1 md:mt-0">{release.date}</span>
                        </div>
                        <p className="text-[#F5F5F5]/80 mb-4">{release.excerpt}</p>
                        <div className="flex flex-wrap gap-3">
                          <a 
                            href="#" 
                            className="bg-[#1E1E1E] hover:bg-[#2D0000] transition-colors px-4 py-2 rounded-md text-[#F5F5F5] inline-flex items-center text-sm"
                          >
                            Ver completo
                          </a>
                          <a 
                            href={release.pdf} 
                            className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-4 py-2 rounded-md text-[#F5F5F5] inline-flex items-center text-sm"
                          >
                            <FileDown size={16} className="mr-2" />
                            Descargar PDF
                          </a>
                          <button
                            onClick={() => copyToClipboard(`https://redmafia.com/press/release/${release.id}`)}
                            className="bg-[#1E1E1E] hover:bg-[#2D0000] transition-colors px-4 py-2 rounded-md text-[#F5F5F5] inline-flex items-center text-sm"
                          >
                            {copiedLink === `https://redmafia.com/press/release/${release.id}` ? (
                              <>
                                <Check size={16} className="mr-2" />
                                Copiado
                              </>
                            ) : (
                              <>
                                <Copy size={16} className="mr-2" />
                                Copiar Enlace
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Contact Tab */}
              {activeTab === 'contacto' && (
                <div id="contact">
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6">Contacto para Prensa</h3>
                  <p className="text-[#F5F5F5]/80 mb-8">
                    Para solicitudes de entrevistas, acreditaciones de prensa, material exclusivo 
                    o cualquier otra consulta, ponte en contacto con nuestro equipo de prensa.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {pressContacts.map((contact, index) => (
                      <div 
                        key={index}
                        className="bg-[#0A0A0A] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg p-6 transition-colors"
                      >
                        <h4 className="text-xl font-bold text-[#F5F5F5] mb-1">{contact.name}</h4>
                        <p className="text-[#FF0000] mb-4">{contact.role}</p>
                        <div className="space-y-2 text-[#F5F5F5]/80">
                          <div className="flex items-center">
                            <Mail size={16} className="mr-2" />
                            <a href={`mailto:${contact.email}`} className="hover:text-[#FF0000] transition-colors">
                              {contact.email}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="mr-2"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-[#0A0A0A] border border-[#950101]/30 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-[#F5F5F5] mb-4">Redes Sociales Oficiales</h4>
                    <p className="text-[#F5F5F5]/80 mb-6">
                      Síguenos en nuestras redes sociales oficiales para estar al día con nuestras últimas noticias y actividades.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((social, index) => (
                        <a 
                          key={index}
                          href={social.url}
                          className="bg-[#1E1E1E] hover:bg-[#950101]/20 border border-[#950101]/30 hover:border-[#FF0000] rounded-lg p-4 flex items-center gap-3 transition-all duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <social.icon 
                            size={24} 
                            className="text-[#F5F5F5] group-hover:text-[#FF0000] transition-colors duration-300" 
                          />
                          <span className="text-[#F5F5F5]">{social.platform}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Logo Pack Section */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl red-mafia-title mb-4 text-center">
              PAQUETE DE LOGOS E IDENTIDAD
            </h2>
            <div className="h-1 w-20 bg-[#FF0000] mb-8"></div>
            <p className="text-[#F5F5F5]/80 text-lg text-center max-w-3xl mb-8">
              Descarga nuestros logos oficiales en diferentes formatos y versiones para su uso en publicaciones, 
              artículos y promociones relacionadas con RED MAFIA.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1E1E1E] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg overflow-hidden transition-colors">
              <div className="h-48 bg-[#0A0A0A] flex items-center justify-center p-6">
                <div className="h-full w-auto overflow-hidden">
                  <img 
                    src="/red-mafia-logo.png" 
                    alt="RED MAFIA - Logo Principal" 
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Logo Principal</h3>
                <p className="text-[#F5F5F5]/70 text-sm mb-4">Versión estándar del logo RED MAFIA en alta resolución.</p>
                <div className="flex gap-2">
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    PNG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    SVG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    AI
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg overflow-hidden transition-colors">
              <div className="h-48 bg-[#0A0A0A] flex items-center justify-center p-6">
                <div className="h-full w-auto overflow-hidden">
                  {/* Placeholder for a horizontal version of the logo */}
                  <img 
                    src="/red-mafia-logo.png" 
                    alt="RED MAFIA - Logo Horizontal" 
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Logo Horizontal</h3>
                <p className="text-[#F5F5F5]/70 text-sm mb-4">Versión horizontal para headers y espacios alargados.</p>
                <div className="flex gap-2">
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    PNG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    SVG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    AI
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg overflow-hidden transition-colors">
              <div className="h-48 bg-white flex items-center justify-center p-6">
                <div className="h-full w-auto overflow-hidden">
                  <img 
                    src="/red-mafia-logo.png" 
                    alt="RED MAFIA - Logo Invertido" 
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Logo Invertido</h3>
                <p className="text-[#F5F5F5]/70 text-sm mb-4">Versión para usar sobre fondos claros.</p>
                <div className="flex gap-2">
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    PNG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    SVG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    AI
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg overflow-hidden transition-colors">
              <div className="h-48 bg-[#0A0A0A] flex items-center justify-center p-6">
                <div className="h-full w-auto overflow-hidden">
                  {/* Placeholder for RENACIMIENTO logo */}
                  <div className="red-mafia-title text-4xl text-center">
                    RENACIMIENTO
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Logo "Renacimiento"</h3>
                <p className="text-[#F5F5F5]/70 text-sm mb-4">Logo promocional del último álbum.</p>
                <div className="flex gap-2">
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    PNG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    SVG
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    AI
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg overflow-hidden transition-colors">
              <div className="h-48 bg-[#0A0A0A] flex items-center justify-center p-6">
                <div className="h-full w-auto overflow-hidden">
                  {/* Placeholder for typography */}
                  <div className="red-mafia-title text-5xl">
                    RED MAFIA
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Tipografía Oficial</h3>
                <p className="text-[#F5F5F5]/70 text-sm mb-4">Fuentes utilizadas en la identidad de la banda.</p>
                <div className="flex gap-2">
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    FUENTES
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    GUÍA
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 hover:border-[#FF0000] rounded-lg overflow-hidden transition-colors">
              <div className="h-48 bg-gradient-to-r from-[#950101] to-[#FF0000] flex items-center justify-center p-6">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-[#950101] h-16 rounded"></div>
                  <div className="bg-[#FF0000] h-16 rounded"></div>
                  <div className="bg-[#0A0A0A] h-16 rounded"></div>
                  <div className="bg-[#1E1E1E] h-16 rounded"></div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Guía de Colores</h3>
                <p className="text-[#F5F5F5]/70 text-sm mb-4">Paleta cromática oficial de la marca.</p>
                <div className="flex gap-2">
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    PDF
                  </a>
                  <a 
                    href="#" 
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#2D0000] transition-colors p-2 rounded text-center text-[#F5F5F5] text-sm"
                  >
                    ASE
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <a 
              href="#" 
              className="bg-[#950101] hover:bg-[#FF0000] transition-colors px-8 py-4 rounded-md text-[#F5F5F5] inline-flex items-center font-medium"
            >
              <FileDown size={20} className="mr-2" />
              Descargar Paquete Completo (ZIP)
            </a>
          </div>
        </div>
      </section>
      
      {/* Terms of Use */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl red-mafia-title mb-6 text-center">
              TÉRMINOS DE USO
            </h2>
            <div className="h-1 w-20 bg-[#FF0000] mx-auto mb-8"></div>
            
            <div className="bg-[#1E1E1E] border border-[#950101]/30 rounded-lg p-8">
              <p className="text-[#F5F5F5]/80 mb-6">
                Todos los recursos proporcionados en este Media Kit están destinados exclusivamente 
                para uso editorial y promocional relacionado con RED MAFIA. Al descargar y utilizar 
                estos materiales, aceptas los siguientes términos:
              </p>
              
              <ul className="space-y-4 text-[#F5F5F5]/80">
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2 font-bold">1.</span>
                  <div>
                    <span className="font-bold text-[#F5F5F5]">Uso autorizado:</span> Los materiales 
                    pueden ser utilizados en artículos, reseñas, entrevistas, promociones de conciertos 
                    y otras comunicaciones relacionadas directamente con RED MAFIA.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2 font-bold">2.</span>
                  <div>
                    <span className="font-bold text-[#F5F5F5]">Créditos:</span> Es obligatorio 
                    incluir los créditos correspondientes para todas las fotografías utilizadas.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2 font-bold">3.</span>
                  <div>
                    <span className="font-bold text-[#F5F5F5]">Modificaciones:</span> No se permite 
                    alterar los logotipos o la identidad visual de la banda sin autorización expresa.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2 font-bold">4.</span>
                  <div>
                    <span className="font-bold text-[#F5F5F5]">Uso comercial:</span> Cualquier uso 
                    comercial que no sea promocional requiere autorización previa por escrito.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF0000] mr-2 font-bold">5.</span>
                  <div>
                    <span className="font-bold text-[#F5F5F5]">Duración:</span> La licencia de uso 
                    de estos materiales es indefinida, pero RED MAFIA se reserva el derecho de 
                    revocar esta autorización en cualquier momento.
                  </div>
                </li>
              </ul>
              
              <p className="mt-6 text-[#F5F5F5]/80">
                Para cualquier consulta sobre el uso de estos materiales o para solicitar permisos 
                especiales, por favor contacta a nuestro equipo de prensa.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}