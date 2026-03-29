import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit3, Trash2, ExternalLink, Link2, Copy, Globe, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

const MyPages = () => {
  const navigate = useNavigate();

  // MOCK DATA: B3d l'API ghanjibouha mn Redux wla Axios
  const [pages, setPages] = useState([
    { id: '1', name: 'Ali Barber Shop', slug: 'ali-barber', status: 'Live', views: 1250, updatedAt: '2 hours ago' },
    { id: '2', name: 'Massage Relax', slug: 'massage-relax', status: 'Draft', views: 0, updatedAt: '1 day ago' },
  ]);

  // Senior Touch: Copy to clipboard function
  const handleCopyLink = (slug) => {
    const url = `http://localhost:5173/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  // Mock Edit Slug
  const handleEditSlug = (id, currentSlug) => {
    const newSlug = window.prompt("Enter new custom link path:", currentSlug);
    if (newSlug && newSlug !== currentSlug) {
      setPages(pages.map(p => p.id === id ? { ...p, slug: newSlug.toLowerCase().replace(/\s+/g, '-') } : p));
      toast.success('Path updated successfully!');
    }
  };

  // Mock Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this page? This cannot be undone.")) {
      setPages(pages.filter(p => p.id !== id));
      toast.success('Page deleted.');
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto w-full">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Landing Pages</h1>
          <p className="mt-1 text-sm text-gray-500">Manage, edit, and publish your booking pages.</p>
        </div>
        <button 
          onClick={() => navigate('/builder/new')} 
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Create New Page
        </button>
      </div>

      {/* 2. CONTENT AREA */}
      {pages.length === 0 ? (
        
        /* EMPTY STATE (Ila makant 7ta page) */
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No pages found</h3>
          <p className="text-gray-500 max-w-sm mb-6">You haven't created any landing pages yet. Click the button below to get started.</p>
          <button onClick={() => navigate('/builder/new')} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md">
            <Plus className="h-5 w-5" /> Create First Page
          </button>
        </div>

      ) : (

        /* LIST VIEW (Tableau d les pages) */
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Page Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stats</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th scope="col" className="relative px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50/50 transition-colors group">
                    
                    {/* Name & Link */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{page.name}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5 group/link">
                            <span className="text-gray-400">saas.com/</span>
                            <span className="font-medium text-gray-600">{page.slug}</span>
                            <button onClick={() => handleCopyLink(page.slug)} className="ml-2 opacity-0 group-hover/link:opacity-100 hover:text-blue-600 transition-opacity">
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${page.status === 'Live' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {page.status === 'Live' ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div> : null}
                        {page.status}
                      </span>
                    </td>

                    {/* Stats */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {page.views.toLocaleString()} views
                    </td>

                    {/* Updated At */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {page.updatedAt}
                    </td>

                    {/* Actions Column (Edit, Link, Delete, View Live) */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-1">
                        
                        <button onClick={() => handleEditSlug(page.id, page.slug)} className="text-gray-400 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-colors" title="Edit Custom Link">
                          <Link2 className="h-4 w-4" />
                        </button>

                        <button onClick={() => navigate(`/builder/${page.id}`)} className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors" title="Edit Design & Content">
                          <Edit3 className="h-4 w-4" />
                        </button>

                        {page.status === 'Live' && (
                          <a href={`http://localhost:5173/${page.slug}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-600 p-2 rounded-lg hover:bg-emerald-50 transition-colors" title="View Live Page">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}

                        <div className="w-px h-4 bg-gray-200 mx-1"></div> {/* Separator */}

                        <button onClick={() => handleDelete(page.id)} className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete Page">
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPages;