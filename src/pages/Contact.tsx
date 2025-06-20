
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, MessageCircle, User, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I found your MixTape Portal website and would like to get in touch.");
    window.open(`https://wa.me/233536785567?text=${message}`, '_blank');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AnnouncementBar />
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-white/10">
            <SidebarTrigger />
            <span className="text-lg font-semibold">Contact</span>
          </div>
          <Header onSearch={() => {}} />
          
          <div className="flex-1 container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Get In Touch
                </h1>
                <p className="text-xl text-muted-foreground">
                  Have questions or suggestions? I'd love to hear from you!
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-purple-400" />
                        Contact Information
                      </CardTitle>
                      <CardDescription>
                        Reach out to me through any of these channels
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-semibold">Kwabena Loventhon</p>
                          <p className="text-sm text-muted-foreground">Creator & Developer</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold">+233 536785567</p>
                          <p className="text-sm text-muted-foreground">WhatsApp Available</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold">Accra, Odorkor</p>
                          <p className="text-sm text-muted-foreground">Ghana</p>
                        </div>
                      </div>

                      <Button 
                        onClick={handleWhatsAppClick}
                        className="w-full bg-green-600 hover:bg-green-700 mt-6"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat on WhatsApp
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
                    <CardHeader>
                      <CardTitle>Why Contact Me?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Report bugs or technical issues</li>
                        <li>• Suggest new features or improvements</li>
                        <li>• Request specific mixtapes or artists</li>
                        <li>• Business inquiries and partnerships</li>
                        <li>• General feedback about the platform</li>
                        <li>• Technical support and assistance</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Form */}
                <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-400" />
                      Send a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and I'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                          className="bg-white/5 border-white/10 focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                          className="bg-white/5 border-white/10 focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                          className="bg-white/5 border-white/10 focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me more about your inquiry..."
                          required
                          rows={4}
                          className="bg-white/5 border-white/10 focus:border-purple-500"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Contact;
