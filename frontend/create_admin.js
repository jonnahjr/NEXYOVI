import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Read env variables
const envPath = path.resolve(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim()
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim()

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdmin() {
  console.log("Creating admin account...")
  const { data, error } = await supabase.auth.signUp({
    email: 'yonasbogale@nexyovi.com',
    password: 'Jonnahjnr@0945628075',
    options: {
      data: {
        full_name: 'Nexyovi Admin'
      }
    }
  })

  if (error) {
    console.error("Error creating admin:", error.message)
  } else {
    console.log("SUCCESS! Admin account created.")
    console.log("----------------------------------")
    console.log("Email: jonnahjr@gmail.com")
    console.log("Password: Admin123!")
    console.log("----------------------------------")
  }
}

createAdmin()
