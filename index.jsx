import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  BrainCircuit, 
  Database, 
  Wrench, 
  Infinity, 
  Bot, 
  Palette, 
  Lightbulb, 
  TrendingUp, 
  BarChart3, 
  MonitorSmartphone,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// --- Lightweight Scroll Animation Hook ---
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

// --- Components ---

const FadeInSection = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Human Creativity Meets AI",
      subtitle: "We don't just build software; we build autonomous systems that think, remember, and persist.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1920"
    },
    {
      title: "Built to Last, Designed to Evolve",
      subtitle: "Operating on a proprietary agentic framework to guarantee your exponential growth.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920"
    },
    {
      title: "The Upward Arrow",
      subtitle: "Premier technology consultancy navigating the shift toward autonomous business models.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const pillars = [
    { icon: <BrainCircuit className="w-8 h-8" />, title: "Planning", desc: "Strategic decomposition of complex goals into actionable sub-tasks." },
    { icon: <Database className="w-8 h-8" />, title: "Memory", desc: "Sophisticated data persistence that ensures context is never lost." },
    { icon: <Wrench className="w-8 h-8" />, title: "Tools", desc: "Leveraging the cutting edge of Search, Code, and Generative AI." },
    { icon: <Infinity className="w-8 h-8" />, title: "Persistence", desc: "Autonomous execution that continues until the goal is achieved." }
  ];

  const services = [
    { icon: <Bot className="w-6 h-6" />, title: "AI Integration & Automation", desc: "Custom AI agents tailored to your specific workflow." },
    { icon: <Palette className="w-6 h-6" />, title: "Digital Branding", desc: "High-fidelity visual identities and modern brand presence." },
    { icon: <Lightbulb className="w-6 h-6" />, title: "Strategic Advisory", desc: "Navigating the shift toward autonomous business models." },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Digital Marketing", desc: "Data-driven campaigns for exponential market reach." },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Data Analysis", desc: "Actionable insights through robust data management." },
    { icon: <MonitorSmartphone className="w-6 h-6" />, title: "IT Solutions", desc: "End-to-end technical infrastructure and support." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <ArrowUpRight className="w-8 h-8 text-orange-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span className="text-2xl font-bold tracking-tighter">Aijen<span className="text-orange-500">.</span></span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
              <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
              <a href="#framework" className="hover:text-orange-400 transition-colors">Framework</a>
              <a href="#services" className="hover:text-orange-400 transition-colors">Services</a>
              <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>
            </div>
            <button className="hidden md:block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-all transform hover:scale-105">
              Let's Talk
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Slider) */}
      <section className="relative h-screen w-full overflow-hidden pt-20">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-slate-900">
               <img src={slide.image} alt="Background" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center text-center px-4 max-w-5xl mx-auto">
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                  {slide.title.split(' ').map((word, i) => (
                    <span key={i} className={word === 'AI' || word === 'Autonomous' || word === 'Growth' ? 'text-orange-500' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute z-30 bottom-10 left-0 right-0 flex justify-center items-center space-x-6">
          <button onClick={prevSlide} className="p-2 rounded-full bg-white/5 hover:bg-orange-500/20 text-white transition-colors border border-white/10 hover:border-orange-500/50">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-orange-500' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="p-2 rounded-full bg-white/5 hover:bg-orange-500/20 text-white transition-colors border border-white/10 hover:border-orange-500/50">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Core Framework Section */}
      <section id="framework" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Our Core Pillars</h2>
              <p className="text-3xl md:text-5xl font-bold">The Agentic Framework</p>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">Every project we touch is built to last and designed to evolve.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <FadeInSection key={index} delay={index * 150}>
                <div className="group relative p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-orange-500/50 hover:bg-slate-900 transition-all duration-300 h-full overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <div className="text-orange-500 mb-6 bg-orange-500/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="mb-16 md:flex md:justify-between md:items-end">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Capabilities</h2>
                <p className="text-3xl md:text-5xl font-bold">Our Services</p>
              </div>
              <p className="mt-4 md:mt-0 text-slate-400 max-w-lg text-lg">Comprehensive solutions designed to accelerate your digital transformation and establish market dominance.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-orange-400">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-16 text-center shadow-2xl">
              <ArrowUpRight className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready for Exponential Growth?</h2>
              <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto">
                Partner with Aijen digital to build autonomous systems that elevate your business. Let's discuss your next breakthrough.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-10">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="text-orange-500 w-5 h-5" />
                  <span>hello@aijendigital.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="text-orange-500 w-5 h-5" />
                  <span>+256 708 752 936</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="text-orange-500 w-5 h-5" />
                  <span>Tech Innovation Hub</span>
                </div>
              </div>

              <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25">
                Start a Conversation
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-white/5 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 Aijen digital. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
                                          }
