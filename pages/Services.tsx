
import React from 'react';
import { Paintbrush, Hammer, Ruler, CheckCircle, ArrowRight, ShieldCheck, Waves, Brush } from 'lucide-react';
import { SERVICES_DATA } from '../constants';

const Services: React.FC = () => {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section className="bg-blue-900 py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-7xl font-black brand-font mb-4 md:mb-6 leading-tight uppercase">Master Class <span className="text-blue-400">Services</span></h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl font-medium">Comprehensive painting and plastering solutions engineered for durability and visual perfection.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20 md:space-y-24">
          {SERVICES_DATA.map((service, idx) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-10 md:gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
                  <img src={service.image} alt={service.title} className="w-full aspect-square md:aspect-video lg:aspect-square object-cover" />
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="inline-block p-3 md:p-4 bg-blue-100 text-blue-900 rounded-2xl mb-6 md:mb-8">
                  {service.id === 'painting' ? <Brush size={32} md:size={40} /> : <Hammer size={32} md:size={40} />}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 brand-font mb-4 md:mb-6 uppercase tracking-tight">{service.title}</h2>
                <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed font-medium">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 md:p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <ShieldCheck size={18} className="text-blue-500 shrink-0" />
                      <span className="text-[11px] md:text-sm font-bold text-slate-700 uppercase tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The SFS Process */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 brand-font mb-4 uppercase leading-tight">Our Proven <span className="text-blue-600">Process</span></h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 mt-4 text-sm md:text-base font-medium">Consistency is how we guarantee the Shield Finish.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Detailed site inspection and accurate measurement.', icon: Ruler },
              { step: '02', stepName: 'Prep', title: 'Deep Prep', desc: 'Sanding, cleaning, and priming for maximum adhesion.', icon: Waves },
              { step: '03', title: 'Execution', desc: 'Precision application using industry-leading tools.', icon: Paintbrush },
              { step: '04', title: 'Protection', desc: 'Final seal and cleanup to ensure long-lasting results.', icon: ShieldCheck },
            ].map((item, i) => (
              <div key={i} className="relative p-6 md:p-8 bg-slate-50 rounded-3xl group hover:bg-blue-900 hover:text-white transition-all duration-300 border border-slate-100">
                <div className="text-5xl md:text-6xl font-black opacity-10 absolute right-6 top-6 brand-font">{item.step}</div>
                <div className="mb-6 p-4 bg-white rounded-2xl text-blue-600 shadow-sm w-fit group-hover:bg-blue-800 group-hover:text-white transition-colors">
                  <item.icon size={24} md:size={32} />
                </div>
                <h4 className="text-lg md:text-xl font-black mb-2 uppercase tracking-wide">{item.title}</h4>
                <p className="text-xs md:text-sm opacity-70 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
