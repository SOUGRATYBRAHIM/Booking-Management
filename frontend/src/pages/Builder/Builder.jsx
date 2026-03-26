import { useState } from 'react';
import { Monitor, Smartphone, Save, LayoutTemplate, Palette, Settings } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

import { updateField } from '../../store/slices/builderSlice';
import { ModernTemplate, ClassicTemplate, MinimalTemplate } from './templates'

const Builder = () => {
  const dispatch = useDispatch();
  const websiteData = useSelector((state) => state.builder);

  const [activeTab, setActiveTab] = useState('content');
  const [viewport, setViewport] = useState('desktop');

  const handleChange = (section, field, value) => {
    dispatch(updateField({ section, field, value }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 overflow-hidden">

      {/* 1. TOPBAR */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800">Page Builder</h1>
          <div className="h-5 w-px bg-gray-300 mx-2"></div>

          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setViewport('desktop')} className={`p-1.5 rounded-md transition-all ${viewport === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <Monitor className="h-4 w-4" />
            </button>
            <button onClick={() => setViewport('mobile')} className={`p-1.5 rounded-md transition-all ${viewport === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
          <Save className="h-4 w-4" /> Publish
        </button>
      </div>

      {/* 2. WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL : Formulaire */}
        <div className="w-[350px] bg-white border-r border-gray-200 flex flex-col z-10 shrink-0 shadow-sm">

          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200">
            <button onClick={() => setActiveTab('content')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'content' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}><LayoutTemplate className="h-4 w-4" /> Content</button>
            <button onClick={() => setActiveTab('theme')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'theme' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}><Palette className="h-4 w-4" /> Theme</button>
            <button onClick={() => setActiveTab('settings')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}><Settings className="h-4 w-4" /> Settings</button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50 custom-scrollbar">

            {/* --- TAB 1: CONTENT --- */}
            {activeTab === 'content' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Business Name</label>
                  <input type="text" value={websiteData.content.businessName} onChange={(e) => handleChange('content', 'businessName', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Tagline (Short text)</label>
                  <input type="text" value={websiteData.content.tagline} onChange={(e) => handleChange('content', 'tagline', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">About / Description</label>
                  <textarea rows={4} value={websiteData.content.description} onChange={(e) => handleChange('content', 'description', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Logo URL</label>
                  <input type="text" placeholder="https://..." value={websiteData.content.logoUrl} onChange={(e) => handleChange('content', 'logoUrl', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Hero Image URL</label>
                  <input type="text" placeholder="https://..." value={websiteData.content.heroImage} onChange={(e) => handleChange('content', 'heroImage', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
            )}

            {/* --- TAB 2: THEME --- */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div className="pb-5 border-b border-gray-200">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-3">Layout Template</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleChange('templateId', null, 'modern')}
                      className={`py-3 px-2 border rounded-lg text-xs font-bold transition-all ${websiteData.templateId === 'modern' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Modern
                    </button>
                    <button
                      onClick={() => handleChange('templateId', null, 'classic')}
                      className={`py-3 px-2 border rounded-lg text-xs font-bold transition-all ${websiteData.templateId === 'classic' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Classic
                    </button>
                    <button
                      onClick={() => handleChange('templateId', null, 'minimal')}
                      className={`py-3 px-2 border rounded-lg text-xs font-bold transition-all ${websiteData.templateId === 'minimal' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Minimal
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Brand Color</label>
                  <div className="flex items-center gap-3">
                    {/* HTML5 Native Color Picker */}
                    <input
                      type="color"
                      value={websiteData.theme.primaryColor}
                      onChange={(e) => handleChange('theme', 'primaryColor', e.target.value)}
                      className="h-10 w-14 p-1 cursor-pointer rounded bg-white border border-gray-300"
                    />
                    <span className="text-sm text-gray-600 font-mono">{websiteData.theme.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Typography (Font)</label>
                  <select value={websiteData.theme.fontFamily} onChange={(e) => handleChange('theme', 'fontFamily', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                    <option value="font-sans">Modern (Sans-serif)</option>
                    <option value="font-serif">Classic (Serif)</option>
                    <option value="font-mono">Technical (Monospace)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Button Style</label>
                  <select value={websiteData.theme.borderRadius} onChange={(e) => handleChange('theme', 'borderRadius', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                    <option value="rounded-sm">Sharp Edges</option>
                    <option value="rounded-lg">Soft Edges (Rounded)</option>
                    <option value="rounded-full">Pill Shape</option>
                  </select>
                </div>
              </div>
            )}

            {/* --- TAB 3: SETTINGS --- */}
            {activeTab === 'settings' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">WhatsApp Number</label>
                  <input type="text" placeholder="e.g. +212600000000" value={websiteData.settings.whatsapp} onChange={(e) => handleChange('settings', 'whatsapp', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Instagram Link</label>
                  <input type="text" placeholder="https://instagram.com/..." value={websiteData.settings.instagram} onChange={(e) => handleChange('settings', 'instagram', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm" />
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">SEO Title (Browser Tab)</label>
                  <input type="text" value={websiteData.settings.seoTitle} onChange={(e) => handleChange('settings', 'seoTitle', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANEL : Live Preview */}
        <div className="flex-1 bg-[#e5e7eb] flex items-center justify-center p-8 overflow-y-auto custom-scrollbar relative">
          <div className={`bg-white shadow-2xl rounded-b-lg overflow-hidden transition-all duration-500 ease-in-out border border-gray-200 flex flex-col ${viewport === 'mobile' ? 'w-[375px] h-[812px] rounded-t-3xl border-8 border-gray-900' : 'w-full max-w-5xl min-h-full rounded-t-lg'}`}>

            {viewport === 'desktop' && (
              <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-amber-400"></div><div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
              {websiteData.templateId === 'modern' && <ModernTemplate data={websiteData} />}
              {websiteData.templateId === 'classic' && <ClassicTemplate data={websiteData} />}
              {websiteData.templateId === 'minimal' && <MinimalTemplate data={websiteData} />}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Builder;