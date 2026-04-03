import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, ChevronLeft, Plus, Trash2, Settings2, 
  Layout, MousePointer2, Loader2, Clock 
} from 'lucide-react';
import toast from 'react-hot-toast';

import { pageApi } from '../../api/page.api';
import { serviceApi } from '../../api/service.api';


const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // ================= 1. LOAD PAGE & SERVICES =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPagePromise = id !== 'new' ? pageApi.getById(id) : Promise.resolve({ data: { page: { content: [] } } });
        const fetchServicesPromise = serviceApi.getAll() || Promise.resolve({ data: { services: [] } });

        const [pageRes, servicesRes] = await Promise.all([fetchPagePromise, fetchServicesPromise]);

        if (id !== 'new') {
          const pageData = pageRes.data.page;
          setPage(pageData);
          setSections(pageData.content || []);
        }

        const servicesData = servicesRes.data?.services || servicesRes.data || [];
        setAvailableServices(servicesData);

      } catch {
        toast.error("Failed to load builder data.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // ================= 2. HANDLERS =================
  
  const addSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type: type,
      settings: type === 'hero' 
        ? { title: 'Welcome to our shop', subtitle: 'Book your appointment now', bgColor: 'bg-white' }
        : { title: 'Our Services', description: 'Choose from our premium services' }
    };
    setSections([...sections, newSection]);
    setActiveSection(newSection.id);
  };

  const updateSectionSettings = (id, newSettings) => {
    setSections(sections.map(s => s.id === id ? { ...s, settings: { ...s.settings, ...newSettings } } : s));
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
    if (activeSection === id) setActiveSection(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (id === 'new') {
        const response = await pageApi.create({title: page?.title || 'New Page', content: sections, slug: `page-${Date.now()}`});
        toast.success(response.data.message);
        return;
      }
      const response = await pageApi.update(id, { content: sections });
      toast.success(response.data.message);

    } catch {
      toast.error("Error saving .");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      
      {/* --- TOP BAR --- */}
      <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/pages')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Editing: <span className="text-blue-600">{page?.title || 'New Page'}</span></h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT SIDEBAR: CONTROLS --- */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto custom-scrollbar">
          
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">Add Sections</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => addSection('hero')} className="hover:cursor-pointer flex flex-col items-center gap-2 p-3 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group">
                <Layout className="h-6 w-6 text-gray-400 group-hover:text-blue-600" />
                <span className="text-xs font-bold text-gray-600">Hero</span>
              </button>
              <button onClick={() => addSection('services')} className="hover:cursor-pointer flex flex-col items-center gap-2 p-3 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group">
                <Settings2 className="h-6 w-6 text-gray-400 group-hover:text-blue-600" />
                <span className="text-xs font-bold text-gray-600">Services</span>
              </button>
            </div>
          </div>

          <div className="p-5">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">Page Structure</h2>
            {sections.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No sections added yet.</p>
            ) : (
              <div className="space-y-3">
                {sections.map((section, index) => (
                  <div 
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${activeSection === section.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-600 uppercase">Section {index + 1}</span>
                      <button onClick={(e) => { e.stopPropagation(); removeSection(section.id); }} className="hover:cursor-pointer text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-gray-800 capitalize">{section.type} Section</p>
                    
                    {activeSection === section.id && (
                      <div className="mt-4 pt-4 border-t border-blue-100 space-y-3 animate-in fade-in slide-in-from-top-1">
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Title</label>
                          <input 
                            type="text" 
                            value={section.settings.title}
                            onChange={(e) => updateSectionSettings(section.id, { title: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        {section.type === 'hero' && (
                          <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Subtitle</label>
                            <textarea 
                              value={section.settings.subtitle}
                              onChange={(e) => updateSectionSettings(section.id, { subtitle: e.target.value })}
                              className="w-full mt-1 px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- CENTER: PREVIEW AREA --- */}
        <div className="flex-1 bg-gray-200 overflow-y-auto p-10 flex justify-center custom-scrollbar">
          <div className="w-full max-w-4xl bg-white shadow-2xl rounded-t-2xl min-h-full overflow-hidden border border-gray-200 origin-top transform scale-[0.98]">
            
            {sections.length === 0 ? (
              <div className="h-96 flex flex-col items-center justify-center text-gray-400">
                <MousePointer2 className="h-12 w-12 mb-4 opacity-20" />
                <p className="font-bold">Add your first section to start building</p>
              </div>
            ) : (
              sections.map((section) => (
                <div key={section.id} className={`group relative transition-all duration-300 ${activeSection === section.id ? 'ring-2 ring-blue-500 ring-inset shadow-inner' : ''}`}>
                  
                  {/* 1. Hero Preview */}
                  {section.type === 'hero' && (
                    <div className={`py-24 px-10 text-center ${section.settings.bgColor}`}>
                      <h1 className="text-5xl font-black text-gray-900 mb-4">{section.settings.title}</h1>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{section.settings.subtitle}</p>
                      <button className="mt-8 bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">
                        Book Appointment
                      </button>
                    </div>
                  )}

                  {/* 2. Services Preview 🎯 (M-connecté m3a Laravel) */}
                  {section.type === 'services' && (
                    <div className="py-20 px-10 bg-gray-50">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900 mb-3">{section.settings.title}</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">{section.settings.description}</p>
                      </div>

                      {availableServices.length === 0 ? (
                        <div className="bg-white p-10 rounded-2xl border border-gray-200 border-dashed flex flex-col items-center justify-center text-center">
                          <Settings2 className="h-10 w-10 text-gray-300 mb-3" />
                          <h4 className="font-bold text-gray-900">No Services Found</h4>
                          <p className="text-sm text-gray-500 mt-1">Services you add to your catalog will appear here automatically.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {availableServices.slice(0, 6).map((svc) => ( // Kan-biyynou ghir 6 max f l'preview bach mytowelch
                            <div key={svc.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-all flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2 gap-2">
                                  <h3 className="font-bold text-gray-900 text-base">{svc.name}</h3>
                                  <span className="shrink-0 font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg text-sm border border-emerald-100">
                                    {Number(svc.price)} MAD
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                  {svc.description || 'No description provided.'}
                                </p>
                              </div>
                              <div className="mt-4 flex items-center text-xs font-bold text-gray-400 bg-gray-50 w-fit px-2 py-1 rounded-md">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {svc.duration_minutes} min
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Builder;