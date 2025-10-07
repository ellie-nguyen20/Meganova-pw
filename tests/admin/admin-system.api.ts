// import { test, expect } from '@playwright/test';
// const creds = require('../../fixtures/credential.json');

// test.describe('Admin System API', () => {
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

//   test('should get system health status', async ({ request }) => {
//     const response = await request.get('/admin/system/health', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const health = await response.json();
//     expect(health).toHaveProperty('status');
//     expect(['healthy', 'warning', 'critical']).toContain(health.status);
//   });

//   test('should get system metrics', async ({ request }) => {
//     const response = await request.get('/admin/system/metrics', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const metrics = await response.json();
//     expect(metrics).toHaveProperty('cpuUsage');
//     expect(metrics).toHaveProperty('memoryUsage');
//     expect(metrics).toHaveProperty('diskUsage');
//   });

//   test('should get system logs', async ({ request }) => {
//     const response = await request.get('/admin/system/logs', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const logs = await response.json();
//     expect(Array.isArray(logs)).toBeTruthy();
//   });

//   test('should get audit logs', async ({ request }) => {
//     const response = await request.get('/admin/audit-logs', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const auditLogs = await response.json();
//     expect(Array.isArray(auditLogs)).toBeTruthy();
//   });

//   test('should get billing overview', async ({ request }) => {
//     const response = await request.get('/admin/billing/overview', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const billing = await response.json();
//     expect(billing).toHaveProperty('totalRevenue');
//     expect(billing).toHaveProperty('monthlyRevenue');
//     expect(billing).toHaveProperty('activeSubscriptions');
//   });

//   test('should get instance statistics', async ({ request }) => {
//     const response = await request.get('/admin/instances/statistics', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const stats = await response.json();
//     expect(stats).toHaveProperty('totalInstances');
//     expect(stats).toHaveProperty('activeInstances');
//     expect(stats).toHaveProperty('runningInstances');
//   });
// });
