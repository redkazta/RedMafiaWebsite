import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { contactSchema, type InsertContact } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon, Loader2 } from "lucide-react";

// Extender el esquema para validaciones del frontend
const extendedContactSchema = contactSchema.extend({
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof extendedContactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(extendedContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest<{ success: boolean; message: string }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos, te responderemos pronto.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#FF0000] mb-8 text-center border-b-2 border-[#950101] pb-4">
            CONTACTO
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="md:col-span-1">
              <div className="bg-[#1E1E1E] border border-[#950101] rounded-lg p-6 h-full">
                <h2 className="text-2xl font-bold text-[#FF0000] mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-1">Contrataciones</h3>
                    <p className="text-[#F5F5F5]/80">contrataciones@redmafia.com</p>
                    <p className="text-[#F5F5F5]/80">+52 55 1234 5678</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-1">Prensa</h3>
                    <p className="text-[#F5F5F5]/80">prensa@redmafia.com</p>
                    <p className="text-[#F5F5F5]/80">+52 55 9876 5432</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-1">Fans</h3>
                    <p className="text-[#F5F5F5]/80">fans@redmafia.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">Síguenos</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-[#3b5998] flex items-center justify-center text-white">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#c32aa3] flex items-center justify-center text-white">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center text-white">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-[#1E1E1E] border border-[#950101] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#FF0000] mb-6">Envíanos un mensaje</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F5F5F5]">Nombre</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Tu nombre" 
                                {...field}
                                className="bg-[#2D0000] border-[#950101] text-[#F5F5F5]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F5F5F5]">Correo Electrónico</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="correo@ejemplo.com" 
                                {...field}
                                className="bg-[#2D0000] border-[#950101] text-[#F5F5F5]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#F5F5F5]">Asunto</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Asunto de tu mensaje" 
                              {...field}
                              className="bg-[#2D0000] border-[#950101] text-[#F5F5F5]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#F5F5F5]">Mensaje</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Escribe tu mensaje aquí..." 
                              {...field}
                              className="bg-[#2D0000] border-[#950101] text-[#F5F5F5] min-h-[150px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#950101] hover:bg-[#FF0000] text-white"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <SendIcon className="mr-2 h-4 w-4" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}