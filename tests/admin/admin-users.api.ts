// import { test, expect } from '@playwright/test';
// const creds = require('../../fixtures/credential.json');

// test.describe('Admin Users API', () => {
//   let authToken: string;

//   test.beforeAll(async ({ request }) => {
//     // Login to get admin token
//     const loginResponse = await request.post('/auth/login', {
//       data: {
//         email: creds.valid.email,
//         password: creds.valid.password
//       }
//     });
    
//     expect(loginResponse.ok()).toBeTruthy();
//     const loginData = await loginResponse.json();
//     authToken = loginData.token;
//   });

//   test('should get all users', async ({ request }) => {
//     const response = await request.get('/admin/users', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const users = await response.json();
//     expect(Array.isArray(users)).toBeTruthy();
//   });

//   test('should get user by ID', async ({ request }) => {
//     const userId = 'test-user-id'; // Replace with actual user ID
    
//     const response = await request.get(`/admin/users/${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const user = await response.json();
//     expect(user).toHaveProperty('id');
//     expect(user).toHaveProperty('email');
//   });

//   test('should create new user', async ({ request }) => {
//     const newUser = {
//       email: 'newuser@example.com',
//       password: 'password123',
//       username: 'New User',
//       tier: 'exp tier1'
//     };

//     const response = await request.post('/admin/users', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`,
//         'Content-Type': 'application/json'
//       },
//       data: newUser
//     });

//     expect(response.ok()).toBeTruthy();
//     const createdUser = await response.json();
//     expect(createdUser.email).toBe(newUser.email);
//   });

//   test('should update user', async ({ request }) => {
//     const userId = 'test-user-id'; // Replace with actual user ID
//     const updateData = {
//       username: 'Updated Username',
//       tier: 'eng tier2'
//     };

//     const response = await request.put(`/admin/users/${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${authToken}`,
//         'Content-Type': 'application/json'
//       },
//       data: updateData
//     });

//     expect(response.ok()).toBeTruthy();
//     const updatedUser = await response.json();
//     expect(updatedUser.username).toBe(updateData.username);
//   });

//   test('should delete user', async ({ request }) => {
//     const userId = 'test-user-id'; // Replace with actual user ID

//     const response = await request.delete(`/admin/users/${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//   });

//   test('should get user statistics', async ({ request }) => {
//     const response = await request.get('/admin/users/statistics', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const stats = await response.json();
//     expect(stats).toHaveProperty('totalUsers');
//     expect(stats).toHaveProperty('activeUsers');
//     expect(stats).toHaveProperty('newUsersThisMonth');
//   });
// });
