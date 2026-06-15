const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'nexyovi.json');

let dbData = null;

function loadDb() {
  if (dbData) return dbData;
  if (fs.existsSync(DB_PATH)) {
    try {
      dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      return dbData;
    } catch (e) {
      console.error('Failed to parse DB, recreating...', e);
    }
  }
  
  // Seed initial data
  dbData = {
    users: [],
    partners: [],
    team: [],
    testimonials: [],
    jobs: [],
    messages: [],
    settings: [
      { id: 'global', siteName: 'NEXYOVI', contactEmail: 'contact@nexyovi.com' }
    ],
    site_content: []
  };
  
  // Seed admin
  const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
  dbData.users.push({
    id: 1,
    email: process.env.ADMIN_EMAIL || 'admin@nexyovi.com',
    password: bcrypt.hashSync(defaultPassword, 10),
    username: 'admin',
    role: 'Super Admin',
    created_at: new Date().toISOString()
  });

  // Seed default testimonials
  const defaultTestimonials = [
    { id: 1, author: 'Amadou Daffe', role: 'CEO & Co-Founder', content: "They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. They brought deep technical expertise and a true partnership mindset. Gebeya\u2019s collaboration with Nexyovi has been transformative for our pan-African expansion.", image_url: '', linkedin: 'https://et.linkedin.com/in/amadoudaffe' },
    { id: 2, author: 'Rediet Tsigeberhan', role: 'CEO', content: "We needed a secure payment gateway that could handle Ethiopia\u2019s unique banking landscape. Nexyovi built it \u2014 integrating with four banks and processing live transactions on day one. Their focus on security and reliability has been a game-changer for our platform.", image_url: '', linkedin: 'https://www.linkedin.com/in/rediet-tsigeberhan-97615642' },
    { id: 3, author: 'Dawit Mekonnen', role: 'Chief Technology Officer', content: 'They delivered our health infrastructure platform ahead of schedule, navigating complex compliance requirements seamlessly. The system now serves users across regional hospitals and clinics.', image_url: '', linkedin: '' },
    { id: 4, author: 'Tigist Hailemariam', role: 'Head of Digital', content: 'We needed a complete digital transformation \u2014 from legacy systems to modern cloud infrastructure. Nexyovi handled the migration with zero downtime and trained our team on the new stack. Their engineering discipline is world-class.', image_url: '', linkedin: '' },
    { id: 5, author: 'Binyam Alemu', role: 'VP of Product', content: "The mobile app they built for us had over 50k downloads in the first month. But what impressed me most was how they thought about scalability from day one \u2014 we haven\u2019t had a single performance issue even as traffic grew.", image_url: '', linkedin: '' },
  ];
  defaultTestimonials.forEach(t => {
    dbData.testimonials.push({ ...t, created_at: new Date().toISOString() });
  });

  saveDb();
  return dbData;
}

function saveDb() {
  if (dbData) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), 'utf8');
    } catch (e) {
      console.error('[DB ERROR] Failed to write to database file. Please check file permissions for:', DB_PATH, e.message);
    }
  }
}

const ALLOWED_TABLES = ['partners', 'team', 'testimonials', 'jobs', 'messages', 'settings', 'site_content', 'users'];

function validateTable(table) {
  if (!ALLOWED_TABLES.includes(table)) throw new Error("Invalid table: " + table);
  return table;
}

function listAll(table) {
  validateTable(table);
  const d = loadDb();
  return d[table] || [];
}

function getById(table, id) {
  validateTable(table);
  const d = loadDb();
  const idKey = table === 'site_content' ? 'section_id' : 'id';
  return (d[table] || []).find(item => String(item[idKey]) === String(id)) || null;
}

function create(table, data) {
  validateTable(table);
  const d = loadDb();
  if (!d[table]) d[table] = [];
  
  const newItem = { ...data, created_at: new Date().toISOString() };
  if (table !== 'settings' && table !== 'site_content') {
    const maxId = d[table].reduce((max, item) => Math.max(max, item.id || 0), 0);
    newItem.id = maxId + 1;
  }
  
  d[table].push(newItem);
  saveDb();
  return newItem;
}

function update(table, id, data) {
  validateTable(table);
  const d = loadDb();
  if (!d[table]) return null;
  
  const idKey = table === 'site_content' ? 'section_id' : 'id';
  const index = d[table].findIndex(item => String(item[idKey]) === String(id));
  
  if (index === -1) return null;
  
  d[table][index] = { ...d[table][index], ...data, updated_at: new Date().toISOString() };
  saveDb();
  return d[table][index];
}

function remove(table, id) {
  validateTable(table);
  const d = loadDb();
  if (!d[table]) return null;
  
  const idKey = table === 'site_content' ? 'section_id' : 'id';
  const index = d[table].findIndex(item => String(item[idKey]) === String(id));
  
  if (index === -1) return null;
  
  const removed = d[table].splice(index, 1)[0];
  saveDb();
  return removed;
}

function upsert(table, id, data) {
  validateTable(table);
  const d = loadDb();
  const idKey = table === 'site_content' ? 'section_id' : 'id';
  
  const existing = getById(table, id);
  if (existing) {
    return update(table, id, data);
  } else {
    const newItem = { ...data, [idKey]: id, updated_at: new Date().toISOString() };
    if (!d[table]) d[table] = [];
    d[table].push(newItem);
    saveDb();
    return newItem;
  }
}

// Ensure loaded on startup
loadDb();

module.exports = { getDb: loadDb, listAll, getById, create, update, remove, upsert, validateTable };
