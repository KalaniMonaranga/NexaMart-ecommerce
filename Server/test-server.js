const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Test endpoint
app.post('/test-login', async (req, res) => {
  console.log('Test login endpoint hit');
  console.log('Request body:', req.body);
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  
  // Test bcrypt with hardcoded values
  try {
    console.log('Testing bcrypt...');
    const hash = await bcrypt.hash('test123', 10);
    console.log('Hash created:', hash);
    
    const match = await bcrypt.compare('test123', hash);
    console.log('Match result:', match);
    
    res.json({ message: 'Test successful', match });
  } catch (error) {
    console.error('Bcrypt error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(5001, () => {
  console.log('Test server running on port 5001');
});
