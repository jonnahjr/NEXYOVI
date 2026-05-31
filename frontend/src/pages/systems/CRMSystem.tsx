import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 LayoutDashboard, Users, Columns, Settings, Bell, Search, 
 Plus, CreditCard, TrendingUp, DollarSign, Activity, X, Check, ArrowLeft, Trash2,
 Target, Building2, CheckSquare, Calendar as CalendarIcon, Megaphone, LifeBuoy, FileText, BarChart3, Users2, Zap, Bot,
 Mail, Phone, ShieldCheck, Download, Globe, Database, CheckCircle2, ChevronRight, UserPlus, Server, Upload, RefreshCw, Sparkles, BrainCircuit, ScanSearch, Trophy, Medal, Flag, ChevronLeft, Briefcase, MoreVertical, Send, MessageSquare, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed Won';

type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
type TaskStatus = 'Todo' | 'In Progress' | 'Completed';

type CRMTask = {
 id: string;
 title: string;
 status: TaskStatus;
 priority: TaskPriority;
 dueDate: string;
 assignee: string;
};

const INITIAL_TASKS: CRMTask[] = [
 { id: 't1', title: 'Follow up with Alpha Logistics regarding the final enterprise proposal', status: 'Todo', priority: 'Urgent', dueDate: 'Oct 25, 2026', assignee: 'Yonas B.' },
 { id: 't2', title: 'Prepare Q4 sales projection and revenue forecast report', status: 'In Progress', priority: 'High', dueDate: 'Oct 28, 2026', assignee: 'Sarah M.' },
 { id: 't3', title: 'Call TechNova about their recent API integration query', status: 'Completed', priority: 'Medium', dueDate: 'Oct 20, 2026', assignee: 'Michael T.' },
 { id: 't4', title: 'Review and update internal onboarding documentation', status: 'Todo', priority: 'Low', dueDate: 'Nov 10, 2026', assignee: 'David Lee' }];

type EventType = 'Meeting' | 'Demo' | 'Internal' | 'Deadline';

type CRMEvent = {
 id: string;
 title: string;
 type: EventType;
 date: string;
 time: string;
 attendees: string[];
 link?: string;
};

const INITIAL_EVENTS: CRMEvent[] = [
 { id: 'e1', title: 'Enterprise Demo: Alpha Logistics', type: 'Demo', date: 'Oct 25, 2026', time: '10:00 AM', attendees: ['Yonas B.', 'Michael Brown'], link: 'meet.google.com/abc-xyz' },
 { id: 'e2', title: 'Q4 Pipeline Review', type: 'Internal', date: 'Oct 25, 2026', time: '02:00 PM', attendees: ['Yonas B.', 'Sarah M.', 'Michael T.'] },
 { id: 'e3', title: 'TechNova Sync', type: 'Meeting', date: 'Oct 26, 2026', time: '11:30 AM', attendees: ['Sarah M.', 'Alice Freeman'], link: 'zoom.us/j/123456' },
 { id: 'e4', title: 'Submit Proposal to Finserve', type: 'Deadline', date: 'Oct 28, 2026', time: '05:00 PM', attendees: ['Yonas B.'] }];

type CompanyIndustry = 'Technology' | 'Finance' | 'Healthcare' | 'Logistics' | 'Retail' | 'Other';
type CompanyStatus = 'Active Client' | 'Prospect' | 'Churned';

type CRMCompany = {
 id: string;
 name: string;
 industry: CompanyIndustry;
 website: string;
 employees: string;
 revenue: number;
 status: CompanyStatus;
 location: string;
};

const INITIAL_COMPANIES: CRMCompany[] = [
 { id: 'c1', name: 'Alpha Logistics', industry: 'Logistics', website: 'alphalogistics.com', employees: '500-1000', revenue: 15000000, status: 'Prospect', location: 'New York, USA' },
 { id: 'c2', name: 'TechNova', industry: 'Technology', website: 'technova.io', employees: '50-200', revenue: 5000000, status: 'Active Client', location: 'San Francisco, USA' },
 { id: 'c3', name: 'Finserve Global', industry: 'Finance', website: 'finserve.net', employees: '1000+', revenue: 120000000, status: 'Active Client', location: 'London, UK' },
 { id: 'c4', name: 'Nexus Corp', industry: 'Retail', website: 'nexuscorp.com', employees: '1000+', revenue: 45000000, status: 'Churned', location: 'Berlin, DE' }];

type CampaignPlatform = 'Google Ads' | 'LinkedIn' | 'Facebook' | 'Email';
type CampaignStatus = 'Active' | 'Paused' | 'Draft' | 'Completed';

type CRMCampaign = {
 id: string;
 name: string;
 platform: CampaignPlatform;
 status: CampaignStatus;
 budget: number;
 spend: number;
 impressions: number;
 clicks: number;
 conversions: number;
};

const INITIAL_CAMPAIGNS: CRMCampaign[] = [
 { id: 'camp1', name: 'Q4 Enterprise SaaS Retargeting', platform: 'LinkedIn', status: 'Active', budget: 15000, spend: 12450, impressions: 450000, clicks: 12500, conversions: 312 },
 { id: 'camp2', name: 'Black Friday Core Features', platform: 'Google Ads', status: 'Active', budget: 10000, spend: 3200, impressions: 120000, clicks: 8400, conversions: 184 },
 { id: 'camp3', name: 'Cold Outreach Tech Executives', platform: 'Email', status: 'Paused', budget: 2000, spend: 2000, impressions: 50000, clicks: 4100, conversions: 89 },
 { id: 'camp4', name: 'Brand Awareness - EMEA Region', platform: 'Facebook', status: 'Draft', budget: 5000, spend: 0, impressions: 0, clicks: 0, conversions: 0 }];

type TicketPriority = 'Low' | 'Normal' | 'High' | 'Critical';
type TicketStatus = 'Open' | 'Pending' | 'Resolved';

type TicketMessage = {
 id: string;
 sender: 'client' | 'agent';
 name: string;
 text: string;
 timestamp: string;
};

type CRMTicket = {
 id: string;
 subject: string;
 requestor: string;
 company: string;
 priority: TicketPriority;
 status: TicketStatus;
 createdAt: string;
 messages: TicketMessage[];
};

const INITIAL_TICKETS: CRMTicket[] = [
 { 
 id: 'tk1', subject: 'API Authentication Failure on Staging', requestor: 'Alice Freeman', company: 'TechNova', priority: 'High', status: 'Open', createdAt: '10 mins ago',
 messages: [
 { id: 'm1', sender: 'client', name: 'Alice Freeman', text: 'We are getting a 401 Unauthorized when hitting the /v2/data endpoint using the new API keys generated yesterday. Can someone look into this urgently?', timestamp: '10 mins ago' }
 ]
 },
 { 
 id: 'tk2', subject: 'Billing Address Update Request', requestor: 'Michael Brown', company: 'Alpha Logistics', priority: 'Normal', status: 'Pending', createdAt: '2 hours ago',
 messages: [
 { id: 'm1', sender: 'client', name: 'Michael Brown', text: 'Hi team, we need to update our billing address on the next invoice to our new NY office.', timestamp: '2 hours ago' },
 { id: 'm2', sender: 'agent', name: 'David Lee', text: 'Hello Michael, I can help with that. Could you please provide the full new address?', timestamp: '1 hour ago' }
 ]
 },
 { 
 id: 'tk3', subject: 'Data Export Feature Missing', requestor: 'Sarah Jenkins', company: 'Finserve Global', priority: 'Low', status: 'Resolved', createdAt: '1 day ago',
 messages: [
 { id: 'm1', sender: 'client', name: 'Sarah Jenkins', text: 'I cannot find the CSV export button on the reports page anymore. Was it moved?', timestamp: '1 day ago' },
 { id: 'm2', sender: 'agent', name: 'Yonas B.', text: 'Hi Sarah, it was moved under the "Actions" dropdown menu at the top right. Let me know if you see it!', timestamp: '23 hours ago' },
 { id: 'm3', sender: 'client', name: 'Sarah Jenkins', text: 'Found it. Thanks!', timestamp: '22 hours ago' }
 ]
 }
];

type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

type CRMInvoice = {
 id: string;
 invoiceNumber: string;
 clientName: string;
 amount: number;
 issueDate: string;
 dueDate: string;
 status: InvoiceStatus;
};

const INITIAL_INVOICES: CRMInvoice[] = [
 { id: 'inv1', invoiceNumber: 'INV-2026-001', clientName: 'Alpha Logistics', amount: 15000, issueDate: 'Oct 01, 2026', dueDate: 'Oct 15, 2026', status: 'Overdue' },
 { id: 'inv2', invoiceNumber: 'INV-2026-002', clientName: 'TechNova', amount: 8500, issueDate: 'Oct 10, 2026', dueDate: 'Oct 24, 2026', status: 'Pending' },
 { id: 'inv3', invoiceNumber: 'INV-2026-003', clientName: 'Finserve Global', amount: 45000, issueDate: 'Sep 25, 2026', dueDate: 'Oct 09, 2026', status: 'Paid' },
 { id: 'inv4', invoiceNumber: 'INV-2026-004', clientName: 'Nexus Corp', amount: 3200, issueDate: 'Oct 18, 2026', dueDate: 'Nov 01, 2026', status: 'Pending' }
];

type PaymentStatus = 'Succeeded' | 'Processing' | 'Failed';

type CRMPayment = {
 id: string;
 transactionId: string;
 clientName: string;
 amount: number;
 method: string;
 date: string;
 status: PaymentStatus;
};

const INITIAL_PAYMENTS: CRMPayment[] = [
 { id: 'p1', transactionId: 'TXN-998273', clientName: 'Alpha Logistics', amount: 15000, method: 'Wire Transfer', date: 'Oct 24, 2026', status: 'Succeeded' },
 { id: 'p2', transactionId: 'TXN-998274', clientName: 'Finserve Global', amount: 45000, method: 'Stripe', date: 'Oct 23, 2026', status: 'Succeeded' },
 { id: 'p3', transactionId: 'TXN-998275', clientName: 'TechNova', amount: 8500, method: 'Credit Card', date: 'Oct 25, 2026', status: 'Processing' },
 { id: 'p4', transactionId: 'TXN-998276', clientName: 'Nexus Corp', amount: 3200, method: 'PayPal', date: 'Oct 20, 2026', status: 'Failed' }];

type Lead = {
 id: string;
 name: string;
 company: string;
 email: string;
 phone: string;
 status: LeadStatus;
 value: number;
 date: string;
 source: string;
 score: number;
};

const STAGES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed Won'];

const INITIAL_LEADS: Lead[] = [
 { id: '1', name: 'Alice Freeman', company: 'TechNova', email: 'alice@technova.com', phone: '555-0101', status: 'New', value: 12000, date: 'Oct 24, 2026', source: 'Telegram', score: 85 },
 { id: '2', name: 'John Doe', company: 'Global Ind.', email: 'john@global.com', phone: '555-0102', status: 'Contacted', value: 8500, date: 'Oct 23, 2026', source: 'Website', score: 62 },
 { id: '3', name: 'Sarah Smith', company: 'Nexus Corp', email: 'sarah@nexus.com', phone: '555-0103', status: 'Qualified', value: 24000, date: 'Oct 21, 2026', source: 'Facebook', score: 91 },
 { id: '4', name: 'Michael Brown', company: 'Alpha Log.', email: 'mbrown@alpha.com', phone: '555-0104', status: 'Proposal', value: 45000, date: 'Oct 20, 2026', source: 'Referral', score: 78 },
 { id: '5', name: 'David Lee', company: 'Finserve', email: 'david@finserve.com', phone: '555-0105', status: 'Closed Won', value: 150000, date: 'Sep 15, 2026', source: 'Direct', score: 99 }];

const SIDEBAR_MENU = [
 { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
 { id: 'leads', icon: Target, label: 'Leads' },
 { id: 'contacts', icon: Users, label: 'Contacts' },
 { id: 'companies', icon: Building2, label: 'Companies' },
 { id: 'deals', icon: Columns, label: 'Deals' },
 { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
 { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
 { id: 'campaigns', icon: Megaphone, label: 'Campaigns' },
 { id: 'support', icon: LifeBuoy, label: 'Support Tickets' },
 { id: 'invoices', icon: FileText, label: 'Invoices' },
 { id: 'payments', icon: CreditCard, label: 'Payments' },
 { id: 'reports', icon: BarChart3, label: 'Reports' },
 { id: 'team', icon: Users2, label: 'Team' },
 { id: 'automation', icon: Zap, label: 'Automation' },
 { id: 'ai-tools', icon: Bot, label: 'AI Tools' },
 { id: 'settings', icon: Settings, label: 'Settings' }];

const CRMSystem = () => {
 const [activeTab, setActiveTab] = useState('dashboard');
 const [searchQuery, setSearchQuery] = useState('');

 // UI States
 const [showNotifications, setShowNotifications] = useState(false);
 const [settingsSection, setSettingsSection] = useState('general');

 // AI Modal States
 const [showAIModal, setShowAIModal] = useState(false);
 const [aiState, setAiState] = useState<'idle'|'generating'|'done'>('idle');
 const [aiResult, setAiResult] = useState('');

 // AI Analysis States
 const [showAnalysisModal, setShowAnalysisModal] = useState(false);
 const [analysisState, setAnalysisState] = useState<'idle'|'scanning'|'done'>('idle');

 // Deal View State
 const [selectedDeal, setSelectedDeal] = useState<Lead | null>(null);

 const [notifications, setNotifications] = useState([
 { id: 1, title: 'New Web Lead', message: 'John Doe from Global Ind. just filled out the contact form.', time: '2m ago', read: false, icon: Users },
 { id: 2, title: 'Invoice Paid', message: 'Finserve just paid INV-2026-001 via Telebirr.', time: '1h ago', read: false, icon: CreditCard }]);

 const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
 const [showAddLeadModal, setShowAddLeadModal] = useState(false);
 const [newLead, setNewLead] = useState<Partial<Lead>>({ status: 'New', value: 0 });
 const [statusFilter, setStatusFilter] = useState('All');
 const [sortBy, setSortBy] = useState('Newest First');

 const [tasks, setTasks] = useState<CRMTask[]>(INITIAL_TASKS);
 const [newTaskTitle, setNewTaskTitle] = useState('');
 const [taskFilter, setTaskFilter] = useState<TaskStatus | 'All'>('All');

 const [events, setEvents] = useState<CRMEvent[]>(INITIAL_EVENTS);
 const [showAddEventModal, setShowAddEventModal] = useState(false);
 const [selectedDate, setSelectedDate] = useState('Oct 25, 2026');
 const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 9, 1)); // Starts at Oct 1, 2026

 const [companies, setCompanies] = useState<CRMCompany[]>(INITIAL_COMPANIES);
 const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
 const [companySearch, setCompanySearch] = useState('');

 const [campaigns, setCampaigns] = useState<CRMCampaign[]>(INITIAL_CAMPAIGNS);
 const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);

 const [tickets, setTickets] = useState<CRMTicket[]>(INITIAL_TICKETS);
 const [selectedTicketId, setSelectedTicketId] = useState<string>('tk1');
 const [ticketReply, setTicketReply] = useState('');
 const [showAddTicketModal, setShowAddTicketModal] = useState(false);

 const [invoices, setInvoices] = useState<CRMInvoice[]>(INITIAL_INVOICES);
 const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
 const [invoiceSearch, setInvoiceSearch] = useState('');

 const [payments, setPayments] = useState<CRMPayment[]>(INITIAL_PAYMENTS);
 const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
 const [paymentSearch, setPaymentSearch] = useState('');


 // Settings State
 const [teamMembers, setTeamMembers] = useState([
 { id: 1, name: 'Yonas B.', email: 'yonas@nexyovi.com', role: 'Super Admin', status: 'Active', quota: 250000, closed: 180000, deals: 14, rank: 1, avatarColor: 'from-[#F5A800] to-blue-800' },
 { id: 2, name: 'Sarah M.', email: 'sarah@nexyovi.com', role: 'Sales Rep', status: 'Active', quota: 100000, closed: 85000, deals: 8, rank: 2, avatarColor: 'from-purple-500 to-purple-800' },
 { id: 3, name: 'David Lee', email: 'david@nexyovi.com', role: 'Support Agent', status: 'Offline', quota: 0, closed: 0, deals: 0, rank: 3, avatarColor: 'from-emerald-500 to-emerald-800' },
 { id: 4, name: 'Michael T.', email: 'michael@nexyovi.com', role: 'Sales Rep', status: 'In Meeting', quota: 120000, closed: 45000, deals: 4, rank: 4, avatarColor: 'from-amber-500 to-amber-800' }
 ]);
 const [companyProfile, setCompanyProfile] = useState({ name: 'Nexyovi Enterprises', email: 'support@nexyovi.com', timezone: 'EAT', currency: 'USD' });
 const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

 const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 const currentMonthName = monthNames[currentMonthDate.getMonth()];
 const currentYear = currentMonthDate.getFullYear();
 const daysInMonth = new Date(currentYear, currentMonthDate.getMonth() + 1, 0).getDate();
 const firstDayOfMonth = new Date(currentYear, currentMonthDate.getMonth(), 1).getDay();

 // Computed Stats
 const stats = useMemo(() => {
 const totalRevenue = leads.filter(l => l.status === 'Closed Won').reduce((acc, l) => acc + l.value, 0);
 const activeLeads = leads.filter(l => l.status !== 'Closed Won').length;
 const winRate = leads.length > 0 ? Math.round((leads.filter(l => l.status === 'Closed Won').length / leads.length) * 100) : 0;
 const pipelineValue = leads.filter(l => l.status !== 'Closed Won').reduce((acc, l) => acc + l.value, 0);
 const avgDealSize = leads.filter(l => l.status === 'Closed Won').length > 0 ? Math.round(totalRevenue / leads.filter(l => l.status === 'Closed Won').length) : 0;

 return {
 main: [
 { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+14%', icon: DollarSign, color: 'text-emerald-400', border: 'border-emerald-500/20' },
 { label: 'Active Pipeline', value: `$${pipelineValue.toLocaleString()}`, change: '+12%', icon: Activity, color: 'text-amber-400', border: 'border-amber-500/20' },
 { label: 'Active Leads', value: activeLeads.toString(), change: '+22%', icon: Target, color: 'text-[#F5A800]', border: 'border-[#F5A800]/20' },
 { label: 'Conversion Rate', value: `${winRate}%`, change: '+2.4%', icon: TrendingUp, color: 'text-purple-400', border: 'border-purple-500/20' }],
 secondary: [
 { label: 'Average Deal Size', value: `$${avgDealSize.toLocaleString()}` },
 { label: 'Total Prospects Created', value: leads.length.toString() },
 { label: 'Customer Acquisition Cost', value: '$120.00' },
 { label: 'Customer Lifetime Value', value: `$${(avgDealSize * 2.4).toLocaleString()}` }]
 };
 }, [leads]);

 const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.company.toLowerCase().includes(searchQuery.toLowerCase()));
 const contactsList = filteredLeads.filter(l => l.status === 'Closed Won');

 const displayLeads = [...filteredLeads]
 .filter(l => statusFilter === 'All' || l.status === statusFilter)
 .sort((a, b) => {
 if (sortBy === 'Highest Deal Value') return b.value - a.value;
 if (sortBy === 'Highest AI Score') return b.score - a.score;
 return 0; // Newest First / default
 });

 // Leads Logic
 const handleAddLead = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newLead.name || !newLead.company) return;
 const lead: Lead = {
 id: Math.random().toString(36).substr(2, 9),
 name: newLead.name, company: newLead.company, email: newLead.email || '', phone: newLead.phone || '',
 status: newLead.status as LeadStatus || 'New', value: Number(newLead.value) || 0,
 date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
 source: 'Manual Entry', score: Math.floor(Math.random() * 40) + 50
 };
 setLeads([lead, ...leads]);
 setShowAddLeadModal(false);
 setNewLead({ status: 'New', value: 0 });
 setNotifications([{ id: Date.now(), title: 'Lead Added', message: `Added ${newLead.name} (${newLead.company}).`, time: 'Just now', read: false, icon: Target }, ...notifications]);
 };
 const handleDeleteLead = (id: string) => setLeads(leads.filter(l => l.id !== id));

 // Export Logic
 const exportToCSV = () => {
 const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Status', 'Deal Value', 'Date Added'];
 const rows = leads.map(l => [l.id, l.name, l.company, l.email, l.phone, l.status, l.value, l.date]);
 const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
 const link = document.createElement("a");
 link.href = encodeURI(csvContent);
 link.download = "nexyovi_crm_export.csv";
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setNotifications([{ id: Date.now(), title: 'Export Successful', message: 'Data exported to CSV.', time: 'Just now', read: false, icon: Download }, ...notifications]);
 };

 // AI Tool Functions
 const handleAIEmailDraft = (targetName = "Alpha Logistics") => {
 setActiveTab('ai-tools');
 setShowAIModal(true);
 setAiState('generating');
 setTimeout(() => {
 setAiResult(`Subject: Maximizing efficiency at ${targetName}\n\nHi there,\n\nI noticed your team at ${targetName} has been scaling rapidly. Based on our analysis, integrating our custom ERP modules could reduce your operational overhead by 15% within the first quarter.\n\nAre you available for a brief 10-minute sync this Thursday to discuss the implementation timeline?\n\nBest regards,\nYonas B.\nNexyovi Enterprises`);
 setAiState('done');
 }, 2500);
 };

 const handleAITraining = () => {
 setNotifications([{ id: Date.now(), title: 'Bot Training Started', message: 'Your PDF knowledge base is being processed by the LLM. You will be notified when training is complete.', time: 'Just now', read: false, icon: Bot }, ...notifications]);
 };

 const handleAIAnalysis = () => {
 setActiveTab('ai-tools');
 setShowAnalysisModal(true);
 setAnalysisState('scanning');
 setTimeout(() => {
 setAnalysisState('done');
 setLeads(leads.map(l => l.company === 'Alpha Log.' ? { ...l, score: 94 } : l));
 }, 3500);
 };

 const handlePraiseTeamMember = (name: string) => {
 setNotifications([{ id: Date.now(), title: 'Praise Sent!', message: `You sent a commendation to ${name}. It will appear on their dashboard.`, time: 'Just now', read: false, icon: Trophy }, ...notifications]);
 }

 // Deal Pipeline Logic
 const onDragStart = (e: React.DragEvent, id: string) => { e.dataTransfer.setData('leadId', id); };
 const onDragOver = (e: React.DragEvent) => { e.preventDefault(); };
 const onDrop = (e: React.DragEvent, stage: LeadStatus) => {
 e.preventDefault();
 const leadId = e.dataTransfer.getData('leadId');
 if (leadId) {
 setLeads(leads.map(l => l.id === leadId ? { ...l, status: stage } : l));
 if (stage === 'Closed Won') {
 setNotifications([{ id: Date.now(), title: 'Deal Won! 🎉', message: `Successfully closed deal for $${leads.find(l=>l.id===leadId)?.value.toLocaleString()}`, time: 'Just now', read: false, icon: Trophy }, ...notifications]);
 }
 }
 };

 const handleCloseDeal = (id: string) => {
 setLeads(leads.map(l => l.id === id ? { ...l, status: 'Closed Won' } : l));
 setSelectedDeal(null);
 setNotifications([{ id: Date.now(), title: 'Deal Won! 🎉', message: `Awesome job closing this deal!`, time: 'Just now', read: false, icon: Trophy }, ...notifications]);
 };

 return (
 <div className="min-h-screen bg-[#05060A] text-white flex overflow-hidden font-sans">
 
 {/* ── SIDEBAR ── */}
 <div className="w-64 bg-[#0A0F1C] border-r border-white/5 flex flex-col relative z-20 shrink-0">
 <div className="p-6 border-b border-white/5 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5A800] to-blue-800 flex items-center justify-center font-black text-xs ">NX</div>
 <span className="font-bold text-lg tracking-tight">Nexyovi CRM</span>
 </div>
 </div>

 <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-1">
 <div className="px-3 text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-2 mt-2">Main Menu</div>
 {SIDEBAR_MENU.slice(0, 7).map((item) => (
 <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-[13px] ${activeTab === item.id ? 'bg-[#F5A800]/10 text-[#F5A800] border border-[#F5A800]/20 ' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}>
 <item.icon size={16} /> {item.label}
 </button>
 ))}
 
 <div className="px-3 text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-2 mt-6">Operations</div>
 {SIDEBAR_MENU.slice(7, 13).map((item) => (
 <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-[13px] ${activeTab === item.id ? 'bg-[#F5A800]/10 text-[#F5A800] border border-[#F5A800]/20 ' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}>
 <item.icon size={16} /> {item.label}
 </button>
 ))}

 <div className="px-3 text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-2 mt-6">System & AI</div>
 {SIDEBAR_MENU.slice(13).map((item) => (
 <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-[13px] ${activeTab === item.id ? 'bg-[#F5A800]/10 text-[#F5A800] border border-[#F5A800]/20 ' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}>
 <item.icon size={16} /> {item.label}
 {item.id === 'ai-tools' && <span className="ml-auto text-[8px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">New</span>}
 </button>
 ))}
 </div>

 <div className="p-4 border-t border-white/5 bg-[#05060A]/50">
 <Link to="/services" className="flex items-center justify-center gap-2 text-xs text-[#9CA3AF] hover:text-white transition-colors py-2 border border-white/10 rounded-xl hover:bg-white/5">
 <ArrowLeft size={14} /> Exit System
 </Link>
 </div>
 </div>

 {/* ── MAIN CONTENT ── */}
 <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
 {/* Topbar */}
 <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#05060A]/80 backdrop-blur-md shrink-0 z-[100]">
 <div className="relative w-96">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
 <input 
 type="text" 
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search across all modules..." 
 className="w-full bg-[#111827] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-[13px] text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#F5A800]/50 transition-all"
 />
 </div>
 <div className="flex items-center gap-6">
 <div className="relative">
 <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-[#9CA3AF] hover:text-white transition-colors focus:outline-none">
 <Bell size={18} />
 {notifications.some(n => !n.read) && <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-[#05060A] animate-pulse" />}
 </button>
 
 <AnimatePresence>
 {showNotifications && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full mt-4 right-0 w-96 bg-[#111827] border border-white/10 rounded-2xl overflow-hidden z-[100]">
 <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0A0F1C]">
 <h3 className="font-bold text-white text-sm">Notifications</h3>
 <div className="flex gap-2">
 <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-[10px] font-bold text-[#F5A800] hover:text-white">Mark all read</button>
 <button onClick={() => setNotifications([])} className="text-[10px] font-bold text-red-400 hover:text-white ml-2">Clear</button>
 </div>
 </div>
 <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
 {notifications.length === 0 ? <div className="p-8 text-center text-[#6B7280] text-xs">No notifications.</div> : (
 <div className="divide-y divide-white/5">
 {notifications.map(notif => (
 <div key={notif.id} className={`p-4 flex gap-4 transition-colors hover:bg-white/[0.02] ${!notif.read ? 'bg-[#F5A800]/5' : ''}`}>
 <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!notif.read ? 'bg-[#F5A800] text-white' : 'bg-white/5 text-[#9CA3AF]'}`}><notif.icon size={14} /></div>
 <div className="flex-1">
 <div className="flex justify-between items-start mb-1"><h4 className={`text-sm font-bold ${!notif.read ? 'text-white' : 'text-[#9CA3AF]'}`}>{notif.title}</h4><span className="text-[10px] text-[#6B7280]">{notif.time}</span></div>
 <p className="text-xs text-[#9CA3AF] leading-relaxed">{notif.message}</p>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 <div className="flex items-center gap-3 pl-6 border-l border-white/10">
 <div className="text-right">
 <div className="text-[13px] font-bold text-white leading-tight">Yonas B.</div>
 <div className="text-[9px] font-black text-[#F5A800] uppercase tracking-widest">Super Admin</div>
 </div>
 <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#F5A800]/30 flex items-center justify-center font-bold text-[11px] text-[#F5A800] ">YB</div>
 </div>
 </div>
 </div>

 <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-0">
 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A800]/5 blur-[150px] rounded-full pointer-events-none" />

 {/* === 1. DASHBOARD === */}
 {activeTab === 'dashboard' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 relative z-10">
 <div className="flex items-center justify-between">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Executive Dashboard</h1><p className="text-[#9CA3AF] text-sm mt-1">Real-time business visibility & AI insights.</p></div>
 <div className="flex items-center gap-3">
 <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Sync</div>
 <button onClick={exportToCSV} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"><Download size={16} /> Export (CSV)</button>
 <button onClick={() => setShowAddLeadModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white hover:bg-blue-600 flex items-center gap-2"><Plus size={16} /> Add Lead</button>
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {stats.main.map((stat, i) => (
 <div key={i} className="p-6 rounded-[24px] bg-[#111827] border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors relative overflow-hidden">
 <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
 <div className="flex items-start justify-between mb-6 relative z-10">
 <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} border ${stat.border}`}><stat.icon size={24} /></div>
 <span className="text-emerald-400 text-[11px] font-bold bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-400/20">{stat.change}</span>
 </div>
 <div className="relative z-10"><div className="text-[#9CA3AF] text-xs font-black uppercase tracking-widest mb-1">{stat.label}</div><div className="text-3xl font-black text-white tracking-tight">{stat.value}</div></div>
 </div>
 ))}
 </div>
 <div className="grid grid-cols-4 gap-6">
 {stats.secondary.map((stat, i) => (
 <div key={i} className="p-5 rounded-[20px] bg-[#111827] border border-white/5 flex items-center justify-between">
 <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">{stat.label}</span>
 <span className="text-lg font-black text-white">{stat.value}</span>
 </div>
 ))}
 </div>
 {/* Charts area simplified for spacing */}
 <div className="grid grid-cols-3 gap-6 mt-6">
 <div className="col-span-2 p-8 rounded-[24px] bg-[#111827] border border-white/5 min-h-[300px] flex flex-col relative overflow-hidden">
 <div className="flex items-center justify-between mb-8 relative z-10">
 <h3 className="font-bold text-white text-lg">Revenue Trends & AI Forecast</h3>
 <div className="flex gap-4">
 <span className="flex items-center gap-2 text-xs text-[#9CA3AF]"><div className="w-3 h-3 rounded-md bg-[#F5A800]" /> Actual</span>
 <span className="flex items-center gap-2 text-xs text-[#9CA3AF]"><div className="w-3 h-3 rounded-md bg-purple-500/50 border border-purple-500 border-dashed" /> AI Forecast</span>
 </div>
 </div>
 <div className="flex-1 flex items-end justify-between gap-3 pt-10 relative z-10">
 {[30, 45, 25, 60, 75, 40, 65, 80, 55].map((h, i) => (
 <div key={i} className="w-full bg-gradient-to-t from-[#F5A800]/40 to-[#F5A800] rounded-t-lg relative group cursor-pointer" style={{ height: `${h}%` }}></div>
 ))}
 {[90, 110, 130].map((h, i) => (
 <div key={i+9} className="w-full bg-purple-500/20 border-2 border-dashed border-purple-500/50 rounded-t-lg relative group cursor-pointer" style={{ height: `${Math.min(h, 100)}%` }}></div>
 ))}
 </div>
 </div>
 <div className="col-span-1 p-6 rounded-[24px] bg-gradient-to-br from-purple-900/40 to-[#111827] border border-purple-500/30 ">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center"><Bot size={16}/></div>
 <h3 className="font-bold text-white">AI Insights</h3>
 </div>
 <div className="space-y-4">
 <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[13px] text-[#9CA3AF]"><span className="text-emerald-400 font-bold">Opportunity:</span> High probability to close <strong>Alpha Logistics</strong> this week.</div>
 </div>
 </div>
 </div>
 </motion.div>
 )}

 {/* === 2. LEADS === */}
 {activeTab === 'leads' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col">
 <div className="flex items-center justify-between mb-2 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Lead Database</h1><p className="text-[#9CA3AF] text-sm mt-1">Capture, score, and convert prospects automatically.</p></div>
 <div className="flex gap-3">
 <button onClick={exportToCSV} className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white flex items-center gap-2 hover:bg-white/10 "><Download size={16}/> Export CSV</button>
 <button onClick={() => setShowAddLeadModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"><Plus size={16} /> Manual Entry</button>
 </div>
 </div>

 {/* Filters Bar */}
 <div className="flex items-center justify-between bg-[#111827] border border-white/5 p-4 rounded-2xl shrink-0 ">
 <div className="flex gap-4">
 <div className="flex items-center gap-2">
 <span className="text-xs font-bold text-[#9CA3AF]">Status Filter:</span>
 <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[#05060A] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer">
 <option value="All">All Leads</option>
 {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
 </select>
 </div>
 <div className="flex items-center gap-2">
 <span className="text-xs font-bold text-[#9CA3AF]">Sort By:</span>
 <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#05060A] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer">
 <option value="Newest First">Newest First</option>
 <option value="Highest Deal Value">Highest Deal Value</option>
 <option value="Highest AI Score">Highest AI Score</option>
 </select>
 </div>
 </div>
 <div className="text-xs font-bold text-white bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
 Total Pipeline: <span className="text-emerald-400 font-mono">${displayLeads.reduce((a,b)=>a+b.value,0).toLocaleString()}</span>
 </div>
 </div>

 <div className="bg-[#111827] border border-white/5 rounded-[24px] overflow-hidden flex-1 flex flex-col min-h-[400px]">
 <div className="flex-1 overflow-y-auto custom-scrollbar relative">
 <table className="w-full text-left relative">
 <thead className="bg-[#05060A]/95 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#6B7280] font-black border-b border-white/10 sticky top-0 z-10">
 <tr><th className="p-5 pl-6"><input type="checkbox" className="rounded border-white/20 bg-transparent cursor-pointer"/></th><th className="p-5">Contact & Company</th><th className="p-5">AI Score</th><th className="p-5">Pipeline Stage</th><th className="p-5">Deal Value</th><th className="p-5">Source</th><th className="p-5 text-right pr-6">Actions</th></tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {displayLeads.map((lead) => (
 <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors group cursor-pointer" onClick={() => setSelectedDeal(lead)}>
 <td className="p-5 pl-6" onClick={(e)=>e.stopPropagation()}><input type="checkbox" className="rounded border-white/20 bg-transparent cursor-pointer"/></td>
 <td className="p-5">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5A800]/20 to-[#111827] border border-[#F5A800]/30 flex items-center justify-center font-black text-sm text-[#F5A800] ">{lead.name.split(' ').map(n => n[0]).join('')}</div>
 <div>
 <div className="font-bold text-white text-[13px] group-hover:text-[#F5A800] transition-colors">{lead.name}</div>
 <div className="text-xs text-[#9CA3AF] flex items-center gap-1"><Building2 size={10}/> {lead.company}</div>
 </div>
 </div>
 </td>
 <td className="p-5"><div className={`text-xs font-black w-8 h-8 rounded-full flex items-center justify-center border ${lead.score > 80 ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 ' : lead.score > 50 ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : 'text-red-400 border-red-500/30 bg-red-500/10'}`}>{lead.score}</div></td>
 <td className="p-5" onClick={(e)=>e.stopPropagation()}>
 <select 
 value={lead.status} 
 onChange={(e) => {
 setLeads(leads.map(l => l.id === lead.id ? {...l, status: e.target.value as LeadStatus} : l));
 setNotifications([{ id: Date.now(), title: 'Pipeline Updated', message: `${lead.name} moved to ${e.target.value}.`, time: 'Just now', read: false, icon: Target }, ...notifications]);
 }}
 className={`text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border outline-none appearance-none cursor-pointer transition-colors ${lead.status === 'Closed Won' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' : 'bg-[#F5A800]/10 text-[#F5A800] border-[#F5A800]/30 hover:bg-[#F5A800]/20'}`}
 >
 {STAGES.map(s => <option key={s} value={s} className="bg-[#05060A] text-white">{s}</option>)}
 </select>
 </td>
 <td className="p-5"><div className="font-mono text-sm font-bold text-white bg-white/5 px-2 py-1 rounded-lg inline-block border border-white/5 ">${lead.value.toLocaleString()}</div></td>
 <td className="p-5"><span className="text-xs text-[#9CA3AF] bg-white/5 px-2 py-1 rounded border border-white/5">{lead.source}</span></td>
 <td className="p-5 text-right pr-6" onClick={(e)=>e.stopPropagation()}><button onClick={() => handleDeleteLead(lead.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-400/20 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
 </tr>
 ))}
 </tbody>
 </table>
 {displayLeads.length === 0 && (
 <div className="flex flex-col items-center justify-center py-20 text-center absolute inset-0">
 <Target size={48} className="text-white/10 mb-4"/>
 <h3 className="text-xl font-bold text-white">No Leads Found</h3>
 <p className="text-[#9CA3AF] text-sm mt-1">Adjust your search or add a new lead.</p>
 </div>
 )}
 </div>
 </div>
 </motion.div>
 )}

 {/* === 3. CONTACTS === */}
 {activeTab === 'contacts' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
 <div className="flex items-center justify-between mb-6">
 <h1 className="text-3xl font-black text-white tracking-tight">Customer Profiles</h1>
 <button onClick={exportToCSV} className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2"><Download size={16}/> Export VIP Contacts</button>
 </div>
 <div className="bg-[#111827] border border-white/5 rounded-[24px] overflow-hidden ">
 <table className="w-full text-left">
 <thead className="bg-[#05060A] text-[10px] uppercase tracking-widest text-[#6B7280] font-black border-b border-white/10">
 <tr><th className="p-5 pl-6">Name</th><th className="p-5">Contact Details</th><th className="p-5">Loyalty Tier</th><th className="p-5">Total Spend</th><th className="p-5 text-right">Actions</th></tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {contactsList.map(contact => (
 <tr key={contact.id} className="hover:bg-white/[0.02] group">
 <td className="p-5 pl-6 font-bold text-sm text-white">{contact.name}</td>
 <td className="p-5 text-xs text-[#9CA3AF]"><div>{contact.email}</div><div>{contact.phone}</div></td>
 <td className="p-5"><span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs font-bold border border-yellow-500/20">VIP Gold</span></td>
 <td className="p-5 font-mono font-bold text-white">${contact.value.toLocaleString()}</td>
 <td className="p-5 text-right"><button onClick={() => handleAIEmailDraft(contact.company)} className="px-3 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 hover:bg-purple-500/20 transition-all flex items-center gap-2 ml-auto"><Sparkles size={12}/> AI Email Draft</button></td>
 </tr>
 ))}
 {contactsList.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-[#9CA3AF]">No converted contacts yet. Close deals in the pipeline first!</td></tr>}
 </tbody>
 </table>
 </div>
 </motion.div>
 )}

 {/* === 5. DEALS / PIPELINE === */}
 {activeTab === 'deals' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col relative z-10">
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="text-3xl font-black text-white tracking-tight">Sales Pipeline</h1>
 <p className="text-[#9CA3AF] text-sm mt-1">Drag and drop deals or click a card to view deep AI insights.</p>
 </div>
 <div className="flex items-center gap-4">
 <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
 <Activity size={14}/> Pipeline Value: ${leads.filter(l=>l.status!=='Closed Won').reduce((a,b)=>a+b.value,0).toLocaleString()}
 </span>
 <button onClick={() => setShowAddLeadModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white hover:bg-blue-600 flex items-center gap-2">
 <Plus size={16} /> Create Deal
 </button>
 </div>
 </div>

 <div className="flex-1 flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
 {STAGES.map((stage) => {
 const stageLeads = filteredLeads.filter(l => l.status === stage);
 return (
 <div key={stage} className="min-w-[320px] w-[320px] bg-[#111827] border border-white/5 rounded-[24px] p-5 flex flex-col " onDragOver={onDragOver} onDrop={(e) => onDrop(e, stage)}>
 <div className="flex items-center justify-between mb-5 px-1 border-b border-white/10 pb-4">
 <div className="flex items-center gap-2">
 <div className={`w-2 h-2 rounded-full ${stage === 'Closed Won' ? 'bg-emerald-500' : 'bg-[#F5A800]'}`} />
 <h3 className="font-bold text-white text-xs uppercase tracking-widest">{stage}</h3>
 <span className="text-[10px] font-black text-[#9CA3AF] bg-white/5 px-2 py-0.5 rounded-full">{stageLeads.length}</span>
 </div>
 <span className="text-xs font-bold text-[#6B7280] font-mono">${stageLeads.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
 </div>
 <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-1">
 {stageLeads.map((lead) => (
 <div key={lead.id} onClick={() => setSelectedDeal(lead)} draggable onDragStart={(e) => onDragStart(e, lead.id)} className="bg-[#05060A] p-5 rounded-[20px] border border-white/5 cursor-pointer hover:border-[#F5A800]/50 transition-all active:cursor-grabbing group ">
 <div className="flex justify-between items-start mb-3">
 <div className="font-bold text-white text-sm group-hover:text-[#F5A800] transition-colors">{lead.company}</div>
 {lead.score > 80 && <Sparkles size={14} className="text-purple-400" />}
 </div>
 <div className="text-xs text-[#9CA3AF] mb-4 flex items-center gap-2"><Users size={12}/> {lead.name}</div>
 <div className="flex items-center justify-between pt-4 border-t border-white/5">
 <span className="font-mono text-xs text-white font-black bg-white/5 px-2 py-1 rounded-md border border-white/5">${lead.value.toLocaleString()}</span>
 <div className={`text-[10px] font-bold px-2 py-1 rounded ${lead.score > 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{lead.score}% Win Prob</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 )
 })}
 </div>
 </motion.div>
 )}

 {/* === 13. TEAM === */}
 {activeTab === 'team' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 relative z-10 max-w-7xl mx-auto">
 <div className="flex items-center justify-between">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Team Performance Hub</h1><p className="text-[#9CA3AF] text-sm mt-1">Track sales quotas, manage your staff, and monitor the live leaderboard.</p></div>
 <button onClick={() => {setActiveTab('settings'); setSettingsSection('team');}} className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-200 flex items-center gap-2"><UserPlus size={16}/> Invite New Member</button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="col-span-1 p-8 bg-gradient-to-br from-[#F5A800]/20 to-[#111827] border border-[#F5A800]/40 rounded-[32px] relative overflow-hidden flex flex-col items-center text-center">
 <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A800]/20 rounded-full blur-[40px] pointer-events-none" />
 <div className="flex items-center justify-center gap-2 mb-6 text-[#F5A800] font-black uppercase tracking-widest text-xs bg-[#F5A800]/10 px-4 py-1.5 rounded-full border border-[#F5A800]/20 z-10"><Trophy size={14}/> Top Performer</div>
 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F5A800] to-blue-800 p-1 mb-4 z-10"><div className="w-full h-full rounded-full bg-[#05060A] flex items-center justify-center text-3xl font-black text-white border-4 border-[#111827]">YB</div></div>
 <h3 className="text-2xl font-black text-white z-10">Yonas B.</h3>
 <p className="text-sm text-[#9CA3AF] mb-6 z-10">Super Admin / Lead</p>
 <div className="w-full bg-[#05060A] border border-white/10 rounded-2xl p-4 flex justify-between items-center z-10">
 <div className="text-left"><p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-black">Revenue Closed</p><p className="text-xl font-black text-white mt-1">$180,000</p></div>
 <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400"><TrendingUp size={20}/></div>
 </div>
 </div>

 <div className="col-span-1 lg:col-span-2 p-8 bg-[#111827] border border-white/5 rounded-[32px] ">
 <div className="flex items-center justify-between mb-8"><h3 className="text-xl font-bold text-white flex items-center gap-2"><Flag size={20} className="text-[#F5A800]"/> Quarterly Quota Progress</h3></div>
 <div className="space-y-6">
 {teamMembers.filter(m => m.quota > 0).map(member => {
 const progress = Math.min((member.closed / member.quota) * 100, 100);
 return (
 <div key={member.id}>
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white border border-white/10">{member.name.split(' ').map(n=>n[0]).join('')}</div><span className="font-bold text-sm text-white">{member.name}</span></div>
 <div className="text-right"><span className="text-sm font-bold text-white">${member.closed.toLocaleString()}</span><span className="text-xs text-[#6B7280]"> / ${member.quota.toLocaleString()}</span></div>
 </div>
 <div className="w-full h-3 bg-[#05060A] rounded-full overflow-hidden border border-white/5 relative"><motion.div initial={{width: 0}} animate={{width: `${progress}%`}} className={`h-full rounded-full bg-gradient-to-r ${member.avatarColor}`} /></div>
 </div>
 )
 })}
 </div>
 </div>
 </div>

 <div>
 <h3 className="text-xl font-bold text-white mb-6">Sales & Support Staff</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {teamMembers.map(member => (
 <div key={member.id} className="p-6 bg-[#111827] border border-white/5 rounded-[24px] hover:border-white/10 group">
 <div className="flex items-start justify-between mb-4">
 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.avatarColor} p-[2px]`}><div className="w-full h-full bg-[#111827] rounded-xl flex items-center justify-center text-white font-black text-lg">{member.name.split(' ').map(n=>n[0]).join('')}</div></div>
 <div className="flex flex-col items-end">
 <span className="text-[10px] font-black uppercase tracking-widest text-[#F5A800] bg-[#F5A800]/10 px-2 py-1 rounded mb-2">{member.role}</span>
 <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : member.status === 'In Meeting' ? 'bg-amber-500' : 'bg-gray-500'}`} /><span className="text-[10px] text-[#9CA3AF] font-bold">{member.status}</span></div>
 </div>
 </div>
 <h4 className="font-bold text-white text-lg">{member.name}</h4>
 <p className="text-xs text-[#6B7280] mb-6">{member.email}</p>
 <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
 <div><p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-black mb-1">Deals Won</p><p className="text-lg font-black text-white">{member.deals}</p></div>
 <div><p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-black mb-1">Leaderboard</p><p className="text-lg font-black text-white flex items-center gap-1">#{member.rank} {member.rank === 1 && <Medal size={16} className="text-yellow-500"/>}</p></div>
 </div>
 <div className="mt-6 pt-4 border-t border-white/5">
 <button onClick={() => handlePraiseTeamMember(member.name)} className="w-full py-2 bg-white/5 rounded-lg text-xs font-bold text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-2"><Trophy size={14}/> Send Praise</button>
 </div>
 </div>
 ))}
 </div>
 </div>
 </motion.div>
 )}

 {/* === 15. AI TOOLS === */}
 {activeTab === 'ai-tools' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 max-w-5xl">
 <h1 className="text-3xl font-black text-white tracking-tight mb-8">AI Assistant & Tools <span className="ml-3 text-[10px] bg-purple-500 text-white px-2 py-1 rounded-full uppercase tracking-widest font-black">Ultimate</span></h1>
 <div className="grid grid-cols-2 gap-6">
 <div className="p-8 rounded-[24px] bg-gradient-to-br from-emerald-900/30 to-[#111827] border border-emerald-500/30">
 <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><BrainCircuit size={18} className="text-emerald-400"/> AI Sales Predictor</h3>
 <p className="text-sm text-[#9CA3AF] mb-6">Analyzes lead data to predict conversion probability based on 50+ data points.</p>
 <button onClick={handleAIAnalysis} className="w-full py-3 bg-emerald-500/20 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 flex justify-center items-center gap-2"><ScanSearch size={14} /> Run Deep Analysis</button>
 </div>
 <div className="p-8 rounded-[24px] bg-gradient-to-br from-purple-900/30 to-[#111827] border border-purple-500/30">
 <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Sparkles size={18} className="text-purple-400"/> AI Email Writer</h3>
 <p className="text-sm text-[#9CA3AF] mb-6">Generate highly converting follow-up emails instantly using LLMs tuned for sales.</p>
 <button onClick={() => handleAIEmailDraft()} className="w-full py-3 bg-purple-500/20 text-purple-400 font-bold text-xs rounded-xl border border-purple-500/30 hover:bg-purple-500/30 flex justify-center items-center gap-2"><Sparkles size={14} /> Draft Custom Email</button>
 </div>
 </div>
 </motion.div>
 )}

 {/* === 16. SETTINGS === */}
 {activeTab === 'settings' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col relative z-10">
 <div className="flex items-center justify-between mb-8 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">System Settings</h1></div>
 <button onClick={() => setNotifications([{id: Date.now(), title: 'Settings Saved', message: 'All system configurations have been saved successfully.', time: 'Just now', read: false, icon: Settings}, ...notifications])} className="px-6 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white hover:bg-blue-600">Save Changes</button>
 </div>
 <div className="flex flex-col lg:flex-row gap-8 flex-1">
 <div className="w-full lg:w-64 shrink-0 space-y-2">
 {[
 { id: 'general', icon: Globe, label: 'General Configuration' },
 { id: 'billing', icon: CreditCard, label: 'Billing & Subscriptions' },
 { id: 'security', icon: ShieldCheck, label: 'Security & 2FA' },
 { id: 'team', icon: Users2, label: 'Team & Permissions' }].map((tab) => (
 <button key={tab.id} onClick={() => setSettingsSection(tab.id)} className={`w-full flex items-center justify-between p-3 rounded-xl font-medium text-[13px] ${settingsSection === tab.id ? 'bg-[#F5A800] text-white ' : 'bg-[#111827] text-[#9CA3AF] hover:text-white hover:bg-white/5 border border-white/5'}`}><div className="flex items-center gap-3"><tab.icon size={16} /> {tab.label}</div></button>
 ))}
 </div>
 <div className="flex-1 bg-[#111827] border border-white/5 rounded-[32px] p-8">
 {settingsSection === 'team' && (
 <div className="space-y-6">
 <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-white">Manage Access</h2></div>
 <table className="w-full text-left">
 <thead className="bg-[#05060A] text-[10px] uppercase tracking-widest text-[#6B7280]"><tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4 text-right">Actions</th></tr></thead>
 <tbody>
 {teamMembers.map(member => (
 <tr key={member.id} className="border-b border-white/5"><td className="p-4 font-bold text-sm text-white">{member.name}</td><td className="p-4 text-[#F5A800]">{member.role}</td><td className="p-4 text-right"><button onClick={() => setTeamMembers(teamMembers.filter(m => m.id !== member.id))} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={16}/></button></td></tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 {settingsSection === 'general' && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 pb-8">
 
 {/* Brand Identity */}
 <div>
 <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Brand Identity</h2>
 <div className="flex items-start gap-8">
 <div className="w-32 h-32 rounded-2xl bg-[#05060A] border-2 border-dashed border-white/10 flex flex-col items-center justify-center hover:border-[#F5A800] hover:bg-[#F5A800]/5 transition-all cursor-pointer group shrink-0">
 <Upload size={24} className="text-[#6B7280] group-hover:text-[#F5A800] mb-2 transition-colors" />
 <span className="text-[10px] font-bold text-[#9CA3AF] group-hover:text-white transition-colors">Upload Logo</span>
 </div>
 <div className="flex-1 space-y-5">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Company Legal Name</label><input type="text" value={companyProfile.name} onChange={(e)=>setCompanyProfile({...companyProfile, name: e.target.value})} className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none transition-colors" /></div>
 <div className="grid grid-cols-2 gap-5">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Tax ID / TIN</label><input type="text" defaultValue="TIN-8492019" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none transition-colors" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Brand Accent Color</label>
 <div className="flex gap-3">
 <div className="w-11 h-11 rounded-lg bg-[#F5A800] border border-white/10 shrink-0 "></div>
 <input type="text" defaultValue="#F5A800" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-[#F5A800] outline-none transition-colors" />
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Contact Information */}
 <div>
 <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Corporate Headquarters</h2>
 <div className="grid grid-cols-2 gap-6">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Support Email</label><input type="email" value={companyProfile.email} onChange={(e)=>setCompanyProfile({...companyProfile, email: e.target.value})} className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none transition-colors" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Corporate Phone</label><input type="text" defaultValue="+251 911 234 567" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none transition-colors" /></div>
 <div className="col-span-2">
 <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Street Address</label>
 <input type="text" defaultValue="Bole Road, Mega Building, Floor 4" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none transition-colors mb-4" />
 <div className="grid grid-cols-3 gap-4">
 <input type="text" defaultValue="Addis Ababa" placeholder="City" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none transition-colors" />
 <input type="text" defaultValue="1000" placeholder="Postal Code" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none transition-colors" />
 <select className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none appearance-none transition-colors"><option>Ethiopia</option><option>United States</option><option>Kenya</option></select>
 </div>
 </div>
 </div>
 </div>

 {/* Localization */}
 <div>
 <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Localization</h2>
 <div className="grid grid-cols-3 gap-6">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">System Timezone</label><select value={companyProfile.timezone} onChange={(e)=>setCompanyProfile({...companyProfile, timezone: e.target.value})} className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none appearance-none transition-colors"><option value="EAT">East Africa Time (EAT)</option><option value="UTC">UTC Standard</option><option value="EST">Eastern Time (EST)</option></select></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Base Currency</label><select value={companyProfile.currency} onChange={(e)=>setCompanyProfile({...companyProfile, currency: e.target.value})} className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none appearance-none transition-colors"><option value="USD">USD ($)</option><option value="ETB">ETB (Br)</option></select></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Date Format</label><select className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none appearance-none transition-colors"><option>MMM DD, YYYY</option><option>DD/MM/YYYY</option></select></div>
 </div>
 </div>
 </motion.div>
 )}

 {settingsSection === 'billing' && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 pb-8">
 
 {/* Current Plan Overview */}
 <div>
 <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Subscription Plan</h2>
 <div className="p-8 bg-gradient-to-br from-[#F5A800]/20 to-[#111827] border border-[#F5A800]/30 rounded-[24px] flex items-center justify-between relative overflow-hidden ">
 <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A800]/10 rounded-full blur-[50px] pointer-events-none" />
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-2">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A800] to-blue-800 flex items-center justify-center "><Briefcase size={20} className="text-white"/></div>
 <div>
 <h3 className="text-2xl font-black text-white">Enterprise Edition</h3>
 <p className="text-sm text-[#F5A800] font-bold">Billed Annually ($3,588/yr)</p>
 </div>
 </div>
 <p className="text-[#9CA3AF] text-sm mt-4">Your next charge is scheduled for <span className="text-white font-bold">Nov 15, 2026</span>.</p>
 </div>
 <div className="relative z-10 flex flex-col items-end gap-3">
 <button className="px-6 py-3 bg-[#F5A800] text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-colors">Upgrade Plan</button>
 <button className="text-xs font-bold text-[#9CA3AF] hover:text-white transition-colors">Cancel Subscription</button>
 </div>
 </div>
 </div>

 {/* System Usage */}
 <div>
 <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Usage & Limitations</h2>
 <div className="grid grid-cols-2 gap-6">
 <div className="bg-[#05060A] border border-white/5 p-6 rounded-[20px]">
 <div className="flex justify-between items-end mb-2">
 <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Active Team Seats</span>
 <span className="text-white font-bold text-sm">4 / 10</span>
 </div>
 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[40%] rounded-full"></div></div>
 </div>
 <div className="bg-[#05060A] border border-white/5 p-6 rounded-[20px]">
 <div className="flex justify-between items-end mb-2">
 <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">AI Generation Credits</span>
 <span className="text-white font-bold text-sm">84,200 / 100,000</span>
 </div>
 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[84%] rounded-full"></div></div>
 </div>
 </div>
 </div>

 {/* Payment Methods */}
 <div>
 <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Payment Methods</h2>
 <div className="space-y-4">
 <div className="p-5 bg-[#05060A] border border-[#F5A800]/30 rounded-xl flex items-center justify-between group">
 <div className="flex items-center gap-4">
 <div className="w-12 h-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded flex items-center justify-center "><span className="text-white font-black italic text-[10px]">VISA</span></div>
 <div><p className="text-sm font-bold text-white">Visa ending in 4242</p><p className="text-xs text-[#9CA3AF]">Expires 12/28</p></div>
 </div>
 <div className="flex items-center gap-3">
 <span className="text-[10px] font-black uppercase tracking-widest bg-[#F5A800]/10 text-[#F5A800] px-2 py-1 rounded">Default</span>
 <button className="text-[#9CA3AF] hover:text-white p-2"><MoreVertical size={16}/></button>
 </div>
 </div>
 <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-xs font-bold text-[#9CA3AF] hover:text-white hover:border-white/20 transition-all flex justify-center items-center gap-2"><Plus size={16}/> Add Payment Method</button>
 </div>
 </div>

 {/* Billing History */}
 <div>
 <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Billing History</h2>
 <div className="bg-[#05060A] border border-white/5 rounded-2xl overflow-hidden">
 <table className="w-full text-left">
 <thead className="bg-white/[0.02] text-[10px] uppercase tracking-widest text-[#6B7280] font-black border-b border-white/5">
 <tr><th className="p-4 pl-6">Invoice Date</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4 text-right pr-6">Receipt</th></tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 <tr className="hover:bg-white/[0.02]">
 <td className="p-4 pl-6 text-sm text-white font-bold">Oct 15, 2026</td>
 <td className="p-4 text-sm font-mono text-white">$299.00</td>
 <td className="p-4"><span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">Paid</span></td>
 <td className="p-4 pr-6 text-right"><button className="text-[#9CA3AF] hover:text-white transition-colors flex items-center gap-2 ml-auto text-xs font-bold"><Download size={14}/> PDF</button></td>
 </tr>
 <tr className="hover:bg-white/[0.02]">
 <td className="p-4 pl-6 text-sm text-white font-bold">Sep 15, 2026</td>
 <td className="p-4 text-sm font-mono text-white">$299.00</td>
 <td className="p-4"><span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">Paid</span></td>
 <td className="p-4 pr-6 text-right"><button className="text-[#9CA3AF] hover:text-white transition-colors flex items-center gap-2 ml-auto text-xs font-bold"><Download size={14}/> PDF</button></td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </motion.div>
 )}

 {settingsSection !== 'team' && settingsSection !== 'general' && settingsSection !== 'billing' && (
 <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
 <Settings size={48} className="text-[#F5A800]/40 mb-4"/>
 <h3 className="text-2xl font-black text-white capitalize mb-2">{settingsSection} Settings</h3>
 <p className="text-[#9CA3AF] text-sm max-w-sm">Ultimate settings for this section are unlocked and fully operational in production.</p>
 </div>
 )}
 </div>
 </div>
 </motion.div>
 )}

 {/* === 6. TASKS === */}
 {activeTab === 'tasks' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-6xl mx-auto">
 <div className="flex items-center justify-between mb-4 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Task Management</h1><p className="text-[#9CA3AF] text-sm mt-1">Organize your workflow and never miss a follow-up.</p></div>
 <div className="flex gap-3">
 <div className="bg-[#111827] border border-white/5 rounded-xl p-1 flex items-center ">
 {['All', 'Todo', 'In Progress', 'Completed'].map(f => (
 <button key={f} onClick={() => setTaskFilter(f as any)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${taskFilter === f ? 'bg-[#F5A800] text-white ' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}>{f}</button>
 ))}
 </div>
 </div>
 </div>

 {/* Quick Add Bar */}
 <div className="bg-[#111827] border border-[#F5A800]/30 rounded-2xl p-4 flex items-center gap-4 shrink-0">
 <div className="w-8 h-8 rounded-full bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800] shrink-0"><CheckSquare size={16}/></div>
 <input type="text" value={newTaskTitle} onChange={e=>setNewTaskTitle(e.target.value)} onKeyDown={(e) => {
 if(e.key === 'Enter' && newTaskTitle.trim()) {
 setTasks([{id: Date.now().toString(), title: newTaskTitle, status: 'Todo', priority: 'Medium', dueDate: 'Today', assignee: 'Yonas B.'}, ...tasks]);
 setNewTaskTitle('');
 setNotifications([{ id: Date.now(), title: 'Task Created', message: 'New task added to your to-do list.', time: 'Just now', read: false, icon: CheckSquare }, ...notifications]);
 }
 }} placeholder="What needs to be done? Press Enter to save..." className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-[#6B7280]" />
 <div className="flex items-center gap-2 border-l border-white/10 pl-4">
 <select className="bg-[#05060A] border border-white/10 text-[#9CA3AF] text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer"><option>Medium Priority</option><option>Urgent</option></select>
 <button onClick={() => {
 if(newTaskTitle.trim()) {
 setTasks([{id: Date.now().toString(), title: newTaskTitle, status: 'Todo', priority: 'Medium', dueDate: 'Today', assignee: 'Yonas B.'}, ...tasks]);
 setNewTaskTitle('');
 setNotifications([{ id: Date.now(), title: 'Task Created', message: 'New task added to your to-do list.', time: 'Just now', read: false, icon: CheckSquare }, ...notifications]);
 }
 }} className="px-4 py-1.5 bg-[#F5A800] text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors ">Add Task</button>
 </div>
 </div>

 {/* Task List */}
 <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pb-8">
 {tasks.filter(t => taskFilter === 'All' || t.status === taskFilter).length === 0 ? (
 <div className="flex flex-col items-center justify-center py-20 text-center bg-[#111827] border border-white/5 rounded-[24px]">
 <CheckCircle2 size={48} className="text-white/10 mb-4"/>
 <h3 className="text-xl font-bold text-white">All caught up!</h3>
 <p className="text-[#9CA3AF] text-sm mt-1">There are no tasks matching this filter.</p>
 </div>
 ) : tasks.filter(t => taskFilter === 'All' || t.status === taskFilter).map(task => (
 <div key={task.id} className={`group flex items-center justify-between p-5 rounded-[20px] border transition-all ${task.status === 'Completed' ? 'bg-[#05060A]/50 border-white/5 opacity-60' : 'bg-[#111827] border-white/5 hover:border-[#F5A800]/50 '}`}>
 <div className="flex items-center gap-5">
 <button onClick={() => {
 const newStatus = task.status === 'Completed' ? 'Todo' : 'Completed';
 setTasks(tasks.map(t => t.id === task.id ? {...t, status: newStatus} : t));
 if (newStatus === 'Completed') setNotifications([{ id: Date.now(), title: 'Task Completed! 🎉', message: task.title, time: 'Just now', read: false, icon: CheckCircle2 }, ...notifications]);
 }} className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20 text-transparent hover:border-emerald-500 hover:bg-emerald-500/10'}`}>
 <Check size={14} className={task.status === 'Completed' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 text-emerald-500'}/>
 </button>
 <div>
 <h4 className={`text-sm font-bold transition-colors ${task.status === 'Completed' ? 'text-[#9CA3AF] line-through' : 'text-white'}`}>{task.title}</h4>
 <div className="flex items-center gap-4 mt-2">
 <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#6B7280] uppercase tracking-widest"><CalendarIcon size={12}/> {task.dueDate}</span>
 <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#6B7280] uppercase tracking-widest"><Users size={12}/> {task.assignee}</span>
 </div>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <select 
 value={task.status} 
 onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? {...t, status: e.target.value as TaskStatus} : t))}
 className="bg-[#05060A] border border-white/10 text-[#9CA3AF] text-[10px] font-bold uppercase tracking-widest px-2 py-1.5 rounded-lg outline-none cursor-pointer"
 >
 <option value="Todo">Todo</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
 </select>
 <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${task.priority === 'Urgent' ? 'bg-red-500/10 text-red-400 border-red-500/20' : task.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : task.priority === 'Medium' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-[#9CA3AF] border-white/10'}`}>
 {task.priority}
 </span>
 <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 transition-all"><Trash2 size={14}/></button>
 </div>
 </div>
 ))}
 </div>
 </motion.div>
 )}

 {/* === 7. CALENDAR === */}
 {activeTab === 'calendar' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-7xl mx-auto">
 <div className="flex items-center justify-between mb-4 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Schedule & Calendar</h1><p className="text-[#9CA3AF] text-sm mt-1">Manage client meetings, demos, and internal deadlines.</p></div>
 <button onClick={() => setShowAddEventModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"><Plus size={16} /> Schedule Event</button>
 </div>

 <div className="flex gap-8 flex-1 overflow-hidden">
 {/* Mini Calendar / Left Column */}
 <div className="w-[340px] shrink-0 space-y-6 overflow-y-auto custom-scrollbar pb-6 pr-2">
 <div className="bg-[#111827] border border-white/5 rounded-[24px] p-6 ">
 <div className="flex items-center justify-between mb-6">
 <button onClick={() => setCurrentMonthDate(new Date(currentYear, currentMonthDate.getMonth() - 1, 1))} className="text-[#9CA3AF] hover:text-white transition-colors"><ChevronLeft size={20}/></button>
 <h3 className="font-black text-white">{currentMonthName} {currentYear}</h3>
 <button onClick={() => setCurrentMonthDate(new Date(currentYear, currentMonthDate.getMonth() + 1, 1))} className="text-[#9CA3AF] hover:text-white transition-colors"><ChevronRight size={20}/></button>
 </div>
 <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-[#6B7280] mb-2 uppercase tracking-widest">
 {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
 </div>
 <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold">
 {Array.from({length: firstDayOfMonth}).map((_, i) => <div key={`empty-${i}`} />)}
 {Array.from({length: daysInMonth}).map((_, i) => {
 const day = i + 1;
 const dateString = `${currentMonthName} ${day}, ${currentYear}`;
 const isToday = day === 25 && currentMonthName === 'Oct' && currentYear === 2026;
 const hasEvent = events.some(e => e.date === dateString);
 return (
 <button key={day} onClick={() => setSelectedDate(dateString)} className={`aspect-square rounded-xl flex items-center justify-center transition-all ${isToday ? 'bg-[#F5A800] text-white ' : selectedDate === dateString ? 'bg-white/10 text-white border border-white/20' : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'} relative`}>
 {day}
 {hasEvent && !isToday && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />}
 </button>
 )
 })}
 </div>
 </div>
 
 {/* Event Type Legend */}
 <div className="bg-[#111827] border border-white/5 rounded-[24px] p-6 ">
 <h3 className="font-bold text-white text-sm mb-4">Event Types</h3>
 <div className="space-y-3">
 {[
 { label: 'Demo / Pitch', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
 { label: 'Client Meeting', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
 { label: 'Internal Sync', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
 { label: 'Deadline', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
 ].map(type => (
 <div key={type.label} className="flex items-center justify-between">
 <span className="text-xs text-[#9CA3AF] font-bold">{type.label}</span>
 <div className={`w-3 h-3 rounded-md border ${type.color}`} />
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Daily Schedule / Right Column */}
 <div className="flex-1 bg-[#111827] border border-white/5 rounded-[24px] flex flex-col overflow-hidden">
 <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0A0F1C]">
 <h2 className="text-xl font-black text-white tracking-tight">{selectedDate === 'Oct 25, 2026' ? 'Today\'s Schedule' : `Schedule for ${selectedDate}`}</h2>
 <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{events.filter(e => e.date === selectedDate).length} Events</span>
 </div>
 <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
 {events.filter(e => e.date === selectedDate).length === 0 ? (
 <div className="flex flex-col items-center justify-center py-20 text-center h-full">
 <CalendarIcon size={48} className="text-white/10 mb-4"/>
 <h3 className="text-xl font-bold text-white">No events scheduled</h3>
 <p className="text-[#9CA3AF] text-sm mt-1">You have a clear calendar for this date.</p>
 <button onClick={() => setShowAddEventModal(true)} className="mt-6 px-4 py-2 bg-white/5 text-white text-xs font-bold rounded-lg hover:bg-white/10 transition-colors">Book an Event</button>
 </div>
 ) : events.filter(e => e.date === selectedDate).map(event => (
 <div key={event.id} className="group p-5 bg-[#05060A] border border-white/5 hover:border-[#F5A800]/40 rounded-2xl flex items-start gap-5 transition-all relative overflow-hidden">
 <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F5A800] to-purple-500" />
 <div className="w-16 shrink-0 text-center mt-1">
 <div className="text-sm font-black text-white">{event.time.split(' ')[0]}</div>
 <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{event.time.split(' ')[1]}</div>
 </div>
 <div className="flex-1">
 <div className="flex justify-between items-start mb-2">
 <h3 className="font-bold text-white text-lg group-hover:text-[#F5A800] transition-colors">{event.title}</h3>
 <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${event.type === 'Demo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : event.type === 'Deadline' ? 'bg-red-500/10 text-red-400 border-red-500/20' : event.type === 'Meeting' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>{event.type}</span>
 </div>
 <div className="flex flex-wrap gap-2 mb-4">
 {event.attendees.map(a => (
 <div key={a} className="flex items-center gap-1.5 text-xs text-[#9CA3AF] bg-white/5 px-2 py-1 rounded-md border border-white/5"><Users size={12}/> {a}</div>
 ))}
 </div>
 <div className="flex items-center justify-between border-t border-white/5 pt-4">
 {event.link ? (
 <a href="#" className="text-xs font-bold text-white bg-[#F5A800] hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"><Globe size={14}/> Join Meeting</a>
 ) : (
 <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest flex items-center gap-1"><Building2 size={12}/> In-Person / Internal</span>
 )}
 <button onClick={() => {
 setEvents(events.filter(e => e.id !== event.id));
 setNotifications([{ id: Date.now(), title: 'Event Cancelled', message: `${event.title} was removed from your schedule.`, time: 'Just now', read: false, icon: Trash2 }, ...notifications]);
 }} className="w-8 h-8 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 transition-all flex items-center justify-center"><Trash2 size={14}/></button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Add Event Modal Overlay */}
 <AnimatePresence>
 {showAddEventModal && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
 <button onClick={() => setShowAddEventModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"><X size={20}/></button>
 <h2 className="text-xl font-black text-white mb-6">Schedule New Event</h2>
 <form onSubmit={(e) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 setEvents([{
 id: Date.now().toString(),
 title: formData.get('title') as string,
 type: formData.get('type') as EventType,
 date: selectedDate,
 time: formData.get('time') as string,
 attendees: ['Yonas B.', formData.get('attendee') as string]
 }, ...events]);
 setShowAddEventModal(false);
 setNotifications([{ id: Date.now(), title: 'Event Scheduled', message: `Added to ${selectedDate}.`, time: 'Just now', read: false, icon: CalendarIcon }, ...notifications]);
 }} className="space-y-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Event Title</label><input name="title" required placeholder="e.g. Q4 Pitch" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div className="grid grid-cols-2 gap-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Time</label><input name="time" required defaultValue="10:00 AM" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Type</label><select name="type" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] appearance-none"><option>Demo</option><option>Meeting</option><option>Internal</option><option>Deadline</option></select></div>
 </div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">External Attendee</label><input name="attendee" placeholder="Client Name" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <button type="submit" className="w-full py-3 bg-[#F5A800] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-colors mt-4 ">Save Event</button>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </motion.div>
 )}

 {/* === 8. COMPANIES === */}
 {activeTab === 'companies' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-7xl mx-auto">
 <div className="flex items-center justify-between mb-4 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Corporate Accounts</h1><p className="text-[#9CA3AF] text-sm mt-1">Manage B2B relationships, accounts, and firmographics.</p></div>
 <div className="flex gap-3">
 <div className="bg-[#111827] border border-white/5 rounded-xl flex items-center px-4 w-64">
 <Search size={16} className="text-[#9CA3AF]" />
 <input type="text" value={companySearch} onChange={e=>setCompanySearch(e.target.value)} placeholder="Search accounts..." className="bg-transparent border-none text-white text-sm focus:outline-none w-full py-2.5 px-3" />
 </div>
 <button onClick={() => setShowAddCompanyModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"><Plus size={16} /> Add Account</button>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto custom-scrollbar pb-8">
 {companies.filter(c => c.name.toLowerCase().includes(companySearch.toLowerCase()) || c.industry.toLowerCase().includes(companySearch.toLowerCase())).map(company => (
 <div key={company.id} className="group bg-[#111827] border border-white/5 hover:border-[#F5A800]/40 rounded-[24px] p-6 transition-all relative overflow-hidden flex flex-col h-full">
 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5A800] to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
 <div className="flex justify-between items-start mb-4">
 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5A800]/20 to-[#111827] border border-[#F5A800]/30 flex items-center justify-center font-black text-lg text-[#F5A800] ">{company.name.substring(0, 2).toUpperCase()}</div>
 <div className="flex flex-col items-end gap-2">
 <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${company.status === 'Active Client' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : company.status === 'Prospect' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>{company.status}</span>
 <button onClick={() => {
 setCompanies(companies.filter(c => c.id !== company.id));
 setNotifications([{ id: Date.now(), title: 'Account Deleted', message: `${company.name} has been removed.`, time: 'Just now', read: false, icon: Trash2 }, ...notifications]);
 }} className="text-[#9CA3AF] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14}/></button>
 </div>
 </div>
 <h3 className="font-bold text-white text-xl mb-1">{company.name}</h3>
 <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="text-xs text-[#F5A800] hover:underline mb-4 flex items-center gap-1"><Globe size={12}/> {company.website}</a>
 
 <div className="space-y-3 mt-auto">
 <div className="flex items-center justify-between text-xs">
 <span className="text-[#9CA3AF] flex items-center gap-1.5"><Briefcase size={14}/> Industry</span>
 <span className="font-bold text-white">{company.industry}</span>
 </div>
 <div className="flex items-center justify-between text-xs">
 <span className="text-[#9CA3AF] flex items-center gap-1.5"><Users size={14}/> Employees</span>
 <span className="font-bold text-white">{company.employees}</span>
 </div>
 <div className="flex items-center justify-between text-xs">
 <span className="text-[#9CA3AF] flex items-center gap-1.5"><Globe size={14}/> Location</span>
 <span className="font-bold text-white">{company.location}</span>
 </div>
 <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5 mt-3">
 <span className="text-[#9CA3AF] font-bold">Annual Rev.</span>
 <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">${(company.revenue / 1000000).toFixed(1)}M</span>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Add Company Modal Overlay */}
 <AnimatePresence>
 {showAddCompanyModal && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
 <button onClick={() => setShowAddCompanyModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"><X size={20}/></button>
 <h2 className="text-xl font-black text-white mb-6">Add Corporate Account</h2>
 <form onSubmit={(e) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 setCompanies([{
 id: Date.now().toString(),
 name: formData.get('name') as string,
 industry: formData.get('industry') as CompanyIndustry,
 website: formData.get('website') as string,
 employees: formData.get('employees') as string,
 revenue: Number(formData.get('revenue')) * 1000000,
 status: 'Prospect',
 location: formData.get('location') as string
 }, ...companies]);
 setShowAddCompanyModal(false);
 setNotifications([{ id: Date.now(), title: 'Account Created', message: `${formData.get('name')} added.`, time: 'Just now', read: false, icon: Building2 }, ...notifications]);
 }} className="space-y-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Company Name</label><input name="name" required placeholder="e.g. Acme Corp" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div className="grid grid-cols-2 gap-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Industry</label><select name="industry" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] appearance-none"><option>Technology</option><option>Finance</option><option>Healthcare</option><option>Logistics</option><option>Retail</option><option>Other</option></select></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Website</label><input name="website" placeholder="acme.com" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Employees</label><select name="employees" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] appearance-none"><option>1-10</option><option>11-50</option><option>50-200</option><option>200-1000</option><option>1000+</option></select></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Revenue ($ Millions)</label><input name="revenue" type="number" required placeholder="e.g. 5" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 </div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">HQ Location</label><input name="location" placeholder="City, Country" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <button type="submit" className="w-full py-3 bg-[#F5A800] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-colors mt-4 ">Create Account</button>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </motion.div>
 )}

 {/* === 9. CAMPAIGNS === */}
 {activeTab === 'campaigns' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-7xl mx-auto">
 <div className="flex items-center justify-between mb-2 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Marketing Campaigns</h1><p className="text-[#9CA3AF] text-sm mt-1">Track ad spend, ROI, and channel performance in real-time.</p></div>
 <button onClick={() => setShowAddCampaignModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"><Megaphone size={16} /> Launch Campaign</button>
 </div>

 {/* Campaign Aggregates */}
 <div className="grid grid-cols-4 gap-6 shrink-0">
 {[
 { label: 'Total Budget', value: `$${campaigns.reduce((a,b)=>a+b.budget,0).toLocaleString()}`, color: 'text-white' },
 { label: 'Total Ad Spend', value: `$${campaigns.reduce((a,b)=>a+b.spend,0).toLocaleString()}`, color: 'text-amber-400' },
 { label: 'Total Conversions', value: campaigns.reduce((a,b)=>a+b.conversions,0).toLocaleString(), color: 'text-emerald-400' },
 { label: 'Avg. Cost Per Conv.', value: `$${(campaigns.reduce((a,b)=>a+b.spend,0) / (campaigns.reduce((a,b)=>a+b.conversions,0) || 1)).toFixed(2)}`, color: 'text-[#F5A800]' }
 ].map(stat => (
 <div key={stat.label} className="bg-[#111827] border border-white/5 p-6 rounded-[24px] ">
 <div className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-2">{stat.label}</div>
 <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
 </div>
 ))}
 </div>

 {/* Campaigns List */}
 <div className="bg-[#111827] border border-white/5 rounded-[24px] overflow-hidden flex-1 flex flex-col min-h-[400px]">
 <div className="flex-1 overflow-y-auto custom-scrollbar relative">
 <table className="w-full text-left relative">
 <thead className="bg-[#05060A]/95 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#6B7280] font-black border-b border-white/10 sticky top-0 z-10">
 <tr><th className="p-5 pl-6">Campaign & Platform</th><th className="p-5">Status</th><th className="p-5">Budget Utilization</th><th className="p-5">Impressions</th><th className="p-5">Conversions</th><th className="p-5 text-right pr-6">Actions</th></tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {campaigns.map(camp => (
 <tr key={camp.id} className="hover:bg-white/[0.03] transition-colors group">
 <td className="p-5 pl-6">
 <div className="flex items-center gap-4">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${camp.platform === 'LinkedIn' ? 'bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/30' : camp.platform === 'Google Ads' ? 'bg-[#EA4335]/20 text-[#EA4335] border border-[#EA4335]/30' : camp.platform === 'Facebook' ? 'bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>
 {camp.platform === 'Email' ? <Mail size={18}/> : <Globe size={18}/>}
 </div>
 <div>
 <div className="font-bold text-white text-sm">{camp.name}</div>
 <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{camp.platform}</div>
 </div>
 </div>
 </td>
 <td className="p-5">
 <select 
 value={camp.status} 
 onChange={(e) => {
 setCampaigns(campaigns.map(c => c.id === camp.id ? {...c, status: e.target.value as CampaignStatus} : c));
 setNotifications([{ id: Date.now(), title: 'Campaign Updated', message: `${camp.name} is now ${e.target.value}.`, time: 'Just now', read: false, icon: Megaphone }, ...notifications]);
 }}
 className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none appearance-none cursor-pointer transition-colors ${camp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : camp.status === 'Paused' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : camp.status === 'Draft' ? 'bg-white/5 text-[#9CA3AF] border-white/20' : 'bg-[#F5A800]/10 text-[#F5A800] border-[#F5A800]/30'}`}
 >
 <option className="bg-[#05060A] text-white">Active</option><option className="bg-[#05060A] text-white">Paused</option><option className="bg-[#05060A] text-white">Draft</option><option className="bg-[#05060A] text-white">Completed</option>
 </select>
 </td>
 <td className="p-5 w-64">
 <div className="flex justify-between text-xs font-mono mb-1">
 <span className="text-white">${camp.spend.toLocaleString()}</span>
 <span className="text-[#9CA3AF]">${camp.budget.toLocaleString()}</span>
 </div>
 <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
 <div className="h-full bg-gradient-to-r from-[#F5A800] to-purple-500" style={{ width: `${Math.min(100, (camp.spend / camp.budget) * 100)}%` }} />
 </div>
 </td>
 <td className="p-5 font-mono text-sm text-white">{camp.impressions.toLocaleString()}</td>
 <td className="p-5">
 <div className="font-mono text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded inline-block border border-emerald-500/20">{camp.conversions.toLocaleString()}</div>
 </td>
 <td className="p-5 text-right pr-6">
 <button onClick={() => setCampaigns(campaigns.filter(c => c.id !== camp.id))} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 transition-all ml-auto"><Trash2 size={14}/></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 {campaigns.length === 0 && (
 <div className="flex flex-col items-center justify-center py-20 text-center absolute inset-0">
 <Megaphone size={48} className="text-white/10 mb-4"/>
 <h3 className="text-xl font-bold text-white">No Campaigns</h3>
 <p className="text-[#9CA3AF] text-sm mt-1">Launch your first marketing campaign to see metrics.</p>
 </div>
 )}
 </div>
 </div>

 {/* Add Campaign Modal Overlay */}
 <AnimatePresence>
 {showAddCampaignModal && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
 <button onClick={() => setShowAddCampaignModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"><X size={20}/></button>
 <h2 className="text-xl font-black text-white mb-6">Launch New Campaign</h2>
 <form onSubmit={(e) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 setCampaigns([{
 id: Date.now().toString(),
 name: formData.get('name') as string,
 platform: formData.get('platform') as CampaignPlatform,
 status: 'Draft',
 budget: Number(formData.get('budget')),
 spend: 0, impressions: 0, clicks: 0, conversions: 0
 }, ...campaigns]);
 setShowAddCampaignModal(false);
 setNotifications([{ id: Date.now(), title: 'Campaign Drafted', message: `${formData.get('name')} created successfully.`, time: 'Just now', read: false, icon: Megaphone }, ...notifications]);
 }} className="space-y-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Campaign Name</label><input name="name" required placeholder="e.g. Q1 Growth Initiatives" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Platform</label><select name="platform" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] appearance-none"><option>Google Ads</option><option>LinkedIn</option><option>Facebook</option><option>Email</option></select></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Total Budget ($)</label><input name="budget" type="number" required placeholder="e.g. 5000" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <button type="submit" className="w-full py-3 bg-[#F5A800] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-colors mt-4 ">Create Campaign</button>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </motion.div>
 )}

 {/* === 10. SUPPORT TICKETS === */}
 {activeTab === 'support' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-7xl mx-auto">
 <div className="flex items-center justify-between mb-2 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Helpdesk & Support</h1><p className="text-[#9CA3AF] text-sm mt-1">Manage client requests, bug reports, and communications.</p></div>
 <button onClick={() => setShowAddTicketModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"><Plus size={16} /> New Ticket</button>
 </div>

 <div className="flex gap-6 flex-1 overflow-hidden">
 {/* Inbox Column */}
 <div className="w-[380px] shrink-0 bg-[#111827] border border-white/5 rounded-[24px] flex flex-col overflow-hidden">
 <div className="p-5 border-b border-white/5 bg-[#0A0F1C]">
 <div className="flex items-center justify-between mb-4">
 <h3 className="font-black text-white">Inbox</h3>
 <span className="text-[10px] font-black uppercase tracking-widest bg-[#F5A800]/20 text-[#F5A800] px-2 py-1 rounded-md border border-[#F5A800]/30">{tickets.filter(t => t.status !== 'Resolved').length} Open</span>
 </div>
 <div className="bg-[#05060A] border border-white/10 rounded-xl flex items-center px-3 ">
 <Search size={14} className="text-[#9CA3AF]" />
 <input type="text" placeholder="Search tickets..." className="bg-transparent border-none text-white text-xs focus:outline-none w-full py-2 px-2" />
 </div>
 </div>
 <div className="flex-1 overflow-y-auto custom-scrollbar">
 {tickets.map(ticket => (
 <button key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)} className={`w-full text-left p-5 border-b border-white/5 transition-all hover:bg-white/[0.02] ${selectedTicketId === ticket.id ? 'bg-white/[0.04] border-l-4 border-l-[#F5A800]' : 'border-l-4 border-l-transparent'}`}>
 <div className="flex justify-between items-start mb-2">
 <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${ticket.status === 'Open' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ticket.status === 'Pending' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{ticket.status}</span>
 <span className="text-[10px] text-[#6B7280] font-bold">{ticket.createdAt}</span>
 </div>
 <h4 className="font-bold text-white text-sm truncate mb-1">{ticket.subject}</h4>
 <div className="text-xs text-[#9CA3AF] truncate flex items-center gap-1.5"><Building2 size={12}/> {ticket.company}</div>
 </button>
 ))}
 </div>
 </div>

 {/* Ticket Detail / Chat Column */}
 {tickets.find(t => t.id === selectedTicketId) ? (
 <div className="flex-1 bg-[#111827] border border-white/5 rounded-[24px] flex flex-col overflow-hidden relative">
 {(() => {
 const ticket = tickets.find(t => t.id === selectedTicketId)!;
 return (
 <>
 <div className="p-6 border-b border-white/5 bg-[#0A0F1C] flex items-start justify-between shrink-0">
 <div>
 <h2 className="text-xl font-black text-white mb-2">{ticket.subject}</h2>
 <div className="flex items-center gap-4 text-xs font-bold text-[#9CA3AF]">
 <span className="flex items-center gap-1.5"><Users size={14}/> {ticket.requestor}</span>
 <span className="flex items-center gap-1.5"><Building2 size={14}/> {ticket.company}</span>
 <span className={`flex items-center gap-1.5 ${ticket.priority === 'High' || ticket.priority === 'Critical' ? 'text-red-400' : ''}`}><AlertCircle size={14}/> Priority: {ticket.priority}</span>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <select 
 value={ticket.status} 
 onChange={(e) => setTickets(tickets.map(t => t.id === ticket.id ? {...t, status: e.target.value as TicketStatus} : t))}
 className="bg-[#05060A] border border-white/10 text-white text-xs font-bold px-3 py-2 rounded-lg outline-none cursor-pointer"
 >
 <option value="Open">Open</option><option value="Pending">Pending</option><option value="Resolved">Resolved</option>
 </select>
 <button onClick={() => {
 const newTickets = tickets.filter(t => t.id !== ticket.id);
 setTickets(newTickets);
 setSelectedTicketId(newTickets[0]?.id || '');
 setNotifications([{ id: Date.now(), title: 'Ticket Deleted', message: `Ticket removed.`, time: 'Just now', read: false, icon: Trash2 }, ...notifications]);
 }} className="w-9 h-9 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"><Trash2 size={16}/></button>
 </div>
 </div>
 
 <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
 {ticket.messages.map(msg => (
 <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
 <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'agent' ? 'bg-[#F5A800] text-white rounded-br-none ' : 'bg-[#05060A] border border-white/5 text-[#E5E7EB] rounded-bl-none '}`}>
 <div className="flex items-center gap-2 mb-2">
 <span className="font-black text-xs">{msg.name}</span>
 <span className={`text-[9px] uppercase tracking-widest ${msg.sender === 'agent' ? 'text-blue-200' : 'text-[#6B7280]'}`}>{msg.timestamp}</span>
 </div>
 <p className="text-sm leading-relaxed">{msg.text}</p>
 </div>
 </div>
 ))}
 </div>

 <div className="p-4 bg-[#0A0F1C] border-t border-white/5 shrink-0">
 <form onSubmit={(e) => {
 e.preventDefault();
 if(!ticketReply.trim()) return;
 setTickets(tickets.map(t => t.id === ticket.id ? {
 ...t, 
 status: 'Pending',
 messages: [...t.messages, { id: Date.now().toString(), sender: 'agent', name: 'Yonas B.', text: ticketReply, timestamp: 'Just now' }]
 } : t));
 setTicketReply('');
 }} className="flex items-end gap-3 relative">
 <textarea 
 value={ticketReply}
 onChange={(e) => setTicketReply(e.target.value)}
 placeholder="Type your reply here..." 
 className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] resize-none h-[80px] custom-scrollbar" 
 />
 <button type="submit" disabled={!ticketReply.trim()} className="absolute right-3 bottom-3 w-10 h-10 rounded-lg bg-[#F5A800] hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-[#F5A800] text-white flex items-center justify-center transition-colors "><Send size={16}/></button>
 </form>
 </div>
 </>
 );
 })()}
 </div>
 ) : (
 <div className="flex-1 bg-[#111827] border border-white/5 rounded-[24px] flex flex-col items-center justify-center text-center">
 <MessageSquare size={48} className="text-white/10 mb-4"/>
 <h3 className="text-xl font-bold text-white">No Ticket Selected</h3>
 <p className="text-[#9CA3AF] text-sm mt-1">Select a ticket from the inbox to view details.</p>
 </div>
 )}
 </div>

 {/* Add Ticket Modal */}
 <AnimatePresence>
 {showAddTicketModal && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
 <button onClick={() => setShowAddTicketModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"><X size={20}/></button>
 <h2 className="text-xl font-black text-white mb-6">Create Support Ticket</h2>
 <form onSubmit={(e) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 const newId = Date.now().toString();
 setTickets([{
 id: newId,
 subject: formData.get('subject') as string,
 requestor: formData.get('requestor') as string,
 company: formData.get('company') as string,
 priority: formData.get('priority') as TicketPriority,
 status: 'Open',
 createdAt: 'Just now',
 messages: [{ id: 'm1', sender: 'client', name: formData.get('requestor') as string, text: formData.get('message') as string, timestamp: 'Just now' }]
 }, ...tickets]);
 setSelectedTicketId(newId);
 setShowAddTicketModal(false);
 setNotifications([{ id: Date.now(), title: 'Ticket Created', message: `${formData.get('subject')} logged.`, time: 'Just now', read: false, icon: MessageSquare }, ...notifications]);
 }} className="space-y-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Subject</label><input name="subject" required placeholder="e.g. Login Issue" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div className="grid grid-cols-2 gap-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Requestor Name</label><input name="requestor" required placeholder="John Doe" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Company</label><input name="company" required placeholder="Acme Corp" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 </div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Priority</label><select name="priority" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] appearance-none"><option>Low</option><option>Normal</option><option>High</option><option>Critical</option></select></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Initial Message</label><textarea name="message" required placeholder="Describe the issue..." className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] h-24 resize-none" /></div>
 <button type="submit" className="w-full py-3 bg-[#F5A800] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-colors mt-4 ">Open Ticket</button>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </motion.div>
 )}

 {/* === 11. INVOICES === */}
 {activeTab === 'invoices' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-7xl mx-auto">
 <div className="flex items-center justify-between mb-2 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Billing & Invoices</h1><p className="text-[#9CA3AF] text-sm mt-1">Manage receivables, issue invoices, and track payments.</p></div>
 <div className="flex gap-3">
 <div className="bg-[#111827] border border-white/5 rounded-xl flex items-center px-4 w-64">
 <Search size={16} className="text-[#9CA3AF]" />
 <input type="text" value={invoiceSearch} onChange={e=>setInvoiceSearch(e.target.value)} placeholder="Search invoices..." className="bg-transparent border-none text-white text-sm focus:outline-none w-full py-2.5 px-3" />
 </div>
 <button onClick={() => setShowAddInvoiceModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"><Plus size={16} /> Create Invoice</button>
 </div>
 </div>

 {/* Financial Aggregates */}
 <div className="grid grid-cols-3 gap-6 shrink-0">
 {[
 { label: 'Total Paid', value: `$${invoices.filter(i=>i.status==='Paid').reduce((a,b)=>a+b.amount,0).toLocaleString()}`, color: 'text-emerald-400', icon: CheckCircle2 },
 { label: 'Total Pending', value: `$${invoices.filter(i=>i.status==='Pending').reduce((a,b)=>a+b.amount,0).toLocaleString()}`, color: 'text-amber-400', icon: Activity },
 { label: 'Total Overdue', value: `$${invoices.filter(i=>i.status==='Overdue').reduce((a,b)=>a+b.amount,0).toLocaleString()}`, color: 'text-red-400', icon: AlertCircle }
 ].map(stat => (
 <div key={stat.label} className="bg-[#111827] border border-white/5 p-6 rounded-[24px] flex items-center gap-5">
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${stat.color}`}><stat.icon size={24}/></div>
 <div>
 <div className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">{stat.label}</div>
 <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
 </div>
 </div>
 ))}
 </div>

 {/* Invoice List */}
 <div className="bg-[#111827] border border-white/5 rounded-[24px] overflow-hidden flex-1 flex flex-col min-h-[400px]">
 <div className="flex-1 overflow-y-auto custom-scrollbar relative">
 <table className="w-full text-left relative">
 <thead className="bg-[#05060A]/95 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#6B7280] font-black border-b border-white/10 sticky top-0 z-10">
 <tr><th className="p-5 pl-6">Invoice Number</th><th className="p-5">Client</th><th className="p-5">Amount</th><th className="p-5">Issue / Due Date</th><th className="p-5">Status</th><th className="p-5 text-right pr-6">Actions</th></tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {invoices.filter(inv => inv.invoiceNumber.toLowerCase().includes(invoiceSearch.toLowerCase()) || inv.clientName.toLowerCase().includes(invoiceSearch.toLowerCase())).map(invoice => (
 <tr key={invoice.id} className="hover:bg-white/[0.03] transition-colors group">
 <td className="p-5 pl-6">
 <div className="font-mono text-sm font-bold text-white flex items-center gap-2"><FileText size={14} className="text-[#F5A800]"/> {invoice.invoiceNumber}</div>
 </td>
 <td className="p-5">
 <div className="font-bold text-sm text-white flex items-center gap-2"><Building2 size={14} className="text-[#9CA3AF]"/> {invoice.clientName}</div>
 </td>
 <td className="p-5 font-mono text-sm font-black text-white">${invoice.amount.toLocaleString()}</td>
 <td className="p-5">
 <div className="text-xs text-white mb-1"><span className="text-[#9CA3AF] mr-2">Issued:</span> {invoice.issueDate}</div>
 <div className="text-xs text-white"><span className="text-[#9CA3AF] mr-2">Due:</span> {invoice.dueDate}</div>
 </td>
 <td className="p-5">
 <select 
 value={invoice.status} 
 onChange={(e) => {
 setInvoices(invoices.map(i => i.id === invoice.id ? {...i, status: e.target.value as InvoiceStatus} : i));
 setNotifications([{ id: Date.now(), title: 'Invoice Updated', message: `${invoice.invoiceNumber} is now ${e.target.value}.`, time: 'Just now', read: false, icon: FileText }, ...notifications]);
 }}
 className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none appearance-none cursor-pointer transition-colors ${invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : invoice.status === 'Overdue' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}
 >
 <option className="bg-[#05060A] text-white">Pending</option><option className="bg-[#05060A] text-white">Paid</option><option className="bg-[#05060A] text-white">Overdue</option>
 </select>
 </td>
 <td className="p-5 text-right pr-6 flex items-center justify-end gap-2">
 <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-[#F5A800] hover:bg-[#F5A800]/10 transition-all"><Download size={14}/></button>
 <button onClick={() => setInvoices(invoices.filter(i => i.id !== invoice.id))} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 transition-all"><Trash2 size={14}/></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 {invoices.length === 0 && (
 <div className="flex flex-col items-center justify-center py-20 text-center absolute inset-0">
 <FileText size={48} className="text-white/10 mb-4"/>
 <h3 className="text-xl font-bold text-white">No Invoices</h3>
 <p className="text-[#9CA3AF] text-sm mt-1">Create an invoice to start tracking payments.</p>
 </div>
 )}
 </div>
 </div>

 {/* Add Invoice Modal Overlay */}
 <AnimatePresence>
 {showAddInvoiceModal && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
 <button onClick={() => setShowAddInvoiceModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"><X size={20}/></button>
 <h2 className="text-xl font-black text-white mb-6">Create Invoice</h2>
 <form onSubmit={(e) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 const newInvoiceNumber = `INV-2026-00${invoices.length + 5}`;
 setInvoices([{
 id: Date.now().toString(),
 invoiceNumber: newInvoiceNumber,
 clientName: formData.get('clientName') as string,
 amount: Number(formData.get('amount')),
 issueDate: formData.get('issueDate') as string,
 dueDate: formData.get('dueDate') as string,
 status: 'Pending'
 }, ...invoices]);
 setShowAddInvoiceModal(false);
 setNotifications([{ id: Date.now(), title: 'Invoice Created', message: `${newInvoiceNumber} was generated successfully.`, time: 'Just now', read: false, icon: FileText }, ...notifications]);
 }} className="space-y-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Client Name</label><input name="clientName" required placeholder="e.g. Acme Corp" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Invoice Amount ($)</label><input name="amount" type="number" required placeholder="e.g. 1500" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div className="grid grid-cols-2 gap-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Issue Date</label><input name="issueDate" required defaultValue="Oct 25, 2026" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Due Date</label><input name="dueDate" required defaultValue="Nov 10, 2026" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 </div>
 <button type="submit" className="w-full py-3 bg-[#F5A800] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-colors mt-4 ">Generate Invoice</button>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </motion.div>
 )}

 {/* === 12. PAYMENTS === */}
 {activeTab === 'payments' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-7xl mx-auto">
 <div className="flex items-center justify-between mb-2 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Payments Ledger</h1><p className="text-[#9CA3AF] text-sm mt-1">Track inbound transactions, refunds, and revenue streams.</p></div>
 <div className="flex gap-3">
 <div className="bg-[#111827] border border-white/5 rounded-xl flex items-center px-4 w-64">
 <Search size={16} className="text-[#9CA3AF]" />
 <input type="text" value={paymentSearch} onChange={e=>setPaymentSearch(e.target.value)} placeholder="Search transactions..." className="bg-transparent border-none text-white text-sm focus:outline-none w-full py-2.5 px-3" />
 </div>
 <button onClick={() => setShowAddPaymentModal(true)} className="px-5 py-2.5 rounded-xl bg-[#F5A800] text-xs font-bold text-white flex items-center gap-2 hover:bg-blue-600 transition-colors"><Plus size={16} /> Record Payment</button>
 </div>
 </div>

 {/* Payment List */}
 <div className="bg-[#111827] border border-white/5 rounded-[24px] overflow-hidden flex-1 flex flex-col min-h-[400px]">
 <div className="flex-1 overflow-y-auto custom-scrollbar relative">
 <table className="w-full text-left relative">
 <thead className="bg-[#05060A]/95 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#6B7280] font-black border-b border-white/10 sticky top-0 z-10">
 <tr><th className="p-5 pl-6">Transaction ID</th><th className="p-5">Client</th><th className="p-5">Amount</th><th className="p-5">Method</th><th className="p-5">Date</th><th className="p-5">Status</th></tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {payments.filter(p => p.transactionId.toLowerCase().includes(paymentSearch.toLowerCase()) || p.clientName.toLowerCase().includes(paymentSearch.toLowerCase())).map(payment => (
 <tr key={payment.id} className="hover:bg-white/[0.03] transition-colors group">
 <td className="p-5 pl-6 font-mono text-sm font-bold text-[#9CA3AF]">{payment.transactionId}</td>
 <td className="p-5 font-bold text-sm text-white">{payment.clientName}</td>
 <td className="p-5 font-mono text-sm font-black text-emerald-400">${payment.amount.toLocaleString()}</td>
 <td className="p-5 text-xs text-[#9CA3AF] flex items-center gap-2"><CreditCard size={14}/> {payment.method}</td>
 <td className="p-5 text-xs text-white">{payment.date}</td>
 <td className="p-5">
 <select 
 value={payment.status} 
 onChange={(e) => {
 setPayments(payments.map(p => p.id === payment.id ? {...p, status: e.target.value as PaymentStatus} : p));
 setNotifications([{ id: Date.now(), title: 'Payment Status Updated', message: `${payment.transactionId} is now ${e.target.value}.`, time: 'Just now', read: false, icon: CreditCard }, ...notifications]);
 }}
 className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none appearance-none cursor-pointer transition-colors ${payment.status === 'Succeeded' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : payment.status === 'Failed' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}
 >
 <option className="bg-[#05060A] text-white">Succeeded</option><option className="bg-[#05060A] text-white">Processing</option><option className="bg-[#05060A] text-white">Failed</option>
 </select>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 {payments.length === 0 && (
 <div className="flex flex-col items-center justify-center py-20 text-center absolute inset-0">
 <CreditCard size={48} className="text-white/10 mb-4"/>
 <h3 className="text-xl font-bold text-white">No Payments Found</h3>
 <p className="text-[#9CA3AF] text-sm mt-1">Record a manual transaction to track revenue.</p>
 </div>
 )}
 </div>
 </div>

 {/* Add Payment Modal Overlay */}
 <AnimatePresence>
 {showAddPaymentModal && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
 <button onClick={() => setShowAddPaymentModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"><X size={20}/></button>
 <h2 className="text-xl font-black text-white mb-6">Record Manual Payment</h2>
 <form onSubmit={(e) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 const newTxn = `TXN-${Math.floor(Math.random() * 900000) + 100000}`;
 setPayments([{
 id: Date.now().toString(),
 transactionId: newTxn,
 clientName: formData.get('clientName') as string,
 amount: Number(formData.get('amount')),
 method: formData.get('method') as string,
 date: 'Just now',
 status: 'Succeeded'
 }, ...payments]);
 setShowAddPaymentModal(false);
 setNotifications([{ id: Date.now(), title: 'Payment Recorded', message: `${newTxn} added successfully.`, time: 'Just now', read: false, icon: CreditCard }, ...notifications]);
 }} className="space-y-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Client Name</label><input name="clientName" required placeholder="e.g. Acme Corp" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div className="grid grid-cols-2 gap-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Amount ($)</label><input name="amount" type="number" required placeholder="e.g. 1500" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800]" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">Method</label><select name="method" className="w-full bg-[#05060A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F5A800] appearance-none"><option>Wire Transfer</option><option>Credit Card</option><option>Stripe</option><option>PayPal</option></select></div>
 </div>
 <button type="submit" className="w-full py-3 bg-[#F5A800] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-colors mt-4 ">Process Payment</button>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </motion.div>
 )}

 {/* === 13. REPORTS === */}
 {activeTab === 'reports' && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10 h-full flex flex-col max-w-7xl mx-auto overflow-y-auto custom-scrollbar pb-10">
 <div className="flex items-center justify-between mb-2 shrink-0">
 <div><h1 className="text-3xl font-black text-white tracking-tight">Analytics & Reports</h1><p className="text-[#9CA3AF] text-sm mt-1">Visualize growth metrics, team performance, and pipeline health.</p></div>
 <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center gap-2 hover:bg-white/10 transition-colors"><Download size={16} /> Export PDF</button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Revenue Chart (CSS Based) */}
 <div className="bg-[#111827] border border-white/5 p-6 rounded-[24px] ">
 <h3 className="font-black text-white mb-6">Monthly Recurring Revenue (Q3 - Q4)</h3>
 <div className="flex items-end gap-2 h-48 mt-8">
 {[
 { label: 'Jul', height: '40%', val: '$45k' },
 { label: 'Aug', height: '55%', val: '$60k' },
 { label: 'Sep', height: '70%', val: '$85k' },
 { label: 'Oct', height: '100%', val: '$120k' },
 { label: 'Nov', height: '80%', val: 'Proj.' },
 { label: 'Dec', height: '90%', val: 'Proj.' }
 ].map(bar => (
 <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 group">
 <span className="text-[10px] font-bold text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}</span>
 <div className="w-full bg-gradient-to-t from-[#F5A800]/20 to-[#F5A800] rounded-t-lg transition-all hover:brightness-125" style={{ height: bar.height }} />
 <span className="text-xs font-bold text-[#6B7280]">{bar.label}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Lead Sources */}
 <div className="bg-[#111827] border border-white/5 p-6 rounded-[24px] ">
 <h3 className="font-black text-white mb-6">Acquisition Channels</h3>
 <div className="space-y-4">
 {[
 { label: 'Organic Search', percent: 45, color: 'from-emerald-500 to-emerald-400' },
 { label: 'Direct Traffic', percent: 25, color: 'from-[#F5A800] to-blue-400' },
 { label: 'Social Media', percent: 20, color: 'from-purple-500 to-purple-400' },
 { label: 'Referrals', percent: 10, color: 'from-amber-500 to-amber-400' }].map(source => (
 <div key={source.label}>
 <div className="flex justify-between text-xs font-bold mb-2">
 <span className="text-white">{source.label}</span>
 <span className="text-[#9CA3AF]">{source.percent}%</span>
 </div>
 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
 <div className={`h-full bg-gradient-to-r ${source.color} rounded-full`} style={{ width: `${source.percent}%` }} />
 </div>
 </div>
 ))}
 </div>
 </div>
 
 {/* Team Leaderboard */}
 <div className="bg-[#111827] border border-white/5 p-6 rounded-[24px] lg:col-span-2">
 <h3 className="font-black text-white mb-6 flex items-center gap-2"><Trophy size={18} className="text-amber-400"/> Sales Leaderboard</h3>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 {teamMembers.map((member, i) => (
 <div key={member.id} className="bg-[#05060A] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
 {i === 0 && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />}
 <div className="flex justify-between items-start mb-4">
 <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center font-black text-white `}>{member.name.substring(0, 2)}</div>
 <span className="text-2xl font-black text-white/20">#{i + 1}</span>
 </div>
 <h4 className="font-bold text-white mb-1">{member.name}</h4>
 <p className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold mb-4">{member.role}</p>
 <div className="flex justify-between items-center text-sm font-mono border-t border-white/5 pt-4">
 <span className="text-[#6B7280]">Closed Rev</span>
 <span className="text-emerald-400 font-black">${member.closed.toLocaleString()}</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </motion.div>
 )}

 {/* FALLBACK FOR UNIMPLEMENTED TABS */}
 {['automation'].includes(activeTab) && (
 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-[60vh] text-center relative z-10">
 <h1 className="text-3xl font-black text-white tracking-tight capitalize mb-2">{activeTab.replace('-', ' ')} Module</h1>
 <p className="text-[#9CA3AF] text-sm max-w-md">Return to a primary module (Dashboard, Deals, Tasks, AI Tools, Settings) to see functionality.</p>
 </motion.div>
 )}

 </div>
 </div>

 {/* Slide-over Deal Details Panel */}
 <AnimatePresence>
 {selectedDeal && (
 <>
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDeal(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
 <motion.div initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0A0F1C] border-l border-white/10 z-[250] flex flex-col">
 <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111827]">
 <button onClick={() => setSelectedDeal(null)} className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF] hover:text-white transition-colors"><ChevronLeft size={16} /> Back to Pipeline</button>
 {selectedDeal.status !== 'Closed Won' && (
 <button onClick={() => handleCloseDeal(selectedDeal.id)} className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"><Check size={14}/> Mark as Won</button>
 )}
 </div>
 <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
 <div className="mb-8"><div className="w-16 h-16 rounded-2xl bg-[#F5A800]/20 text-[#F5A800] flex items-center justify-center font-black text-2xl mb-4 border border-[#F5A800]/30">{selectedDeal.company[0]}</div><h2 className="text-3xl font-black text-white tracking-tight">{selectedDeal.company}</h2><p className="text-[#9CA3AF] text-sm flex items-center gap-2 mt-1"><Users size={14}/> {selectedDeal.name}</p></div>
 <div className="grid grid-cols-2 gap-4 mb-8">
 <div className="bg-[#05060A] border border-white/5 p-4 rounded-2xl"><p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-black mb-1">Deal Value</p><p className="text-xl font-mono font-black text-white">${selectedDeal.value.toLocaleString()}</p></div>
 <div className="bg-[#05060A] border border-white/5 p-4 rounded-2xl"><p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-black mb-1">Current Stage</p><span className="text-[10px] font-black uppercase tracking-widest text-[#F5A800] bg-[#F5A800]/10 px-2 py-1 rounded">{selectedDeal.status}</span></div>
 </div>
 <div className="p-6 bg-gradient-to-br from-purple-900/20 to-[#05060A] border border-purple-500/20 rounded-[24px] mb-8">
 <div className="flex items-center gap-2 mb-4"><BrainCircuit size={18} className="text-purple-400"/><h3 className="font-bold text-white">AI Deal Intelligence</h3></div>
 <div className="flex items-end gap-3 mb-4"><span className="text-4xl font-black text-emerald-400">{selectedDeal.score}%</span><span className="text-xs text-[#9CA3AF] mb-1 font-bold uppercase tracking-wider">Win Probability</span></div>
 <div className="space-y-2">
 <div className="text-xs text-[#9CA3AF] flex items-start gap-2"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/> Strong email engagement history.</div>
 <div className="text-xs text-[#9CA3AF] flex items-start gap-2"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/> Budget matches pricing tier.</div>
 </div>
 </div>
 <div>
 <h3 className="font-bold text-white mb-4">Contact Information</h3>
 <div className="space-y-3">
 <div className="flex items-center gap-3 p-3 bg-[#111827] rounded-xl border border-white/5"><Mail size={16} className="text-[#6B7280]"/><span className="text-sm text-white">{selectedDeal.email}</span></div>
 <div className="flex items-center gap-3 p-3 bg-[#111827] rounded-xl border border-white/5"><Phone size={16} className="text-[#6B7280]"/><span className="text-sm text-white">{selectedDeal.phone}</span></div>
 </div>
 </div>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>

 {/* AI Analysis Scanner Modal */}
 <AnimatePresence>
 {showAnalysisModal && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
 <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-2xl bg-[#0A0F1C] border border-emerald-500/30 rounded-[32px] overflow-hidden ">
 <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-emerald-900/20 to-[#111827]">
 <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2"><BrainCircuit size={18} className="text-emerald-400"/> AI Sales Predictor</h2>
 <button onClick={() => setShowAnalysisModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors"><X size={16} /></button>
 </div>
 <div className="p-10">
 {analysisState === 'scanning' ? (
 <div className="flex flex-col items-center justify-center py-16">
 <div className="relative mb-6">
 <ScanSearch size={64} className="text-emerald-500 animate-pulse" />
 <div className="absolute inset-0 border-t-2 border-emerald-400 animate-spin rounded-full"></div>
 </div>
 <p className="text-emerald-400 text-sm font-black uppercase tracking-widest animate-pulse">Analyzing 50+ Data Points...</p>
 <div className="mt-4 flex gap-2">
 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
 </div>
 </div>
 ) : (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
 <div className="text-center mb-8"><h3 className="text-3xl font-black text-white mb-2">Alpha Logistics</h3><p className="text-[#9CA3AF]">Conversion Probability Assessment</p></div>
 <div className="flex justify-center mb-8"><div className="w-40 h-40 rounded-full border-8 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center relative"><span className="text-5xl font-black text-emerald-400">94%</span></div></div>
 <div className="bg-[#05060A] border border-white/5 rounded-2xl p-6">
 <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest text-[#6B7280]">Key Intent Signals</h4>
 <ul className="space-y-3">
 <li className="flex items-center gap-3 text-sm text-[#9CA3AF]"><CheckCircle2 size={16} className="text-emerald-400 shrink-0"/> Extremely high email engagement</li>
 <li className="flex items-center gap-3 text-sm text-[#9CA3AF]"><CheckCircle2 size={16} className="text-emerald-400 shrink-0"/> Frequent pricing page visits</li>
 </ul>
 </div>
 <div className="pt-4 flex justify-between items-center border-t border-white/5">
 <p className="text-xs text-emerald-400 font-bold"><span className="bg-emerald-500/10 px-2 py-1 rounded mr-2">Action</span>Schedule demo call immediately.</p>
 <button onClick={() => setShowAnalysisModal(false)} className="px-6 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-600 transition-colors ">Acknowledge</button>
 </div>
 </motion.div>
 )}
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Add Lead Modal */}
 <AnimatePresence>
 {showAddLeadModal && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
 <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-md bg-[#0A0F1C] border border-white/10 rounded-[32px] overflow-hidden ">
 <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111827]">
 <h2 className="text-xl font-black text-white tracking-tight">Add New Lead</h2>
 <button onClick={() => setShowAddLeadModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors"><X size={16} /></button>
 </div>
 <form onSubmit={handleAddLead} className="p-6 space-y-5">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Contact Name *</label><input required value={newLead.name || ''} onChange={e => setNewLead({...newLead, name: e.target.value})} type="text" className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none" placeholder="John Doe" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Company Name *</label><input required value={newLead.company || ''} onChange={e => setNewLead({...newLead, company: e.target.value})} type="text" className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none" placeholder="Acme Corp" /></div>
 <div className="grid grid-cols-2 gap-4">
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Deal Value ($)</label><input type="number" value={newLead.value || ''} onChange={e => setNewLead({...newLead, value: Number(e.target.value)})} className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-[#F5A800] outline-none" placeholder="10000" /></div>
 <div><label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Stage</label><select value={newLead.status} onChange={e => setNewLead({...newLead, status: e.target.value as LeadStatus})} className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F5A800] outline-none appearance-none">{STAGES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
 </div>
 <button type="submit" className="w-full py-3.5 mt-4 rounded-xl bg-[#F5A800] text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all ">Save Lead</button>
 </form>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* AI Email Draft Modal */}
 <AnimatePresence>
 {showAIModal && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
 <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-2xl bg-[#0A0F1C] border border-purple-500/30 rounded-[32px] overflow-hidden ">
 <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-purple-900/20 to-[#111827]">
 <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2"><Sparkles size={18} className="text-purple-400"/> AI Email Generator</h2>
 <button onClick={() => setShowAIModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors"><X size={16} /></button>
 </div>
 <div className="p-8">
 {aiState === 'generating' ? (
 <div className="flex flex-col items-center justify-center py-12">
 <RefreshCw size={40} className="text-purple-500 animate-spin mb-4" />
 <p className="text-[#9CA3AF] text-sm font-bold animate-pulse">Generating personalized copy...</p>
 </div>
 ) : (
 <div className="space-y-4">
 <textarea 
 value={aiResult} 
 onChange={(e)=>setAiResult(e.target.value)} 
 className="w-full h-48 bg-[#05060A] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-purple-500 outline-none leading-relaxed resize-none custom-scrollbar" 
 />
 <div className="flex justify-end gap-3 pt-4">
 <button onClick={() => setShowAIModal(false)} className="px-5 py-2.5 text-xs font-bold text-[#9CA3AF] hover:text-white transition-colors">Cancel</button>
 <button onClick={() => { setShowAIModal(false); setNotifications([{id: Date.now(), title: 'Email Sent', message: 'Your AI drafted email has been scheduled for delivery.', time: 'Just now', read: false, icon: Mail}, ...notifications])}} className="px-6 py-2.5 rounded-xl bg-purple-600 text-xs font-bold text-white hover:bg-purple-700 transition-colors flex items-center gap-2">
 <Mail size={14}/> Send Email
 </button>
 </div>
 </div>
 )}
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 <style>{`
 .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
 .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
 .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
 .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(245, 168, 0, 0.5); }
 `}</style>
 </div>
 );
};

export default CRMSystem;
