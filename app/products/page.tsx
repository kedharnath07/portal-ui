
import React, { useState, useEffect } from 'react';
import { InsuranceProduct } from '../../types';
import { apiFetch } from '../../lib/api-client';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const [config, setConfig] = useState({
    level: 'Standard',
    deductible: '500',
    addons: [] as string[],
    notes: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await apiFetch('/api/products', { method: 'POST' });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'all': return 'fa-th-large';
      case 'health': return 'fa-heart-pulse';
      case 'cyber': return 'fa-shield-virus';
      case 'auto': return 'fa-car';
      case 'property': return 'fa-house-chimney';
      case 'life': return 'fa-user-check';
      case 'marine': return 'fa-ship';
      default: return 'fa-tag';
    }
  };

  const handleStartWizard = (product: InsuranceProduct) => {
    setSelectedProduct(product);
    setShowWizard(true);
    setWizardStep(1);
    setQuoteSuccess(false);
  };

  const nextStep = () => setWizardStep(s => s + 1);
  const prevStep = () => setWizardStep(s => s - 1);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setQuoteSuccess(true);
    }, 1800);
  };

  const toggleAddon = (addon: string) => {
    setConfig(prev => ({
      ...prev,
      addons: prev.addons.includes(addon) 
        ? prev.addons.filter(a => a !== addon) 
        : [...prev.addons, addon]
    }));
  };

  const wizardSteps = [
    { id: 1, label: 'Policy Detail', icon: 'fa-layer-group' },
    { id: 2, label: 'Add-ons', icon: 'fa-puzzle-piece' },
    { id: 3, label: 'Finalize', icon: 'fa-paper-plane' }
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 pb-32">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-[#4a0e1e] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Enterprise Catalog</span>
            <div className="flex items-center space-x-3">
               <i className="fas fa-cubes text-[#4a0e1e] text-2xl"></i>
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Marketplace</h1>
            </div>
          </div>
          <p className="text-slate-500 font-medium">Precision coverage configurations for elite clients.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative group">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a0e1e] transition-colors"></i>
            <input 
              type="text" 
              placeholder="Filter plans..." 
              className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4a0e1e]/10 focus:border-[#4a0e1e] transition-all w-full md:w-64 font-bold text-slate-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-hide shrink-0 shadow-sm">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center space-x-2 ${
                  filter === cat 
                  ? 'bg-[#4a0e1e] text-white shadow-lg shadow-maroon-900/10' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <i className={`fas ${getCategoryIcon(cat)} text-xs opacity-70`}></i>
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm animate-pulse h-[450px]"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group relative"
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#4a0e1e] transition-colors duration-500 shadow-inner">
                    <i className={`fas ${product.icon} text-2xl text-[#4a0e1e] group-hover:text-white transition-colors duration-500`}></i>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Live Quote</span>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-2">{product.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>

                <div className="space-y-3 mb-8">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3 text-[11px] font-bold text-slate-600">
                      <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                        <i className="fas fa-check text-[10px] text-emerald-500"></i>
                      </div>
                      <span className="truncate">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starting at</p>
                  <p className="text-xl font-black text-slate-900">{product.priceEstimate}</p>
                </div>
                <button 
                  onClick={() => handleStartWizard(product)}
                  className="bg-[#4a0e1e] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-maroon-900/10"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Multi-Step Wizard Modal */}
      {showWizard && selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
            
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#4a0e1e] rounded-2xl flex items-center justify-center text-white">
                  <i className={`fas ${selectedProduct.icon} text-xl`}></i>
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedProduct.name}</h2>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Configuration Engine</p>
                </div>
              </div>
              <button onClick={() => setShowWizard(false)} className="text-slate-300 hover:text-slate-600 transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Tracker Bar */}
            {!quoteSuccess && (
              <div className="px-10 py-6 border-b border-slate-50 bg-white">
                 <div className="flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 left-0 h-0.5 bg-[#4a0e1e] -translate-y-1/2 z-0 transition-all duration-700" style={{ width: `${((wizardStep-1)/2)*100}%` }}></div>
                    {wizardSteps.map((s) => (
                      <div key={s.id} className="relative z-10 flex flex-col items-center">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                           wizardStep >= s.id ? 'bg-[#4a0e1e] text-white' : 'bg-white border-2 border-slate-100 text-slate-300'
                         }`}>
                            <i className={`fas ${s.icon} text-xs`}></i>
                         </div>
                         <span className={`text-[9px] font-black uppercase tracking-widest mt-2 ${wizardStep >= s.id ? 'text-[#4a0e1e]' : 'text-slate-300'}`}>{s.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-10">
              {quoteSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10 animate-in zoom-in-95">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/10">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase italic">Registration Success</h2>
                    <p className="text-slate-500 font-medium mt-3 max-w-sm mx-auto">Application <strong>#APP-{(Math.random()*1000).toFixed(0)}</strong> received. Verification in progress.</p>
                  </div>
                  <div className="pt-6">
                    <button onClick={() => setShowWizard(false)} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Go to Dashboard</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {wizardStep === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4">
                      <h3 className="text-lg font-black text-slate-800">Coverage Selection</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Essential', 'Balanced', 'Elite'].map(level => (
                          <button 
                            key={level}
                            onClick={() => setConfig({...config, level})}
                            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center space-y-3 ${
                              config.level === level ? 'border-[#4a0e1e] bg-maroon-50/10 shadow-lg' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'
                            }`}
                          >
                            <span className={`text-[10px] font-black uppercase tracking-widest ${config.level === level ? 'text-slate-900' : 'text-slate-400'}`}>{level}</span>
                          </button>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Risk Deductible</label>
                        <div className="grid grid-cols-4 gap-2">
                           {['250', '500', '1000', '5000'].map(val => (
                             <button 
                                key={val}
                                onClick={() => setConfig({...config, deductible: val})}
                                className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                                  config.deductible === val ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'border-slate-100 text-slate-400 hover:bg-slate-50'
                                }`}
                             >
                               ${val}
                             </button>
                           ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4">
                      <h3 className="text-lg font-black text-slate-800">Operational Add-ons</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'tech', label: '24/7 Digital Concierge', price: '+$10/mo' },
                          { id: 'risk', label: 'Cyber Vulnerability Scanning', price: '+$25/mo' },
                          { id: 'exp', label: 'Expedited Payout Protocol', price: '+$5/mo' }
                        ].map(addon => (
                          <button 
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`w-full p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${
                              config.addons.includes(addon.id) ? 'border-[#4a0e1e] bg-maroon-50/5' : 'border-slate-50 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.addons.includes(addon.id) ? 'bg-[#4a0e1e] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <i className={`fas ${config.addons.includes(addon.id) ? 'fa-check' : 'fa-plus'} text-[10px]`}></i>
                              </div>
                              <span className="text-xs font-bold text-slate-800">{addon.label}</span>
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 uppercase">{addon.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4">
                      <h3 className="text-lg font-black text-slate-800">Declaration & Review</h3>
                      <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-slate-400">Policy Config</span>
                            <span className="text-sm font-black text-slate-900">{config.level} Tier</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-slate-400">Premium Estimated</span>
                            <span className="text-sm font-black text-emerald-600">{selectedProduct.priceEstimate}</span>
                         </div>
                         <div className="pt-4 border-t border-slate-200">
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">By submitting, you agree to our Terms of Service and data processing policies. Verification usually takes less than 2 minutes.</p>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {!quoteSuccess && (
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
                <button 
                  onClick={prevStep}
                  disabled={wizardStep === 1 || isSubmitting}
                  className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all"
                >
                  Back
                </button>
                
                {wizardStep < 3 ? (
                  <button 
                    onClick={nextStep}
                    className="bg-[#4a0e1e] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-maroon-900/10 hover:scale-105 transition-all"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmitQuote}
                    disabled={isSubmitting}
                    className="bg-[#4a0e1e] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-maroon-900/10 hover:scale-105 transition-all flex items-center space-x-2"
                  >
                    {isSubmitting ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                    <span>{isSubmitting ? 'Submitting...' : 'Complete Order'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
