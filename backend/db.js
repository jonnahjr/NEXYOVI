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
