import React, { useState } from 'react';
import { 
  Target, TrendingUp, DollarSign, Layers, 
  ShoppingCart, Package, Truck, CheckCircle, 
  Store, Search, CreditCard, MapPin, 
  Smartphone, Monitor, Settings
} from 'lucide-react';

export default function App() {
  const [flowStep, setFlowStep] = useState(1);
  const [basketValue, setBasketValue] = useState(30000);
  const [distanceTier, setDistanceTier] = useState(2);
  const [activeTab, setActiveTab] = useState('customer');

  const PLATFORM_FEE = 1500;
  const DELIVERY_FEES = { 1: 2000, 2: 4000, 3: 6000 };
  const DISTANCE_LABELS = { 1: "0 - 2 km", 2: "2 - 5 km", 3: "5 - 8 km" };

  const currentDeliveryFee = DELIVERY_FEES[distanceTier];
  const totalValue = basketValue + currentDeliveryFee + PLATFORM_FEE;

  // Calculate percentages for the stacked bar
  const basketPct = (basketValue / totalValue) * 100;
  const deliveryPct = (currentDeliveryFee / totalValue) * 100;
  const platformPct = (PLATFORM_FEE / totalValue) * 100;

  const flowData = [
    {
      id: 1,
      title: "Customer Places Order",
      desc: "The resident opens QuickStore, selects a local vendor (e.g., Mama Njerere Fresh Produce), adds tomatoes and onions to the cart, enters their address, and completes payment instantly via MTN/Airtel Mobile Money.",
      icon: <ShoppingCart size={24} />
    },
    {
      id: 2,
      title: "Supplier Prepares Order",
      desc: "The local vendor receives a notification on their web dashboard. They accept the order and begin packing the fresh agricultural products.",
      icon: <Package size={24} />
    },
    {
      id: 3,
      title: "Supplier Dispatches Boda",
      desc: "Crucial Step: QuickStore does NOT employ riders. The vendor assigns their own trusted local boda rider, pays them the designated delivery fee, and clicks 'Order Out for Delivery'.",
      icon: <Truck size={24} />
    },
    {
      id: 4,
      title: "Delivery & Confirmation",
      desc: "The boda delivers the groceries. The resident confirms receipt in the app, completing the transaction loop. QuickStore retains its 1500 UGX fee.",
      icon: <CheckCircle size={24} />
    }
  ];

  const formatMoney = (val) => `${val.toLocaleString()} UGX`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-800 font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <nav className="w-full md:w-64 bg-emerald-900 text-emerald-50 md:sticky md:top-0 md:h-screen flex flex-col shadow-xl z-20">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">🛒 QuickStore</h1>
          <p className="text-emerald-300 text-sm font-medium">Strategy & MVP Deck</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 flex md:flex-col overflow-x-auto md:overflow-x-hidden hide-scrollbar">
          <a href="#opportunity" className="flex items-center px-4 py-3 rounded-lg hover:bg-emerald-800 transition-colors shrink-0 text-sm font-bold">
            <Target size={18} className="mr-3" /> The Opportunity
          </a>
          <a href="#logistics" className="flex items-center px-4 py-3 rounded-lg hover:bg-emerald-800 transition-colors shrink-0 text-sm font-bold">
            <TrendingUp size={18} className="mr-3" /> Logistics Model
          </a>
          <a href="#economics" className="flex items-center px-4 py-3 rounded-lg hover:bg-emerald-800 transition-colors shrink-0 text-sm font-bold">
            <DollarSign size={18} className="mr-3" /> Unit Economics
          </a>
          <a href="#mvp-scope" className="flex items-center px-4 py-3 rounded-lg hover:bg-emerald-800 transition-colors shrink-0 text-sm font-bold">
            <Layers size={18} className="mr-3" /> MVP Scope
          </a>
        </div>
        <div className="p-6 border-t border-emerald-800 hidden md:block">
          <p className="text-xs text-emerald-400">Aijen Digital | Namilyango</p>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 space-y-20">

        {/* SECTION: OPPORTUNITY */}
        <section id="opportunity" className="scroll-mt-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b-4 border-emerald-500 pb-2 inline-block">The Hyper-Local Opportunity</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Based on a 2-year study in Namilyango, Gwafu, and Njerere. This outlines the friction points of traditional grocery shopping and QuickStore's digital solution.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">❌ The Problem</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start"><span className="mr-3 text-red-500 font-bold">•</span> Residents face immense friction maneuvering crowded local markets.</li>
                <li className="flex items-start"><span className="mr-3 text-red-500 font-bold">•</span> Intense weather conditions frequently disrupt daily household provisioning.</li>
                <li className="flex items-start"><span className="mr-3 text-red-500 font-bold">•</span> Lack of reliable logistics for fresh agricultural products.</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">✅ The QuickStore Solution</h3>
              <ul className="space-y-4 text-emerald-800">
                <li className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">•</span> A hyper-local app connecting households directly to nearby vendors.</li>
                <li className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">•</span> Integrated Mobile Money (MoMo) for seamless, cashless transactions.</li>
                <li className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">•</span> Fast, trackable home delivery bringing the market to the doorstep.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION: LOGISTICS */}
        <section id="logistics" className="scroll-mt-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b-4 border-emerald-500 pb-2 inline-block">Decentralized Logistics Model</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Solving the "Boda Dilemma". By shifting fulfillment to the suppliers, QuickStore avoids massive cash burn. Click the steps to explore the order flow.
          </p>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex flex-wrap justify-between mb-8 relative">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0 transform -translate-y-1/2 rounded-full hidden md:block"></div>
              
              {flowData.map((step) => {
                const isActive = flowStep === step.id;
                return (
                  <button 
                    key={step.id}
                    onClick={() => setFlowStep(step.id)}
                    className="relative z-10 flex flex-col items-center group transition-all duration-300 transform hover:scale-105 w-1/4 md:w-auto mt-4 md:mt-0"
                  >
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-md border-4 border-white transition-colors duration-300 ${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {step.icon}
                    </div>
                    <span className={`mt-2 text-xs md:text-sm font-bold text-center ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                      {step.id}. {step.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 min-h-[160px] flex flex-col justify-center transition-all">
              <h4 className="text-xl font-bold text-slate-800 mb-3">{flowData[flowStep - 1].title}</h4>
              <p className="text-slate-600 text-lg">{flowData[flowStep - 1].desc}</p>
            </div>
          </div>
        </section>

        {/* SECTION: ECONOMICS */}
        <section id="economics" className="scroll-mt-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b-4 border-emerald-500 pb-2 inline-block">Unit Economics Simulator</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            QuickStore uses a transaction-based revenue model. Adjust the sliders below to see how customer payments are distributed without penalizing the supplier.
          </p>

          <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
            
            {/* Controls */}
            <div className="space-y-8">
              <div>
                <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                  <span>Grocery Basket Value</span>
                  <span className="text-emerald-600">{formatMoney(basketValue)}</span>
                </label>
                <input 
                  type="range" 
                  min="5000" max="100000" step="1000" 
                  value={basketValue} 
                  onChange={(e) => setBasketValue(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                  <span>Delivery Distance (Boda)</span>
                  <span className="text-amber-500">{DISTANCE_LABELS[distanceTier]}</span>
                </label>
                <input 
                  type="range" 
                  min="1" max="3" step="1" 
                  value={distanceTier} 
                  onChange={(e) => setDistanceTier(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Customer Pays Total</h4>
                <div className="text-4xl font-black text-slate-800">{formatMoney(totalValue)}</div>
              </div>
            </div>

            {/* Dynamic Visualizer (No Chart.js needed) */}
            <div className="flex flex-col justify-center space-y-6">
              <h4 className="text-sm font-bold text-slate-700 text-center">Revenue Distribution</h4>
              
              {/* Stacked Bar */}
              <div className="h-12 w-full flex rounded-xl overflow-hidden shadow-inner bg-slate-100">
                <div style={{ width: `${basketPct}%` }} className="bg-emerald-500 transition-all duration-300"></div>
                <div style={{ width: `${deliveryPct}%` }} className="bg-amber-500 transition-all duration-300"></div>
                <div style={{ width: `${platformPct}%` }} className="bg-blue-500 transition-all duration-300"></div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>Supplier Keeps</span>
                  <span className="font-bold text-slate-700">{formatMoney(basketValue)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>Boda Fee</span>
                  <span className="font-bold text-slate-700">{formatMoney(currentDeliveryFee)}</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="flex items-center font-bold text-blue-800"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Platform Fee (Our Revenue)</span>
                  <span className="font-bold text-blue-800">{formatMoney(PLATFORM_FEE)}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: MVP SCOPE */}
        <section id="mvp-scope" className="scroll-mt-8 max-w-4xl pb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b-4 border-emerald-500 pb-2 inline-block">Technical MVP Scope</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Strictly scoping the first release ensures a rapid launch in Namilyango. Here is the feature distribution across the stack.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="flex flex-col md:flex-row border-b border-slate-200 bg-slate-50">
              <button 
                onClick={() => setActiveTab('customer')} 
                className={`flex-1 py-4 px-2 text-center font-bold flex justify-center items-center transition-colors ${activeTab === 'customer' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Smartphone size={18} className="mr-2" /> Customer App
              </button>
              <button 
                onClick={() => setActiveTab('supplier')} 
                className={`flex-1 py-4 px-2 text-center font-bold flex justify-center items-center transition-colors ${activeTab === 'supplier' ? 'text-amber-700 border-b-2 border-amber-500 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Store size={18} className="mr-2" /> Supplier Web
              </button>
              <button 
                onClick={() => setActiveTab('admin')} 
                className={`flex-1 py-4 px-2 text-center font-bold flex justify-center items-center transition-colors ${activeTab === 'admin' ? 'text-blue-700 border-b-2 border-blue-500 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Settings size={18} className="mr-2" /> Admin Panel
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6 md:p-8 min-h-[250px]">
              
              {activeTab === 'customer' && (
                <div className="grid md:grid-cols-2 gap-4 animate-in fade-in">
                  <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-bold text-emerald-800 flex items-center mb-2"><Search size={16} className="mr-2"/> Browse Suppliers</span>
                    <p className="text-sm text-emerald-700">View local vendors, ratings, and their fresh grocery catalogs.</p>
                  </div>
                  <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-bold text-emerald-800 flex items-center mb-2"><ShoppingCart size={16} className="mr-2"/> Shopping Cart</span>
                    <p className="text-sm text-emerald-700">Add items, adjust quantities, view total dynamic price breakdown.</p>
                  </div>
                  <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-bold text-emerald-800 flex items-center mb-2"><CreditCard size={16} className="mr-2"/> Checkout & MoMo</span>
                    <p className="text-sm text-emerald-700">Enter delivery address and trigger MTN/Airtel payment prompts.</p>
                  </div>
                  <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-bold text-emerald-800 flex items-center mb-2"><MapPin size={16} className="mr-2"/> Order Tracking</span>
                    <p className="text-sm text-emerald-700">Live status updates (Received, Prep, Out for Delivery, Delivered).</p>
                  </div>
                </div>
              )}

              {activeTab === 'supplier' && (
                <div className="grid md:grid-cols-2 gap-4 animate-in fade-in">
                  <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-800 flex items-center mb-2"><Package size={16} className="mr-2"/> Manage Products</span>
                    <p className="text-sm text-amber-700">List tomatoes, onions, meat with prices, units, and images.</p>
                  </div>
                  <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-800 flex items-center mb-2"><Target size={16} className="mr-2"/> Receive Orders</span>
                    <p className="text-sm text-amber-700">Real-time alerts for incoming customer orders and payments.</p>
                  </div>
                  <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-800 flex items-center mb-2"><CheckCircle size={16} className="mr-2"/> Order Fulfillment</span>
                    <p className="text-sm text-amber-700">Accept/Reject orders based on current physical inventory.</p>
                  </div>
                  <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-800 flex items-center mb-2"><Truck size={16} className="mr-2"/> Status Updates</span>
                    <p className="text-sm text-amber-700">Manually trigger "Out for Delivery" when their boda leaves.</p>
                  </div>
                </div>
              )}

              {activeTab === 'admin' && (
                <div className="grid md:grid-cols-2 gap-4 animate-in fade-in">
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-800 flex items-center mb-2"><Store size={16} className="mr-2"/> Vendor Approval</span>
                    <p className="text-sm text-blue-700">Vet and onboard reliable vendors to maintain platform trust.</p>
                  </div>
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-800 flex items-center mb-2"><Monitor size={16} className="mr-2"/> Platform Oversight</span>
                    <p className="text-sm text-blue-700">Global view of all system transactions, issues, and statuses.</p>
                  </div>
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 md:col-span-2">
                    <span className="font-bold text-blue-800 flex items-center mb-2"><DollarSign size={16} className="mr-2"/> Revenue Tracking</span>
                    <p className="text-sm text-blue-700">Monitor the accumulated 1,500 UGX platform fees transferred from escrow.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

      </main>
    </div>
  );
      }
