import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    if (req.method === 'POST') {
      const { name, email, project_type, message } = req.body || {};
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ error: 'Please provide your name.' });
      }
      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }
      if (!message || typeof message !== 'string' || message.trim().length < 10) {
        return res.status(400).json({ error: 'Please describe your project (at least 10 characters).' });
      }
      const { data, error } = await supabase.from('contact_messages').insert({
        name: name.trim().slice(0, 120),
        email: email.trim().slice(0, 160),
        project_type: typeof project_type === 'string' ? project_type.slice(0, 80) : 'General Inquiry',
        message: message.trim().slice(0, 4000),
      }).select().single();
      if (error) throw error;
      return res.status(201).json({ ok: true, id: data.id });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (messages):', err);
    return res.status(500).json({ error: 'Something went wrong sending your message. Please try again.' });
  }
}
