import React, { useState } from 'react';
import { MessageSquare, Calendar, ShoppingCart, Headphones, CreditCard, Brain, Check, ArrowRight, ArrowLeft, ChevronDown, Bot, Sparkles, X, Menu } from 'lucide-react';

const RUBROS = [
  { id: 'salud', name: 'Salud', icon: '🏥', desc: 'Consultorios, clínicas, profesionales de salud', examples: 'Turnos médicos, recordatorios, fichas de pacientes' },
  { id: 'tecnico', name: 'Servicio Técnico', icon: '🔧', desc: 'Reparaciones, mantenimiento, soporte', examples: 'Seguimiento de reparaciones, presupuestos, entregas' },
  { id: 'legal', name: 'Legal / Contable', icon: '⚖️', desc: 'Estudios jurídicos, contadores, consultores', examples: 'Gestión de casos, vencimientos, documentación' },
  { id: 'belleza', name: 'Belleza / Bienestar', icon: '💅', desc: 'Peluquerías, spa, estética, gimnasios', examples: 'Reservas, promociones, fidelización' },
  { id: 'otro', name: 'Otro Rubro', icon: '🏢', desc: 'Cualquier negocio con atención al cliente', examples: 'Solución personalizada a tu medida' },
];

const AGENTES = [
  { id: 'turnos', name: 'Agente de Turnos', Icon: Calendar, price: 45000, monthly: 8000, desc: 'Agenda citas automáticamente por WhatsApp', features: ['Sincroniza con Google Calendar', 'Confirmaciones automáticas', 'Recordatorios 24hs antes', 'Reprogramación fácil'], popular: true },
  { id: 'consultas', name: 'Agente de Consultas', Icon: MessageSquare, price: 35000, monthly: 6000, desc: 'Responde preguntas frecuentes con IA', features: ['Aprende de tu negocio', 'Respuestas personalizadas', 'Escala a humano si necesita', 'Disponible 24/7'] },
  { id: 'ventas', name: 'Agente de Ventas', Icon: ShoppingCart, price: 55000, monthly: 10000, desc: 'Muestra productos y procesa pedidos', features: ['Catálogo interactivo', 'Carrito de compras', 'Integra MercadoPago', 'Seguimiento de pedidos'] },
  { id: 'soporte', name: 'Agente de Soporte', Icon: Headphones, price: 40000, monthly: 7000, desc: 'Gestiona tickets y seguimiento', features: ['Crea tickets automáticos', 'Notifica actualizaciones', 'Historial del cliente', 'Métricas de resolución'] },
  { id: 'cobranzas', name: 'Agente de Cobranzas', Icon: CreditCard, price: 30000, monthly: 5000, desc: 'Envía recordatorios de pago', features: ['Recordatorios automáticos', 'Links de pago', 'Seguimiento de deudas', 'Reportes de cobranza'] },
];

const DASHBOARDS = [
  { id: 'simple', name: 'Dashboard Simple', price: 0, monthly: 0, desc: 'Métricas básicas en Airtable', features: ['Vista de conversaciones', 'Conteo de turnos/ventas', 'Acceso web'] },
  { id: 'completo', name: 'Dashboard Completo', price: 15000, monthly: 5000, desc: 'Analytics avanzado con gráficos', features: ['Gráficos interactivos', 'Métricas en tiempo real', 'Exportación de datos', 'Múltiples usuarios'], popular: true },
  { id: 'enterprise', name: 'Dashboard Enterprise', price: 40000, monthly: 12000, desc: 'BI completo con predicciones', features: ['Predicciones con IA', 'Reportes automáticos', 'API de datos', 'White-label'] },
];

const ARQUITECTURAS = [
  { id: 'basica', name: 'Arquitectura Básica', price: 0, monthly: 0, desc: 'Ideal para empezar', features: ['1-2 agentes', 'Flujos simples', 'Soporte por email'] },
  { id: 'multiagente', name: 'Multiagente', price: 20000, monthly: 0, desc: 'Agentes que colaboran entre sí', features: ['3+ agentes coordinados', 'Transferencia inteligente', 'Contexto compartido'], popular: true },
  { id: 'ace', name: 'ACE Autónomo', price: 50000, monthly: 15000, desc: 'El sistema aprende y mejora solo', features: ['Auto-mejora continua', 'Detecta y corrige errores', 'Menos mantenimiento', 'Máxima automatización'] },
];

const EXTRAS = [
  { id: 'calendar', name: 'Google Calendar', price: 10000, monthly: 0, Icon: Calendar },
  { id: 'mercadopago', name: 'MercadoPago', price: 15000, monthly: 0, Icon: CreditCard },
  { id: 'memoria', name: 'Memoria Avanzada', price: 0, monthly: 5000, Icon: Brain },
  { id: 'soporte247', name: 'Soporte 24/7', price: 0, monthly: 8000, Icon: Headphones },
];

const ConfigCard = ({ selected, onClick, children, className = '' }) => (
  <button onClick={onClick} className={`relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${selected ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20' : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600 hover:bg-zinc-800'} ${className}`}>
    {selected && <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={14} className="text-zinc-900" /></div>}
    {children}
  </button>
);

const Configurator = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState({ rubro: null, agentes: [], dashboard: null, arquitectura: null, extras: [], contacto: { nombre: '', empresa: '', telefono: '', email: '' } });

  const calcularPrecio = () => {
    let setup = 0, mensual = 0;
    config.agentes.forEach(id => { const a = AGENTES.find(x => x.id === id); if (a) { setup += a.price; mensual += a.monthly; } });
    if (config.dashboard) { const d = DASHBOARDS.find(x => x.id === config.dashboard); if (d) { setup += d.price; mensual += d.monthly; } }
    if (config.arquitectura) { const a = ARQUITECTURAS.find(x => x.id === config.arquitectura); if (a) { setup += a.price; mensual += a.monthly; } }
    config.extras.forEach(id => { const e = EXTRAS.find(x => x.id === id); if (e) { setup += e.price; mensual += e.monthly; } });
    if (config.agentes.length >= 3) setup = Math.round(setup * 0.85);
    return { setup, mensual };
  };

  const precio = calcularPrecio();
  const canContinue = step === 0 ? config.rubro : step === 1 ? config.agentes.length > 0 : step === 2 ? config.dashboard : step === 3 ? config.arquitectura : true;
  const steps = [{ title: 'Tu Rubro', subtitle: '¿En qué industria trabajás?' }, { title: 'Agentes', subtitle: '¿Qué querés automatizar?' }, { title: 'Dashboard', subtitle: '¿Cómo querés ver tus métricas?' }, { title: 'Arquitectura', subtitle: '¿Qué nivel de autonomía?' }, { title: 'Extras', subtitle: 'Integraciones adicionales' }, { title: 'Contacto', subtitle: 'Te enviamos tu Blueprint' }];

  const handleSubmit = () => {
    const message = `¡Hola! Quiero armar mi sistema Aidaptive 🚀\n\n📋 *Mi configuración:*\n• Rubro: ${RUBROS.find(r => r.id === config.rubro)?.name}\n• Agentes: ${config.agentes.map(id => AGENTES.find(a => a.id === id)?.name).join(', ')}\n• Dashboard: ${DASHBOARDS.find(d => d.id === config.dashboard)?.name}\n• Arquitectura: ${ARQUITECTURAS.find(a => a.id === config.arquitectura)?.name}\n${config.extras.length > 0 ? `• Extras: ${config.extras.map(id => EXTRAS.find(e => e.id === id)?.name).join(', ')}` : ''}\n\n💰 *Presupuesto estimado:*\n• Setup: $${precio.setup.toLocaleString()}\n• Mensual: $${precio.mensual.toLocaleString()}/mes\n\n📧 *Mis datos:*\n• Nombre: ${config.contacto.nombre}\n• Empresa: ${config.contacto.empresa}\n• Email: ${config.contacto.email}`;
    window.open(`https://wa.me/5491156820741?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 overflow-y-auto">
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition text-zinc-400 hover:text-white"><X size={20} /></button>
            <div><div className="text-white font-semibold">{steps[step].title}</div><div className="text-zinc-500 text-sm">{steps[step].subtitle}</div></div>
          </div>
          {step > 0 && <div className="text-right"><div className="text-emerald-400 font-bold">${precio.setup.toLocaleString()}</div><div className="text-zinc-500 text-xs">+ ${precio.mensual.toLocaleString()}/mes</div></div>}
        </div>
        <div className="h-1 bg-zinc-800"><div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6">
        {step === 0 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{RUBROS.map((rubro) => <ConfigCard key={rubro.id} selected={config.rubro === rubro.id} onClick={() => setConfig({ ...config, rubro: rubro.id })}><div className="text-3xl mb-2">{rubro.icon}</div><h3 className="text-lg font-semibold text-white mb-1">{rubro.name}</h3><p className="text-zinc-400 text-sm mb-1">{rubro.desc}</p><p className="text-zinc-500 text-xs">{rubro.examples}</p></ConfigCard>)}</div>}
        {step === 1 && <div className="space-y-3"><p className="text-zinc-400 mb-4">Seleccioná todos los que necesites. <span className="text-emerald-400 font-medium">3 o más = 15% descuento</span></p><div className="grid grid-cols-1 gap-3">{AGENTES.map((agent) => <ConfigCard key={agent.id} selected={config.agentes.includes(agent.id)} onClick={() => { const newAgentes = config.agentes.includes(agent.id) ? config.agentes.filter(x => x !== agent.id) : [...config.agentes, agent.id]; setConfig({ ...config, agentes: newAgentes }); }}><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0"><agent.Icon size={24} className="text-emerald-400" /></div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1 flex-wrap"><h3 className="text-base font-semibold text-white">{agent.name}</h3>{agent.popular && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Popular</span>}</div><p className="text-zinc-400 text-sm mb-2">{agent.desc}</p><div className="flex items-center gap-3 text-sm"><span className="text-white font-medium">${agent.price.toLocaleString()}</span><span className="text-zinc-500">+ ${agent.monthly.toLocaleString()}/mes</span></div></div></div></ConfigCard>)}</div>{config.agentes.length >= 3 && <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-center text-sm">🎉 ¡15% de descuento aplicado por seleccionar 3+ agentes!</div>}</div>}
        {step === 2 && <div className="grid grid-cols-1 gap-3">{DASHBOARDS.map((dash) => <ConfigCard key={dash.id} selected={config.dashboard === dash.id} onClick={() => setConfig({ ...config, dashboard: dash.id })}><div className="flex justify-between items-start mb-2"><div><h3 className="text-base font-semibold text-white">{dash.name}</h3>{dash.popular && <span className="text-xs text-emerald-400">Recomendado</span>}</div><div className="text-right">{dash.price === 0 && dash.monthly === 0 ? <span className="text-emerald-400 font-medium">Incluido</span> : <><div className="text-white font-medium">${dash.price.toLocaleString()}</div>{dash.monthly > 0 && <div className="text-zinc-500 text-xs">+ ${dash.monthly.toLocaleString()}/mes</div>}</>}</div></div><p className="text-zinc-400 text-sm mb-3">{dash.desc}</p><div className="flex flex-wrap gap-2">{dash.features.map((f, i) => <span key={i} className="text-xs px-2 py-1 bg-zinc-700/50 rounded text-zinc-300">{f}</span>)}</div></ConfigCard>)}</div>}
        {step === 3 && <div className="grid grid-cols-1 gap-3">{ARQUITECTURAS.map((arq) => <ConfigCard key={arq.id} selected={config.arquitectura === arq.id} onClick={() => setConfig({ ...config, arquitectura: arq.id })}><div className="flex justify-between items-start mb-2"><div><h3 className="text-base font-semibold text-white">{arq.name}</h3>{arq.popular && <span className="text-xs text-emerald-400">Recomendado</span>}</div><div className="text-right">{arq.price === 0 && arq.monthly === 0 ? <span className="text-emerald-400 font-medium">Incluido</span> : <><div className="text-white font-medium">+${arq.price.toLocaleString()}</div>{arq.monthly > 0 && <div className="text-zinc-500 text-xs">+ ${arq.monthly.toLocaleString()}/mes</div>}</>}</div></div><p className="text-zinc-400 text-sm mb-3">{arq.desc}</p><div className="flex flex-wrap gap-2">{arq.features.map((f, i) => <span key={i} className="text-xs px-2 py-1 bg-zinc-700/50 rounded text-zinc-300">{f}</span>)}</div></ConfigCard>)}</div>}
        {step === 4 && <div className="space-y-3"><p className="text-zinc-400 mb-4">Opcionales. Podés agregarlos después también.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{EXTRAS.map((extra) => <ConfigCard key={extra.id} selected={config.extras.includes(extra.id)} onClick={() => { const newExtras = config.extras.includes(extra.id) ? config.extras.filter(x => x !== extra.id) : [...config.extras, extra.id]; setConfig({ ...config, extras: newExtras }); }}><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-zinc-700 flex items-center justify-center"><extra.Icon size={20} className="text-zinc-300" /></div><div className="flex-1"><h3 className="text-white font-medium">{extra.name}</h3><div className="text-sm text-zinc-400">{extra.price > 0 && <span className="text-emerald-400">+${extra.price.toLocaleString()}</span>}{extra.monthly > 0 && <span> +${extra.monthly.toLocaleString()}/mes</span>}</div></div></div></ConfigCard>)}</div></div>}
        {step === 5 && <div className="max-w-md mx-auto"><div className="bg-zinc-800/50 rounded-2xl p-5 border border-zinc-700 mb-5"><h3 className="text-base font-semibold text-white mb-3">Resumen de tu sistema</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-zinc-400">Rubro</span><span className="text-white">{RUBROS.find(r => r.id === config.rubro)?.name}</span></div><div className="flex justify-between items-start"><span className="text-zinc-400">Agentes ({config.agentes.length})</span><span className="text-white text-right text-xs max-w-[60%]">{config.agentes.map(id => AGENTES.find(a => a.id === id)?.name).join(', ')}</span></div><div className="flex justify-between"><span className="text-zinc-400">Dashboard</span><span className="text-white">{DASHBOARDS.find(d => d.id === config.dashboard)?.name}</span></div><div className="flex justify-between"><span className="text-zinc-400">Arquitectura</span><span className="text-white">{ARQUITECTURAS.find(a => a.id === config.arquitectura)?.name}</span></div>{config.extras.length > 0 && <div className="flex justify-between items-start"><span className="text-zinc-400">Extras</span><span className="text-white text-right text-xs">{config.extras.map(id => EXTRAS.find(e => e.id === id)?.name).join(', ')}</span></div>}<div className="pt-3 mt-3 border-t border-zinc-700"><div className="flex justify-between text-lg"><span className="text-zinc-400">Setup</span><span className="text-emerald-400 font-bold">${precio.setup.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-zinc-400">Mensual</span><span className="text-white font-medium">${precio.mensual.toLocaleString()}/mes</span></div></div></div></div><div className="space-y-3"><input type="text" placeholder="Tu nombre" value={config.contacto.nombre} onChange={(e) => setConfig({ ...config, contacto: { ...config.contacto, nombre: e.target.value } })} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition" /><input type="text" placeholder="Nombre de tu empresa" value={config.contacto.empresa} onChange={(e) => setConfig({ ...config, contacto: { ...config.contacto, empresa: e.target.value } })} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition" /><input type="tel" placeholder="WhatsApp (con código de área)" value={config.contacto.telefono} onChange={(e) => setConfig({ ...config, contacto: { ...config.contacto, telefono: e.target.value } })} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition" /><input type="email" placeholder="Email" value={config.contacto.email} onChange={(e) => setConfig({ ...config, contacto: { ...config.contacto, email: e.target.value } })} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition" /></div></div>}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800">
          <button onClick={() => step > 0 && setStep(step - 1)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}><ArrowLeft size={18} />Anterior</button>
          {step < 5 ? <button onClick={() => canContinue && setStep(step + 1)} disabled={!canContinue} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition ${canContinue ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 hover:opacity-90' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>Siguiente<ArrowRight size={18} /></button> : <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 font-semibold rounded-xl hover:opacity-90 transition"><Sparkles size={18} />Enviar por WhatsApp</button>}
        </div>
      </div>
    </div>
  );
};

const NavBar = ({ onConfigClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center"><Bot size={20} className="text-zinc-900" /></div><span className="text-xl font-bold text-white">Aidaptive</span></div>
        <div className="hidden md:flex items-center gap-8"><a href="#demo" className="text-zinc-400 hover:text-white transition">Demo</a><a href="#features" className="text-zinc-400 hover:text-white transition">Agentes</a><a href="#integraciones" className="text-zinc-400 hover:text-white transition">Integraciones</a></div>
        <div className="flex items-center gap-3"><button onClick={onConfigClick} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 font-semibold rounded-full hover:opacity-90 transition text-sm">Armá tu Sistema</button><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-zinc-400 hover:text-white"><Menu size={24} /></button></div>
      </div>
      {mobileMenuOpen && <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3"><a href="#demo" className="block text-zinc-400 hover:text-white transition">Demo</a><a href="#features" className="block text-zinc-400 hover:text-white transition">Agentes</a><a href="#integraciones" className="block text-zinc-400 hover:text-white transition">Integraciones</a></div>}
    </nav>
  );
};

const Hero = ({ onConfigClick }) => (
  <section className="pt-28 pb-20 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700 mb-6"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-sm text-zinc-300">Automatización inteligente para tu negocio</span></div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Tu negocio en<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> piloto automático</span></h1>
      <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">Agentes de IA que atienden WhatsApp, agendan turnos, responden consultas y venden por vos. 24/7, sin errores, sin esperas.</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onConfigClick} className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 font-semibold rounded-full hover:opacity-90 transition flex items-center justify-center gap-2 text-lg">Armá tu Sistema<ArrowRight className="group-hover:translate-x-1 transition" size={20} /></button>
        <a href="#demo" className="w-full sm:w-auto px-8 py-4 text-white font-medium hover:text-emerald-400 transition flex items-center justify-center gap-2">Ver Demo en Vivo<ChevronDown size={20} /></a>
      </div>
      <div className="grid grid-cols-3 gap-6 sm:gap-8 mt-16 max-w-lg mx-auto">{[{ value: '90%', label: 'Automatización' }, { value: '24/7', label: 'Disponibilidad' }, { value: '3 sem', label: 'Implementación' }].map((stat, i) => <div key={i} className="text-center"><div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div><div className="text-zinc-500 text-xs sm:text-sm">{stat.label}</div></div>)}</div>
    </div>
  </section>
);

const DemoSection = () => (
  <section id="demo" className="py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Miralo funcionando</h2><p className="text-zinc-400">Sistema real de iGreen Servicio Técnico</p></div>
      <div className="max-w-sm mx-auto">
        <div className="bg-zinc-900 rounded-[2.5rem] p-2 border border-zinc-800 shadow-2xl">
          <div className="bg-zinc-950 rounded-[2rem] overflow-hidden">
            <div className="bg-emerald-600 px-4 py-3 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Bot size={20} className="text-white" /></div><div><div className="text-white font-medium">iGreen Servicio Técnico</div><div className="text-emerald-100 text-xs">en línea</div></div></div>
            <div className="p-4 space-y-3 min-h-[400px] bg-[#0b141a]">
              <div className="flex justify-end"><div className="bg-emerald-700 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">Hola! Quiero un turno para cambiar la batería de mi iPhone 13</div></div>
              <div className="flex justify-start"><div className="bg-zinc-800 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">¡Hola! 👋 Perfecto, tenemos disponibilidad para cambio de batería iPhone 13.<br /><br />📅 ¿Te sirve el miércoles 18 a las 15:30hs?</div></div>
              <div className="flex justify-end"><div className="bg-emerald-700 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm">Dale, confirmo</div></div>
              <div className="flex justify-start"><div className="bg-zinc-800 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">✅ ¡Listo! Tu turno quedó confirmado:<br /><br />📱 Cambio batería iPhone 13<br />📅 Miércoles 18/12<br />🕒 15:30hs<br />📍 Av. Corrientes 1234<br /><br />Te envío recordatorio 24hs antes 🔔</div></div>
            </div>
          </div>
        </div>
        <p className="text-center text-zinc-500 text-sm mt-4">Conversación real con el sistema de iGreen</p>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="py-20 px-4 bg-zinc-900/50">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Agentes que trabajan por vos</h2><p className="text-zinc-400 max-w-2xl mx-auto">Cada agente es un experto en su área. Combiná los que necesites.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{AGENTES.slice(0, 3).map((agent) => <div key={agent.id} className="group relative bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700 hover:border-emerald-500/50 transition-all hover:-translate-y-1">{agent.popular && <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 text-xs font-semibold rounded-full">Popular</div>}<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4"><agent.Icon size={24} className="text-emerald-400" /></div><h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3><p className="text-zinc-400 text-sm mb-4">{agent.desc}</p><ul className="space-y-2">{agent.features.slice(0, 3).map((f, i) => <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm"><Check size={16} className="text-emerald-400 flex-shrink-0" />{f}</li>)}</ul></div>)}</div>
    </div>
  </section>
);

const IntegrationsSection = () => (
  <section id="integraciones" className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Se integra con todo</h2>
      <p className="text-zinc-400 mb-12">Conecta tus herramientas favoritas</p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">{[{ name: 'WhatsApp', color: 'bg-green-500' }, { name: 'Google Calendar', color: 'bg-blue-500' }, { name: 'MercadoPago', color: 'bg-sky-400' }, { name: 'Airtable', color: 'bg-yellow-500' }, { name: 'OpenAI', color: 'bg-purple-500' }].map((int, i) => <div key={i} className="flex items-center gap-3 px-5 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 hover:border-zinc-600 transition"><div className={`w-8 h-8 rounded-lg ${int.color}`} /><span className="text-white font-medium">{int.name}</span></div>)}</div>
    </div>
  </section>
);

const CTASection = ({ onConfigClick }) => (
  <section className="py-20 px-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">¿Listo para automatizar?</h2>
      <p className="text-zinc-400 mb-8">Armá tu sistema en 2 minutos y recibí un Blueprint personalizado con todo lo que incluye.</p>
      <button onClick={onConfigClick} className="group px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-900 font-bold rounded-full hover:opacity-90 transition flex items-center gap-2 mx-auto text-lg">Armá tu Sistema<ArrowRight className="group-hover:translate-x-1 transition" size={20} /></button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 px-4 border-t border-zinc-800">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center"><Bot size={14} className="text-zinc-900" /></div><span className="text-zinc-400">Aidaptive © 2024</span></div>
      <div className="flex items-center gap-6 text-sm text-zinc-500"><a href="#" className="hover:text-white transition">Términos</a><a href="#" className="hover:text-white transition">Privacidad</a><a href="#" className="hover:text-white transition">Contacto</a></div>
    </div>
  </footer>
);

export default function App() {
  const [showConfigurator, setShowConfigurator] = useState(false);
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavBar onConfigClick={() => setShowConfigurator(true)} />
      <Hero onConfigClick={() => setShowConfigurator(true)} />
      <DemoSection />
      <FeaturesSection />
      <IntegrationsSection />
      <CTASection onConfigClick={() => setShowConfigurator(true)} />
      <Footer />
      {showConfigurator && <Configurator onClose={() => setShowConfigurator(false)} />}
    </div>
  );
}