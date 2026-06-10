const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'nexyovi.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
    seedData();
  }
  return db;
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      email       TEXT NOT NULL UNIQUE,
      password    TEXT NOT NULL,
      username    TEXT NOT NULL DEFAULT 'admin',
      role        TEXT NOT NULL DEFAULT 'Super Admin',
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS partners (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      logo_url    TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS team (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      role        TEXT NOT NULL,
      bio         TEXT NOT NULL DEFAULT '',
      img         TEXT,
      linkedin    TEXT DEFAULT '#',
      initials    TEXT,
      color       TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      author      TEXT NOT NULL,
      role        TEXT NOT NULL DEFAULT '',
      content     TEXT NOT NULL,
      image_url   TEXT,
      linkedin    TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      department  TEXT NOT NULL DEFAULT '',
      location    TEXT NOT NULL DEFAULT '',
      type        TEXT NOT NULL DEFAULT 'Full-time',
      description TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      company     TEXT DEFAULT '',
      service     TEXT DEFAULT '',
      message     TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'unread',
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      id           TEXT PRIMARY KEY,
      org_name     TEXT NOT NULL DEFAULT 'Nexyovi',
      email        TEXT NOT NULL DEFAULT '',
      phone        TEXT NOT NULL DEFAULT '',
      address      TEXT NOT NULL DEFAULT '',
      logo_url     TEXT DEFAULT '',
      social_links TEXT DEFAULT '{}',
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_content (
      section_id  TEXT PRIMARY KEY,
      content     TEXT NOT NULL DEFAULT '{}',
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

function seedData() {
  // Seed admin user if not exists
  const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(process.env.ADMIN_EMAIL || 'admin@nexyovi.com');
  if (!existingAdmin) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
    db.prepare('INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)').run(
      process.env.ADMIN_EMAIL || 'admin@nexyovi.com',
      hashedPassword,
      'admin',
      'Super Admin'
    );
  }

  // Seed partners
  const partnerCount = db.prepare('SELECT COUNT(*) as count FROM partners').get().count;
  if (partnerCount === 0) {
    const insert = db.prepare('INSERT OR IGNORE INTO partners (name, logo_url) VALUES (?, ?)');
    const partners = [
      ['Ethio Telecom', null],
      ['Commercial Bank of Ethiopia', null],
      ['Zemen Bank', null],
      ['INSA', null],
      ['Addis Ababa University', null],
      ['AASTU', null],
      ['Global Bank', null],
      ['Bahir Dar University', null],
      ['Hawassa University', null],
      ['HP', null],
      ['IBM', null],
      ['AWS', null],
      ['Oracle', null],
      ['Complete Farmer', null],
      ['Harvey AI', null],
      ['Paladin Drones', null],
      ['Contrails AI', null],
    ];
    const insertMany = db.transaction((items) => {
      for (const item of items) insert.run(...item);
    });
    insertMany(partners);
  }

  // Seed team
  const teamCount = db.prepare('SELECT COUNT(*) as count FROM team').get().count;
  if (teamCount === 0) {
    const insert = db.prepare('INSERT OR IGNORE INTO team (name, role, bio, linkedin, initials, color) VALUES (?, ?, ?, ?, ?, ?)');
    const members = [
      ['Yonas Bogale', 'Founder & CEO', 'Visionary leader with 12+ years in tech and business strategy across two continents.', 'https://www.linkedin.com/in/yonas-bogale/', 'YB', '#F5A800'],
      ['Amanuel Tesfaye', 'Chief Technology Officer', 'Software architect with deep expertise in distributed systems and AI/ML.', 'https://linkedin.com/in/amanuel-tesfaye/', 'AT', '#8b5cf6'],
      ['Selamawit Hailu', 'Chief Product Officer', 'Leads product vision and strategy. Passionate about building scalable systems.', 'https://linkedin.com/in/selamawit-hailu/', 'SH', '#10b981'],
      ['Eyerusalem Bogale', 'VP of Operations', 'Operations leader with 10+ years driving efficiency across tech startups.', 'https://linkedin.com/in/eyerusalem-bogale', 'EB', '#ff7f50'],
      ['Mikayel Alemu', 'Full Stack Developer', 'Foundation of everything — every project needs this.', '#', 'MK', '#ef4444'],
      ['Sara Denbel', 'Mobile Application Developer', 'High demand, tangible product clients can see and touch.', '#', 'SD', '#14b8a6'],
      ['Henok Alemu', 'DevOps Engineer', 'Keeps everything running — cloud, pipelines, deployments.', '#', 'HA', '#06b6d4'],
      ['Betelhem Assefa', 'AI/ML Engineer', 'Your biggest differentiator right now.', '#', 'BA', '#F5A800'],
      ['Nahom Girmachew', 'Backend Developer', 'Powers APIs, data, and business logic.', '#', 'NG', '#a855f7'],
      ['Biruk Mamo', 'Security Engineer', 'Matches your security-first brand promise.', '#', 'BM', '#84cc16'],
      ['Liya Wondesen', 'Data Engineer', 'Supports your data systems service.', '#', 'LW', '#0ea5e9'],
      ['Tsion Wondimu', 'Project Manager', 'Rounds out the team — shows delivery discipline.', '#', 'TW', '#f59e0b'],
    ];
    const insertMany = db.transaction((items) => {
      for (const item of items) insert.run(...item);
    });
    insertMany(members);
  }

  // Seed testimonials
  const testCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get().count;
  if (testCount === 0) {
    const insert = db.prepare('INSERT OR IGNORE INTO testimonials (author, role, content, linkedin) VALUES (?, ?, ?, ?)');
    insert.run('Yonas Bogale', 'Founder & CEO, Nexyovi', 'At Nexyovi, we don\'t just build software — we build the infrastructure that powers organizations across Africa and beyond. Every project we take on is a commitment to excellence, security, and real impact.', 'https://www.linkedin.com/in/yonas-bogale');
  }

  // Seed settings
  const existingSettings = db.prepare('SELECT id FROM settings WHERE id = ?').get('global');
  if (!existingSettings) {
    db.prepare(`INSERT INTO settings (id, org_name, email, phone, address, social_links) VALUES (?, ?, ?, ?, ?, ?)`).run(
      'global',
      'Nexyovi',
      'info@nexyovi.com',
      '+251938617252',
      'Bole Road, near Edna Mall area, Bole Sub-city, Addis Ababa, Ethiopia',
      JSON.stringify({
        twitter: '#', linkedin: '#', github: '#', youtube: '#',
        instagram: '#', facebook: '#', telegram: '#', whatsapp: '+251945628075',
        tiktok: '#', discord: '#', slack: '#',
      })
    );
  }
}

// ── QUERY HELPERS ──────────────────────────────────────────────

const ALLOWED_TABLES = ['partners', 'team', 'testimonials', 'jobs', 'messages', 'settings', 'site_content', 'users'];

function validateTable(table) {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new Error(`Invalid table: ${table}`);
  }
  return table;
}

function listAll(table) {
  validateTable(table);
  const d = getDb();
  // site_content and settings use updated_at instead of created_at
  const orderCol = (table === 'site_content' || table === 'settings') ? 'updated_at' : 'created_at';
  return d.prepare(`SELECT * FROM ${table} ORDER BY ${orderCol} DESC`).all();
}

function getById(table, id) {
  validateTable(table);
  const d = getDb();
  // site_content uses section_id as primary key
  const idCol = table === 'site_content' ? 'section_id' : 'id';
  return d.prepare(`SELECT * FROM ${table} WHERE ${idCol} = ?`).get(id) || null;
}

function create(table, data) {
  validateTable(table);
  const d = getDb();
  const keys = Object.keys(data);
  const values = keys.map(k => data[k]);
  const placeholders = keys.map(() => '?').join(', ');
  const cols = keys.join(', ');
  const result = d.prepare(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`).run(...values);
  return d.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(result.lastInsertRowid);
}

function update(table, id, data) {
  validateTable(table);
  const d = getDb();
  const keys = Object.keys(data);
  const values = keys.map(k => data[k]);
  const setClause = keys.map(k => `${k} = ?`).join(', ');
  values.push(id);
  d.prepare(`UPDATE ${table} SET ${setClause} WHERE id = ?`).run(...values);
  return d.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
}

function remove(table, id) {
  validateTable(table);
  const d = getDb();
  const existing = d.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
  if (!existing) return null;
  d.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
  return existing;
}

// Special: upsert for settings & site_content (text PKs)
function upsert(table, id, data) {
  validateTable(table);
  const d = getDb();
  // site_content uses section_id as primary key
  const idCol = table === 'site_content' ? 'section_id' : 'id';
  const keys = Object.keys(data);
  const values = keys.map(k => data[k]);
  const setClause = keys.map(k => `${k} = ?`).join(', ');
  const updateSql = `UPDATE ${table} SET ${setClause}, updated_at = datetime('now') WHERE ${idCol} = ?`;
  const insertSql = `INSERT OR IGNORE INTO ${table} (${idCol}, ${keys.join(', ')}) VALUES (?, ${keys.map(() => '?').join(', ')})`;

  const updateResult = d.prepare(updateSql).run(...values, id);
  if (updateResult.changes === 0) {
    // Insert if not exists
    d.prepare(insertSql).run(id, ...values);
  }
  return d.prepare(`SELECT * FROM ${table} WHERE ${idCol} = ?`).get(id);
}

module.exports = { getDb, listAll, getById, create, update, remove, upsert, validateTable };
