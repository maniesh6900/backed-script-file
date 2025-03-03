const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Admin Middleware
const adminMiddleware = (req, res, next) => {
  if (req.headers.authorization !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Function to Generate Routes Based on Configuration
const generateRoutes = (config) => {
  config.nodes.forEach((node) => {
    const { properties } = node;
    
    
    if (properties.type === 'middleware') {
      if (properties.allowed_origins) {
        app.use(cors({ origin: properties.allowed_origins }));
      }
      if (properties.auth_required) {
        app.use(authMiddleware);
      }
    }

    if (properties.endpoint && properties.method) {
      app[properties.method.toLowerCase()](properties.endpoint, (req, res) => {
        res.json({ message: `${properties.endpoint} successful` });
      });
    }
  });
};

// Example JSON Configuration
const config = {
  "nodes": [
    {"id": "1", "name": "Start", "source": null, "target": "2", "properties": {"type": "entry"}}, 
    {"id": "2", "name": "CORS Middleware", "source": "1", "target": "3", "properties": {"type": "middleware", "allowed_origins": ["*"]}}, 
    {"id": "3", "name": "Auth Middleware", "source": "2", "target": ["4", "5", "6", "7"], "properties": {"type": "middleware", "auth_required": true}}, 
    {"id": "4", "name": "Login Route", "source": "3", "target": "8", "properties": {"endpoint": "/login", "method": "POST"}}, 
    {"id": "5", "name": "Signup Route", "source": "3", "target": "9", "properties": {"endpoint": "/signup", "method": "POST"}}, 
    {"id": "6", "name": "Signout Route", "source": "3", "target": "10", "properties": {"endpoint": "/signout", "method": "POST"}}, 
    {"id": "7", "name": "Admin Auth Middleware", "source": "3", "target": "9", "properties": {"type": "middleware", "admin_required": true}}, 
    {"id": "8", "name": "User Route", "source": "4", "target": "12", "properties": {"endpoint": "/user", "method": "GET"}}, 
    {"id": "9", "name": "Admin Route", "source": "7", "target": "13", "properties": {"endpoint": "/admin", "method": "GET"}}, 
    {"id": "10", "name": "Logging Middleware", "source": "5", "target": ["12", "13", "14"], "properties": {"type": "middleware", "log_requests": true}}, 
    {"id": "11", "name": "Home Page", "source": "2", "target": "14", "properties": {"endpoint": "/home", "method": "GET", "auth_required": false}}, 
    {"id": "12", "name": "About Page", "source": "2", "target": "14", "properties": {"endpoint": "/about", "method": "GET", "auth_required": false}}, 
    {"id": "13", "name": "News Page", "source": "2", "target": "14", "properties": {"endpoint": "/news", "method": "GET", "auth_required": false}}, 
    {"id": "14", "name": "Blogs Page", "source": "2", "target": "15", "properties": {"endpoint": "/blogs", "method": "GET", "auth_required": false}}, 
    {"id": "15", "name": "Response Dispatcher", "source": ["10", "11", "12", "13", "14"], "target": "16", "properties": {"type": "dispatcher"}}, 
    {"id": "16", "name": "End", "source": "15", "target": null, "properties": {"type": "exit"}} 
  ]
};

generateRoutes(config);




// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
