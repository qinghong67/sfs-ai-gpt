import React, { useState, useEffect } from 'react';
import { useCMSData } from '../CMSContext';
import { 
  Shield, Archive, Lock, LogOut, Code, Download, Cloud, Github, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';

const SHIELD_MASTER_KEY = "SHIELD-ADMIN-2025";

const toBase64Unicode = (str: string) => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
};

// Hardcoded source for Gallery to ensure deployment includes the masonry layout
const GALLERY_SOURCE = `import React, { useState } from 'react';
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
                className={\`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all \${
                  filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
                }\`}
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

export default Gallery;`;

const Admin: React.FC = () => {
  const { assets, services, gallery, contact, about } = useCMSData();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessKey, setAccessKey] = useState('');
  const [isZipping, setIsZipping] = useState(false);
  
  // Deployment States
  const [gitToken, setGitToken] = useState(() => localStorage.getItem('sfs_git_token') || '');
  const [gitRepo, setGitRepo] = useState(() => localStorage.getItem('sfs_git_repo') || '');
  const [gitOwner, setGitOwner] = useState(() => localStorage.getItem('sfs_git_owner') || '');
  const [deployStatus, setDeployStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [deployError, setDeployError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem('shield_session_active');
    if (sessionToken === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('sfs_git_token', gitToken);
    localStorage.setItem('sfs_git_repo', gitRepo);
    localStorage.setItem('sfs_git_owner', gitOwner);
  }, [gitToken, gitRepo, gitOwner]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === SHIELD_MASTER_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem('shield_session_active', 'true');
    } else {
      alert("Invalid Access Key");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shield_session_active');
    setIsAuthenticated(false);
    navigate('/');
  };

  // --- Content Generators ---

  const generateConstantsContent = () => `
export const COLORS = { 
  primary: '#0f172a', 
  secondary: '#2563eb', 
  accent: '#60a5fa', 
  light: '#f8fafc', 
  text: '#334155', 
  logoNavy: '#111827', 
  logoBlue: '#2c5282', 
  whatsapp: '#25D366' 
};
export const SITE_ASSETS = ${JSON.stringify(assets, null, 2)};
export const CONTACT_INFO = ${JSON.stringify(contact, null, 2)};
export const SERVICES_DATA = ${JSON.stringify(services, null, 2)};
export const GALLERY_DATA = ${JSON.stringify(gallery, null, 2)};
export const ABOUT_DATA = ${JSON.stringify(about, null, 2)};
export const TESTIMONIALS_DATA = [];
`;

  // --- Cloudflare / GitHub Sync Logic ---

  const triggerCloudflareSync = async () => {
    if (!gitToken || !gitRepo || !gitOwner) {
      setDeployStatus('error');
      setDeployError('Please provide GitHub Token, Username, and Repo Name.');
      return;
    }

    setDeployStatus('loading');

    try {
      const constantsContent = generateConstantsContent();
      const filesToSync = [
        { path: 'constants.tsx', content: constantsContent },
        { path: 'pages/Gallery.tsx', content: GALLERY_SOURCE }
      ];

      for (const file of filesToSync) {
        const getUrl = `https://api.github.com/repos/${gitOwner}/${gitRepo}/contents/${file.path}`;
        let sha = '';
        
        try {
          const res = await fetch(getUrl, { headers: { Authorization: `token ${gitToken}` } });
          if (res.ok) {
            const data = await res.json();
            sha = data.sha;
          }
        } catch (e) { }

        const putRes = await fetch(getUrl, {
          method: 'PUT',
          headers: { 
            Authorization: `token ${gitToken}`, 
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `Cloudflare Trigger: Updated Content & Gallery - ${new Date().toLocaleString()}`,
            content: toBase64Unicode(file.content), 
            sha: sha || undefined
          })
        });

        if (!putRes.ok) {
          throw new Error(`Failed to push ${file.path}. Check permissions.`);
        }
      }

      setDeployStatus('success');
      setTimeout(() => setDeployStatus('idle'), 5000);
    } catch (err: any) {
      setDeployStatus('error');
      setDeployError(err.message || 'Sync Failed');
    }
  };

  // --- Zip Logic ---

  const handleDownloadEntireProjectZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      
      // Core Files
      zip.file('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shield Finishing Services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-50 text-slate-900 overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
</body>
</html>`);
      
      zip.file('package.json', JSON.stringify({
        name: "shield-finishing-services",
        private: true,
        version: "1.0.0",
        type: "module",
        dependencies: {
          "react": "19.0.0",
          "react-dom": "19.0.0",
          "react-router-dom": "^7.1.5",
          "lucide-react": "^0.468.0",
          "jszip": "^3.10.1"
        },
        devDependencies: {
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
          "@vitejs/plugin-react": "^4.3.4",
          "typescript": "^5.7.3",
          "vite": "^6.1.0"
        }
      }, null, 2));

      zip.file('tsconfig.json', `{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx"
  },
  "include": ["."]
}`);

      zip.file('vite.config.ts', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });`);

      // Source Files
      zip.file('index.tsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.StrictMode><App /></React.StrictMode>);`);

      zip.file('constants.tsx', generateConstantsContent());
      zip.file('pages/Gallery.tsx', GALLERY_SOURCE);
      zip.file('types.ts', `export interface ServiceItem { id: string; title: string; description: string; image: string; features: string[]; }`);
      
      // Context
      zip.file('CMSContext.tsx', `import React, { createContext, useContext } from 'react';
export const DataContext = createContext<any>(null);
export const useCMSData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useCMSData must be used within a DataProvider");
  return context;
};`);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shield-cms-export.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Zip failed", e);
      alert("Failed to generate ZIP");
    } finally {
      setIsZipping(false);
    }
  };

  // --- Render ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl text-center">
          <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
            <Lock className="text-blue-500" size={32} />
          </div>
          <h1 className="text-white font-black text-2xl uppercase tracking-[0.2em] mb-4 brand-font">Shield Vault</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-10">Administrative Control Center</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} placeholder="ENTER MASTER KEY" className="w-full bg-slate-950 border border-slate-800 p-6 rounded-2xl text-white text-center font-mono tracking-widest outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            <button type="submit" className="w-full bg-blue-600 text-white p-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-lg active:scale-95 hover:bg-blue-500 transition-all">Unlock System</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-300 font-sans flex flex-col">
      {/* Header */}
      <header className="h-24 border-b border-slate-800 flex items-center justify-between px-6 md:px-12 bg-slate-950/30 backdrop-blur-xl shrink-0">
        <div className="flex items-center space-x-4">
           <Shield className="text-blue-500" size={28} />
           <div>
              <h2 className="text-white font-black uppercase tracking-[0.2em] text-sm leading-none mb-1">Vault Access</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Deployment & Archive</p>
           </div>
        </div>
        <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 flex items-center uppercase text-[10px] font-black tracking-widest transition-colors">
          <LogOut size={16} className="mr-2" /> Exit
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Card 1: Cloudflare/GitHub Sync */}
           <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Cloud size={150} className="text-blue-500" />
              </div>
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500 border border-blue-500/20">
                     <Github size={20} />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-widest text-sm">Cloudflare Sync</h3>
                </div>
                
                <p className="text-slate-400 text-xs leading-relaxed mb-8">
                  Push your current site configuration AND Gallery layout to GitHub to trigger a Cloudflare Pages deployment.
                </p>

                <div className="space-y-4 mb-8">
                  <input type="password" value={gitToken} onChange={e => setGitToken(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white text-xs outline-none focus:border-blue-500 transition-colors placeholder-slate-600" placeholder="GitHub Access Token" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={gitOwner} onChange={e => setGitOwner(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white text-xs outline-none focus:border-blue-500 transition-colors placeholder-slate-600" placeholder="Username" />
                    <input type="text" value={gitRepo} onChange={e => setGitRepo(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white text-xs outline-none focus:border-blue-500 transition-colors placeholder-slate-600" placeholder="Repository" />
                  </div>
                </div>

                <button 
                  onClick={triggerCloudflareSync}
                  disabled={deployStatus === 'loading'}
                  className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center mt-auto ${deployStatus === 'loading' ? 'bg-blue-900 text-blue-200' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                >
                  {deployStatus === 'loading' ? <Loader2 className="animate-spin mr-2" size={16}/> : <Cloud className="mr-2" size={16} />}
                  {deployStatus === 'loading' ? 'Syncing...' : 'Deploy to Cloudflare'}
                </button>
                {deployStatus === 'success' && <p className="text-green-500 text-[10px] font-bold uppercase text-center mt-4">Sync Initiated Successfully!</p>}
                {deployStatus === 'error' && <p className="text-red-500 text-[10px] font-bold uppercase text-center mt-4">{deployError}</p>}
              </div>
           </div>

           {/* Card 2: Super Zip */}
           <div className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Archive size={150} className="text-blue-500" />
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-600/10 rounded-lg text-purple-500 border border-purple-500/20">
                     <Code size={20} />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-widest text-sm">Project Archive</h3>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-8">
                  Download the complete source code bundle, including all current assets, content configurations, and React components.
                </p>

                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 mb-8 mt-auto">
                   <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 mb-2">
                      <span>Format</span>
                      <span className="text-white">ZIP</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 mb-2">
                      <span>Engine</span>
                      <span className="text-white">Vite + React</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500">
                      <span>Version</span>
                      <span className="text-white">1.3.0</span>
                   </div>
                </div>

                <button 
                  onClick={handleDownloadEntireProjectZip} 
                  disabled={isZipping}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isZipping ? (
                    <span className="animate-pulse">Compressing...</span>
                  ) : (
                    <>
                      <Download size={16} className="mr-2" />
                      Download Super ZIP
                    </>
                  )}
                </button>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default Admin;