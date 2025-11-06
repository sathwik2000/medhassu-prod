# Backend Development

![Backend Development](../images/backend-hero.jpg)

## Server-Side Programming with Node.js

Learn how to build robust server-side applications with Node.js and Express.

### Watch: Node.js Full Course

https://www.youtube.com/watch?v=Oe421EPjeBE

This comprehensive tutorial covers everything from Node.js basics to building production-ready applications.

### Basic Express Server

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/api/users', async (req, res) => {
  try {
    // Fetch users from database
    const users = await db.query('SELECT * FROM users');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### REST API Design

```javascript
const express = require('express');
const router = express.Router();

// GET all resources
router.get('/posts', async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
  const posts = await Post.find()
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  res.json({
    data: posts,
    page: parseInt(page),
    totalPages: Math.ceil(await Post.countDocuments() / limit)
  });
});

// GET single resource
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ data: post });
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// CREATE resource
router.post('/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ data: post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE resource
router.put('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true, runValidators: true }
  );
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json({ data: post });
});

// DELETE resource
router.delete('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
```

---

## Database Management

### SQL vs NoSQL Comparison

| Feature | SQL (PostgreSQL) | NoSQL (MongoDB) |
|---------|------------------|-----------------|
| Structure | Tables with fixed schema | Flexible JSON documents |
| Scalability | Vertical (more powerful server) | Horizontal (more servers) |
| Transactions | ACID compliant | BASE (eventual consistency) |
| Relations | Foreign keys, joins | Embedded or referenced docs |
| Use Case | Complex queries, relationships | Fast reads, flexible schema |

### PostgreSQL Examples

```sql
-- Create table with relationships
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(published);

-- Complex query with joins
SELECT 
  u.username,
  COUNT(p.id) as post_count,
  AVG(LENGTH(p.content)) as avg_content_length
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE p.published = true
GROUP BY u.id, u.username
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC
LIMIT 10;

-- Transactions
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Window functions
SELECT 
  name,
  department,
  salary,
  AVG(salary) OVER (PARTITION BY department) as dept_avg,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;
```

### MongoDB Examples

```javascript
// Connect to MongoDB
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

await client.connect();
const db = client.db('myapp');
const users = db.collection('users');

// Insert documents
await users.insertOne({
  email: 'user@example.com',
  username: 'johndoe',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
  },
  tags: ['developer', 'nodejs'],
  createdAt: new Date()
});

// Find with query
const activeUsers = await users.find({
  'profile.age': { $gte: 18 },
  tags: { $in: ['developer', 'designer'] },
  status: 'active'
}).sort({ createdAt: -1 }).limit(10).toArray();

// Aggregation pipeline
const stats = await users.aggregate([
  { $match: { status: 'active' } },
  { $group: {
      _id: '$country',
      count: { $sum: 1 },
      avgAge: { $avg: '$profile.age' }
  }},
  { $sort: { count: -1 } },
  { $limit: 5 }
]).toArray();

// Update operations
await users.updateOne(
  { email: 'user@example.com' },
  { 
    $set: { status: 'premium' },
    $inc: { loginCount: 1 },
    $push: { tags: 'premium-user' }
  }
);
```

---

## Authentication & Security

### Password Hashing with bcrypt

```javascript
const bcrypt = require('bcrypt');

// Hash password during registration
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password during login
const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Registration endpoint
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const passwordHash = await hashPassword(password);
    
    // Create user
    const user = await User.create({
      email,
      passwordHash
    });
    
    res.status(201).json({ 
      message: 'User created successfully',
      userId: user.id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### JWT Authentication

```javascript
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Verify password
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate token
  const token = generateToken(user.id);
  
  res.json({ 
    token,
    user: { id: user.id, email: user.email }
  });
});

// Auth middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.userId = payload.userId;
  next();
};

// Protected route
app.get('/api/profile', authenticate, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ user });
});
```

### Security Best Practices

```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Security middleware
app.use(helmet()); // Set security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// Sanitize data
app.use(mongoSanitize()); // Prevent NoSQL injection

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));

// Input validation
const { body, validationResult } = require('express-validator');

app.post('/api/users',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/\d/).matches(/[A-Z]/),
  body('username').isAlphanumeric().isLength({ min: 3, max: 20 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process valid data
  }
);
```

---

## API Documentation

### Using Swagger/OpenAPI

```javascript
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 */
```

---

## Deployment

### Environment Variables

```bash
# .env file
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/dbname
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-here
ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

### PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start app.js --name "my-api"

# Monitor
pm2 monit

# View logs
pm2 logs

# Restart on file changes
pm2 start app.js --watch

# Save process list
pm2 save

# Startup script
pm2 startup
```

---

## Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [MongoDB University](https://university.mongodb.com)
