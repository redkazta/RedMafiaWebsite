import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const contactSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  subject: z.string().min(1, { message: 'Debe seleccionar un asunto' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos, responderemos a la brevedad.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error al enviar mensaje",
        description: error.message || "Intente nuevamente más tarde",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contacto" className="py-16 px-4 bg-[#2D0000] relative overflow-hidden">
      {/* Elementos de diseño de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <span className="absolute top-0 right-0 text-[20rem] font-['Bebas_Neue',cursive] text-[#FF0000] leading-none opacity-30">RED</span>
        <span className="absolute bottom-0 left-0 text-[20rem] font-['Bebas_Neue',cursive] text-[#FF0000] leading-none opacity-30">MAFIA</span>
      </div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="font-['Bebas_Neue',cursive] text-4xl md:text-5xl text-[#F5F5F5] mb-2 tracking-wider">CONTACTO Y <span className="text-[#FF0000]">CONTRATACIONES</span></h2>
        <div className="h-1 w-24 bg-[#FF0000] mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-['Bebas_Neue',cursive] text-2xl text-[#FF0000] mb-6">INFORMACIÓN DE CONTACTO</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <span className="material-icons text-[#FF0000] mr-3">email</span>
                <div>
                  <p className="text-[#F5F5F5] font-medium">Correo electrónico:</p>
                  <a href="mailto:contacto@redmafia.com" className="text-[#F5F5F5]/80 hover:text-[#FF0000] transition-colors">contacto@redmafia.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="material-icons text-[#FF0000] mr-3">phone</span>
                <div>
                  <p className="text-[#F5F5F5] font-medium">Teléfono:</p>
                  <a href="tel:+525512345678" className="text-[#F5F5F5]/80 hover:text-[#FF0000] transition-colors">+52 55 1234 5678</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="material-icons text-[#FF0000] mr-3">business</span>
                <div>
                  <p className="text-[#F5F5F5] font-medium">Management:</p>
                  <p className="text-[#F5F5F5]/80">Producciones Musicales MX</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-['Bebas_Neue',cursive] text-2xl text-[#FF0000] mb-4">SÍGUENOS EN REDES</h3>
            <div className="flex space-x-4">
              <a href="#" className="social-icon w-10 h-10 bg-[#121212]/30 hover:bg-[#121212] flex items-center justify-center rounded-full text-[#F5F5F5] transition-all hover:transform hover:translate-y-[-3px] hover:text-[#FF0000]">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="social-icon w-10 h-10 bg-[#121212]/30 hover:bg-[#121212] flex items-center justify-center rounded-full text-[#F5F5F5] transition-all hover:transform hover:translate-y-[-3px] hover:text-[#FF0000]">
                <span className="material-icons">music_note</span>
              </a>
              <a href="#" className="social-icon w-10 h-10 bg-[#121212]/30 hover:bg-[#121212] flex items-center justify-center rounded-full text-[#F5F5F5] transition-all hover:transform hover:translate-y-[-3px] hover:text-[#FF0000]">
                <span className="material-icons">video_library</span>
              </a>
              <a href="#" className="social-icon w-10 h-10 bg-[#121212]/30 hover:bg-[#121212] flex items-center justify-center rounded-full text-[#F5F5F5] transition-all hover:transform hover:translate-y-[-3px] hover:text-[#FF0000]">
                <span className="material-icons">photo_camera</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-['Bebas_Neue',cursive] text-2xl text-[#FF0000] mb-6">ENVÍANOS UN MENSAJE</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#F5F5F5]/90">Nombre</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre" 
                          {...field} 
                          className="bg-[#121212]/50 border border-[#FF0000]/30 focus:border-[#FF0000] rounded p-3 text-[#F5F5F5] focus:outline-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#F5F5F5]/90">Correo electrónico</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="tu@email.com" 
                          type="email" 
                          {...field} 
                          className="bg-[#121212]/50 border border-[#FF0000]/30 focus:border-[#FF0000] rounded p-3 text-[#F5F5F5] focus:outline-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#F5F5F5]/90">Asunto</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#121212]/50 border border-[#FF0000]/30 focus:border-[#FF0000] text-[#F5F5F5]">
                            <SelectValue placeholder="Selecciona un asunto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#121212] border border-[#FF0000]/30">
                          <SelectItem value="general" className="text-[#F5F5F5]">Mensaje general</SelectItem>
                          <SelectItem value="booking" className="text-[#F5F5F5]">Contrataciones</SelectItem>
                          <SelectItem value="press" className="text-[#F5F5F5]">Prensa</SelectItem>
                          <SelectItem value="collaboration" className="text-[#F5F5F5]">Colaboraciones</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#F5F5F5]/90">Mensaje</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Escribe tu mensaje" 
                          {...field} 
                          className="bg-[#121212]/50 border border-[#FF0000]/30 focus:border-[#FF0000] rounded p-3 text-[#F5F5F5] focus:outline-none resize-none"
                          rows={5}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#FF0000] hover:bg-[#D10000] text-[#F5F5F5] px-6 py-3 rounded font-medium transition-colors shadow-lg"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[#F5F5F5]/70 mb-4">¿Quieres contratar a RED MAFIA para tu evento?</p>
          <a href="#" className="inline-block bg-[#121212] text-[#F5F5F5] hover:bg-[#FF0000] px-8 py-3 rounded-md font-medium transition-colors shadow-lg">
            SOLICITAR INFORMACIÓN
          </a>
        </div>
      </div>
    </section>
  );
}
