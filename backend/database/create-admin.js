// Create Admin User Script
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    console.log('🔐 Creating Admin User...\n');

    try {
        // Connect to database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'next_level_games',
            port: process.env.DB_PORT || 3306,
        });

        console.log('✅ Connected to database');

        // Check if users table exists
        const [tables] = await connection.query(
            "SHOW TABLES LIKE 'users'"
        );

        if (tables.length === 0) {
            console.log('⚠️  Users table does not exist. Creating it...');
            await connection.query(`
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) UNIQUE NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) DEFAULT 'admin',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('✅ Users table created');
        }

        // Admin credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@nextlevelgames.com';
        
        if (!adminUsername || !adminPassword) {
            console.error('❌ ERROR: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
            console.log('   Example: ADMIN_USERNAME=youradmin');
            console.log('   Example: ADMIN_PASSWORD=yoursecurepassword');
            process.exit(1);
        }
        
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Check if admin already exists
        const [existingUsers] = await connection.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [adminUsername, adminEmail]
        );

        if (existingUsers.length > 0) {
            console.log('⚠️  Admin user already exists. Updating password...');
            await connection.query(
                'UPDATE users SET password = ?, role = ? WHERE username = ? OR email = ?',
                [hashedPassword, 'admin', adminUsername, adminEmail]
            );
            console.log('✅ Admin password updated');
        } else {
            // Insert new admin user
            await connection.query(
                'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                [adminUsername, adminEmail, hashedPassword, 'admin']
            );
            console.log('✅ Admin user created successfully');
        }

        console.log('\n📋 Admin Credentials:');
        console.log(`   Username: ${adminUsername}`);
        console.log('   Password: (set in your .env file)');
        console.log(`   Email: ${adminEmail}`);
        console.log('   ⚠️  Keep these credentials secure!\n');

        // Verify the user was created
        const [users] = await connection.query(
            'SELECT id, username, email, role FROM users WHERE username = ?',
            [adminUsername]
        );

        if (users.length > 0) {
            console.log('✅ Verification: Admin user exists in database');
            console.log('   User details:', users[0]);
        }

        await connection.end();
        console.log('\n✅ Complete! You can now login at http://localhost:3001\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

createAdminUser();
