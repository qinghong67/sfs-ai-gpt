
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Shield, Upload, FileImage, X, CheckCircle2, AlertCircle, RefreshCw, MessageCircle, History, Trash2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface StoredImage {
  id: string;
  name: string;
  data: string; // Base64
  size: number;
  date: string;
}

const Contact: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previousUploads, setPreviousUploads] = useState<StoredImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load previous uploads from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sfs_previous_uploads');
    if (saved) {
      try {
        setPreviousUploads(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (file: File, base64: string) => {
    const newImage: StoredImage = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      data: base64,
      size: file.size,
      date: new Date().toLocaleDateString()
    };

    const updated = [newImage, ...previousUploads].slice(0, 6); // Keep last 6 to respect localStorage limits
    setPreviousUploads(updated);
    localStorage.setItem('sfs_previous_uploads', JSON.stringify(updated));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage(null);
      
      // Validation: Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('error');
        setErrorMessage('File too large (Maximum size is 5MB)');
        return;
      }

      setUploadStatus('uploading');
      
      try {
        const base64 = await fileToBase64(file);
        setSelectedPreview(base64);
        
        // Simulate an upload process
        setTimeout(() => {
          setUploadStatus('success');
          saveToHistory(file, base64);
        }, 1500);
      } catch (err) {
        setUploadStatus('error');
        setErrorMessage('Failed to process image');
      }
    }
  };

  const useHistoryImage = (img: StoredImage) => {
    // Create a pseudo-file for the state
    setSelectedPreview(img.data);
    setUploadStatus('success');
    // We don't have the original File object, but we can set metadata
    setSelectedFile({ name: img.name, size: img.size } as File);
  };

  const deleteFromHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = previousUploads.filter(img => img.id !== id);
    setPreviousUploads(updated);
    localStorage.setItem('sfs_previous_uploads', JSON.stringify(updated));
  };

  const removeFile = () => {
    setSelectedFile(null);
    setSelectedPreview(null);
    setUploadStatus('idle');
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const waMessage = encodeURIComponent("Hi SFS, I'm using your instant WhatsApp quote feature. I'll send photos and details now!");
  const waUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${waMessage}`;

  return (
    <div className="bg-slate-50">
      <section className="bg-blue-900 pt-24 pb-40 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-black brand-font mb-6 leading-none">LET'S <span className="text-blue-400">FINISH</span> <br/>IT RIGHT.</h1>
          <p className="text-blue-200 text-xl max-w-2xl font-medium">Free site inspections and fixed-price quotations. No surprises.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 -mt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* WhatsApp Card */}
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-br from-[#25D366] to-[#128C7E] p-8 rounded-3xl shadow-xl shadow-green-200 hover:scale-[1.02] transition-transform group relative overflow-hidden"
            >
              <MessageCircle size={100} className="absolute -bottom-4 -right-4 text-white/10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm text-white">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Instant Quote</span>
                </div>
                <h3 className="text-2xl font-black text-white brand-font mb-2">WhatsApp Bot</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
                  Send photos and job details directly to our team for the fastest response time.
                </p>
                <div className="inline-flex items-center space-x-2 bg-white text-[#128C7E] px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest group-hover:bg-blue-50 transition-colors">
                  <span>Start Chat Now</span>
                  <X className="rotate-45" size={14} />
                </div>
              </div>
            </a>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50">
              <div className="flex items-center space-x-4 mb-8">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Phone size={24}/></div>
                 <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Call Us</h4>
                    <p className="text-lg font-bold text-slate-900">{CONTACT_INFO.phone}</p>
                 </div>
              </div>
              <div className="flex items-center space-x-4 mb-8">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Mail size={24}/></div>
                 <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Email Us</h4>
                    <p className="text-lg font-bold text-slate-900">{CONTACT_INFO.email}</p>
                 </div>
              </div>
              <div className="flex items-center space-x-4 mb-8">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><MapPin size={24}/></div>
                 <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Visit Us</h4>
                    <p className="text-lg font-bold text-slate-900">Sydney Metropolitan Area</p>
                 </div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Clock size={24}/></div>
                 <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Working Hours</h4>
                    <p className="text-lg font-bold text-slate-900">7:00 AM - 5:30 PM</p>
                 </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden">
               <Shield size={120} className="absolute -bottom-10 -right-10 text-slate-800" />
               <h3 className="text-xl font-bold mb-4 relative z-10">Service Area</h3>
               <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">We currently serve the Greater Sydney Region including the North Shore, Western Suburbs, and Sutherland Shire.</p>
               <div className="bg-blue-600 h-1 w-20 rounded-full relative z-10"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 brand-font mb-10">Request a Site Visit</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Service Type</label>
                <select className="w-full bg-slate-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium">
                   <option>Painting</option>
                   <option>Plastering</option>
                   <option>Commercial Fitout</option>
                   <option>Maintenance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Phone Number</label>
                <input type="tel" placeholder="+61 000 000 000" className="w-full bg-slate-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Project Description</label>
                <textarea rows={4} placeholder="Briefly describe your requirements..." className="w-full bg-slate-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" />
              </div>
              
              {/* Image Upload Section */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Upload Project Image</label>
                <div className="relative">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden" 
                    id="project-image-upload"
                  />
                  {!selectedFile ? (
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center space-x-3 bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group"
                    >
                      <Upload className="text-slate-400 group-hover:text-blue-500" size={24} />
                      <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600">Select files to upload</span>
                    </button>
                  ) : (
                    <div className={`flex items-center justify-between border p-4 rounded-xl transition-colors ${
                      uploadStatus === 'error' ? 'bg-red-50 border-red-100' : 
                      uploadStatus === 'success' ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'
                    }`}>
                      <div className="flex items-center space-x-3 overflow-hidden">
                        {selectedPreview ? (
                          <img src={selectedPreview} className="w-10 h-10 object-cover rounded shadow-sm border border-white" alt="Preview" />
                        ) : (
                          <FileImage className={uploadStatus === 'error' ? 'text-red-500' : uploadStatus === 'success' ? 'text-green-600' : 'text-blue-600'} size={24} />
                        )}
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-slate-900 truncate max-w-[150px] md:max-w-md">{selectedFile.name}</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            
                            {/* Status Indicators */}
                            {uploadStatus === 'uploading' && (
                              <div className="flex items-center text-[10px] text-blue-600 font-bold uppercase tracking-widest animate-pulse">
                                <RefreshCw size={10} className="mr-1 animate-spin" /> Uploading...
                              </div>
                            )}
                            {uploadStatus === 'success' && (
                              <div className="flex items-center text-[10px] text-green-600 font-bold uppercase tracking-widest">
                                <CheckCircle2 size={10} className="mr-1" /> Ready
                              </div>
                            )}
                            {uploadStatus === 'error' && (
                              <div className="flex items-center text-[10px] text-red-600 font-bold uppercase tracking-widest">
                                <AlertCircle size={10} className="mr-1" /> Error
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 shrink-0">
                        {uploadStatus === 'error' && errorMessage && (
                          <span className="hidden md:inline text-[10px] font-bold text-red-500 uppercase tracking-tighter bg-red-100 px-2 py-1 rounded">
                            {errorMessage}
                          </span>
                        )}
                        <button 
                          type="button" 
                          onClick={removeFile}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                  {uploadStatus === 'error' && errorMessage && (
                    <p className="md:hidden mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center">
                      <AlertCircle size={12} className="mr-1" /> {errorMessage}
                    </p>
                  )}
                </div>
              </div>

              {/* History Section */}
              {previousUploads.length > 0 && (
                <div className="md:col-span-2 space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <History size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Recent Uploads</span>
                    </div>
                    <span className="text-[9px] text-slate-300 font-medium">Click to re-select</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {previousUploads.map((img) => (
                      <div 
                        key={img.id}
                        onClick={() => useHistoryImage(img)}
                        className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all border border-slate-100 shadow-sm"
                        title={img.name}
                      >
                        <img src={img.data} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={img.name} />
                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <CheckCircle2 className="text-white" size={20} />
                        </div>
                        <button 
                          onClick={(e) => deleteFromHistory(img.id, e)}
                          className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all text-slate-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="md:col-span-2 pt-4">
                <button 
                  className={`w-full text-white font-black uppercase tracking-widest py-6 rounded-2xl flex items-center justify-center transition-all shadow-xl ${
                    uploadStatus === 'uploading' 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                  }`}
                  disabled={uploadStatus === 'uploading'}
                >
                   {uploadStatus === 'uploading' ? 'Please wait...' : 'Submit Request'}
                   <Send size={20} className="ml-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
