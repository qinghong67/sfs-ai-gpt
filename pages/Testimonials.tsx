
import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';
import { Star, Quote, ShieldCheck } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-blue-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <Quote size={64} className="text-blue-400 mx-auto mb-8 opacity-40" />
          <h1 className="text-5xl md:text-7xl font-black brand-font mb-6">Client <span className="text-blue-400">Voices</span></h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto font-medium italic">"Expert work, transparent communication, and stunning results."</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TESTIMONIALS_DATA.map((rev) => (
              <div key={rev.id} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-6">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed font-medium mb-8">"{rev.content}"</p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <h4 className="font-black text-slate-900 brand-font">{rev.name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{rev.location} • {rev.date}</p>
                  </div>
                  <ShieldCheck className="text-blue-600" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review CTA */}
      <section className="py-24 bg-white border-t">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 brand-font mb-6">Experience the Shield Difference</h2>
          <p className="text-slate-500 mb-10">Join our growing list of satisfied residential and commercial clients in Sydney.</p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-900 brand-font">4.9/5</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Avg. Rating</div>
            </div>
            <div className="w-px bg-slate-200 h-12 self-center"></div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-900 brand-font">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Recommended</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
