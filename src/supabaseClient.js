// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ჩასვი შენი ნამდვილი მონაცემები ბრჭყალებში:
const supabaseUrl = 'https://xgulfjtsjsrtrrorbqzy.supabase.co'
const supabaseAnonKey = 'sb_publishable_FSdGAaACsQuoHWLxsrtJhQ_tXeksmM2'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)