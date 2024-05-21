import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvftzjcvltzbolraqtad.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIwMTg2MCwiZXhwIjoxOTQzNzc3ODYwfQ.GrX9zqG-NTBxikoZeWhzV4tNGmPzlDUzbSO6Fv5e6_8';

const client = createClient(supabaseUrl, supabaseKey);
export default client;

export function getChannel(topic: string) {
  return client.getChannels().find((ch) => ch.topic === topic);
}
