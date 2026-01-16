// Database Setup Script
// Run this to create the database and tables automatically
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    console.log('🚀 Starting Database Setup...\n');

    try {
        const dbName = process.env.DB_NAME || 'next_level_games';

        // 1. Initial connection to create database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306,
        });

        console.log('✅ Connected to MySQL Server');

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log(`✅ Database '${dbName}' created/verified`);
        await connection.end();

        // 2. Connect specifically to the DB with multipleStatements enabled
        const dbConnection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306,
            database: dbName,
            multipleStatements: true
        });

        console.log(`✅ Connected specifically to '${dbName}' database with multipleStatements enabled`);

        // Read schema.sql
        const schemaPath = path.join(__dirname, 'schema.sql');
        let schema = fs.readFileSync(schemaPath, 'utf8');

        // Generate hashed password for admin from environment variables
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        if (!adminUsername || !adminPassword) {
            console.error('❌ ERROR: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
            process.exit(1);
        }
        
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Replace placeholders
        schema = schema.replace(/\$2a\$10\$YourHashedPasswordHere/g, hashedPassword);
        schema = schema.replace(/'admin'/g, `'${adminUsername}'`);

        // Execute schema
        await dbConnection.query(schema);
        console.log('✅ Database schema and tables created successfully');

        console.log('\n📋 Admin Credentials Created:');
        console.log(`   Username: ${adminUsername}`);
        console.log('   Password: (set in your .env file)');
        console.log('   ✅ Credentials loaded from environment variables\n');

        await dbConnection.end();
        console.log('✅ Database setup completed successfully!\n');

    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        process.exit(1);
    }
}

setupDatabase();
