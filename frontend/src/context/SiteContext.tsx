import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Initial Team Data
import yonasImg from '../assets/yonas.jpg';
import ethioLogo from '../assets/ethio_transparent.png';
import awsLogo from '../assets/aws-25_transparent.png';
import ibmLogo from '../assets/ibm-17_transparent.png';
import microsoftLogo from '../assets/microsoft-19.png';
import oracleLogo from '../assets/oracle-21_transparent.png';
import nvidiaLogo from '../assets/nvidia-28.png';
import completeFarmerLogo from '../assets/Complete Farmer.webp';
import contrailsAiLogo from '../assets/Contrails AI.webp';
import harveyAiLogo from '../assets/Harvey AI.avif';
import paladinDronesLogo from '../assets/Paladin Drones.webp';

// Avatar assets are removed — using initials/color fallbacks instead

const initialTeam = [
    { id: '1', name: 'Yonas Bogale', role: 'Founder & CEO', bio: 'Visionary leader with 12+ years in tech and business strategy across two continents.', initials: 'YB', color: '#F5A800', linkedin: 'https://www.linkedin.com/in/yonas-bogale/' },
    { id: '2', name: 'Amanuel Tesfaye', role: 'Chief Technology Officer', bio: 'Software architect and engineer with deep expertise in distributed systems, cloud infrastructure, and AI/ML deployment.', initials: 'AT', color: '#8b5cf6', linkedin: 'https://linkedin.com/in/amanuel-tesfaye/' },
    { id: '3', name: 'Selamawit Hailu', role: 'Chief Product Officer', bio: 'Leads product vision and strategy. Passionate about building scalable systems and ensuring user-centric design.', initials: 'SH', color: '#10b981', linkedin: 'https://linkedin.com/in/selamawit-hailu/' },
    { id: '16', name: 'Eyerusalem Bogale', role: 'VP of Operations', bio: 'Operations leader with 10+ years driving efficiency and scaling processes across tech startups.', initials: 'EB', color: '#ff7f50', linkedin: 'https://linkedin.com/in/eyerusalem-bogale' },
    { id: '10', name: 'Mikayel Alemu', role: 'Full Stack Developer', bio: 'Foundation of everything — every project needs this.', initials: 'MK', color: '#ef4444', linkedin: '#' },
    { id: '11', name: 'Sara Denbel', role: 'Mobile Application Developer', bio: 'High demand, tangible product clients can see and touch.', initials: 'SD', color: '#14b8a6', linkedin: '#' },
    { id: '6', name: 'Henok Alemu', role: 'DevOps Engineer', bio: 'Keeps everything running — cloud, pipelines, deployments.', initials: 'HA', color: '#06b6d4', linkedin: '#' },
    { id: '8', name: 'Betelhem Assefa', role: 'AI/ML Engineer', bio: 'Your biggest differentiator right now.', initials: 'BA', color: '#F5A800', linkedin: '#' },
    { id: '9', name: 'Nahom Girmachew', role: 'Backend Developer', bio: 'Powers APIs, data, and business logic.', initials: 'NG', color: '#a855f7', linkedin: '#' },
    { id: '13', name: 'Biruk Mamo', role: 'Security Engineer', bio: 'Matches your security-first brand promise.', initials: 'BM', color: '#84cc16', linkedin: '#' },
    { id: '12', name: 'Liya Wondesen', role: 'Data Engineer', bio: 'Supports your data systems service.', initials: 'LW', color: '#0ea5e9', linkedin: '#' },
    { id: '7', name: 'Tsion Wondimu', role: 'Project Manager', bio: 'Rounds out the team — shows delivery discipline.', initials: 'TW', color: '#f59e0b', linkedin: '#' },
];

const initialTestimonials = [
    { id: '1', content: "At Nexyovi, we don't just build software — we build the infrastructure that powers organizations across Africa and beyond. Every project we take on is a commitment to excellence, security, and real impact.", author: "Yonas Bogale", role: "Founder & CEO, Nexyovi", img: yonasImg, linkedin: "https://www.linkedin.com/in/yonas-bogale" },
    { id: '2', content: "They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. Our time-to-market dropped from 12 months to 4. Gebeya's partnership with Nexyovi has been transformative for our pan-African expansion.", author: "Amadou Daffe", role: "CEO & Co-Founder, Gebeya", linkedin: "https://et.linkedin.com/in/amadoudaffe" },
    { id: '4', content: "We needed a secure payment gateway that could handle Ethiopia's unique banking landscape. Nexyovi built it in eight weeks — integrating with four banks and processing live transactions on day one. They understand local infrastructure better than any international firm we've worked with.", author: "Rediet Tsigeberhan", role: "CEO, Arifpay", linkedin: "https://www.linkedin.com/in/rediet-tsigeberhan-97615642" },
];

const initialPartners = [
    { id: '1', name: 'Ethio Telecom', logo_url: ethioLogo },
    { id: '2', name: 'Commercial Bank of Ethiopia', logo_url: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Commercial_Bank_of_Ethiopia_logo.svg' },
    { id: '3', name: 'Zemen Bank', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Zemen_Bank_logo.svg' },
    { id: '4', name: 'INSA', logo_url: 'https://upload.wikimedia.org/wikipedia/en/7/70/INSA_Ethiopia_logo.svg' },
    { id: '5', name: 'Addis Ababa University', logo_url: 'https://upload.wikimedia.org/wikipedia/en/6/60/Addis_Ababa_University_logo.svg' },
    { id: '6', name: 'AASTU', logo_url: 'https://upload.wikimedia.org/wikipedia/en/4/4f/AASTU_logo.svg' },
    { id: '7', name: 'Global Bank', logo_url: 'https://upload.wikimedia.org/wikipedia/en/8/87/Global_Bank_Ethiopia_logo.svg' },
    { id: '8', name: 'Bahir Dar University', logo_url: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Bahir_Dar_University_logo.svg' },
    { id: '9', name: 'Hawassa University', logo_url: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Hawassa_University_logo.svg' },
    { id: '10', name: 'HP', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
    { id: '11', name: 'IBM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { id: '12', name: 'AWS', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { id: '13', name: 'Oracle', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    { id: '14', name: 'Complete Farmer', logo_url: completeFarmerLogo },
    { id: '15', name: 'Harvey AI', logo_url: harveyAiLogo },
    { id: '16', name: 'Paladin Drones', logo_url: paladinDronesLogo },
    { id: '17', name: 'Contrails AI', logo_url: contrailsAiLogo },
];

const initialAdmins = [
    { id: '1', username: 'admin', role: 'Super Admin', status: 'Active', lastLogin: '2m ago' },
    { id: '2', username: 'subadmin', role: 'Content Manager', status: 'Active', lastLogin: '1h ago' }];

const initialSettings = {
    siteName: 'Nexyovi',
    email: 'info@nexyovi.com',
    phone: '+251938617252',
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
    partners: any[];
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
    addPartner: (p: any) => void;
    updatePartner: (p: any) => void;
    deletePartner: (id: string) => void;
    addAdmin: (admin: any) => void;
    updateAdmin: (admin: any) => void;
    deleteAdmin: (id: string) => void;
    addMessage: (msg: any) => void;
    updateMessage: (id: string, updates: any) => void;
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

    const [jobs, setJobs] = useState<any[]>([]);
    const [team, setTeam] = useState<any[]>(initialTeam);
    // Keep initial testimonials as the authoritative source (has linkedin, img fields)
    // Supabase is used for admin CRUD operations but initial data takes priority
    const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);
    const [partners, setPartners] = useState<any[]>(initialPartners);
    const [admins, setAdmins] = useState<any[]>(initialAdmins);
    const [messages, setMessages] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>(initialSettings);
    const [siteContent, setSiteContent] = useState<any>({});

    // Helper function to deduplicate testimonials
    const deduplicateTestimonials = (data: any[]) => {
        const seen = new Set<string>();
        const unique: any[] = [];
        
        // First add initialTestimonials
        for (const t of initialTestimonials) {
            seen.add(t.id);
            unique.push(t);
        }

        // Then add any new testimonials from supabase that aren't duplicates
        for (const t of data) {
            const isDuplicate = initialTestimonials.some(
                it => it.author === t.author && it.content === t.content
            );
            if (!seen.has(t.id) && !isDuplicate) {
                seen.add(t.id);
                unique.push(t);
            }
        }
        return unique;
    };

    // Fetch initial data from Supabase
    useEffect(() => {
        const fetchData = async () => {
            const { data: jobsData } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
            if (jobsData && jobsData.length > 0) setJobs(jobsData);

            const { data: testData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
            
            if (testData && testData.length > 0) {
                // First, check if there are duplicates in the database and clean them
                // Merge logic: prefer initialTestimonials as authoritative
                const merged = initialTestimonials.map(initial => {
                    // Find if there's a matching db record (same author)
                    const dbMatch = testData.find(td => td.author === initial.author);
                    if (dbMatch) {
                        // Keep initial data but update with any db changes if needed
                        return {
                            ...initial,
                            ...dbMatch,
                            id: initial.id, // keep original id from initial data
                            linkedin: dbMatch.linkedin || initial.linkedin,
                            img: dbMatch.img || dbMatch.image_url || initial.img
                        };
                    }
                    return initial;
                });
                setTestimonials(merged);
            }

            const { data: teamData } = await supabase.from('team').select('*').order('created_at', { ascending: false });
            if (teamData && teamData.length > 0) {
                const mergedTeam = initialTeam.map(it => {
                    const match = teamData.find((td: any) => td.name === it.name);
                    return match
                        ? { ...it, ...match, img: match.img || it.img, linkedin: match.linkedin || it.linkedin }
                        : it;
                });
                teamData.forEach((td: any) => {
                    if (!initialTeam.find(it => it.name === td.name)) {
                        mergedTeam.push(td);
                    }
                });
                setTeam(mergedTeam);
            }

            const { data: partnersData } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
            if (partnersData && partnersData.length > 0) {
                const mergedPartners = initialPartners.map(initial => {
                    const match = partnersData.find((pd: any) => pd.name === initial.name);
                    return match
                        ? { ...initial, ...match, logo_url: match.logo_url || initial.logo_url }
                        : initial;
                });
                partnersData.forEach((pd: any) => {
                    if (!initialPartners.find(it => it.name === pd.name)) {
                        mergedPartners.push(pd);
                    }
                });
                setPartners(mergedPartners);
            }

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

        // ── Realtime subscriptions ───────────────────────────
        const msgChannel = supabase.channel('realtime-messages')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setMessages(prev => [payload.new as any, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setMessages(prev => prev.map(m => m.id === (payload.new as any).id ? payload.new as any : m));
                } else if (payload.eventType === 'DELETE') {
                    setMessages(prev => prev.filter(m => m.id !== (payload.old as any).id));
                }
            })
            .subscribe();

        const jobChannel = supabase.channel('realtime-jobs')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, (payload) => {
                if (payload.eventType === 'INSERT') setJobs(prev => [payload.new as any, ...prev]);
                else if (payload.eventType === 'UPDATE') setJobs(prev => prev.map(j => j.id === (payload.new as any).id ? payload.new as any : j));
                else if (payload.eventType === 'DELETE') setJobs(prev => prev.filter(j => j.id !== (payload.old as any).id));
            })
            .subscribe();

        const testimonialChannel = supabase.channel('realtime-testimonials')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    // Only add if it's not a duplicate of an initial testimonial
                    const newT = payload.new as any;
                    const isDuplicate = initialTestimonials.some(
                        t => t.author === newT.author && t.content === newT.content
                    );
                    if (!isDuplicate) {
                        setTestimonials(prev => [newT, ...prev]);
                    }
                } else if (payload.eventType === 'UPDATE') {
                    setTestimonials(prev => prev.map(t => t.id === (payload.new as any).id ? payload.new as any : t));
                } else if (payload.eventType === 'DELETE') {
                    setTestimonials(prev => prev.filter(t => t.id !== (payload.old as any).id));
                }
            })
            .subscribe();

        const teamChannel = supabase.channel('realtime-team')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'team' }, (payload) => {
                if (payload.eventType === 'INSERT') setTeam(prev => [payload.new as any, ...prev]);
                else if (payload.eventType === 'UPDATE') setTeam(prev => prev.map(m => m.id === (payload.new as any).id ? payload.new as any : m));
                else if (payload.eventType === 'DELETE') setTeam(prev => prev.filter(m => m.id !== (payload.old as any).id));
            })
            .subscribe();

        const partnersChannel = supabase.channel('realtime-partners')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'partners' }, (payload) => {
                if (payload.eventType === 'INSERT') setPartners(prev => [payload.new as any, ...prev]);
                else if (payload.eventType === 'UPDATE') setPartners(prev => prev.map(p => p.id === (payload.new as any).id ? payload.new as any : p));
                else if (payload.eventType === 'DELETE') setPartners(prev => prev.filter(p => p.id !== (payload.old as any).id));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(msgChannel);
            supabase.removeChannel(jobChannel);
            supabase.removeChannel(testimonialChannel);
            supabase.removeChannel(teamChannel);
            supabase.removeChannel(partnersChannel);
        };
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
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(updatedMember.id);
        if (!isUUID) {
            // Initial hardcoded member — INSERT it to DB for the first time
            const { id, ...memberData } = updatedMember;
            const { data, error } = await supabase.from('team').insert([memberData]).select();
            if (!error && data) setTeam(prev => prev.map(m => m.id === updatedMember.id ? data[0] : m));
            if (error) console.error('Team insert error:', error);
        } else {
            const { data, error } = await supabase.from('team').update(updatedMember).eq('id', updatedMember.id).select();
            if (!error && data) setTeam(prev => prev.map(m => m.id === updatedMember.id ? data[0] : m));
            if (error) console.error('Team update error:', error);
        }
    };
    const deleteTeamMember = async (id: string) => {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (isUUID) {
            const { error } = await supabase.from('team').delete().eq('id', id);
            if (error) console.error('Team delete error:', error);
        }
        setTeam(prev => prev.filter(m => m.id !== id));
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

    const addPartner = async (p: any) => {
        const { data, error } = await supabase.from('partners').insert([p]).select();
        if (!error && data) setPartners(prev => [data[0], ...prev]);
    };
    const updatePartner = async (updatedP: any) => {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(updatedP.id);
        if (!isUUID) {
            const { id, ...partnerData } = updatedP;
            const { data, error } = await supabase.from('partners').insert([partnerData]).select();
            if (!error && data) setPartners(prev => prev.map(p => p.id === updatedP.id ? data[0] : p));
        } else {
            const { data, error } = await supabase.from('partners').update(updatedP).eq('id', updatedP.id).select();
            if (!error && data) setPartners(prev => prev.map(p => p.id === updatedP.id ? data[0] : p));
        }
    };
    const deletePartner = async (id: string) => {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (isUUID) {
            await supabase.from('partners').delete().eq('id', id);
        }
        setPartners(prev => prev.filter(p => p.id !== id));
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
    const updateMessage = async (id: string, updates: any) => {
        const { data, error } = await supabase.from('messages').update(updates).eq('id', id).select();
        if (!error && data) setMessages(prev => prev.map(m => m.id === id ? data[0] : m));
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
            jobs, team, testimonials, partners, admins, messages, settings, siteContent,
            addJob, updateJob, deleteJob,
            addTeamMember, updateTeamMember, deleteTeamMember,
            addTestimonial, updateTestimonial, deleteTestimonial, setTestimonials,
            addPartner, updatePartner, deletePartner,
            addAdmin, updateAdmin, deleteAdmin,
            addMessage, updateMessage, deleteMessage,
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

