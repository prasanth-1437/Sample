const express = require('express');
     const mongoose = require('mongoose');
     const cors = require('cors');
     require('dotenv').config();

     const app = express();

     // Middleware
     app.use(cors());
     app.use(express.json());

     // MongoDB Connection
     console.log('Attempting to connect to MongoDB...');
     mongoose.connect(process.env.MONGO_URI)
       .then(() => console.log('MongoDB connected successfully'))
       .catch(err => {
         console.error('MongoDB connection failed:', err.message);
         process.exit(1);
       });

     // Member Schema
     const memberSchema = new mongoose.Schema({
       name: String,
       age: Number
     });
     const Member = mongoose.model('Member', memberSchema);

     // Routes
     app.get('/api/members', async (req, res) => {
       try {
         const members = await Member.find();
         res.json(members);
       } catch (err) {
         console.error('Error fetching members:', err.message);
         res.status(500).json({ error: err.message });
       }
     });

     app.post('/api/members', async (req, res) => {
       try {
         const { name, age } = req.body;
         console.log(req.body)
         const member = new Member({ name, age });
         await member.save();
         res.json(member);
       } catch (err) {
         console.error('Error saving member:', err.message);
         res.status(500).json({ error: err.message });
       }
     });

     // Start Server
     const port = process.env.PORT || 5000;
     app.listen(port, () => console.log(`Server running on port ${port}`));