import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { jobs as initialJobs } from '../constants/jobs';

// Initial Team Data
import yonasImg from '../assets/yonas.jpg';
import sarahImg from '../assets/sarah_chen_cto_1777103047415.png';
import davidImg from '../assets/david_wilson_engineering_1777103084810.png';

// LinkedIn profile pics downloaded to assets
import amadouLinkedin from '../assets/linkedin_amadou_daffe.jpg';
import redietLinkedin from '../assets/linkedin_rediet_tsigeberhan.jpg';

const initialTeam = [
 { id: '1', name: 'Yonas Bogale', role: 'Founder & CEO', bio: 'Visionary leader with 12+ years in tech and business strategy across two continents.', img: yonasImg },
 { id: '2', name: 'Sarah Chen', role: 'CTO', bio: 'Expert in scalable architectures, cloud systems, and AI solutions.', img: sarahImg },
 { id: '3', name: 'David Wilson', role: 'Head of Engineering', bio: 'Specializes in secure software development and system design.', img: davidImg },

 // ── Ethiopian Cybersecurity Lead ──
 { id: '4', name: 'Betelhem Tadele', role: 'Head of Cybersecurity', bio: 'Ethiopian cybersecurity expert safeguarding critical digital infrastructure and enterprise systems across Africa.', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400' },

 // ── Ethiopian Engineering & Development Team ──
 { id: '5', name: 'Meron Tekle', role: 'Senior Full-Stack Engineer', bio: 'Architects end-to-end web applications with React, Node.js, and distributed backend systems.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
 { id: '6', name: 'Henok Berhanu', role: 'Frontend Lead', bio: 'Builds high-performance UI systems using React, TypeScript, and modern design frameworks.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400' },
 { id: '7', name: 'Selam Woldemariam', role: 'AI/ML Engineer', bio: 'Develops NLP and computer vision models tailored for Ethiopian languages and African market use cases.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
 { id: '8', name: 'Abel Tesfaye', role: 'DevOps & Cloud Lead', bio: 'Designs CI/CD pipelines, Kubernetes clusters, and multi-cloud infrastructure for high-availability systems.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
 { id: '9', name: 'Tsion Gebremedhin', role: 'Backend Engineer', bio: 'Builds scalable microservices and APIs using Golang, Python, and event-driven architectures.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
 { id: '10', name: 'Dawit Habte', role: 'Security Engineer', bio: 'Conducts penetration testing, vulnerability assessments, and compliance audits for enterprise clients.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
 { id: '11', name: 'Bereket Tadesse', role: 'Mobile Developer', bio: 'Creates cross-platform mobile applications with React Native and Flutter for iOS and Android.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }];

const initialTestimonials = [
 { id: '1', content: "At Nexyovi, we don't just build software — we build the infrastructure that powers organizations across Africa and beyond. Every project we take on is a commitment to excellence, security, and real impact. Our team of 50+ engineers across Ethiopia, Kenya, and the US is redefining what African tech can achieve on the global stage.", author: "Yonas Bogale", role: "Founder & CEO, Nexyovi", img: yonasImg, linkedin: "https://www.linkedin.com/in/yonas-bogale" },
 { id: '2', content: "They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. Our time-to-market dropped from 12 months to 4. Gebeya's partnership with Nexyovi has been transformative for our pan-African expansion.", author: "Amadou Daffe", role: "CEO & Co-Founder, Gebeya", img: amadouLinkedin, linkedin: "https://et.linkedin.com/in/amadoudaffe" },
 { id: '3', content: "Our last-mile delivery network was struggling with route optimization across Addis. They built a custom dispatch system that cut delivery times by 40% within the first month. Real Ethiopian engineering that works on the ground.", author: "Tigabu Haile", role: "Founder & CEO, Eshi Express", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/tigabuhaile" },
 { id: '4', content: "We needed a secure payment gateway that could handle Ethiopia's unique banking landscape. Nexyovi built it in eight weeks — integrating with four banks and processing live transactions on day one. They understand local infrastructure better than any international firm we've worked with.", author: "Rediet Tsigeberhan", role: "CEO, Arifpay", img: redietLinkedin, linkedin: "https://www.linkedin.com/in/rediet-tsigeberhan-97615642" },
 { id: '5', content: "Nexyovi helped us scale Chapa's payment infrastructure during our busiest quarter. Transaction volumes doubled and we had zero downtime. Their DevOps and cloud architecture team is world-class.", author: "Nael Hailemariam", role: "Co-Founder & CEO, Chapa", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/naelatchapa" },
 { id: '6', content: "We're building sustainable infrastructure in Ethiopia and needed a tech partner who could move as fast as we do. Nexyovi delivered our monitoring and analytics platform in record time. The team truly cares about impact.", author: "Kidus Asfaw", role: "Co-Founder & CEO, Kubik", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/kidusasfaw" },
 { id: '7', content: "The AI model they built for our banking fraud detection system reduced false positives by 60% while catching 95% of actual threats. This is exactly the kind of innovation Ethiopia's fintech sector needs.", author: "Daniel Ayalew", role: "Director of Operations, Arifpay", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/daniel-ayalew" },
 { id: '8', content: "I've worked with multiple agencies in Addis, but none match Nexyovi's technical depth. They helped us deploy an AI-powered chatbot for customer service in Amharic and English. Our response times dropped from hours to seconds.", author: "Yabets Solomon", role: "AI Engineer, iCog Labs", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/yabets-solomon" },
 { id: '9', content: "We needed a reliable partner to build our risk and compliance tracking system. Nexyovi delivered a clean, auditable platform that passed regulatory scrutiny on first review. Professional from day one.", author: "Bezawit Hailesilassie", role: "Risk & Compliance, Chapa", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/bezawit-hailesilassie-56b0762b9" },
 { id: '10', content: "Our ML pipeline needed a complete rebuild. Nexyovi's engineers designed a scalable architecture that handles 10x our previous data volume. They know their stuff when it comes to AI infrastructure.", author: "Tesfalegn Petros", role: "AI/ML Engineer, iCog Labs", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/developertesfalegn" },
 { id: '11', content: "The partnership portal they built for us streamlined how we onboard new merchants across Ethiopia. What used to take weeks now takes days. Their full-stack team is incredibly responsive and detail-oriented.", author: "Amanuel Solomon", role: "Partnership Specialist, Arifpay", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", linkedin: "https://et.linkedin.com/in/amanuel-solomon-985327178" },

 // ── Kenya ──
 { id: '12', content: "We needed a pan-African payment platform that could handle regulation complexity across 35+ markets. Nexyovi redesigned our core infrastructure to process cross-border transactions with full compliance automation. Our time-to-integration for new markets dropped by 70%.", author: "David Waithaka", role: "Group Chief Revenue Officer, Cellulant", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", linkedin: "https://ke.linkedin.com/in/david-waithaka-41150017" },
 { id: '13', content: "Risk management in African fintech is notoriously complex. Nexyovi built us a real-time monitoring dashboard that consolidated compliance data from 18 countries into a single view. Our audit preparation time went from weeks to days.", author: "Rispa Ngugi", role: "Enterprise Risk Manager, Cellulant", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200", linkedin: "https://ke.linkedin.com/in/rispa-ngugi-7432035b" },

 // ── Miami, USA ──
 { id: '14', content: "We hired Nexyovi to modernize our internal tools and they delivered beyond expectations. They rebuilt our legacy IT management dashboard with a modern stack — cutting load times by 80% and adding real-time monitoring that our team uses daily.", author: "Nadir Merchant", role: "Senior Executive, Kaseya", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", linkedin: "https://www.linkedin.com/in/merch" },
 { id: '15', content: "Operational efficiency is everything in IT management. Nexyovi automated our deployment pipeline and built a custom SLA tracking system that reduced incident response times by 60%. They're our go-to for scalable infrastructure work.", author: "Kevin Sequeira", role: "GM, IT Operations & K365 Ops, Kaseya", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", linkedin: "https://www.linkedin.com/in/sequeira-kevin" }];

const initialAdmins = [
 { id: '1', username: 'admin', role: 'Super Admin', status: 'Active', lastLogin: '2m ago' },
 { id: '2', username: 'subadmin', role: 'Content Manager', status: 'Active', lastLogin: '1h ago' }];

const initialSettings = {
 siteName: 'Nexyovi',
 email: 'info@nexyovi.com',
 phone: '+1 555 123 4567',
 address: 'Bole District, Addis Ababa, Ethiopia',
 socials: {
 twitter: '#',
 linkedin: '#',
 github: '#',
 youtube: '#',
 instagram: '#',
 discord: '#',
 slack: '#'
 },
 logo_url: ''
};

interface SiteContextType {
 siteContent: any;
 updateSiteContent: (sectionId: string, content: any) => Promise<void>;
 jobs: any[];
 team: any[];
 testimonials: any[];
 admins: any[];
 messages: any[];
 settings: any;
 addJob: (job: any) => void;
 updateJob: (job: any) => void;
 deleteJob: (id: string) => void;
 addTeamMember: (member: any) => void;
 updateTeamMember: (member: any) => void;
 deleteTeamMember: (id: string) => void;
 addTestimonial: (t: any) => void;
 updateTestimonial: (t: any) => void;
 deleteTestimonial: (id: string) => void;
 addAdmin: (admin: any) => void;
 updateAdmin: (admin: any) => void;
 deleteAdmin: (id: string) => void;
 addMessage: (msg: any) => void;
 deleteMessage: (id: string) => void;
 updateSettings: (settings: any) => void;
 session: any;
 loadingAuth: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [session, setSession] = useState<any>(null);
 const [loadingAuth, setLoadingAuth] = useState(true);

 useEffect(() => {
 supabase.auth.getSession().then(({ data: { session } }) => {
 setSession(session);
 setLoadingAuth(false);
 });

 const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
 setSession(session);
 });

 return () => subscription.unsubscribe();
 }, []);

 const [jobs, setJobs] = useState<any[]>(initialJobs); // Fallback to initial if db empty initially
 const [team, setTeam] = useState<any[]>(initialTeam);
 // Keep initial testimonials as the authoritative source (has linkedin, img fields)
 // Supabase is used for admin CRUD operations but initial data takes priority
 const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);
 const [admins, setAdmins] = useState<any[]>(initialAdmins);
 const [messages, setMessages] = useState<any[]>([]);
 const [settings, setSettings] = useState<any>(initialSettings);
 const [siteContent, setSiteContent] = useState<any>({});

 // Fetch initial data from Supabase
 useEffect(() => {
 const fetchData = async () => {
 const { data: jobsData } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
 if (jobsData && jobsData.length > 0) setJobs(jobsData);

 const { data: testData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
 // Merge Supabase data with initial data — fill missing fields (linkedin, img) from initial,
 // but honor Supabase data for author, role, content (admin edits take priority)
 if (testData && testData.length > 0) {
 const merged = testData.map((td: any) => {
 const match = initialTestimonials.find(it => it.author === td.author);
 return match ? { ...td, linkedin: match.linkedin, img: match.img } : td;
 });
 setTestimonials(merged);
 }

 const { data: teamData } = await supabase.from('team').select('*').order('created_at', { ascending: false });
 if (teamData && teamData.length > 0) setTeam(teamData);

 const { data: msgData } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
 if (msgData) setMessages(msgData);

 const { data: settingsData } = await supabase.from('settings').select('*').eq('id', 'global').single();
 if (settingsData) {
 setSettings({
 siteName: settingsData.org_name || initialSettings.siteName,
 email: settingsData.email || initialSettings.email,
 phone: settingsData.phone || initialSettings.phone,
 address: settingsData.address || initialSettings.address,
 socials: settingsData.social_links || initialSettings.socials,
 logo_url: settingsData.logo_url || initialSettings.logo_url
 });
 }

 const { data: contentData } = await supabase.from('site_content').select('*');
 if (contentData) {
 const contentMap: any = {};
 contentData.forEach((row: any) => {
 contentMap[row.section_id] = row.content;
 });
 setSiteContent(contentMap);
 }
 };
 fetchData();
 }, []);

 // Supabase connected functions
 const addJob = async (job: any) => {
 const { data, error } = await supabase.from('jobs').insert([job]).select();
 if (!error && data) setJobs(prev => [data[0], ...prev]);
 };
 const updateJob = async (updatedJob: any) => {
 const { data, error } = await supabase.from('jobs').update(updatedJob).eq('id', updatedJob.id).select();
 if (!error && data) setJobs(prev => prev.map(j => j.id === updatedJob.id ? data[0] : j));
 };
 const deleteJob = async (id: string) => {
 const { error } = await supabase.from('jobs').delete().eq('id', id);
 if (!error) setJobs(prev => prev.filter(j => j.id !== id));
 };

 const addTeamMember = async (member: any) => {
 const { id, ...memberData } = member;
 const { data, error } = await supabase.from('team').insert([memberData]).select();
 if (!error && data) setTeam(prev => [data[0], ...prev]);
 };
 const updateTeamMember = async (updatedMember: any) => {
 const { data, error } = await supabase.from('team').update(updatedMember).eq('id', updatedMember.id).select();
 if (!error && data) setTeam(prev => prev.map(m => m.id === updatedMember.id ? data[0] : m));
 };
 const deleteTeamMember = async (id: string) => {
 const { error } = await supabase.from('team').delete().eq('id', id);
 if (!error) setTeam(prev => prev.filter(m => m.id !== id));
 };

 const addTestimonial = async (t: any) => {
 const { data, error } = await supabase.from('testimonials').insert([t]).select();
 if (!error && data) setTestimonials(prev => [data[0], ...prev]);
 };
 const updateTestimonial = async (updatedT: any) => {
 const { data, error } = await supabase.from('testimonials').update(updatedT).eq('id', updatedT.id).select();
 if (!error && data) setTestimonials(prev => prev.map(t => t.id === updatedT.id ? data[0] : t));
 };
 const deleteTestimonial = async (id: string) => {
 const { error } = await supabase.from('testimonials').delete().eq('id', id);
 if (!error) setTestimonials(prev => prev.filter(t => t.id !== id));
 };

 const addAdmin = (admin: any) => setAdmins(prev => [admin, ...prev]);
 const updateAdmin = (updatedAdmin: any) => setAdmins(prev => prev.map(a => a.id === updatedAdmin.id ? updatedAdmin : a));
 const deleteAdmin = (id: string) => setAdmins(prev => prev.filter(a => a.id !== id));

 const addMessage = async (msg: any) => {
 const { id, ...msgData } = msg;
 const { data, error } = await supabase.from('messages').insert([msgData]).select();
 if (!error && data) setMessages(prev => [data[0], ...prev]);
 };
 const deleteMessage = async (id: string) => {
 const { error } = await supabase.from('messages').delete().eq('id', id);
 if (!error) setMessages(prev => prev.filter(m => m.id !== id));
 };

 const updateSettings = async (newSettings: any) => {
 setSettings(newSettings);
 const { error } = await supabase.from('settings').upsert({
 id: 'global',
 org_name: newSettings.siteName,
 email: newSettings.email,
 phone: newSettings.phone,
 address: newSettings.address,
 logo_url: newSettings.logo_url,
 social_links: newSettings.socials
 });
 if (error) console.error("Error updating settings:", error);
 };

 const updateSiteContent = async (sectionId: string, content: any) => {
 setSiteContent((prev: any) => ({ ...prev, [sectionId]: content }));
 const { error } = await supabase.from('site_content').upsert({
 section_id: sectionId,
 content: content
 });
 if (error) console.error("Error updating site content:", error);
 };

 return (
 <SiteContext.Provider value={{ 
 jobs, team, testimonials, admins, messages, settings, siteContent,
 addJob, updateJob, deleteJob,
 addTeamMember, updateTeamMember, deleteTeamMember,
 addTestimonial, updateTestimonial, deleteTestimonial,
 addAdmin, updateAdmin, deleteAdmin,
 addMessage, deleteMessage,
 updateSettings, updateSiteContent,
 session, loadingAuth
 }}>
 {children}
 </SiteContext.Provider>
 );
};

export const useSite = () => {
 const context = useContext(SiteContext);
 if (!context) throw new Error('useSite must be used within a SiteProvider');
 return context;
};

