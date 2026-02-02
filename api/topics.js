export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const topics = [
      { id: 't1', title: 'Targeting', icon: '🎯' },
      { id: 't2', title: 'Bidding', icon: '💰' },
      { id: 't3', title: 'Ad Formats', icon: '🖼️' },
      { id: 't4', title: 'Analytics', icon: '📊' },
      { id: 't5', title: 'Privacy', icon: '🔒' }
    ];

    return res.status(200).json(topics);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
