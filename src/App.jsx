import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    LayoutDashboard, TrendingUp, Users, Globe, Settings, Bell, Search,
    ArrowUpRight, ArrowDownRight, IndianRupee, Target, Activity,
    Layers, Filter, Download, MoreHorizontal, CheckCircle2, AlertCircle, Clock, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { revenueData, userSegments, geographicData, customerList, cohortData, profileData } from './data/mockData';

// --- Reusable Components ---

const Toast = ({ message, type, onClose }) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl glass-panel border border-violet-500/30 min-w-[300px] z-[2000] mb-3`}
    >
        <div className={`p-2 rounded-lg ${type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'}`}>
            {type === 'success' ? <CheckCircle2 size={18} /> : <Activity size={18} />}
        </div>
        <div className="flex-1">
            <p className="text-sm font-bold text-slate-100">{message}</p>
            <p className="text-[10px] text-slate-400">Action acknowledged by Nexus Intel</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors shrink-0">
            <X size={16} />
        </button>
    </motion.div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`nav-item flex items-center gap-3 p-3.5 rounded-xl cursor-pointer ${active ? 'active bg-violet-600/10 text-violet-400 font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
    >
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
        <span className="text-sm nav-text">{label}</span>
    </div>
);

const MetricCard = ({ title, value, change, isPositive, icon: Icon }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 group cursor-default">
        <div className="flex justify-between items-start">
            <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 group-hover:bg-violet-500 group-hover:text-black transition-all duration-300">
                <Icon size={22} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
        <div className="mt-4">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold mt-1 text-slate-100 font-heading">{value}</p>
        </div>
    </motion.div>
);

const SectionHeader = ({ title, subtitle, actions }) => (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
            <h2 className="text-4xl font-bold text-slate-100 font-heading tracking-tight">{title}</h2>
            <p className="text-slate-400 mt-2 font-medium">{subtitle}</p>
        </div>
        <div className="flex gap-3">
            {actions}
        </div>
    </div>
);

// --- Page Views ---

const DashboardView = ({ handleAction, liveRevenue, liveUsers }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Gross Revenue" value={`₹${liveRevenue} Cr`} change="+14.2%" isPositive={true} icon={IndianRupee} />
            <MetricCard title="Active Subs" value={`${liveUsers}k`} change="+8.1%" isPositive={true} icon={Users} />
            <MetricCard title="Churn Rate" value="0.8%" change="-12.4%" isPositive={true} icon={Activity} />
            <MetricCard title="Avg LTV" value="₹4.8 Lakh" change="+2.4%" isPositive={false} icon={Target} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-panel p-8 min-h-[450px]">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-lg font-bold text-slate-100">Revenue Performance</h3>
                        <p className="text-sm text-slate-400 mt-1">Comparing monthly revenue against growth targets (₹)</p>
                    </div>
                    <button
                        onClick={() => handleAction("Generated Q1 Analytics Manifest.pdf", "success")}
                        className="flex items-center gap-2 text-xs font-bold bg-slate-800 hover:bg-violet-600 hover:text-white px-4 py-2 rounded-lg transition-all border border-slate-700"
                    >
                        <Download size={14} /> Export Manifest
                    </button>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                            <Tooltip
                                formatter={(value) => [`₹${(value / 100000).toFixed(1)} Lakh`, 'Amount']}
                                contentStyle={{ backgroundColor: '#120329', border: '1px solid #a855f733', borderRadius: '12px' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="6 6" strokeWidth={1.5} dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-violet-500/5 rounded-xl border border-violet-500/10">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        <span className="font-bold text-violet-400 uppercase tracking-widest text-[10px]">Current Intelligence:</span> Volatility detected in Startup segments (EU/UK); APAC Hub (India) remains the strongest growth vector with 28% YoY expansion.
                    </p>
                </div>
            </div>

            <div className="glass-panel p-8">
                <h3 className="text-lg font-bold mb-8 text-slate-100">Segment Mix</h3>
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={userSegments}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                onClick={(data) => handleAction(`Filtering by ${data.name} Segment`, 'info')}
                                style={{ cursor: 'pointer' }}
                            >
                                {userSegments.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #d4af3733', borderRadius: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 space-y-4">
                    {userSegments.map((s) => (
                        <div key={s.name} className="flex justify-between items-center text-sm group cursor-pointer" onClick={() => handleAction(`Viewing ${s.name} Growth Trends`)}>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                <span className="text-slate-400 group-hover:text-amber-400 transition-colors font-medium">{s.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-slate-200">{s.value}%</span>
                                <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 bg-emerald-500/10 rounded">{s.growth}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const AnalyticsView = ({ handleAction }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-panel p-8">
                <SectionHeader
                    title="Retention Analysis"
                    subtitle="Deep dive into customer longevity and cohort-based behavior patterns."
                    actions={<><button onClick={() => handleAction("Accessing Global Market Filter", "success")} className="px-4 py-2 bg-slate-800 hover:bg-violet-600 hover:text-white rounded-lg text-xs font-bold border border-slate-700 transition-all">Filter Markets 🗺️</button></>}
                />
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="text-slate-400 text-left">
                                <th className="pb-6 px-4 font-bold uppercase tracking-widest text-[10px]">Cohort Group</th>
                                <th className="pb-6 px-4 font-bold uppercase tracking-widest text-[10px]">Size</th>
                                {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map(m => (
                                    <th key={m} className="pb-6 px-4 font-bold uppercase tracking-widest text-[10px] text-center">{m}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {cohortData.map((row) => (
                                <tr key={row.name} className="group cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleAction(`Viewing ${row.name} Cohort Details`)}>
                                    <td className="py-3 px-4 font-bold bg-slate-800/30 rounded-l-xl text-slate-100">{row.name}</td>
                                    <td className="py-3 px-4 text-slate-400 bg-slate-800/30">{row.size}</td>
                                    {row.r.map((val, i) => (
                                        <td key={i} className="py-2 px-2 bg-slate-800/30">
                                            {val !== null ? (
                                                <div
                                                    className="h-10 w-full rounded-lg flex items-center justify-center font-bold text-slate-100 transition-all cursor-pointer hover:border-2 border-white/20"
                                                    style={{ backgroundColor: `rgba(168, 85, 247, ${val / 100})`, opacity: Math.max(0.3, val / 100) }}
                                                >
                                                    {val}%
                                                </div>
                                            ) : <div className="h-10 w-full bg-slate-900/50 rounded-lg border border-dashed border-slate-700" />}
                                        </td>
                                    ))}
                                    <td className="bg-slate-800/30 rounded-r-xl w-4" />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="glass-panel p-8 flex flex-col">
                <h3 className="text-lg font-bold mb-6 text-slate-100 uppercase tracking-tighter">Operational Churn Risks</h3>
                <div className="flex-1 h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData.slice(-6)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#061a12', border: '1px solid #d4af3733', borderRadius: '12px' }} />
                            <Bar dataKey="churn" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                    <p className="text-[10px] text-emerald-300 leading-relaxed font-bold uppercase tracking-wider mb-2">Churn Forecast:</p>
                    <p className="text-xs text-slate-400">Predicted stabilization at <span className="text-emerald-400 font-bold">0.6%</span> for Q3 due to improved Enterprise onboarding workflows.</p>
                </div>
            </div>
        </div>

        <div className="mt-8 flex gap-6 p-6 bg-violet-500/5 rounded-2xl border border-violet-500/10 group cursor-pointer" onClick={() => handleAction("Opening Current Volatility Matrix", "success")}>
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
            </div>
            <div>
                <h4 className="font-bold text-violet-300">Live Retention Trends: Current Analysis</h4>
                <p className="text-sm text-slate-400 mt-1 max-w-4xl">
                    Drastic retention drop observed in <span className="text-slate-100 font-bold">Jan 2024</span> cohort after M2. Churn risk assessment indicates high sensitivity to pricing adjustments in the UK market.
                </p>
            </div>
        </div>
    </div>
);

const CustomersView = ({ handleAction, searchTerm, setSearchTerm, filteredCustomers }) => (
    <div className="space-y-8">
        <SectionHeader
            title="Customer Lifecycle"
            subtitle="Cross-border account monitoring and live engagement tracking."
            actions={<><button onClick={() => handleAction("Opening Quick-Add Interface", "success")} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-violet-500/20 transition-all">+ Add Global Account ⚡</button></>}
        />
        <div className="glass-panel p-4">
            <div className="flex items-center gap-4 px-4 py-6 border-b border-slate-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search account name, industry or ID..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-violet-500 text-slate-100 transition-all"
                    />
                </div>
                <button onClick={() => handleAction("Advanced Table Filters")} className="p-2.5 bg-slate-800 text-slate-400 rounded-xl border border-slate-700 hover:text-violet-400 transition-colors"><Filter size={18} /></button>
            </div>
            <div className="overflow-x-auto">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="text-left text-slate-400">Account</th>
                            <th className="text-left text-slate-400">Industry</th>
                            <th className="text-left text-slate-400">Value (LTV)</th>
                            <th className="text-left text-slate-400">Status</th>
                            <th className="text-left text-slate-400">Churn Risk</th>
                            <th className="text-left text-slate-400">Last Activity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((c) => (
                            <tr key={c.id} className="group hover:bg-white/5 transition-colors cursor-pointer" onClick={() => handleAction(`Accessing Profile: ${c.name}`)}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <img src={c.avatar} alt="" className="w-8 h-8 rounded-lg border border-slate-700 group-hover:border-amber-500/30" />
                                        <span className="font-bold text-slate-200 group-hover:text-amber-400">{c.name}</span>
                                    </div>
                                </td>
                                <td className="text-slate-400 font-medium">{c.industry}</td>
                                <td className="font-bold text-slate-100">₹{(c.ltv / 100000).toFixed(1)}L</td>
                                <td>
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${c.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                        c.status === 'At Risk' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 max-w-[80px] h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full ${c.risk > 50 ? 'bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : c.risk > 25 ? 'bg-violet-500/80 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`} style={{ width: `${c.risk}%` }} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">{c.risk}%</span>
                                    </div>
                                </td>
                                <td className="text-slate-400 text-xs">{c.lastActive}</td>
                                <td><button onClick={(e) => { e.stopPropagation(); handleAction("Opening Action Hub"); }} className="text-slate-500 hover:text-violet-400 transition-colors"><MoreHorizontal size={18} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const GeographicView = ({ handleAction, liveGeoData }) => (
    <div className="space-y-8">
        <SectionHeader title="Regional Performance Hub" subtitle="Real-time distribution of market influence across connected global territories." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel p-8 min-h-[500px] flex flex-col bg-slate-900 shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] -mr-40 -mt-40" />
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-8 text-slate-100">Regional Performance Hub</h3>
                    <div className="h-[300px] w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={liveGeoData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="region" type="category" stroke="#7c3aed" fontSize={10} width={120} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#120329', border: '1px solid #a855f733', borderRadius: '12px' }} />
                                <Bar dataKey="users" fill="#a855f7" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Top Market</p>
                            <p className="text-lg font-bold text-violet-400">West India</p>
                            <p className="text-[10px] text-emerald-400 mt-1">₹4.3 Cr Portfolio</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Fastest Growth</p>
                            <p className="text-lg font-bold text-emerald-400">South India</p>
                            <p className="text-[10px] text-violet-400 mt-1">+18% YoY Expansion</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold px-2 text-slate-100">Operational Distribution</h3>
                {liveGeoData.map(g => (
                    <motion.div key={g.region} whileHover={{ x: 10 }} className="glass-panel p-6 flex justify-between items-center group cursor-pointer" onClick={() => handleAction(`Accessing Regional Hub: ${g.region}`)}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700 group-hover:bg-amber-600 transition-all group-hover:text-black">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors uppercase tracking-tight text-sm">{g.region}</h4>
                                <p className="text-xs text-slate-500 font-medium">{g.users.toLocaleString()} Primary Nodes</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-200">{g.revenue}</p>
                            <div className="flex items-center gap-2 justify-end mt-1">
                                <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 bg-emerald-500/10 rounded">+{g.growth}%</span>
                                <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-violet-500" style={{ width: `${g.health}%` }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">
                        Strategic Geo-Intelligence encrypted. Compliant with Nexus Global Security Protocols.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const IntegrationView = ({ handleAction }) => (
    <div className="space-y-8">
        <SectionHeader title="Data Connectors" subtitle="Manage external data sources and API integrations." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { name: 'Google Analytics', status: 'Connected', delay: '12ms', icon: 'https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg' },
                { name: 'Salesforce CRM', status: 'Connected', delay: '45ms', icon: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
                { name: 'AWS Redshift', status: 'Syncing...', delay: '120ms', icon: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg' },
                { name: 'Stripe Payments', status: 'Healthy', delay: '8ms', icon: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
                { name: 'Segment.io', status: 'Error', delay: '---', icon: 'https://cdn.worldvectorlogo.com/logos/segment.svg' },
                { name: 'HubSpot', status: 'Disabled', delay: '---', icon: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg' },
            ].map((i) => (
                <motion.div key={i.name} whileHover={{ y: -5 }} className="glass-panel p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center p-2">
                            <img src={i.icon} alt={i.name} className="w-full h-full object-contain" />
                        </div>
                        <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${i.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            i.status === 'Error' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                i.status.includes('Syncing') ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}>
                            {i.status === 'Connected' ? '✓ Link Established' : i.status === 'Syncing...' ? '⏳ Re-routing Account...' : i.status}
                        </div>
                    </div>
                    <h4 className="font-bold text-slate-100">{i.name}</h4>
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Latency: {i.delay}</div>
                        <button
                            onClick={() => handleAction(`Configuring ${i.name} integration`, 'success')}
                            className="text-[10px] font-bold text-violet-400 hover:text-violet-500 transition-colors uppercase"
                        >
                            Configure
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const SettingsView = ({ handleAction, platformSettings, toggleSetting }) => (
    <div className="space-y-8 max-w-4xl">
        <SectionHeader title="System Configuration" subtitle="Manage your team, profile, and intelligence platform settings." />

        <div className="glass-panel overflow-hidden">
            <div className="p-8 border-b border-slate-800 flex items-center gap-8">
                <div className="relative">
                    <img src={profileData.avatar} alt="Profile" className="w-24 h-24 rounded-2xl border-2 border-violet-500" />
                    <button onClick={() => handleAction("Opening Profile Settings")} className="absolute -bottom-2 -right-2 p-1.5 bg-violet-600 rounded-lg border-4 border-slate-900 text-white hover:bg-violet-500 transition-colors"><Settings size={14} /></button>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-100">{profileData.name}</h3>
                    <p className="text-slate-400 font-medium">{profileData.role} • {profileData.company}</p>
                    <div className="flex gap-4 mt-3">
                        <button onClick={() => handleAction("Accessing Advanced Identity Manager", "success")} className="px-4 py-1.5 bg-violet-500 hover:bg-violet-400 rounded-lg text-xs font-bold text-white transition-all">Edit Identity 👤</button>
                        <button onClick={() => handleAction("Opening Encryption & Shield Settings", "success")} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold border border-slate-700 text-slate-200 transition-all">Shield Status 🛡️</button>
                    </div>
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Platform Settings</h4>
                    <div className="space-y-4">
                        {[
                            { label: 'Real-time Sync', desc: 'Sync data every 30 seconds', icon: Clock },
                            { label: 'AI Risk Prediction', desc: 'Automated churn risk alerts', icon: Target },
                            { label: 'Export Encryption', desc: 'AES-256 for all downloads', icon: Download },
                        ].map(s => {
                            const isActive = platformSettings[s.label];
                            return (
                                <div key={s.label} className="flex justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${isActive ? 'text-violet-400 bg-violet-500/10' : 'text-slate-500 bg-slate-800'}`}><s.icon size={20} /></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-100">{s.label}</p>
                                            <p className="text-[10px] text-slate-500">{s.desc}</p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => toggleSetting(s.label)}
                                        className={`w-10 h-5 rounded-full relative cursor-pointer p-1 transition-colors ${isActive ? 'bg-violet-600 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-slate-700'}`}
                                    >
                                        <motion.div
                                            animate={{ x: isActive ? 20 : 0 }}
                                            className="w-3 h-3 bg-white rounded-full shadow-sm"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Recent Activity</h4>
                    <div className="space-y-4">
                        {profileData.notifications.map(n => (
                            <div key={n.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800 cursor-pointer" onClick={() => handleAction(`Viewing Notification: ${n.id}`)}>
                                <div className={`mt-1 ${n.type === 'success' ? 'text-emerald-400' : 'text-violet-400'}`}>
                                    {n.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-200">{n.text}</p>
                                    <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => handleAction("Browsing Audit Trails")} className="w-full py-3 text-xs font-bold text-slate-500 hover:text-violet-400 transition-colors border-t border-slate-800 mt-2">View All Audit Logs</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Main Application Wrapper ---

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showNotification, setShowNotification] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [toasts, setToasts] = useState([]);
    const [platformSettings, setPlatformSettings] = useState({
        'Real-time Sync': true,
        'AI Risk Prediction': true,
        'Export Encryption': false
    });

    const [liveRevenue, setLiveRevenue] = useState(10.2);
    const [liveUsers, setLiveUsers] = useState(12.4);
    const [liveGeoData, setLiveGeoData] = useState(geographicData);

    useEffect(() => {
        if (!platformSettings['Real-time Sync']) return;

        const interval = setInterval(() => {
            setLiveRevenue(prev => {
                const change = (Math.random() - 0.45) * 0.01;
                return parseFloat((prev + change).toFixed(2));
            });

            setLiveUsers(prev => {
                const change = Math.floor((Math.random() * 10) - 2);
                return parseFloat((prev + (change / 100)).toFixed(2));
            });

            setLiveGeoData(prev => prev.map(g => ({
                ...g,
                users: Math.max(0, g.users + Math.floor((Math.random() * 5) - 2)),
                health: Math.min(100, Math.max(0, g.health + (Math.random() > 0.5 ? 0.1 : -0.1)))
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, [platformSettings]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    const handleAction = (msg, type = 'info') => {
        addToast(msg, type);
    };

    const toggleSetting = (label) => {
        const nextState = !platformSettings[label];
        setPlatformSettings(prev => ({ ...prev, [label]: nextState }));
        addToast(`${label} ${nextState ? 'Enabled' : 'Disabled'}`, nextState ? 'success' : 'info');
    };

    const filteredCustomers = customerList.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardView handleAction={handleAction} liveRevenue={liveRevenue} liveUsers={liveUsers} />;
            case 'analytics': return <AnalyticsView handleAction={handleAction} />;
            case 'customers': return (
                <CustomersView
                    handleAction={handleAction}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filteredCustomers={filteredCustomers}
                />
            );
            case 'geo': return <GeographicView handleAction={handleAction} liveGeoData={liveGeoData} />;
            case 'integration': return <IntegrationView handleAction={handleAction} />;
            case 'settings': return (
                <SettingsView
                    handleAction={handleAction}
                    platformSettings={platformSettings}
                    toggleSetting={toggleSetting}
                />
            );
            default: return <DashboardView handleAction={handleAction} liveRevenue={liveRevenue} liveUsers={liveUsers} />;
        }
    };

    return (
        <div className="flex bg-[#0a0118] min-h-screen text-slate-100 selection:bg-violet-500/40 font-sans">
            {/* Toast Container */}
            <div className="fixed top-6 right-6 z-[3000] flex flex-col items-end">
                <AnimatePresence>
                    {toasts.map(t => (
                        <Toast
                            key={t.id}
                            message={t.message}
                            type={t.type}
                            onClose={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Sidebar */}
            <aside className="sidebar shadow-2xl border-r border-violet-500/5">
                <div onClick={() => setActiveTab('dashboard')} className="flex items-center gap-3 mb-12 px-2 cursor-pointer group">
                    <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                        N
                    </div>
                    <div>
                        <h1 className="text-xl font-bold gradient-text tracking-tight h-7 leading-none">👉 Nexus Insight</h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest -mt-1 truncate">Data Visualization Dashboard</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-1.5 flex-1">
                    <SidebarItem icon={LayoutDashboard} label="Global Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={TrendingUp} label="Retention Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                    <SidebarItem icon={Users} label="Customer Lifecycle" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
                    <SidebarItem icon={Globe} label="Geo Intelligence" active={activeTab === 'geo'} onClick={() => setActiveTab('geo')} />
                    <div className="h-px bg-slate-800/60 my-6 mx-2" />
                    <SidebarItem icon={Layers} label="Data Integration" active={activeTab === 'integration'} onClick={() => setActiveTab('integration')} />
                    <SidebarItem icon={Settings} label="System Config" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </nav>

                <div className="mt-auto px-2">
                    <div className="glass-panel p-5 rounded-2xl border-violet-500/20 bg-violet-500/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 bg-violet-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-violet-500/20 transition-all" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8 h-4">
                                <p className="text-xs font-bold text-violet-300">Architecture Pro</p>
                                <span className="text-[8px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full font-bold">BETA</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mb-4 leading-relaxed font-semibold">Unlock predictive modeling and real-time custom Indian market alerts.</p>
                            <button
                                onClick={() => handleAction("Initiating Enterprise License Provisioning", "success")}
                                className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg shadow-violet-500/20 active:scale-95 uppercase tracking-wider"
                            >
                                Elevate License
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content w-full">
                {/* Universal Header */}
                <header className="flex justify-between items-center mb-12 py-2">
                    <div className="flex items-center gap-6">
                        <div className="relative group hidden lg:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search global datasets (₹, Accounts, Regions)..."
                                className="bg-slate-900 shadow-inner border border-slate-800 rounded-2xl py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:border-violet-500/50 transition-all w-[380px] text-slate-100 placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">System Live</span>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowNotification(!showNotification)}
                                className={`p-2.5 transition-all bg-slate-900 border border-slate-800 rounded-xl relative group ${showNotification ? 'text-violet-400 border-violet-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'text-slate-400 hover:text-violet-400 hover:border-violet-500/30'}`}
                            >
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-violet-500 rounded-full border-2 border-slate-900 group-hover:scale-125 transition-transform"></span>
                            </button>

                            <AnimatePresence>
                                {showNotification && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute right-0 mt-4 w-80 glass-panel p-4 z-[1000] border-violet-500/20 shadow-2xl"
                                    >
                                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                                            <h5 className="font-bold text-sm text-slate-100">Live Notifications</h5>
                                            <span className="text-[10px] bg-violet-500 text-white px-1.5 py-0.5 rounded font-bold">{profileData.notifications.length}</span>
                                        </div>
                                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                            {profileData.notifications.map(n => (
                                                <div
                                                    key={n.id}
                                                    onClick={() => { setShowNotification(false); handleAction(`Opening Alert: ${n.id}`); }}
                                                    className="p-3 bg-white/5 rounded-lg hover:bg-violet-500/10 cursor-pointer border border-transparent hover:border-violet-500/20 transition-all group"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`mt-1 ${n.type === 'success' ? 'text-emerald-400' : 'text-violet-400'}`}>
                                                            {n.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-200 group-hover:text-violet-400 transition-colors leading-tight">{n.text}</p>
                                                            <p className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-widest">{n.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => { setShowNotification(false); handleAction("Clearing all alerts"); }}
                                            className="w-full mt-4 py-2 text-[10px] font-bold text-slate-500 hover:text-violet-400 transition-colors uppercase tracking-widest border-t border-white/5 pt-4"
                                        >
                                            Clear All Notifications
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="h-10 w-px bg-slate-800 mx-2" />

                        <div onClick={() => setActiveTab('settings')} className="flex items-center gap-4 pl-2 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-100 group-hover:text-violet-400 transition-colors leading-none">{profileData.name.split(' ')[0]}</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter mt-1 opacity-60">Admin Level 4</p>
                            </div>
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 p-0.5 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 group-hover:scale-105 transition-all">
                                <img src={profileData.avatar} alt="User Avatar" className="w-full h-full rounded-[14px] object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.99, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>

                <footer className="mt-24 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
                    <div>👉 2026 Nexus Insight · Data Visualization Project</div>
                    <div className="flex gap-10">
                        <span onClick={() => handleAction("Viewing Internal Security Logs")} className="hover:text-violet-400 cursor-pointer transition-colors hover:scale-105 active:scale-95">Audit Logs</span>
                        <span onClick={() => handleAction("Opening Nexus API Documentation")} className="hover:text-violet-400 cursor-pointer transition-colors hover:scale-105 active:scale-95">API Terminal</span>
                        <span onClick={() => handleAction("Privacy Encryption Shield Activated")} className="hover:text-violet-400 cursor-pointer transition-colors hover:scale-105 active:scale-95">Privacy Shield</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
