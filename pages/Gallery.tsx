import React, { useState } from 'react';
import { useCMSData } from '../CMSContext';
import { Camera, Search } from 'lucide-react';

const Gallery: React.FC = () => {
  const { gallery } = useCMSData();
  const [filter, setFilter] = useState<'All' | 'Painting' | 'Plastering' | 'Commercial'>('All');

  const filteredItems = filter === 'All' 
    ? gallery 
    : gallery.filter((item: any) => item.category === filter);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black brand-font mb-6">Visual <span className="text-blue-600">Portfolio</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-12">Witness the transformation. Our work speaks for itself across residential and commercial Sydney.</p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Painting', 'Plastering', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
                  filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredItems.map((item: any) => (
                <div key={item.id} className="break-inside-avoid mb-8 group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 animate-in fade-in duration-500">
                  <div className="overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black text-slate-900 brand-font">{item.title}</h3>
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{item.category}</span>
                    </div>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                     <Search className="text-white" size={48} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Camera size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;