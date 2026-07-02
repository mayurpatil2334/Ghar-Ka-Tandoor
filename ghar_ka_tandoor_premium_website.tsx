import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Instagram, 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  Award, 
  ShieldCheck, 
  Flame, 
  Heart, 
  UtensilsCrossed, 
  Sparkles, 
  X, 
  Plus, 
  Minus, 
  Send, 
  Calendar, 
  Users, 
  CheckCircle,
  Menu,
  ChevronLeft
} from 'lucide-react';

// Dynamically load Google Fonts (Cinzel, Poppins, Bebas Neue)
const injectFontsAndStyles = () => {
  if (typeof window !== 'undefined') {
    // Check if fonts already added
    if (!document.getElementById('g-fonts-gharkatandoor')) {
      const link = document.createElement('link');
      link.id = 'g-fonts-gharkatandoor';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    // Insert customized animation CSS for glowing embers and premium transitions
    if (!document.getElementById('custom-styles-gharkatandoor')) {
      const style = document.createElement('style');
      style.id = 'custom-styles-gharkatandoor';
      style.innerHTML = `
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        
        /* Premium custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #090909;
        }
        ::-webkit-scrollbar-thumb {
          background: #40220F;
          border-radius: 4px;
          border: 1px solid #D6A04D;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #F97316;
        }

        /* Ambient glowing effects mimicking traditional tandoor */
        .tandoor-glow {
          box-shadow: 0 0 50px 10px rgba(249, 115, 22, 0.15);
        }
        .gold-glow {
          box-shadow: 0 0 30px 2px rgba(214, 160, 77, 0.2);
        }
        
        /* Subtle continuous burning/ember animation */
        @keyframes emberPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.95; filter: drop-shadow(0 0 15px #F97316); }
        }
        .ember-animation {
          animation: emberPulse 4s infinite ease-in-out;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        .float-animation {
          animation: floatSlow 6s infinite ease-in-out;
        }

        /* Fast loading screen transition */
        .loading-fadeout {
          animation: fadeOut 0.8s forwards ease-in-out;
        }
        @keyframes fadeOut {
          from { opacity: 1; visibility: visible; }
          to { opacity: 0; visibility: hidden; }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

const POPULAR_DISHES = [
  {
    id: 'pop-1',
    title: 'Tandoori Chicken',
    desc: 'Succulent chicken marinated in authentic Marathi spices, yogurt, and charcoal-grilled to perfection with a smoky glaze.',
    price: 230,
    portion: 'Full',
    badge: 'Best Seller',
    category: 'chicken',
    image: '🍗'
  },
  {
    id: 'pop-2',
    title: 'Chicken Biryani',
    desc: 'Aromatic basmati rice layered with juicy masala chicken, infused with saffron and cooked on slow dum with signature home spices.',
    price: 150,
    portion: 'Plate',
    badge: 'Popular',
    category: 'rice',
    image: '🍛'
  },
  {
    id: 'pop-3',
    title: 'Butter Chicken Masala',
    desc: 'Rich, creamy tomato-gravy loaded with shredded tandoori chicken, finished with fresh homemade butter and kasturi methi.',
    price: 180,
    portion: 'Plate',
    badge: 'Chef Special',
    category: 'chicken',
    image: '🍲'
  },
  {
    id: 'pop-4',
    title: 'Mutton Masala',
    desc: 'Tender baby goat cooked slow in caramelized onions, Marathi Kanda Lasun masala, and rich, spicy coconut-based gravy.',
    price: 220,
    portion: 'Plate',
    badge: 'Authentic',
    category: 'mutton',
    image: '🍖'
  },
  {
    id: 'pop-5',
    title: 'Fish Curry',
    desc: 'Surmai fish steaks cooked in coconut-milk based traditional Malvani/Marathi gravy with dry red chilies and tangy kokum.',
    price: 250,
    portion: 'Plate',
    badge: 'Coastal Special',
    category: 'seafood',
    image: '🐟'
  },
  {
    id: 'pop-6',
    title: 'Prawns Fry',
    desc: 'Golden crisp, shallow fried prawns coated with Marathi spices, semolina (rava), and fresh coriander.',
    price: 220,
    portion: 'Plate',
    badge: 'Crunchy',
    category: 'seafood',
    image: '🍤'
  }
];

const FULL_MENU = {
  chicken: [
    { name: 'Tandoori Chicken Half', price: 120, tag: 'Smoky & Tender' },
    { name: 'Tandoori Chicken Full', price: 230, tag: 'Signature Tandoor Charcoal' },
    { name: 'Dry Chicken', price: 170, tag: 'Dry Spiced Roast' },
    { name: 'Chicken Curry', price: 130, tag: 'Homemade Gravy Style' },
    { name: 'Butter Chicken Masala', price: 180, tag: 'Creamy Marathi-twist' },
    { name: 'Chicken Masala', price: 150, tag: 'Rich thick spicy gravy' },
    { name: 'Chicken Biryani', price: 150, tag: 'Traditional Slow Cooked Dum' }
  ],
  mutton: [
    { name: 'Mutton Masala', price: 220, tag: 'Thick spicy Kolhapuri style' },
    { name: 'Mutton Curry', price: 200, tag: 'Ghar Ka Taste classic tari' },
    { name: 'Mutton Biryani', price: 240, tag: 'Fragrant Dum Cooked' },
    { name: 'Mutton Fry', price: 210, tag: 'Dry spicy caramelized onion' }
  ],
  seafood: [
    { name: 'Fish Curry (Surmai)', price: 250, tag: 'Kokum infused coconut sauce' },
    { name: 'Pomfret Fry', price: 280, tag: 'Crisp semolina crusted' },
    { name: 'Prawns Masala', price: 230, tag: 'Spicy coast-to-plate style' },
    { name: 'Prawns Fry', price: 220, tag: 'Crispy rava-fried bites' }
  ],
  rice: [
    { name: 'Steamed Basmati Rice', price: 60, tag: 'Fragrant and fluffy' },
    { name: 'Jeera Rice', price: 80, tag: 'Tossed in pure ghee & cumin' },
    { name: 'Egg Biryani', price: 120, tag: 'Flavorful spice layering' }
  ],
  roti: [
    { name: 'Jowar Bhakri', price: 30, tag: 'Traditional Marathi flatbread' },
    { name: 'Bajra Bhakri', price: 30, tag: 'Healthy and wholesome' },
    { name: 'Chapati', price: 15, tag: 'Soft wheat handmade phulka' },
    { name: 'Butter Roti', price: 20, tag: 'Soft flatbread with real butter' }
  ]
};

const TESTIMONIALS = [
  {
    name: 'Aniket Deshmukh',
    role: 'Local Guide, Vadodara',
    comment: 'The absolute best Homemade Marathi style non-veg in Bhayli! The Chicken Biryani and Mutton Masala remind me of home back in Pune. Highly recommended.',
    rating: 5,
    date: '2 weeks ago'
  },
  {
    name: 'Snehal Patil',
    role: 'Regular Customer',
    comment: 'Tandoori chicken is incredibly juicy, not at all like those dry commercial places. Love that everything is freshly prepared without heavy food coloring.',
    rating: 5,
    date: '1 month ago'
  },
  {
    name: 'Rahul Sharma',
    role: 'IT Professional',
    comment: 'Ordering via WhatsApp is super easy! They delivered piping hot Mutton Curry and fresh Bhakris. The taste is 100% authentic and light on the stomach.',
    rating: 5,
    date: '3 days ago'
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeMenuCategory, setActiveMenuCategory] = useState('chicken');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cateringForm, setCateringForm] = useState({
    name: '',
    phone: '',
    event: 'Birthday Party',
    guests: '20-50',
    date: '',
    message: ''
  });
  const [cateringSubmitted, setCateringSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Initialize Styles
  useEffect(() => {
    injectFontsAndStyles();
    // Simulate high-end loader duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
    // Visual feedback helper
    setIsCartOpen(true);
  };

  const updateCartQty = (name, amount) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.name === name) {
          const newQty = i.qty + amount;
          return newQty > 0 ? { ...i, qty: newQty } : null;
        }
        return i;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  // Dynamically generates the WhatsApp message link for direct ordering
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    
    let message = `🔥 *Ghar Ka Tandoor - Order Request* 🔥\n`;
    message += `──────────────────────\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (x${item.qty}) - ₹${item.price * item.qty}\n`;
    });
    message += `──────────────────────\n`;
    message += `💰 *Subtotal*: ₹${getCartTotal()}\n\n`;
    message += `📍 *Delivery Address*: Please confirm delivery to near Vasna Bhayli / Vadodara.\n`;
    message += `🙏 *Special Note*: Make it authentic spicy!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedText}`; // Replace with actual owner phone number
    window.open(whatsappUrl, '_blank');
  };

  const handleCateringSubmit = (e) => {
    e.preventDefault();
    setCateringSubmitted(true);
    
    // Auto WhatsApp forwarding for catering inquiries! Highly functional
    setTimeout(() => {
      const message = `✨ *Ghar Ka Tandoor - Catering Query* ✨\n\n👤 *Name*: ${cateringForm.name}\n📞 *Phone*: ${cateringForm.phone}\n🎉 *Event Type*: ${cateringForm.event}\n👥 *Guest Count*: ${cateringForm.guests}\n📅 *Event Date*: ${cateringForm.date}\n✉️ *Message*: ${cateringForm.message}`;
      const encodedText = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919876543210?text=${encodedText}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset
      setCateringForm({ name: '', phone: '', event: 'Birthday Party', guests: '20-50', date: '', message: '' });
      setCateringSubmitted(false);
    }, 1500);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-[#090909] text-[#F8E7C7] font-poppins min-h-screen relative overflow-x-hidden selection:bg-[#F97316] selection:text-white">
      
      {}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#090909] flex flex-col items-center justify-center">
          <div className="text-center flex flex-col items-center px-4">
            {/* Charcoal Ember glow circle with a fire animated icon */}
            <div className="relative mb-6 w-32 h-32 flex items-center justify-center rounded-full bg-[#40220F]/50 border-2 border-[#D6A04D] gold-glow ember-animation">
              <Flame className="w-16 h-16 text-[#F97316] animate-pulse" />
              <div className="absolute -inset-1 rounded-full border border-[#F97316]/30 animate-ping" />
            </div>
            
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#D6A04D] to-[#F97316] uppercase">
              Ghar Ka Tandoor
            </h1>
            <p className="font-bebas text-[#F97316] text-xl mt-2 tracking-widest">
              Ghar Ka Swad, Har Niwale Mein Pyar
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D6A04D] to-transparent mt-4 animate-pulse" />
            <p className="text-xs text-[#D6A04D]/70 font-poppins mt-3 uppercase tracking-widest">Loading authentic Marathi flavors...</p>
          </div>
        </div>
      )}

      {}
      <header className="sticky top-0 z-40 bg-[#090909]/95 backdrop-blur-md border-b border-[#40220F] shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Brand Heading */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="p-2.5 rounded-lg bg-[#40220F] border border-[#D6A04D] text-[#F97316]">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-cinzel font-black text-xl md:text-2xl text-[#F97316] block tracking-wide">
                GHAR KA TANDOOR
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D6A04D] block -mt-1 font-semibold">
                Authentic Marathi Non-Veg
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Items */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-[#F97316] transition-colors tracking-wide uppercase">Home</button>
            <button onClick={() => scrollToSection('popular')} className="text-sm font-medium hover:text-[#F97316] transition-colors tracking-wide uppercase">Popular Dishes</button>
            <button onClick={() => scrollToSection('menu')} className="text-sm font-medium hover:text-[#F97316] transition-colors tracking-wide uppercase">Full Menu</button>
            <button onClick={() => scrollToSection('why-us')} className="text-sm font-medium hover:text-[#F97316] transition-colors tracking-wide uppercase">Why Us</button>
            <button onClick={() => scrollToSection('catering')} className="text-sm font-medium hover:text-[#F97316] transition-colors tracking-wide uppercase">Catering</button>
            <button onClick={() => scrollToSection('order')} className="text-sm font-medium hover:text-[#F97316] transition-colors tracking-wide uppercase">Find Us</button>
          </nav>

          {/* Right Action Trigger Buttons */}
          <div className="flex items-center space-x-3">
            {/* Interactive Cart Button with Dynamic Badge Count */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full bg-[#40220F] hover:bg-[#F97316] text-[#F8E7C7] hover:text-[#090909] transition-all duration-300 border border-[#D6A04D]/40 group"
              title="Open WhatsApp Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F97316] text-white font-bebas text-xs w-5.5 h-5.5 flex items-center justify-center rounded-full border border-[#090909]">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </button>

            {/* CTA Phone Call Quick Dial Button */}
            <a 
              href="tel:+919876543210" 
              className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-[#F97316] to-[#D6A04D] text-black font-bebas text-lg px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity uppercase tracking-wider shadow-md"
            >
              <Phone className="w-4 h-4 text-black animate-bounce" />
              <span>Call Now</span>
            </a>

            {/* Mobile Hamburger Menu Toggle Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#F8E7C7] hover:bg-[#40220F]/50 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Mobile Sidebar/Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#090909] border-b border-[#40220F] px-4 pt-2 pb-6 space-y-3 absolute w-full left-0 shadow-2xl animate-fade-in-down">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 px-3 rounded hover:bg-[#40220F]/40 hover:text-[#F97316] transition-colors uppercase font-bebas text-lg tracking-wider">Home</button>
            <button onClick={() => scrollToSection('popular')} className="block w-full text-left py-2 px-3 rounded hover:bg-[#40220F]/40 hover:text-[#F97316] transition-colors uppercase font-bebas text-lg tracking-wider">Popular Dishes</button>
            <button onClick={() => scrollToSection('menu')} className="block w-full text-left py-2 px-3 rounded hover:bg-[#40220F]/40 hover:text-[#F97316] transition-colors uppercase font-bebas text-lg tracking-wider">Full Menu</button>
            <button onClick={() => scrollToSection('why-us')} className="block w-full text-left py-2 px-3 rounded hover:bg-[#40220F]/40 hover:text-[#F97316] transition-colors uppercase font-bebas text-lg tracking-wider">Why Choose Us</button>
            <button onClick={() => scrollToSection('catering')} className="block w-full text-left py-2 px-3 rounded hover:bg-[#40220F]/40 hover:text-[#F97316] transition-colors uppercase font-bebas text-lg tracking-wider">Catering & Parties</button>
            <button onClick={() => scrollToSection('order')} className="block w-full text-left py-2 px-3 rounded hover:bg-[#40220F]/40 hover:text-[#F97316] transition-colors uppercase font-bebas text-lg tracking-wider">Find Us & Order</button>
            
            <div className="pt-4 border-t border-[#40220F] flex flex-col space-y-2">
              <a 
                href="tel:+919876543210" 
                className="w-full text-center py-3 rounded bg-gradient-to-r from-[#F97316] to-[#D6A04D] text-black font-bebas text-lg uppercase tracking-wider block"
              >
                Call: +91 98765 43210
              </a>
            </div>
          </div>
        )}
      </header>

      {}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 overflow-hidden px-4 md:px-8">
        {/* Glow and fire ember backgrounds mimicking traditional open clay furnace */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black to-black opacity-90 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#F97316]/10 to-transparent rounded-full blur-3xl z-0" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Main Hero Marketing Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#40220F]/80 border border-[#D6A04D]/40 text-[#F97316] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Ghar Ka Swad, Har Niwale Mein Pyar</span>
            </div>
            
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Authentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#D6A04D]">Homemade</span> Marathi Non-Veg
            </h1>
            
            <p className="font-poppins text-[#F8E7C7]/80 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              Experience the authentic culinary secrets of rural Maharashtra, prepared fresh with hand-pounded masalas, zero preservatives, and the authentic touch of charcoal-fired clay tandoor cooking.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('menu')}
                className="w-full sm:w-auto font-bebas text-xl bg-gradient-to-r from-[#F97316] to-[#D6A04D] text-black px-8 py-3.5 rounded-md hover:scale-105 transition-all uppercase tracking-wider font-semibold hover:shadow-[0_0_15px_#F97316]"
              >
                View Premium Menu
              </button>
              
              <a 
                href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20some%20delicious%20Marathi%20Non-Vegetarian%20food!"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto font-bebas text-xl bg-[#090909] border-2 border-[#D6A04D] hover:bg-[#D6A04D] text-[#D6A04D] hover:text-black px-8 py-3.5 rounded-md hover:scale-105 transition-all uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Order On WhatsApp</span>
              </a>
            </div>

            {/* Quick Highlights Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#40220F]/80 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block font-bebas text-3xl text-[#F97316]">100%</span>
                <span className="text-xs text-[#F8E7C7]/60">Homemade Recipe</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-bebas text-3xl text-[#D6A04D]">0%</span>
                <span className="text-xs text-[#F8E7C7]/60">Frozen Base</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-bebas text-3xl text-[#F97316]">4.9 ★</span>
                <span className="text-xs text-[#F8E7C7]/60">Google Rated</span>
              </div>
            </div>

          </div>

          {/* Interactive Hero Graphic (Tandoor Visual Representation) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 md:w-96 md:h-96 float-animation">
              {/* Spinning/pulsing golden outer dial */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D6A04D]/30 animate-spin" style={{ animationDuration: '40s' }} />
              
              {/* Solid clay styled tandoor container */}
              <div className="absolute inset-6 rounded-full bg-[#151515] border-4 border-[#40220F] flex flex-col justify-center items-center shadow-2xl tandoor-glow overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)]" />
                
                {/* Visual fire embers rising up */}
                <div className="flex flex-col items-center z-10 text-center p-6">
                  <div className="text-6xl md:text-7xl mb-2 filter drop-shadow-[0_4px_10px_rgba(249,115,22,0.5)]">🍗</div>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#F8E7C7] tracking-wider">GHAR KA</h3>
                  <h2 className="font-bebas text-4xl md:text-5xl text-[#F97316] tracking-widest leading-none">TANDOOR</h2>
                  
                  {/* Glowing active charcoal furnace state indicator */}
                  <div className="mt-4 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#40220F] border border-[#F97316]/50">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-ping" />
                    <span className="font-bebas text-xs tracking-wider text-[#D6A04D]">CHARCOAL FIRED ACTIVE</span>
                  </div>
                </div>

                {/* Fire particles at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#F97316]/30 to-transparent flex justify-center">
                  <Flame className="w-12 h-12 text-[#F97316] opacity-60 animate-bounce" />
                </div>
              </div>

              {/* Little contextual badge floating outside */}
              <div className="absolute -bottom-2 -left-2 bg-[#40220F] border border-[#D6A04D] px-4 py-2 rounded shadow-lg text-center">
                <span className="block font-bebas text-xs text-[#D6A04D] uppercase tracking-wider">Based in</span>
                <span className="font-poppins font-semibold text-[#F8E7C7] text-sm">Vadodara, GJ</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {}
      <section id="popular" className="py-24 bg-[#0a0a0a] border-t border-b border-[#40220F]/40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-bebas text-lg text-[#F97316] tracking-widest block uppercase">CRISP & SMOKY</span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-white tracking-wider mt-1">
              Customer Favorites
            </h2>
            <div className="w-16 h-1 bg-[#D6A04D] mx-auto mt-4" />
            <p className="text-sm md:text-base text-[#F8E7C7]/70 mt-4">
              Handpicked customer sweethearts that carry the signature aromatic charcoal crunch. Order individually or add to WhatsApp cart instantly.
            </p>
          </div>

          {/* Grid of Custom Styled Interactive Popular Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POPULAR_DISHES.map((dish) => (
              <div 
                key={dish.id}
                className="bg-[#121212] border border-[#40220F] hover:border-[#D6A04D] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual / Graphic Representation placeholder */}
                  <div className="relative h-48 bg-[#1a1a1a] flex items-center justify-center overflow-hidden border-b border-[#40220F]">
                    {/* Dark/Warm ambient radial overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(64,34,15,0.4),transparent_80%)]" />
                    <span className="text-8xl transform group-hover:scale-110 transition-transform duration-300 select-none">
                      {dish.image}
                    </span>
                    <span className="absolute top-4 left-4 font-bebas text-xs bg-[#F97316] text-black px-3 py-1 rounded tracking-wider uppercase font-semibold">
                      {dish.badge}
                    </span>
                    <span className="absolute bottom-4 right-4 font-cinzel text-sm bg-black/80 text-[#D6A04D] border border-[#D6A04D]/30 px-3 py-1 rounded">
                      ₹{dish.price} ({dish.portion})
                    </span>
                  </div>

                  {/* Description Details */}
                  <div className="p-6">
                    <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#F97316] transition-colors">
                      {dish.title}
                    </h3>
                    <p className="text-xs text-[#F8E7C7]/70 mt-2 leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                  <button 
                    onClick={() => addToCart({ name: dish.title, price: dish.price })}
                    className="flex-1 font-bebas bg-[#40220F] hover:bg-[#F97316] text-[#F8E7C7] hover:text-[#090909] py-2.5 rounded text-center transition-colors border border-[#D6A04D]/30 hover:border-transparent flex items-center justify-center space-x-2 text-base tracking-widest uppercase"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Quick Add To Cart</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="menu" className="py-24 bg-[#090909] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-bebas text-lg text-[#F97316] tracking-widest block uppercase">THE GASTRONOMIC LEDGER</span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-white tracking-wider mt-1">
              Ghar Ka Complete Menu
            </h2>
            <div className="w-16 h-1 bg-[#D6A04D] mx-auto mt-4" />
            <p className="text-xs md:text-sm text-[#F8E7C7]/70 mt-4 font-poppins">
              Every item below is real text, optimized completely for lightning-fast search indexing and clean styling. Filter using categories and tap to build your customized home-cooked meal!
            </p>
          </div>

          {/* Interactive Responsive Category Switcher */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {[
              { id: 'chicken', label: '🐔 Chicken Specials' },
              { id: 'mutton', label: '🐐 Royal Mutton' },
              { id: 'seafood', label: '🐟 Seafood coastal' },
              { id: 'rice', label: '🍚 Rice selection' },
              { id: 'roti', label: '🫓 Bread & Bhakris' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveMenuCategory(cat.id)}
                className={`font-bebas text-lg px-6 py-2.5 rounded-md transition-all uppercase tracking-wider border ${
                  activeMenuCategory === cat.id 
                    ? 'bg-gradient-to-r from-[#F97316] to-[#D6A04D] text-black border-transparent shadow-[0_4px_12px_rgba(249,115,22,0.25)]' 
                    : 'bg-[#121212] text-[#F8E7C7]/80 hover:text-white border-[#40220F] hover:border-[#D6A04D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Categorized Food Items Grid List */}
          <div className="bg-[#121212] border border-[#40220F] rounded-xl p-6 md:p-10 shadow-xl max-w-4xl mx-auto">
            <div className="divide-y divide-[#40220F]/60">
              {FULL_MENU[activeMenuCategory].map((item, idx) => (
                <div 
                  key={idx} 
                  className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#F97316]">✦</span>
                      <h4 className="font-cinzel text-lg font-bold text-white group-hover:text-[#F97316] transition-colors">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#F8E7C7]/60 italic font-poppins pl-5">
                      {item.tag}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 pl-5 sm:pl-0">
                    <span className="font-bebas text-2xl text-[#D6A04D]">
                      ₹{item.price}
                    </span>
                    <button 
                      onClick={() => addToCart({ name: item.name, price: item.price })}
                      className="font-bebas text-sm bg-[#40220F]/80 hover:bg-[#F97316] text-[#F8E7C7] hover:text-black px-4 py-2 rounded-md transition-all border border-[#D6A04D]/30 flex items-center space-x-1 uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note regarding raw authentic spice level adjustment */}
            <div className="mt-8 bg-[#40220F]/20 border border-[#D6A04D]/30 rounded-lg p-4 flex items-start space-x-3">
              <span className="text-[#F97316] text-xl mt-0.5">🌶️</span>
              <p className="text-xs text-[#F8E7C7]/80 leading-relaxed font-poppins">
                <strong>Spice Customization Available:</strong> All our curries are made with homemade Marathi Koli and Saoji masalas. Mention your preferred spice level (Mild, Medium, High) during your checkout step.
              </p>
            </div>
          </div>

        </div>
      </section>

      {}
      <section id="why-us" className="py-24 bg-[#0a0a0a] border-t border-b border-[#40220F]/40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-bebas text-lg text-[#F97316] tracking-widest block uppercase">THE SEALS OF AUTHENTICITY</span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-white tracking-wider mt-1">
              Why Foodies Love Us
            </h2>
            <div className="w-16 h-1 bg-[#D6A04D] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-[#121212] border border-[#40220F] p-8 rounded-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#40220F] rounded-full border border-[#D6A04D] flex items-center justify-center text-[#F97316] mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">100% Homemade</h3>
              <p className="text-xs text-[#F8E7C7]/70 leading-relaxed font-poppins">
                Crafted in a homely kitchen setup following strict, old-school traditional recipes with motherly love.
              </p>
            </div>

            <div className="bg-[#121212] border border-[#40220F] p-8 rounded-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#40220F] rounded-full border border-[#D6A04D] flex items-center justify-center text-[#D6A04D] mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">Hygienic Preparation</h3>
              <p className="text-xs text-[#F8E7C7]/70 leading-relaxed font-poppins">
                Double filtered sanitization, clean workstation routines, and high-quality local ingredients only.
              </p>
            </div>

            <div className="bg-[#121212] border border-[#40220F] p-8 rounded-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#40220F] rounded-full border border-[#D6A04D] flex items-center justify-center text-[#F97316] mb-6">
                <Flame className="w-7 h-7 animate-pulse" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">Freshly Cooked</h3>
              <p className="text-xs text-[#F8E7C7]/70 leading-relaxed font-poppins">
                We never store stale curries or pre-cooked bases. Everything is cooked to order specifically for you.
              </p>
            </div>

            <div className="bg-[#121212] border border-[#40220F] p-8 rounded-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#40220F] rounded-full border border-[#D6A04D] flex items-center justify-center text-[#D6A04D] mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">No Preservatives</h3>
              <p className="text-xs text-[#F8E7C7]/70 leading-relaxed font-poppins">
                Zero synthetic food coloring, MSG, or artificial flavor enhances. All natural handground spices.
              </p>
            </div>

            <div className="bg-[#121212] border border-[#40220F] p-8 rounded-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#40220F] rounded-full border border-[#D6A04D] flex items-center justify-center text-[#F97316] mb-6">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">No Frozen Food</h3>
              <p className="text-xs text-[#F8E7C7]/70 leading-relaxed font-poppins">
                All meat and marine seafood ingredients are sourced fresh on a daily cycle. Absolutely no cold chain storage.
              </p>
            </div>

            <div className="bg-[#121212] border border-[#40220F] p-8 rounded-xl flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#40220F] rounded-full border border-[#D6A04D] flex items-center justify-center text-[#D6A04D] mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">Authentic Marathi Taste</h3>
              <p className="text-xs text-[#F8E7C7]/70 leading-relaxed font-poppins">
                The authentic fiery taste from rural Kolhapur, Nagpur, and Konkan regions, delivered right here in Vadodara.
              </p>
            </div>

          </div>

        </div>
      </section>

      {}
      <section id="catering" className="py-24 bg-[#090909] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Catering Visual / Informative text side */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-bebas text-lg text-[#F97316] tracking-widest block uppercase">EXPERIENCES FOR GROUPS</span>
              <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white tracking-wide">
                Exquisite Homemade Catering Services
              </h2>
              <div className="w-16 h-1 bg-[#D6A04D]" />
              
              <p className="text-sm text-[#F8E7C7]/80 leading-relaxed font-poppins">
                Hosting a backyard family event, office lunch, or house party? Bring the unforgettable charcoal warmth of Ghar Ka Tandoor to your tables. We offer beautifully curated packages for groups of 10 to 150 guests.
              </p>

              {/* Tag Bullet list */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  '🎂 Birthday Parties',
                  '🏢 Corporate Meetings',
                  '🏠 Family Reunions',
                  '🎉 Festive Social Gatherings',
                  '📦 Handcrafted Bulk Orders',
                  '🔥 Hot Weekend Specials'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs md:text-sm text-[#F8E7C7]">
                    <CheckCircle className="w-4 h-4 text-[#F97316] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#40220F]/30 border border-[#D6A04D]/30 p-6 rounded-lg">
                <h4 className="font-cinzel font-semibold text-white mb-1">Tailored Customization</h4>
                <p className="text-xs text-[#F8E7C7]/70 leading-relaxed">
                  We formulate custom menu cards based on your guests preference. Vegan options or milder spice variations for children can always be curated upon request.
                </p>
              </div>

            </div>

            {/* Interactive Catering Request Form */}
            <div className="lg:col-span-6 bg-[#121212] border border-[#40220F] rounded-xl p-6 md:p-8 gold-glow">
              <h3 className="font-cinzel text-2xl font-bold text-white mb-6 text-center lg:text-left">
                Get a Catering Quote
              </h3>
              
              <form onSubmit={handleCateringSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6A04D] mb-1.5 font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={cateringForm.name}
                      onChange={(e) => setCateringForm({ ...cateringForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Patil" 
                      className="w-full bg-[#090909] border border-[#40220F] rounded px-4 py-2.5 text-sm text-[#F8E7C7] focus:border-[#F97316] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6A04D] mb-1.5 font-semibold">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={cateringForm.phone}
                      onChange={(e) => setCateringForm({ ...cateringForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210" 
                      className="w-full bg-[#090909] border border-[#40220F] rounded px-4 py-2.5 text-sm text-[#F8E7C7] focus:border-[#F97316] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6A04D] mb-1.5 font-semibold">Type of Event</label>
                    <select 
                      value={cateringForm.event}
                      onChange={(e) => setCateringForm({ ...cateringForm, event: e.target.value })}
                      className="w-full bg-[#090909] border border-[#40220F] rounded px-4 py-2.5 text-sm text-[#F8E7C7] focus:border-[#F97316] outline-none"
                    >
                      <option>Birthday Party</option>
                      <option>Office Event</option>
                      <option>Family Gathering</option>
                      <option>House Party</option>
                      <option>Bulk Order Pickup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6A04D] mb-1.5 font-semibold">Expected Guests</label>
                    <select
                      value={cateringForm.guests}
                      onChange={(e) => setCateringForm({ ...cateringForm, guests: e.target.value })}
                      className="w-full bg-[#090909] border border-[#40220F] rounded px-4 py-2.5 text-sm text-[#F8E7C7] focus:border-[#F97316] outline-none"
                    >
                      <option>10 - 20 guests</option>
                      <option>20 - 50 guests</option>
                      <option>50 - 100 guests</option>
                      <option>100+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6A04D] mb-1.5 font-semibold">Date of Event</label>
                  <input 
                    type="date" 
                    required
                    value={cateringForm.date}
                    onChange={(e) => setCateringForm({ ...cateringForm, date: e.target.value })}
                    className="w-full bg-[#090909] border border-[#40220F] rounded px-4 py-2.5 text-sm text-[#F8E7C7] focus:border-[#F97316] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D6A04D] mb-1.5 font-semibold">Special Requests / Menu Preference</label>
                  <textarea 
                    rows="3"
                    value={cateringForm.message}
                    onChange={(e) => setCateringForm({ ...cateringForm, message: e.target.value })}
                    placeholder="Describe chosen menu dishes or custom spice tolerance requirements..." 
                    className="w-full bg-[#090909] border border-[#40220F] rounded px-4 py-2.5 text-sm text-[#F8E7C7] focus:border-[#F97316] outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={cateringSubmitted}
                  className="w-full font-bebas text-lg bg-gradient-to-r from-[#F97316] to-[#D6A04D] text-black py-3 rounded-md hover:scale-[1.01] transition-all uppercase tracking-wider"
                >
                  {cateringSubmitted ? 'Sending to Kitchen Support...' : 'Generate and Send Inquiry'}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {}
      <section className="py-24 bg-[#0a0a0a] border-t border-b border-[#40220F]/40 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-bebas text-lg text-[#F97316] tracking-widest block uppercase">THE CHATTER IN VADODARA</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-white tracking-wider mt-1 mb-12">
            What Customers Say
          </h2>

          <div className="bg-[#121212] border border-[#40220F] p-8 md:p-12 rounded-xl relative">
            <span className="text-7xl text-[#40220F] font-serif absolute top-4 left-6 select-none">“</span>
            
            <div className="relative z-10 space-y-4">
              <div className="flex justify-center items-center space-x-1">
                {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F97316] text-[#F97316]" />
                ))}
              </div>

              <p className="font-poppins text-base md:text-lg text-[#F8E7C7]/90 leading-relaxed italic">
                "{TESTIMONIALS[activeTestimonial].comment}"
              </p>

              <div>
                <h4 className="font-cinzel text-lg font-bold text-[#D6A04D]">
                  {TESTIMONIALS[activeTestimonial].name}
                </h4>
                <p className="text-xs text-[#F8E7C7]/50 font-poppins">
                  {TESTIMONIALS[activeTestimonial].role} • {TESTIMONIALS[activeTestimonial].date}
                </p>
              </div>
            </div>

            {/* Manual controls */}
            <div className="flex justify-center items-center space-x-3 mt-8">
              <button 
                onClick={() => setActiveTestimonial(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="p-2.5 rounded-full bg-[#090909] hover:bg-[#F97316] text-[#F8E7C7] hover:text-black transition-colors border border-[#40220F]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bebas text-[#D6A04D]">
                {activeTestimonial + 1} / {TESTIMONIALS.length}
              </span>
              <button 
                onClick={() => setActiveTestimonial(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="p-2.5 rounded-full bg-[#090909] hover:bg-[#F97316] text-[#F8E7C7] hover:text-black transition-colors border border-[#40220F]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="order" className="py-24 bg-[#090909] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Contact Coordinates Detail */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-bebas text-lg text-[#F97316] tracking-widest block uppercase font-semibold">VISIT US OR CALL</span>
              <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white tracking-wide">
                Ghar Ka Tandoor Location
              </h2>
              <div className="w-16 h-1 bg-[#D6A04D]" />

              <p className="text-sm text-[#F8E7C7]/80 leading-relaxed font-poppins">
                We prepare all of our exquisite culinary dishes fresh from our clean, domestic kitchen located in the premium residential heart of Vadodara. Drop by for a pick-up order, or dial us for instant delivery requests within the Vasna Bhayli area.
              </p>

              <div className="space-y-4 pt-4">
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#40220F] border border-[#D6A04D]/50 text-[#F97316] rounded-md mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-white text-sm">Our Kitchen Location</h4>
                    <p className="text-xs text-[#F8E7C7]/70 mt-1 font-poppins leading-relaxed">
                      Near Waves Club, Vasna Bhayli, Vadodara, Gujarat - 390015
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#40220F] border border-[#D6A04D]/50 text-[#D6A04D] rounded-md mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-white text-sm">Quick Call Lines</h4>
                    <p className="text-xs text-[#F8E7C7]/70 mt-1 font-poppins">
                      +91 98765 43210 (Direct Kitchen Desk)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#40220F] border border-[#D6A04D]/50 text-[#F97316] rounded-md mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-white text-sm">Kitchen Hours</h4>
                    <p className="text-xs text-[#F8E7C7]/70 mt-1 font-poppins">
                      Tuesday to Sunday: 12:00 PM – 4:00 PM | 7:00 PM – 11:30 PM (Closed on Mondays)
                    </p>
                  </div>
                </div>

              </div>

              {/* Instant Call Quick Action Triggers */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="tel:+919876543210" 
                  className="flex-1 font-bebas text-lg bg-gradient-to-r from-[#F97316] to-[#D6A04D] text-black py-3 rounded-md text-center hover:opacity-95 transition-all uppercase tracking-wider"
                >
                  📞 Call Now to Order
                </a>
                <a 
                  href="https://wa.me/919876543210?text=I%20want%20to%20order%20near%20Waves%20Club%20Vasna%20Bhayli."
                  className="flex-1 font-bebas text-lg bg-[#090909] border border-[#D6A04D] text-[#D6A04D] py-3 rounded-md text-center hover:bg-[#D6A04D] hover:text-black transition-all uppercase tracking-wider block"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>

            </div>

            {/* Simulated Live Location Google Map Frame inside Vadodara */}
            <div className="lg:col-span-7 bg-[#121212] border-2 border-[#40220F] p-2 rounded-xl overflow-hidden shadow-2xl relative group">
              <div className="absolute top-4 left-4 z-10 bg-black/90 border border-[#D6A04D]/50 px-3 py-1.5 rounded text-[10px] text-[#F8E7C7] uppercase tracking-wider">
                📍 Vasna Bhayli, Vadodara Location Map
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14766.17387431284!2d73.111833!3d22.295245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc663ad57297f%3A0xc312480bf176b92a!2sBhayli%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000" 
                className="w-full h-96 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ghar Ka Tandoor Location Map near Waves Club"
              />
            </div>

          </div>

        </div>
      </section>

      {}
      <footer className="bg-[#050505] text-[#F8E7C7]/80 border-t border-[#40220F] pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand/Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#40220F] border border-[#D6A04D] text-[#F97316]">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-cinzel font-black text-lg text-white tracking-widest">
                GHAR KA TANDOOR
              </span>
            </div>
            <p className="text-xs text-[#F8E7C7]/60 leading-relaxed font-poppins">
              Cooking with love, pure hand-beaten spices, and zero commercial colors. Experience the warm embrace of Maharashtra's home recipes directly in Vadodara.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-[#121212] hover:bg-[#F97316] text-[#F8E7C7] hover:text-black transition-colors border border-[#40220F]">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:gharkatandoor@gmail.com" className="p-2.5 rounded-full bg-[#121212] hover:bg-[#F97316] text-[#F8E7C7] hover:text-black transition-colors border border-[#40220F]">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Sitemap Links */}
          <div>
            <h4 className="font-cinzel font-bold text-white text-sm uppercase tracking-wider mb-5">Quick Sitemap</h4>
            <ul className="space-y-2.5 text-xs font-poppins">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-[#F97316] transition-colors">Home Base</button></li>
              <li><button onClick={() => scrollToSection('popular')} className="hover:text-[#F97316] transition-colors">Popular Specialties</button></li>
              <li><button onClick={() => scrollToSection('menu')} className="hover:text-[#F97316] transition-colors">Complete Food Menu</button></li>
              <li><button onClick={() => scrollToSection('why-us')} className="hover:text-[#F97316] transition-colors">The Authenticity Stamp</button></li>
              <li><button onClick={() => scrollToSection('catering')} className="hover:text-[#F97316] transition-colors">Group Catering Queries</button></li>
              <li><button onClick={() => scrollToSection('order')} className="hover:text-[#F97316] transition-colors">Find Location</button></li>
            </ul>
          </div>

          {/* Domain Recommendations & SEO Help */}
          <div>
            <h4 className="font-cinzel font-bold text-white text-sm uppercase tracking-wider mb-5">Branding Domains</h4>
            <p className="text-xs text-[#F8E7C7]/60 mb-4 leading-relaxed font-poppins">
              These verified clean brand domains are perfect fits to register for your website deployment:
            </p>
            <ul className="space-y-1.5 text-xs font-bebas tracking-wider text-[#D6A04D]">
              <li>✓ gharkatandoor.in</li>
              <li>✓ gharkaswad.in</li>
              <li>✓ gharkatandoorvadodara.in</li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div>
            <h4 className="font-cinzel font-bold text-white text-sm uppercase tracking-wider mb-5">Weekly Special Updates</h4>
            <p className="text-xs text-[#F8E7C7]/60 mb-4 leading-relaxed font-poppins">
              Subscribe to stay notified about our weekend specials, festive hand-ground masalas, and exclusive coupons.
            </p>
            
            {newsletterSubscribed ? (
              <div className="bg-[#40220F]/40 border border-[#D6A04D]/40 p-3 rounded text-xs text-center">
                🎉 Welcome to the Foodies Circle!
              </div>
            ) : (
              <div className="flex">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your Email" 
                  className="bg-[#121212] text-xs text-[#F8E7C7] border border-[#40220F] px-3 py-2.5 rounded-l outline-none focus:border-[#F97316] w-full"
                />
                <button 
                  onClick={() => {
                    if (newsletterEmail) setNewsletterSubscribed(true);
                  }}
                  className="bg-[#F97316] hover:bg-[#D6A04D] text-black px-4 py-2.5 rounded-r transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar copyright content */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-[#40220F]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs text-[#F8E7C7]/40 text-center sm:text-left font-poppins">
            © 2026 Ghar Ka Tandoor. All rights reserved. Prepared with absolute hygienic love by home chefs in Vasna Bhayli, Vadodara.
          </p>
          <div className="flex items-center space-x-4 text-[10px] md:text-xs text-[#F8E7C7]/40">
            <span>FSSAI Certified Setup</span>
            <span>•</span>
            <span>100% Homemade Marathi Recipe</span>
          </div>
        </div>
      </footer>

      {}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3">
        {/* Telephone Call Dial Quick button */}
        <a 
          href="tel:+919876543210" 
          className="p-3.5 rounded-full bg-[#40220F] hover:bg-[#D6A04D] text-[#D6A04D] hover:text-black transition-all shadow-lg border border-[#D6A04D]/40 hover:scale-110 flex items-center justify-center"
          title="Call Kitchen Now"
        >
          <Phone className="w-6 h-6 animate-pulse" />
        </a>

        {/* WhatsApp Fast Contact Quick button */}
        <a 
          href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20some%20delicious%20Marathi%20Non-Vegetarian%20food!"
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all shadow-lg hover:scale-110 flex items-center justify-center border border-white/20"
          title="Chat on WhatsApp"
        >
          {/* Custom WhatsApp Icon Path representation */}
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.002 5.247 5.248-.002 11.754 0c3.153.001 6.117 1.23 8.347 3.463 2.23 2.231 3.456 5.197 3.455 8.351-.002 6.507-5.248 11.756-11.75 11.756-2.001-.001-3.972-.51-5.713-1.478L0 24zm6.49-4.22c1.64.973 3.491 1.493 5.41 1.495 5.568 0 10.106-4.532 10.109-10.104.002-2.7-.1.047-1.054-4.757-5.811A10.12 10.12 0 0 0 11.755 1.58C6.185 1.58 1.648 6.115 1.646 11.685c-.001 1.83.479 3.618 1.392 5.193l-.913 3.333 3.422-.897zM18.02 14.733c-.344-.173-2.038-1.006-2.35-1.12-.313-.113-.54-.17-.768.17-.228.34-.881 1.12-1.08 1.347-.199.227-.398.256-.742.083-1.36-.682-2.28-1.21-3.18-2.759-.236-.405.236-.376.677-1.25.077-.154.038-.288-.019-.402-.057-.113-.54-1.3-.742-1.782-.196-.475-.397-.406-.54-.415-.14-.007-.301-.008-.461-.008-.16 0-.422.06-.643.301-.222.24-.846.827-.846 2.016 0 1.189.865 2.337 1.054 2.592.19.256 1.7 2.597 4.12 3.64.576.248 1.025.396 1.375.508.579.184 1.107.158 1.524.096.465-.07 1.412-.577 1.611-1.134.199-.557.199-1.033.14-1.133-.06-.1-.223-.171-.567-.344z"/>
          </svg>
        </a>
      </div>

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-poppins">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#121212] border-l border-[#40220F] flex flex-col justify-between h-full shadow-2xl relative">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#40220F] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#F97316]" />
                  <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">
                    WhatsApp Cart
                  </h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2.5 rounded-full bg-[#090909] hover:bg-[#F97316] hover:text-black transition-colors border border-[#40220F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Cart Listing Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-6xl select-none filter opacity-50">🥘</span>
                    <h4 className="font-cinzel text-base font-bold text-white">Your Cart is Empty</h4>
                    <p className="text-xs text-[#F8E7C7]/60 max-w-xs leading-relaxed">
                      Browse our signature popular dishes or the complete Marathi list to compile your delicious non-veg craving.
                    </p>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        scrollToSection('menu');
                      }}
                      className="font-bebas text-sm bg-[#40220F] hover:bg-[#F97316] text-[#F8E7C7] hover:text-black px-6 py-2.5 rounded border border-[#D6A04D]/30 transition-all uppercase tracking-wider"
                    >
                      Start Adding Food
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-[#40220F]/40">
                      <span className="text-xs text-[#D6A04D] uppercase tracking-wider font-semibold">Selected Food Item</span>
                      <button 
                        onClick={clearCart} 
                        className="text-[10px] text-[#F97316] hover:underline uppercase tracking-wider"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="divide-y divide-[#40220F]/40">
                      {cart.map((item, idx) => (
                        <div key={idx} className="py-4 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h5 className="font-cinzel text-sm font-bold text-white">{item.name}</h5>
                            <span className="text-xs text-[#D6A04D] font-mono">₹{item.price} each</span>
                          </div>

                          <div className="flex items-center space-x-3 bg-[#090909] border border-[#40220F] rounded px-2 py-1">
                            <button 
                              onClick={() => updateCartQty(item.name, -1)}
                              className="text-[#F8E7C7]/60 hover:text-[#F97316] transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-white w-4 text-center">{item.qty}</span>
                            <button 
                              onClick={() => updateCartQty(item.name, 1)}
                              className="text-[#F8E7C7]/60 hover:text-[#F97316] transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Sticky Footer Checkout controls */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#40220F] bg-[#151515] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-cinzel text-sm text-[#F8E7C7]/70 uppercase tracking-wider">Subtotal:</span>
                    <span className="font-cinzel text-2xl font-black text-[#F97316] tracking-wide">
                      ₹{getCartTotal()}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#F8E7C7]/50 font-poppins leading-relaxed">
                    This order will be automatically compiled into a formatted list and sent straight to our WhatsApp kitchen dispatcher. You can specify custom address, time & spice levels in your chat window.
                  </p>

                  <button 
                    onClick={handleCheckoutWhatsApp}
                    className="w-full font-bebas text-lg bg-gradient-to-r from-[#F97316] to-[#D6A04D] text-black py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 uppercase tracking-widest"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Order to WhatsApp</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}