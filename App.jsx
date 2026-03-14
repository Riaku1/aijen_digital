import React, { useState } from 'react';
import { 
  ShoppingCart, Store, Package, Truck, CheckCircle, 
  Home, MapPin, CreditCard, ChevronRight, User, 
  ArrowLeft, Phone, Clock, Search 
} from 'lucide-react';

// --- MOCK DATABASE ---
const MOCK_SUPPLIERS = [
  { id: 1, name: "Mama Njerere Fresh Produce", location: "Njerere Market", rating: 4.8, type: "Vegetables & Fruits" },
  { id: 2, name: "Gwafu Daily Groceries", location: "Gwafu Center", rating: 4.5, type: "General Groceries" },
  { id: 3, name: "Namilyango Prime Meats", location: "Namilyango Road", rating: 4.9, type: "Butchery" }
];

const MOCK_PRODUCTS = [
  { id: 101, supplierId: 1, name: "Fresh Tomatoes", price: 5000, unit: "Basket", image: "🍅" },
  { id: 102, supplierId: 1, name: "Red Onions", price: 3000, unit: "1 Kg", image: "🧅" },
  { id: 103, supplierId: 1, name: "Spinach", price: 1500, unit: "Bundle", image: "🥬" },
  { id: 104, supplierId: 2, name: "Matooke", price: 15000, unit: "Bunch", image: "🍌" },
  { id: 105, supplierId: 3, name: "Beef (Bone-in)", price: 14000, unit: "1 Kg", image: "🥩" },
  { id: 106, supplierId: 3, name: "Goat Meat", price: 18000, unit: "1 Kg", image: "🍖" }
];

const PLATFORM_FEE = 1500;
const BASE_DELIVERY_FEE = 4000;

export default function App() {
  // --- GLOBAL STATE (Simulating Backend) ---
  const [activeRole, setActiveRole] = useState('customer'); // 'customer' | 'supplier'
  const [currentView, setCurrentView] = useState('home'); // home, store, cart, checkout, tracking, supplier_dash
  
  // App Data State
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // Shared memory between Customer and Supplier

  // --- HELPER FUNCTIONS ---
  const formatMoney = (amount) => `${amount.toLocaleString()} UGX`;
  
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const placeOrder = (phone, address) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const newOrder = {
      id: `QS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: "Demo User",
      phone,
      address,
      items: [...cart],
      subtotal,
      deliveryFee: BASE_DELIVERY_FEE,
      platformFee: PLATFORM_FEE,
      total: subtotal + BASE_DELIVERY_FEE + PLATFORM_FEE,
      status: 'Order Received', // Flow: Order Received -> Preparing -> Out for Delivery -> Delivered
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      supplierId: cart[0].supplierId 
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    setCurrentView('tracking');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // ==========================================
  // CUSTOMER VIEWS
  // ==========================================

  const renderCustomerHome = () => (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-emerald-600 text-white p-6 rounded-b-[2rem] shadow-md">
        <h1 className="text-2xl font-black mb-1">QuickStore</h1>
        <p className="text-emerald-100 flex items-center text-sm font-medium">
          <MapPin size={16} className="mr-1" /> Delivering to Namilyango area
        </p>
        
        <div className="mt-6 relative">
          <Search size={20} className="absolute left-3 top-3 text-emerald-800" />
          <input 
            type="text" 
            placeholder="Search groceries or vendors..." 
            className="w-full bg-white text-slate-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none shadow-sm"
          />
        </div>
      </div>
      
      <div className="p-5 mt-2">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Vendors Near You</h2>
        <div className="space-y-4">
          {MOCK_SUPPLIERS.map(supplier => (
            <div 
              key={supplier.id} 
              onClick={() => { setSelectedSupplier(supplier); setCurrentView('store'); }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <Store size={26} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{supplier.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">{supplier.type} • {supplier.location}</p>
                  <div className="flex items-center text-xs font-bold text-amber-500">
                    ⭐ {supplier.rating} <span className="text-slate-300 mx-2">•</span> <Clock size={12} className="mr-1 text-slate-400"/> 20-30 min
                  </div>
                </div>
              </div>
              <ChevronRight className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStore = () => {
    const products = MOCK_PRODUCTS.filter(p => p.supplierId === selectedSupplier.id);
    return (
      <div className="pb-24 animate-in slide-in-from-right-8 duration-300">
        <div className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10 border-b border-slate-100">
          <button onClick={() => setCurrentView('home')} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-slate-700" /></button>
          <div>
            <h2 className="text-lg font-bold text-slate-800 leading-tight">{selectedSupplier.name}</h2>
            <p className="text-xs text-emerald-600 font-medium">Accepting Orders</p>
          </div>
        </div>
        
        <div className="p-5 grid grid-cols-2 gap-4">
          {products.map(product => {
            const inCart = cart.find(item => item.id === product.id);
            return (
              <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
                <div className="text-5xl mb-3 mt-2 drop-shadow-sm">{product.image}</div>
                <h3 className="font-bold text-slate-800 text-sm h-10 leading-tight">{product.name}</h3>
                <p className="text-slate-400 text-xs mb-2 font-medium">{product.unit}</p>
                <p className="font-black text-emerald-600 mb-4">{formatMoney(product.price)}</p>
                
                {inCart ? (
                  <div className="w-full flex justify-between items-center bg-emerald-50 rounded-xl p-1 border border-emerald-100">
                    <button onClick={() => updateQty(product.id, -1)} className="w-8 h-8 flex items-center justify-center font-bold text-emerald-700 bg-white rounded-lg shadow-sm">-</button>
                    <span className="font-bold text-emerald-800">{inCart.qty}</span>
                    <button onClick={() => updateQty(product.id, 1)} className="w-8 h-8 flex items-center justify-center font-bold text-emerald-700 bg-white rounded-lg shadow-sm">+</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-20 left-0 right-0 p-5 max-w-md mx-auto z-20 animate-in slide-in-from-bottom-10">
            <button 
              onClick={() => setCurrentView('cart')}
              className="w-full bg-emerald-600 text-white p-4 rounded-2xl shadow-xl flex justify-between items-center font-bold active:scale-95 transition-transform"
            >
              <div className="flex items-center bg-emerald-800 bg-opacity-40 px-3 py-1 rounded-lg">
                <ShoppingCart className="mr-2" size={18} /> {cart.reduce((sum, i) => sum + i.qty, 0)}
              </div>
              <span className="flex items-center">
                View Cart • {formatMoney(cart.reduce((sum, item) => sum + (item.price * item.qty), 0))} <ChevronRight className="ml-1" size={18} />
              </span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderCart = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = subtotal + BASE_DELIVERY_FEE + PLATFORM_FEE;

    return (
      <div className="pb-24 animate-in slide-in-from-right-8 duration-300">
        <div className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10 border-b border-slate-100">
          <button onClick={() => setCurrentView('store')} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-slate-700"/></button>
          <h2 className="text-lg font-bold text-slate-800">Review Cart</h2>
        </div>

        {cart.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center">
            <ShoppingCart size={48} className="text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">Your cart is empty</p>
          </div>
        ) : (
          <div className="p-5 space-y-6">
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl">{item.image}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-emerald-600 text-xs font-black mt-1">{formatMoney(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 bg-white rounded-lg shadow-sm">-</button>
                    <span className="font-bold text-slate-800 w-4 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 bg-white rounded-lg shadow-sm">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-sm">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Order Summary</h3>
              <div className="flex justify-between text-slate-600 font-medium"><span>Subtotal (Items)</span><span>{formatMoney(subtotal)}</span></div>
              <div className="flex justify-between text-slate-600 font-medium"><span>Delivery Fee (Boda)</span><span>{formatMoney(BASE_DELIVERY_FEE)}</span></div>
              <div className="flex justify-between text-slate-600 font-medium"><span>Platform Fee</span><span>{formatMoney(PLATFORM_FEE)}</span></div>
              <div className="border-t border-slate-200 pt-3 mt-2 flex justify-between font-black text-lg text-slate-900">
                <span>Total to Pay</span><span className="text-emerald-600">{formatMoney(total)}</span>
              </div>
            </div>

            <button 
              onClick={() => setCurrentView('checkout')}
              className="w-full bg-slate-900 text-white p-4 rounded-2xl shadow-lg font-bold flex justify-center items-center active:scale-95 transition-transform"
            >
              Proceed to Checkout <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderCheckout = () => {
    const [phone, setPhone] = useState("0771234567");
    const [address, setAddress] = useState("Gwafu, Near the big tree");
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
      setIsProcessing(true);
      // Simulate API call to MoMo
      setTimeout(() => {
        setIsProcessing(false);
        placeOrder(phone, address);
      }, 2000);
    };

    return (
      <div className="pb-24 min-h-screen animate-in slide-in-from-right-8 duration-300">
        <div className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10 border-b border-slate-100">
          <button onClick={() => setCurrentView('cart')} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-slate-700"/></button>
          <h2 className="text-lg font-bold text-slate-800">Checkout</h2>
        </div>

        <div className="p-5 space-y-5">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center border-b border-slate-100 pb-3"><MapPin size={18} className="mr-2 text-emerald-600" /> Delivery Details</h3>
            <textarea 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              rows="3"
              placeholder="e.g. Red gate opposite the primary school..."
            />
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center border-b border-slate-100 pb-3"><CreditCard size={18} className="mr-2 text-yellow-500" /> Mobile Money</h3>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">MTN / Airtel Number</label>
              <div className="flex items-center bg-slate-50 p-4 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
                <Phone size={18} className="text-slate-400 mr-3" />
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent w-full text-base font-black text-slate-800 focus:outline-none tracking-wide" 
                />
              </div>
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start mt-4">
                <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-800 font-medium">A payment prompt will be sent to your phone. Enter your PIN to complete the order.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full text-white p-4 rounded-2xl shadow-lg font-bold flex justify-center items-center transition-all ${isProcessing ? 'bg-slate-400' : 'bg-emerald-600 active:scale-95'}`}
          >
            {isProcessing ? (
              <span className="flex items-center"><Clock className="animate-spin mr-2" size={20} /> Processing...</span>
            ) : (
              'Confirm & Pay'
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderTracking = () => {
    const order = orders[0]; // Track the most recent order
    
    if (!order) {
      return (
        <div className="p-10 text-center flex flex-col items-center h-full justify-center mt-20">
          <Package size={48} className="text-slate-200 mb-4" />
          <p className="text-slate-500 font-medium">No active orders</p>
          <button onClick={() => setCurrentView('home')} className="mt-6 text-emerald-600 font-bold bg-emerald-50 px-6 py-2 rounded-full">Start Shopping</button>
        </div>
      );
    }

    const steps = [
      { status: 'Order Received', icon: <Package size={18} />, text: 'Sent to supplier' },
      { status: 'Preparing Order', icon: <Store size={18} />, text: 'Packing groceries' },
      { status: 'Out for Delivery', icon: <Truck size={18} />, text: 'Boda is on the way' },
      { status: 'Delivered', icon: <CheckCircle size={18} />, text: 'Delivered successfully' }
    ];

    const currentStepIndex = steps.findIndex(s => s.status === order.status);

    return (
      <div className="pb-24 animate-in fade-in duration-300">
        <div className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10 border-b border-slate-100">
          <button onClick={() => setCurrentView('home')} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-slate-700"/></button>
          <h2 className="text-lg font-bold text-slate-800">Track Order</h2>
        </div>

        <div className="p-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Order Number</p>
                <p className="font-black text-slate-800">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Paid</p>
                <p className="font-black text-emerald-600">{formatMoney(order.total)}</p>
              </div>
            </div>

            <div className="relative pl-6 space-y-8 mt-4">
              {/* Vertical Progress Line */}
              <div className="absolute left-[27px] top-2 bottom-6 w-0.5 bg-slate-100 rounded-full"></div>
              <div 
                className="absolute left-[27px] top-2 w-0.5 bg-emerald-500 rounded-full transition-all duration-500"
                style={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%`, maxHeight: 'calc(100% - 24px)' }}
              ></div>
              
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                
                return (
                  <div key={idx} className="relative flex items-center z-10">
                    <div className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-colors duration-300 ${isCompleted ? 'bg-emerald-500 border-emerald-200 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-300'}`}>
                      {isCompleted ? <CheckCircle size={14} className="opacity-100" /> : <div className="w-2 h-2 rounded-full bg-slate-200" />}
                    </div>
                    <div className={`ml-4 ${isCompleted ?
