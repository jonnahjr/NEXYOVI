import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../lib/api';

// Initial Team Data
import c1Img from '../assets/c1.jpg';
import c2Img from '../assets/c2.jpg';
import c3Img from '../assets/c3.jpg';
import completeFarmerLogo from '../assets/Complete Farmer.webp';
import contrailsAiLogo from '../assets/Contrails AI.webp';
import ethioLogo from '../assets/ethio_transparent.png';
import harveyAiLogo from '../assets/Harvey AI.avif';
import paladinDronesLogo from '../assets/Paladin Drones.webp';
import yonasImg from '../assets/yonas.jpg';

const initialTeam = [
    { id: 1, name: 'Yonas Bogale', role: 'Founder & CEO', bio: 'Visionary leader with 12+ years in tech and business strategy across two continents.', initials: 'YB', color: '#F5A800', linkedin: 'https://www.linkedin.com/in/yonas-bogale/', img: 'https://api.nexyovi.com/uploads/1781431549912-777697695.jpg' },
    { id: 16, name: 'Eyerusalem Bogale', role: 'VP of Operations', bio: 'Operations leader with 10+ years driving efficiency and scaling processes across tech startups.', initials: 'EB', color: '#ff7f50', linkedin: 'https://linkedin.com/in/eyerusalem-bogale', img: 'https://api.nexyovi.com/uploads/1781438075460-994896949.png' },
    { id: 3, name: 'Alebachew Sitotaw Yimer', role: 'Chief Product Officer', bio: 'Leads product vision and strategy. Passionate about building scalable systems and ensuring user-centric design.', initials: 'SH', color: '#10b981', linkedin: 'https://linkedin.com/in/selamawit-hailu/', img: 'https://api.nexyovi.com/uploads/1781431861888-216643038.png' },
    { id: 17, name: 'Sarah Tadesse', role: 'Chief Technology Officer (CTO)', bio: 'Innovative engineering leader with 8+ years of experience in building scalable cloud architectures. Passionate about leveraging AI and modern web technologies to solve complex business problems.', initials: 'ST', color: '#8b5cf6', linkedin: 'https://linkedin.com/in/eyerusalem-bogale', img: 'https://api.nexyovi.com/uploads/1781434594201-894064051.png' }
];

const initialTestimonials = [
    { id: 1, content: "At Nexyovi, we don't just build software — we build the infrastructure that powers organizations across Africa and beyond. Every project we take on is a commitment to excellence, security, and real impact.", author: "Yonas Bogale", role: "Founder & CEO, Nexyovi", img: yonasImg, linkedin: "https://www.linkedin.com/in/yonas-bogale" },
];

const initialPartners = [
    { id: 1, name: 'Ethio Telecom', logo_url: ethioLogo },
    { id: 2, name: 'Commercial Bank of Ethiopia', logo_url: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Commercial_Bank_of_Ethiopia_logo.svg' },
    { id: 3, name: 'Zemen Bank', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Zemen_Bank_logo.svg' },
    { id: 4, name: 'INSA', logo_url: 'https://upload.wikimedia.org/wikipedia/en/7/70/INSA_Ethiopia_logo.svg' },
    { id: 5, name: 'Addis Ababa University', logo_url: 'https://upload.wikimedia.org/wikipedia/en/6/60/Addis_Ababa_University_logo.svg' },
    { id: 6, name: 'AASTU', logo_url: 'https://upload.wikimedia.org/wikipedia/en/4/4f/AASTU_logo.svg' },
    { id: 7, name: 'Global Bank', logo_url: 'https://upload.wikimedia.org/wikipedia/en/8/87/Global_Bank_Ethiopia_logo.svg' },
    { id: 8, name: 'Bahir Dar University', logo_url: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Bahir_Dar_University_logo.svg' },
    { id: 9, name: 'Hawassa University', logo_url: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Hawassa_University_logo.svg' },
    { id: 10, name: 'HP', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
    { id: 11, name: 'IBM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { id: 12, name: 'AWS', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { id: 13, name: 'Oracle', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    { id: 14, name: 'Complete Farmer', logo_url: completeFarmerLogo },
    { id: 15, name: 'Harvey AI', logo_url: harveyAiLogo },
    { id: 16, name: 'Paladin Drones', logo_url: paladinDronesLogo },
    { id: 17, name: 'Contrails AI', logo_url: contrailsAiLogo },
];

export const trustLogosDefaults = [
    { name: 'Ethio Telecom', logo_url: ethioLogo },
    { name: 'Commercial Bank of Ethiopia', logo_url: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Commercial_Bank_of_Ethiopia_logo.svg' },
    { name: 'Zemen Bank', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Zemen_Bank_logo.svg' },
    { name: 'INSA', logo_url: 'https://upload.wikimedia.org/wikipedia/en/7/70/INSA_Ethiopia_logo.svg' },
    { name: 'Addis Ababa University', logo_url: 'https://upload.wikimedia.org/wikipedia/en/6/60/Addis_Ababa_University_logo.svg' },
    { name: 'AASTU', logo_url: 'https://upload.wikimedia.org/wikipedia/en/4/4f/AASTU_logo.svg' },
    { name: 'Global Bank', logo_url: 'https://upload.wikimedia.org/wikipedia/en/8/87/Global_Bank_Ethiopia_logo.svg' },
];

export const homepageTestimonialsDefaults = [
    {
        id: '2',
        quote: "They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. They brought deep technical expertise and a true partnership mindset. Gebeya's collaboration with Nexyovi has been transformative for our pan-African expansion.",
        role: 'CEO & Co-Founder',
        company: 'Gebeya',
        author: 'Amadou Daffe',
        avatar_url: c1Img,
        linkedin: 'https://et.linkedin.com/in/amadoudaffe',
        highlight: 'transformative',
        label: 'Trusted by founders of'
    },
    {
        id: '4',
        quote: "We needed a secure payment gateway that could handle Ethiopia's unique banking landscape. Nexyovi built it — integrating with four banks and processing live transactions on day one. Their focus on security and reliability has been a game-changer for our platform.",
        role: 'CEO',
        company: 'Arifpay',
        author: 'Rediet Tsigeberhan',
        avatar_url: c2Img,
        linkedin: 'https://www.linkedin.com/in/rediet-tsigeberhan-97615642',
        highlight: 'game-changer',
        label: 'Trusted by founders of',
        caseStudy: '/projects/global-bank-security'
    },
    {
        id: '3',
        quote: 'They delivered our health infrastructure platform ahead of schedule, navigating complex compliance requirements seamlessly. The system now serves users across regional hospitals and clinics.',
        role: 'Chief Technology Officer',
        company: 'Ministry of Health',
        author: 'Dawit Mekonnen',
        avatar_url: c3Img,
        linkedin: 'https://linkedin.com',
        highlight: 'ahead of schedule',
        caseStudy: '/projects/tele-psychiatry'
    },
    {
        id: '5',
        quote: 'We needed a complete digital transformation — from legacy systems to modern cloud infrastructure. Nexyovi handled the migration with zero downtime and trained our team on the new stack. Their engineering discipline is world-class.',
        role: 'Head of Digital',
        company: 'Commercial Bank of Ethiopia',
        author: 'Tigist Hailemariam',
        avatar_url: '',
        linkedin: '',
        highlight: 'zero downtime',
        caseStudy: '/company'
    },
    {
        id: '6',
        quote: "The mobile app they built for us had over 50k downloads in the first month. But what impressed me most was how they thought about scalability from day one — we haven't had a single performance issue even as traffic grew.",
        role: 'VP of Product',
        company: 'Ethio Telecom',
        author: 'Binyam Alemu',
        avatar_url: '',
        linkedin: '',
        highlight: 'scalability from day one',
    },
];

const initialSettings = {
    siteName: 'Nexyovi',
    email: 'info@nexyovi.com',
    phone: '+251938617252',
    address: 'Bole Road, near Edna Mall area, Bole Sub-city, Addis Ababa, Ethiopia',
    socials: {
        twitter: '#', linkedin: '#', github: '#', youtube: '#',
        instagram: '#', facebook: '#', telegram: '#', whatsapp: '+251945628075',
        tiktok: '#', discord: '#', slack: '#'
    },
    logo_url: ''
};

interface SiteContextType {
    siteContent: any;
    updateSiteContent: (sectionId: string, content: any) => Promise<void>;
    jobs: any[];
    team: any[];
    testimonials: any[];
    setTestimonials: React.Dispatch<React.SetStateAction<any[]>>;
    partners: any[];
    admins: any[];
    messages: any[];
    applications: any[];
    settings: any;
    addJob: (job: any) => void;
    updateJob: (job: any) => void;
    deleteJob: (id: string | number) => void;
    addTeamMember: (member: any) => void;
    updateTeamMember: (member: any) => void;
    deleteTeamMember: (id: string | number) => void;
    addTestimonial: (t: any) => void;
    updateTestimonial: (t: any) => void;
    deleteTestimonial: (id: string | number) => void;
    addPartner: (p: any) => void;
    updatePartner: (p: any) => void;
    deletePartner: (id: string | number) => void;
    addAdmin: (admin: any) => void;
    updateAdmin: (admin: any) => void;
    deleteAdmin: (id: string | number) => void;
    addMessage: (msg: any) => void;
    updateMessage: (id: string | number, updates: any) => void;
    deleteMessage: (id: string | number) => void;
    addApplication: (app: any) => void;
    updateApplication: (id: string | number, updates: any) => void;
    deleteApplication: (id: string | number) => void;
    updateSettings: (settings: any) => void;
    session: any;
    loadingAuth: boolean;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<any>(() => {
        // Restore session from stored token on mount
        const token = localStorage.getItem('nexyovi_token');
        if (token) return { token };
        return null;
    });
    const [loadingAuth, setLoadingAuth] = useState(true);

    // On mount, verify token is still valid
    useEffect(() => {
        const token = localStorage.getItem('nexyovi_token');
        if (!token) {
            setLoadingAuth(false);
            return;
        }
        api.getMe()
            .then(user => setSession({ token, user }))
            .catch(() => {
                localStorage.removeItem('nexyovi_token');
                setSession(null);
            })
            .finally(() => setLoadingAuth(false));
    }, []);

    const [jobs, setJobs] = useState<any[]>([]);
    const [team, setTeam] = useState<any[]>(initialTeam);
    const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);
    const [partners, setPartners] = useState<any[]>(initialPartners);
    const [admins, setAdmins] = useState<any[]>([
        { id: 1, username: 'admin', role: 'Super Admin', status: 'Active' },
        { id: 2, username: 'subadmin', role: 'Content Manager', status: 'Active' }
    ]);
    const [messages, setMessages] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>(initialSettings);
    const [siteContent, setSiteContent] = useState<any>({});

    // Fetch initial data from local API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsData, testData, teamData, partnersData, msgData, applicationsData, contentData] = await Promise.all([
                    api.listAll('jobs').catch(() => []),
                    api.listAll('testimonials').catch(() => []),
                    api.listAll('team').catch(() => []),
                    api.listAll('partners').catch(() => []),
                    api.listAll('messages').catch(() => []),
                    api.listAll('applications').catch(() => []),
                    api.listAll('site_content').catch(() => []),
                ]);

                if (jobsData.length > 0) setJobs(jobsData);
                if (testData.length > 0) setTestimonials(testData);
                if (teamData.length > 0) setTeam(teamData);
                if (partnersData.length > 0) setPartners(partnersData);
                if (msgData.length > 0) setMessages(msgData);
                if (applicationsData.length > 0) setApplications(applicationsData);

                // Settings
                const settingsData = await api.getById('settings', 'global').catch(() => null);
                if (settingsData) {
                    let socials;
                    try {
                        socials = typeof settingsData.social_links === 'string'
                            ? JSON.parse(settingsData.social_links)
                            : settingsData.social_links || {};
                    } catch { socials = {}; }
                    const mergedSocials = { ...initialSettings.socials, ...socials };
                    setSettings({
                        siteName: settingsData.org_name || initialSettings.siteName,
                        email: settingsData.email || initialSettings.email,
                        phone: settingsData.phone || initialSettings.phone,
                        address: settingsData.address || initialSettings.address,
                        socials: mergedSocials,
                        logo_url: settingsData.logo_url || '',
                    });
                }

                // Site content
                if (contentData.length > 0) {
                    const contentMap: any = {};
                    contentData.forEach((row: any) => {
                        let content = row.content;
                        if (typeof content === 'string') {
                            try { content = JSON.parse(content); } catch {}
                        }
                        contentMap[row.section_id] = content;
                    });
                    setSiteContent(contentMap);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    // ── Auth ───────────────────────────────────────────────────

    const login = async (email: string, password: string) => {
        const data = await api.login(email, password);
        setSession({ token: data.token, user: data.user });
        return data;
    };

    const logout = async () => {
        await api.logout();
        setSession(null);
    };

    // ── Jobs ───────────────────────────────────────────────────

    const addJob = async (job: any) => {
        const data = await api.create('jobs', job);
        setJobs(prev => [data, ...prev]);
    };
    const updateJob = async (updatedJob: any) => {
        const data = await api.update('jobs', updatedJob.id, updatedJob);
        setJobs(prev => prev.map(j => j.id === data.id ? data : j));
    };
    const deleteJob = async (id: string | number) => {
        await api.remove('jobs', id);
        setJobs(prev => prev.filter(j => j.id !== id));
    };

    // ── Team ───────────────────────────────────────────────────

    const addTeamMember = async (member: any) => {
        const { id, ...memberData } = member;
        const data = await api.create('team', memberData);
        setTeam(prev => [data, ...prev]);
    };
    const updateTeamMember = async (updatedMember: any) => {
        setTeam(prev => prev.map(m => m.id === updatedMember.id ? { ...m, ...updatedMember } : m));
        const { id, ...memberData } = updatedMember;
        const data = await api.update('team', updatedMember.id, memberData);
        if (data) setTeam(prev => prev.map(m => m.id === data.id ? data : m));
    };
    const deleteTeamMember = async (id: string | number) => {
        await api.remove('team', id).catch(() => {});
        setTeam(prev => prev.filter(m => m.id !== id));
    };

    // ── Testimonials ───────────────────────────────────────────

    const addTestimonial = async (t: any) => {
        const { id, img, ...cleanData } = t;
        const data = await api.create('testimonials', cleanData);
        setTestimonials(prev => [data, ...prev]);
    };
    const updateTestimonial = async (updatedT: any) => {
        setTestimonials(prev => prev.map(t => t.id === updatedT.id ? { ...t, ...updatedT } : t));
        const { id, img, ...cleanData } = updatedT;
        const data = await api.update('testimonials', updatedT.id, cleanData);
        if (data) setTestimonials(prev => prev.map(t => t.id === data.id ? data : t));
    };
    const deleteTestimonial = async (id: string | number) => {
        await api.remove('testimonials', id);
        setTestimonials(prev => prev.filter(t => t.id !== id));
    };

    // ── Partners ───────────────────────────────────────────────

    const addPartner = async (p: any) => {
        const tempId = `temp_${Date.now()}`;
        setPartners(prev => [{ ...p, id: tempId }, ...prev]);
        try {
            const data = await api.create('partners', p);
            setPartners(prev => prev.map(pp => pp.id === tempId ? data : pp));
        } catch (err: any) {
            console.warn('Partner insert error:', err.message);
        }
    };
    const updatePartner = async (updatedP: any) => {
        setPartners(prev => prev.map(p => p.id === updatedP.id ? { ...p, ...updatedP } : p));
        try {
            const data = await api.update('partners', updatedP.id, updatedP);
            if (data) setPartners(prev => prev.map(p => p.id === data.id ? data : p));
        } catch (err: any) {
            console.warn('Partner update error:', err.message);
        }
    };
    const deletePartner = async (id: string | number) => {
        await api.remove('partners', id).catch(() => {});
        setPartners(prev => prev.filter(p => p.id !== id));
    };

    // ── Admins ─────────────────────────────────────────────────

    const addAdmin = (admin: any) => setAdmins(prev => [admin, ...prev]);
    const updateAdmin = (updatedAdmin: any) => setAdmins(prev => prev.map(a => a.id === updatedAdmin.id ? updatedAdmin : a));
    const deleteAdmin = (id: string | number) => setAdmins(prev => prev.filter(a => a.id !== id));

    // ── Messages ───────────────────────────────────────────────

    const addMessage = async (msg: any) => {
        const { id, ...msgData } = msg;
        const data = await api.create('messages', msgData);
        setMessages(prev => [data, ...prev]);
    };
    const updateMessage = async (id: string | number, updates: any) => {
        const data = await api.update('messages', id, updates);
        if (data) setMessages(prev => prev.map(m => m.id === id ? data : m));
    };
    const deleteMessage = async (id: string | number) => {
        await api.remove('messages', id);
        setMessages(prev => prev.filter(m => m.id !== id));
    };

    // ── Applications ───────────────────────────────────────────

    const addApplication = async (app: any) => {
        const { id, ...appData } = app;
        const data = await api.create('applications', appData);
        setApplications(prev => [data, ...prev]);
    };
    const updateApplication = async (id: string | number, updates: any) => {
        const data = await api.update('applications', id, updates);
        if (data) setApplications(prev => prev.map(m => m.id === id ? data : m));
    };
    const deleteApplication = async (id: string | number) => {
        await api.remove('applications', id);
        setApplications(prev => prev.filter(m => m.id !== id));
    };

    // ── Settings ───────────────────────────────────────────────

    const updateSettings = async (newSettings: any) => {
        setSettings(newSettings);
        try {
            await api.update('settings', 'global', {
                org_name: newSettings.siteName,
                email: newSettings.email,
                phone: newSettings.phone,
                address: newSettings.address,
                logo_url: newSettings.logo_url,
                social_links: JSON.stringify(newSettings.socials),
            });
        } catch (err: any) {
            console.error('Error updating settings:', err.message);
        }
    };

    // ── Site Content ───────────────────────────────────────────

    const updateSiteContent = async (sectionId: string, content: any) => {
        setSiteContent((prev: any) => ({ ...prev, [sectionId]: content }));
        try {
            await api.update('site_content', sectionId, {
                content: typeof content === 'string' ? content : JSON.stringify(content),
            });
        } catch (err: any) {
            console.error('Error updating site content:', err.message);
        }
    };

    return (
        <SiteContext.Provider value={{
            jobs, team, testimonials, partners, admins, messages, settings, siteContent, applications,
            addJob, updateJob, deleteJob,
            addTeamMember, updateTeamMember, deleteTeamMember,
            addTestimonial, updateTestimonial, deleteTestimonial, setTestimonials,
            addPartner, updatePartner, deletePartner,
            addAdmin, updateAdmin, deleteAdmin,
            addMessage, updateMessage, deleteMessage,
            addApplication, updateApplication, deleteApplication,
            updateSettings, updateSiteContent,
            session, loadingAuth, login, logout
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
