import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Settings } from 'lucide-react';
import { CONTACT_INFO, SERVICES_DATA, GALLERY_DATA, SITE_ASSETS, ABOUT_DATA } from './constants';
import { DataContext } from './CMSContext';

// Page Imports
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const WhatsAppFAB = () => {
  const context = React.useContext(DataContext);
  const contact = context?.contact || CONTACT_INFO;
  const waUrl = `https://wa.me/${contact.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent("Hi Shield Finishing Services, I'd like to request a quote.")}`;
  return (
    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] group flex items-center">
      <div className="bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></div>
        <MessageCircle size={28} className="relative z-10" />
      </div>
    </a>
  );
};

export const SFSLogo = ({ className = "h-12" }: { className?: string }) => {
  const context = React.useContext(DataContext);
  const assets = context?.assets || SITE_ASSETS;
  return <img src={assets.logo} alt="Shield Finishing Services" className={`object-contain ${className}`} onError={(e) => {
    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x80?text=SHIELD';
  }} />;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  if (location.pathname === '/admin') return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-[80] bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-24 items-center">
          <Link to="/" className="flex items-center"><SFSLogo className="h-12 md:h-16 lg:h-20" /></Link>
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`text-[11px] font-black uppercase tracking-widest transition-colors hover:text-blue-600 ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-500'}`}>{link.name}</Link>
            ))}
            <Link to="/contact" className="bg-[#111827] text-white px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95">Quote</Link>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 bg-white border-t p-4 space-y-1 shadow-2xl z-[90]">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`block px-6 py-5 text-xs font-black uppercase tracking-[0.2em] rounded-xl ${location.pathname === link.path ? 'bg-blue-50 text-blue-600' : 'text-slate-900'}`}>{link.name}</Link>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full bg-blue-600 text-white text-center py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs">Request Quote</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const context = React.useContext(DataContext);
  const contact = context?.contact || CONTACT_INFO;
  const location = useLocation();
  if (location.pathname === '/admin') return null;
  
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-white p-2 rounded mb-6"><SFSLogo className="h-10" /></div>
          <p className="text-xs leading-loose opacity-70">Premium Painting and Plastering experts serving the Greater Sydney region since 2008.</p>
        </div>
        <div>
           <h4 className="text-white font-black mb-6 uppercase tracking-widest text-[10px]">Quick Links</h4>
           <ul className="space-y-3 text-xs uppercase tracking-widest font-bold">
             <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
             <li><Link to="/gallery" className="hover:text-blue-400">Portfolio</Link></li>
             <li><Link to="/about" className="hover:text-blue-400">Our Story</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-black mb-6 uppercase tracking-widest text-[10px]">Contact Info</h4>
           <ul className="space-y-4 text-xs">
             <li className="flex items-center space-x-3 justify-center md:justify-start"><MapPin size={14}/><span>{contact.address}</span></li>
             <li className="flex items-center space-x-3 justify-center md:justify-start"><Phone size={14}/><span>{contact.phone}</span></li>
             <li className="flex items-center space-x-3 justify-center md:justify-start"><Mail size={14}/><span>{contact.email}</span></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-black mb-6 uppercase tracking-widest text-[10px]">Follow Us</h4>
           <div className="flex space-x-4 justify-center md:justify-start">
             <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"><Instagram size={16}/></a>
             <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={16}/></a>
           </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] gap-4">
        <span className="opacity-50 tracking-widest uppercase font-bold">&copy; {new Date().getFullYear()} Shield Finishing Services. All rights reserved.</span>
        <Link to="/admin" className="flex items-center text-slate-700 hover:text-blue-500 font-black uppercase tracking-[0.2em] transition-colors"><Settings size={12} className="mr-2" /> Admin Access</Link>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState({
    assets: SITE_ASSETS,
    services: SERVICES_DATA,
    gallery: GALLERY_DATA,
    contact: CONTACT_INFO,
    about: ABOUT_DATA
  });

  useEffect(() => {
    const saved = localStorage.getItem('shield_cms_data');
    if (saved) { 
      try { 
        setSiteData(JSON.parse(saved)); 
      } catch (e) { 
        console.error("CMS Restore Error", e); 
      } 
    }
  }, []);

  const updateCMSData = (newData: any) => {
    setSiteData(newData);
    localStorage.setItem('shield_cms_data', JSON.stringify(newData));
  };

  return (
    <DataContext.Provider value={{ ...siteData, updateCMSData }}>
      <HashRouter>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFAB />
      </HashRouter>
    </DataContext.Provider>
  );
};

export default App;