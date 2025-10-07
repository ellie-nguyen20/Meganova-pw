/**
 * Admin panel endpoints
 */

// Admin Endpoints
export const ADMIN_ENDPOINTS = {
  // Authentication
  ADMIN_LOGIN: '/login',
  
  // Main Admin Pages
  ADMIN_DASHBOARD: '/dashboard',
  PROMO_CODES: '/promo-codes',
  USER_MANAGEMENT: '/admin/users',
  SYSTEM_MONITORING: '/admin/monitoring',
  BILLING_MANAGEMENT: '/admin/billing',
  INSTANCE_MANAGEMENT: '/admin/instances',
  API_KEYS_MANAGEMENT: '/admin/api-keys',
  TEAM_MANAGEMENT: '/admin/teams',
  AUDIT_LOGS: '/admin/audit-logs',
  SYSTEM_SETTINGS: '/admin/settings',
  REPORTS: '/admin/reports',
  SUPPORT_TICKETS: '/admin/support',
  
  // User Management
  USER_DETAILS: '/admin/users/:id',
  USER_EDIT: '/admin/users/:id/edit',
  USER_CREATE: '/admin/users/create',
  
  // System Management
  SYSTEM_HEALTH: '/admin/system/health',
  SYSTEM_LOGS: '/admin/system/logs',
  SYSTEM_BACKUP: '/admin/system/backup',
  
  // Billing Management
  BILLING_OVERVIEW: '/admin/billing/overview',
  PAYMENT_METHODS: '/admin/billing/payment-methods',
  INVOICES: '/admin/billing/invoices',
  REFUNDS: '/admin/billing/refunds',
};
