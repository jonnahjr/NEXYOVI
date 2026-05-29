import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { jobs as initialJobs } from '../constants/jobs';

// Initial Team Data
import yonasImg from '../assets/yonas_bogale_ceo_1777102914641.jpg';
import sarahImg from '../assets/sarah_chen_cto_1777103047415.png';
import davidImg from '../assets/david_wilson_engineering_1777103084810.png';
import emilyImg from '../assets/emily_carter_security_1777103306653.png';

const initialTeam = [
  { id: '1', name: 'Yonas Bogale', role: 'Founder & CEO', bio: 'Visionary leader with 12+ years in tech and business strategy across two continents.', img: yonasImg },
  { id: '2', name: 'Sarah Chen', role: 'CTO', bio: 'Expert in scalable architectures, cloud systems, and AI solutions.', img: sarahImg },
  { id: '3', name: 'David Wilson', role: 'Head of Engineering', bio: 'Specializes in secure software development and system design.', img: davidImg },
  { id: '4', name: 'Emily Carter', role: 'Head of Cybersecurity', bio: 'Cybersecurity expert focused on protecting digital ecosystems.', img: emilyImg },
];

const initialTestimonials = [
  { id: '1', content: "Nexyovi transformed our security infrastructure in record time. Their AI-driven approach is truly next-gen.", author: "Michael Rodriguez", role: "CTO, Fintech Global", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" },
  { id: '2', content: "The level of technical expertise in their Addis Ababa hub is world-class. A vital partner for our African expansion.", author: "Abeba Tekle", role: "Director, Ethio-Tech", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200" },
  { id: '3', content: "Fast, secure, and incredibly professional. They don't just build software; they engineer solutions.", author: "Jameson Blake", role: "CEO, Quantum Systems", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
];

const initialAdmins = [
  { id: '1', username: 'admin', role: 'Super Admin', status: 'Active', lastLogin: '2m ago' },
  { id: '2', username: 'subadmin', role: 'Content Manager', status: 'Active', lastLogin: '1h ago' },
];

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
      if (testData && testData.length > 0) setTestimonials(testData);

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

