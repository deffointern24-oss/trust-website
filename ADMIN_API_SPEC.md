# Admin Dashboard - Backend Implementation Guide

## Overview
This document provides guidance for backend developers implementing API endpoints that the admin dashboard expects.

## Current Status
- **Frontend**: ✅ Complete and fully functional
- **Backend APIs**: ⏳ To be implemented
- **Authentication**: ⏳ To be implemented

## API Endpoints Required

### Base URL
All endpoints use the base path: `/api/admin`

---

## Transaction Endpoints

### 1. Get All Transactions
```
GET /api/admin/transactions
```

**Query Parameters**:
```typescript
{
  page?: number;           // Pagination page (default: 1)
  limit?: number;          // Results per page (default: 20)
  status?: string;         // Filter: "verified" | "pending" | "failed"
  search?: string;         // Search in name, email, orderId
  startDate?: string;      // ISO date format
  endDate?: string;        // ISO date format
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "TXN001",
        "orderId": "order_1A2B3C",
        "paymentId": "pay_1X2Y3Z",
        "donorName": "John Doe",
        "email": "john@example.com",
        "phone": "+91-9876543210",
        "amount": 5000,
        "currency": "INR",
        "status": "verified",
        "paymentMethod": "card",
        "donationType": "one-time",
        "createdAt": "2025-01-02T10:30:00Z",
        "certificateIssued": true
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### 2. Get Single Transaction
```
GET /api/admin/transactions/:transactionId
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "TXN001",
    "orderId": "order_1A2B3C",
    "paymentId": "pay_1X2Y3Z",
    "donorName": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "amount": 5000,
    "currency": "INR",
    "status": "verified",
    "paymentMethod": "card",
    "donationType": "one-time",
    "createdAt": "2025-01-02T10:30:00Z",
    "certificateIssued": true,
    "razorpaySignature": "signature_hash",
    "notes": "optional admin notes"
  }
}
```

### 3. Verify Transaction Signature
```
POST /api/admin/transactions/:transactionId/verify
```

**Request Body**:
```json
{
  "razorpay_order_id": "order_1A2B3C",
  "razorpay_payment_id": "pay_1X2Y3Z",
  "razorpay_signature": "signature_hash"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Transaction verified successfully",
  "data": {
    "id": "TXN001",
    "status": "verified",
    "verifiedAt": "2025-01-02T10:30:00Z"
  }
}
```

### 4. Send Receipt Email
```
POST /api/admin/transactions/:transactionId/send-receipt
```

**Request Body**:
```json
{
  "recipientEmail": "john@example.com",
  "includeInvoice": true,
  "customMessage": "Thank you for your donation"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Receipt email sent successfully",
  "data": {
    "transactionId": "TXN001",
    "sentTo": "john@example.com",
    "sentAt": "2025-01-02T10:30:00Z"
  }
}
```

---

## Donor Endpoints

### 1. Get All Donors
```
GET /api/admin/donors
```

**Query Parameters**:
```typescript
{
  page?: number;        // Default: 1
  limit?: number;       // Default: 20
  search?: string;      // Search in name, email
  status?: string;      // "active" | "inactive"
  sortBy?: string;      // "totalDonations" | "donationCount" | "lastDonation"
  sortOrder?: string;   // "asc" | "desc"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "donors": [
      {
        "id": "DONOR001",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91-9876543210",
        "totalDonations": 15000,
        "donationCount": 3,
        "lastDonation": "2025-01-02",
        "status": "active",
        "createdAt": "2024-12-01T00:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 20
  }
}
```

### 2. Get Donor Profile
```
GET /api/admin/donors/:donorId
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "DONOR001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "totalDonations": 15000,
    "donationCount": 3,
    "lastDonation": "2025-01-02",
    "status": "active",
    "createdAt": "2024-12-01T00:00:00Z",
    "transactions": [
      {
        "id": "TXN001",
        "amount": 5000,
        "date": "2025-01-02",
        "status": "verified"
      }
    ]
  }
}
```

### 3. Get Donor Transactions
```
GET /api/admin/donors/:donorId/transactions
```

**Response**:
```json
{
  "success": true,
  "data": {
    "donorId": "DONOR001",
    "donorName": "John Doe",
    "transactions": [
      {
        "id": "TXN001",
        "orderId": "order_1A2B3C",
        "amount": 5000,
        "status": "verified",
        "createdAt": "2025-01-02"
      }
    ],
    "totalAmount": 15000,
    "totalCount": 3
  }
}
```

### 4. Send Email to Donor
```
POST /api/admin/donors/:donorId/send-email
```

**Request Body**:
```json
{
  "subject": "Thank you for your support",
  "body": "Email content here",
  "emailType": "custom" | "receipt" | "update" | "appeal"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "donorId": "DONOR001",
    "sentTo": "john@example.com",
    "sentAt": "2025-01-02T10:30:00Z"
  }
}
```

---

## Certificate Endpoints

### 1. Get Pending Certificates
```
GET /api/admin/certificates/pending
```

**Response**:
```json
{
  "success": true,
  "data": {
    "pending": [
      {
        "transactionId": "TXN001",
        "donorName": "John Doe",
        "email": "john@example.com",
        "amount": 5000,
        "createdAt": "2025-01-02",
        "daysSinceDonation": 1
      }
    ],
    "total": 5
  }
}
```

### 2. Generate Certificate
```
POST /api/admin/certificates/:transactionId/generate
```

**Request Body**:
```json
{
  "format": "pdf" | "html",
  "includeQrCode": true,
  "certificateNumber": "AUTO" | "custom_number"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Certificate generated successfully",
  "data": {
    "transactionId": "TXN001",
    "certificateNumber": "CERT-2025-001",
    "generatedAt": "2025-01-02T10:30:00Z",
    "fileUrl": "/certificates/CERT-2025-001.pdf"
  }
}
```

### 3. Email Certificate
```
POST /api/admin/certificates/:transactionId/email
```

**Request Body**:
```json
{
  "recipientEmail": "john@example.com",
  "customMessage": "Your tax-exemption certificate"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Certificate emailed successfully",
  "data": {
    "transactionId": "TXN001",
    "sentTo": "john@example.com",
    "sentAt": "2025-01-02T10:30:00Z"
  }
}
```

### 4. Download Certificate
```
GET /api/admin/certificates/:certificateId/download
```

**Response**: Binary PDF file

---

## Report Endpoints

### 1. Get Dashboard Summary
```
GET /api/admin/reports/summary
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalRevenue": 128000,
    "totalTransactions": 40,
    "verifiedTransactions": 35,
    "pendingTransactions": 3,
    "failedTransactions": 2,
    "totalDonors": 25,
    "pendingCertificates": 5
  }
}
```

### 2. Get Revenue Analytics
```
GET /api/admin/reports/revenue
```

**Query Parameters**:
```typescript
{
  period: "daily" | "weekly" | "monthly" | "yearly",
  startDate?: string,
  endDate?: string
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "period": "monthly",
    "daily": 5000,
    "weekly": 35000,
    "monthly": 128000,
    "yearly": 128000,
    "chart": [
      {
        "date": "2025-01-01",
        "revenue": 8000,
        "transactionCount": 5
      }
    ]
  }
}
```

### 3. Get Payment Methods Breakdown
```
GET /api/admin/reports/methods
```

**Response**:
```json
{
  "success": true,
  "data": {
    "methods": [
      {
        "method": "card",
        "count": 18,
        "amount": 62500,
        "percentage": 48
      },
      {
        "method": "upi",
        "count": 12,
        "amount": 38000,
        "percentage": 30
      },
      {
        "method": "netbanking",
        "count": 8,
        "amount": 25000,
        "percentage": 19
      },
      {
        "method": "wallet",
        "count": 2,
        "amount": 2500,
        "percentage": 2
      }
    ],
    "total": 40
  }
}
```

### 4. Export Data
```
GET /api/admin/reports/export
```

**Query Parameters**:
```typescript
{
  format: "csv" | "pdf",
  dataType: "transactions" | "donors" | "all",
  startDate?: string,
  endDate?: string
}
```

**Response**: Binary file (CSV or PDF)

---

## Error Responses

All endpoints should return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional context if applicable"
  }
}
```

### Common Error Codes
- `NOT_FOUND`: Resource doesn't exist
- `UNAUTHORIZED`: User not authenticated
- `FORBIDDEN`: User doesn't have permission
- `BAD_REQUEST`: Invalid request parameters
- `INTERNAL_ERROR`: Server-side error

---

## Authentication & Authorization

### Implementation Notes
1. All `/api/admin/*` endpoints should require authentication
2. Use JWT tokens or session-based authentication
3. Implement role-based access control (RBAC):
   - **Admin**: Full access
   - **Finance**: View reports, verify transactions
   - **Support**: View donors, send emails, generate certificates
   - **Viewer**: Read-only access

### Example Header
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Rate Limiting

Recommended rate limits for admin endpoints:
- Transactions: 100 requests/minute
- Donors: 100 requests/minute
- Certificates: 50 requests/minute (due to PDF generation)
- Reports: 30 requests/minute
- Email: 10 requests/minute (prevent spam)

---

## Logging & Audit Trail

Log all admin actions for security and compliance:
```typescript
{
  adminId: string;
  action: string;           // "view", "send_email", "generate_certificate"
  resource: string;         // "transaction", "donor", "certificate"
  resourceId: string;
  timestamp: Date;
  ipAddress: string;
  details: object;
}
```

---

## Testing Checklist

- [ ] All endpoints return correct response format
- [ ] Pagination works correctly
- [ ] Search/filter functionality works
- [ ] Authentication is enforced
- [ ] Error handling returns appropriate codes
- [ ] Email sending works (use test email)
- [ ] Certificate generation produces valid PDFs
- [ ] Data export (CSV/PDF) works
- [ ] Rate limiting is enforced
- [ ] Audit logs are created for all actions

---

## Integration with Frontend

The admin dashboard uses these standard fetch patterns:

```typescript
// GET request
const response = await fetch('/api/admin/transactions');
const data = await response.json();

// POST request
const response = await fetch('/api/admin/transactions/TXN001/send-receipt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ recipientEmail: 'user@example.com' })
});
const data = await response.json();
```

---

## Future Enhancements

1. **Bulk Operations API**
   - `POST /api/admin/transactions/bulk-verify`
   - `POST /api/admin/certificates/bulk-generate`
   - `POST /api/admin/donors/bulk-email`

2. **Advanced Filtering API**
   - More complex query parameters
   - Custom date range filters
   - Amount range filters

3. **Webhook Management**
   - View webhook delivery history
   - Resend failed webhooks
   - Configure webhook retries

4. **Analytics API**
   - Trend analysis
   - Donor lifetime value calculations
   - Retention metrics

---

**Last Updated**: January 2, 2026
**Version**: 1.0
**Status**: Documentation Complete, Implementation Pending
