const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/diamond-filter', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Get admin details from command line arguments or use defaults
    const username = process.argv[2] || 'admin';
    const email = process.argv[3] || 'admin@example.com';
    const password = process.argv[4] || 'admin123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      console.log('❌ Admin already exists with this email or username');
      process.exit(1);
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password,
    });

    console.log('✅ Admin created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Username:', admin.username);
    console.log('🔑 Password:', password);
    console.log('\n💡 You can now login at: http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();

