import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bbqpmdghoyettdhwrgss.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY as string;

export default createClient(supabaseUrl, supabaseKey);
