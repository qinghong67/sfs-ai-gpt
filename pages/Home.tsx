import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Paintbrush, Hammer, Users, Clock, ShieldCheck } from 'lucide-react';
import { useCMSData } from '../CMSContext';
import { SFSLogo } from '../App';

const Home: React.FC = () => {
  const { assets, services } = useCMSData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[#111827] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={assets.home.hero} 
            alt="Painting background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 md:via-[#111827]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded mb-6 md:mb-8">
              <ShieldCheck size={14} className="text-blue-400" />
              <span className="text-blue-300 text-[9px] font-black uppercase tracking-[0.2em]">Official Shield Standard</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] md:leading-[0.85] mb-6 md:mb-8 brand-font tracking-tighter">
              QUALITY <br/><span className="text-blue-500">SHIELDED</span> <br/>FINISHES.
            </h1>
            <p className="text-base md:text-lg text-slate-300 mb-10 md:mb-12 leading-relaxed max-w-xl font-medium">
              SFS provides the ultimate foundation for your space. From high-grade plastering to world-class decorative painting, we are Sydney's first choice for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-4 md:py-5 rounded font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center shadow-2xl shadow-blue-900/40">
                Get Your Quote <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/services" className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 md:px-10 py-4 md:py-5 rounded font-black text-xs uppercase tracking-[0.2em] transition-all text-center">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: 'Project Success', value: '1,200+', icon: CheckCircle },
            { label: 'Industry Mastery', value: '15 Yrs', icon: Clock },
            { label: 'Client Trust', value: '98%', icon: Users },
            { label: 'Service Area', value: 'Sydney', icon: Paintbrush },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group p-2 md:p-4">
              <h3 className="text-3xl md:text-4xl font-black text-[#111827] brand-font mb-1 tracking-tighter">{stat.value}</h3>
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 brand-font mb-3 tracking-tighter uppercase">OUR <span className="text-blue-600">CORE</span> SERVICES</h2>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">Specialized in both new builds and complex renovations.</p>
            </div>
            <Link to="/services" className="text-blue-600 font-black flex items-center hover:underline uppercase tracking-[0.2em] text-[10px]">
              View All <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {services.map((service: any) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm group hover:shadow-2xl transition-all border border-slate-200">
                <div className="h-56 md:h-72 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-[#111827] text-white p-3 rounded-lg shadow-xl">
                    {service.id === 'painting' ? <Paintbrush size={20} /> : <Hammer size={20} />}
                  </div>
                </div>
                <div className="p-6 md:p-10">
                  <h3 className="text-xl md:text-2xl font-black text-[#111827] mb-3 brand-font uppercase tracking-tighter">{service.title}</h3>
                  <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8 leading-relaxed font-medium">{service.description}</p>
                  <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    {service.features.slice(0, 3).map((f: string, i: number) => (
                      <li key={i} className="flex items-center text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 shrink-0"></span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/services`} className="inline-block w-full text-center py-4 md:py-5 bg-slate-50 text-[#111827] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all rounded-xl">
                    Service Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#111827] relative overflow-hidden">
        <div className="absolute left-0 bottom-0 opacity-5 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
          <SFSLogo className="h-[400px] w-[400px] md:h-[800px] md:w-[800px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-7xl font-black text-white brand-font mb-8 md:mb-10 tracking-tighter leading-tight uppercase">SHIELD YOUR <br/><span className="text-blue-500">INVESTMENT</span>.</h2>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16 font-medium">Join thousands of Sydney property owners who demand the best.</p>
          <Link to="/contact" className="inline-block bg-white text-[#111827] px-10 md:px-16 py-5 md:py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-blue-50 transition-all shadow-2xl">
            Book Site Visit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;