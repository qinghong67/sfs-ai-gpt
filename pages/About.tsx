import React from 'react';
import { Shield, Target, Heart, Award, CheckCircle2 } from 'lucide-react';
import { useCMSData } from '../CMSContext';

const About: React.FC = () => {
  const { about } = useCMSData();

  const getIcon = (type: string) => {
    switch (type) {
      case 'Award': return <Award className="text-blue-600 mb-4" size={40} />;
      case 'Target': return <Target className="text-blue-200 mb-4" size={40} />;
      case 'Shield': return <Shield className="text-blue-400 mb-4" size={40} />;
      case 'Heart': return <Heart className="text-blue-600 mb-4" size={40} />;
      default: return <Shield className="text-blue-600 mb-4" size={40} />;
    }
  };

  return (
    <div className="bg-white">
      <section className="relative h-[60vh] flex items-center bg-slate-900 overflow-hidden">
        <img src={about.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-8xl font-black text-white brand-font mb-4 uppercase leading-none">{about.title}</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl font-medium">{about.subtitle}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            {about.story.map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {about.philosophy.map((item: any, i: number) => (
              <div key={item.id} className={`p-8 rounded-3xl border ${i % 2 !== 0 ? 'mt-8' : ''} ${i === 1 ? 'bg-blue-600 text-white border-blue-600' : i === 2 ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-900 border-slate-100'}`}>
                {getIcon(item.type)}
                <h4 className="font-black mb-2 brand-font">{item.title}</h4>
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;