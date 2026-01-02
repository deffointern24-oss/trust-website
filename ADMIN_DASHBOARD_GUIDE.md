# Admin Dashboard Guide

## Overview
The Admin Dashboard is a comprehensive management interface for handling all aspects of donations, donors, and financial operations for ArulEducation Trust.

## Accessing the Admin Dashboard
- **URL**: `http://localhost:5173/admin` (during development)
- **Production URL**: `https://aruleducation.in/admin` (to be secured with authentication)

## Features

### 1. Dashboard Overview
The main dashboard displays key statistics at a glance:
- **Total Revenue**: Aggregate amount from all verified transactions
- **Total Transactions**: Count of all payment transactions
- **Total Donors**: Number of active donors
- **Pending Certificates**: Number of tax certificates waiting to be issued

### 2. Transaction Management
Manage all payment transactions with the following features:

#### View Transactions
- Display all transactions in a sortable, filterable table
- See order ID, donor name, amount, status, payment method, and date
- Search by donor name, email, or order ID
- Filter by transaction status (All, Verified, Pending, Failed)

#### Transaction Details
Click on any transaction to view complete details:
- Order ID and Payment ID
- Donor information (name, email, phone)
- Amount and currency
- Transaction status
- Certificate issuance status
- Actions:
  - **Send Receipt**: Email payment receipt to donor
  - **Generate Certificate**: Create and send tax certificate (for verified transactions)

### 3. Donor Management
Track and manage all donors and their contribution history:

#### Donor Directory
- View all donors in a searchable table
- See total donations, donation count, and last donation date
- Search by name or email
- View donor status (active/inactive)

#### Donor Profile
Click on any donor to view their complete profile:
- Personal information (name, email, phone)
- Account status
- Total contribution amount
- Total donation count
- Available actions:
  - **Send Email**: Direct email communication with donor
  - **Export Data**: Download donor's transaction data

### 4. Certificate Management
Manage tax-exemption certificates for donors:

#### Pending Certificates
- View all verified donations awaiting certificate generation
- Shows donor name, email, and donation amount
- Quick actions to:
  - **Generate & Email**: Automatically create and email tax certificate
  - **Download**: Get certificate as PDF for manual distribution

#### Issued Certificates
- View history of all issued certificates
- See donor name, amount, and issuance date
- Green checkmark indicates completed issuance

### 5. Financial Reports
Access comprehensive financial analytics and reports:

#### Revenue Summary
- **Daily Revenue**: Today's transaction total
- **Monthly Revenue**: Current month's total
- **Year-to-Date Revenue**: Cumulative annual total

#### Payment Methods Breakdown
- Visualize distribution of transactions by payment method:
  - Credit/Debit Card
  - UPI
  - Net Banking
  - Wallet
- Shows transaction count, amount, and percentage share
- Visual progress bar for each method

#### Donation Types
- One-Time Donations: Count and total amount
- Monthly Recurring: Count and total amount

#### Export Options
- **Export to CSV**: Export all transaction data
- **Export to PDF**: Generate formal financial report
- **Refresh Data**: Update all statistics

## Data Structure

### Transaction Object
```typescript
{
  id: string;              // Unique transaction ID
  orderId: string;         // Razorpay order ID
  paymentId: string;       // Razorpay payment ID
  donorName: string;
  email: string;
  phone: string;
  amount: number;          // Amount in INR
  currency: string;        // Currency code (INR)
  status: "verified" | "pending" | "failed";
  paymentMethod: "card" | "upi" | "netbanking" | "wallet";
  donationType: "one-time" | "monthly";
  createdAt: string;       // ISO date string
  certificateIssued: boolean;
}
```

### Donor Object
```typescript
{
  id: string;              // Unique donor ID
  name: string;
  email: string;
  phone: string;
  totalDonations: number;  // Total amount contributed
  donationCount: number;   // Number of transactions
  lastDonation: string;    // ISO date string
  status: "active" | "inactive";
}
```

## Best Practices

### Security Considerations
⚠️ **Important**: The current admin dashboard does not include authentication. Before deploying to production:
1. Implement role-based access control (RBAC)
2. Add authentication middleware
3. Use environment variables for admin URLs
4. Log all admin actions for audit trails
5. Implement rate limiting on admin endpoints

### Daily Operations
1. **Check Pending Transactions**: Monitor failed transactions and follow up with donors
2. **Issue Certificates**: Generate and email certificates daily for verified donations
3. **Send Receipts**: Ensure all donors receive payment receipts
4. **Review Reports**: Check daily/monthly reports for anomalies

### Data Maintenance
- Regularly export transaction data for backup
- Archive old transactions (>12 months) if needed
- Update donor status based on activity
- Clean up test transactions before production

## Integration with Backend

The admin dashboard expects the following backend endpoints:

### Transaction Endpoints
- `GET /api/admin/transactions` - List all transactions with pagination
- `GET /api/admin/transactions/:id` - Get transaction details
- `POST /api/admin/transactions/:id/verify` - Manually verify transaction
- `POST /api/admin/transactions/:id/send-receipt` - Send receipt email

### Donor Endpoints
- `GET /api/admin/donors` - List all donors
- `GET /api/admin/donors/:id` - Get donor profile
- `GET /api/admin/donors/:id/transactions` - Get donor's transactions
- `POST /api/admin/donors/:id/send-email` - Send email to donor

### Certificate Endpoints
- `GET /api/admin/certificates/pending` - List pending certificates
- `POST /api/admin/certificates/:id/generate` - Generate certificate
- `POST /api/admin/certificates/:id/email` - Email certificate to donor
- `GET /api/admin/certificates/:id/download` - Download certificate PDF

### Report Endpoints
- `GET /api/admin/reports/summary` - Get dashboard statistics
- `GET /api/admin/reports/revenue` - Get revenue analytics
- `GET /api/admin/reports/methods` - Get payment method breakdown
- `GET /api/admin/reports/export` - Export data (CSV/PDF)

## Future Enhancements

1. **Authentication System**
   - Admin login with JWT tokens
   - Two-factor authentication (2FA)
   - Password reset functionality

2. **Advanced Filtering**
   - Date range filters
   - Amount range filters
   - Multiple status selection

3. **Bulk Operations**
   - Bulk certificate generation
   - Bulk email sending
   - Batch transaction verification

4. **Analytics Dashboard**
   - Charts and graphs for trends
   - Monthly/yearly comparisons
   - Donor retention metrics
   - Payment success rates

5. **Webhook Management**
   - View webhook logs
   - Resend failed webhooks
   - Configure webhook preferences

6. **User Management**
   - Create/manage admin accounts
   - Set role permissions
   - Activity logging

## Troubleshooting

### Transactions Not Loading
- Check backend API connectivity
- Verify `VITE_API_BASE` environment variable
- Check browser console for errors

### Certificates Not Generating
- Ensure backend has PDF generation library installed
- Check email configuration in backend
- Verify donor email addresses are valid

### Export Fails
- Check file system permissions
- Ensure backend has export library installed
- Verify sufficient disk space

## Support
For issues or feature requests, contact the development team or create an issue in the repository.
