# Admin Dashboard - Visual Overview

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Admin Dashboard                                                 │
│  Manage transactions, donors, and certificates                  │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total Revenue│ Total Txns   │ Total Donors │ Pending Certs│
│ ₹128,000     │ 40           │ 25           │ 5            │
└──────────────┴──────────────┴──────────────┴──────────────┘

[Transactions] [Donors] [Certificates] [Reports]
```

## Transactions Tab

```
┌─────────────────────────────────────────────────────────────────┐
│ Search: ____________________  Filter: [All Status ▼]            │
├─────────────────────────────────────────────────────────────────┤
│ Order ID    │ Donor Name      │ Amount  │ Status   │ Method  │   │
├─────────────────────────────────────────────────────────────────┤
│ order_1A2B3C│ Rajesh Kumar    │ ₹5,000  │ Verified │ Card    │ 👁│
│ order_4D5E6F│ Priya Singh     │ ₹2,500  │ Pending  │ UPI     │ 👁│
│ order_7G8H9I│ Arjun Patel     │ ₹10,000 │ Verified │ Card    │ 👁│
│ order_9J0K1L│ Sneha Desai     │ ₹1,000  │ Failed   │ NetBank │ 👁│
└─────────────────────────────────────────────────────────────────┘

[Click eye icon to view details]

┌─────────────────────────────────────────────────────────────────┐
│ Transaction Details: order_1A2B3C                            [X] │
├─────────────────────────────────────────────────────────────────┤
│ Order ID: order_1A2B3C        │ Payment ID: pay_1X2Y3Z          │
│ Donor: Rajesh Kumar            │ Email: rajesh@example.com      │
│ Phone: +91-9876543210          │ Amount: ₹5,000                 │
│ Status: [Verified]             │ Certificate: ✓ Issued          │
│                                                                  │
│ [Send Receipt] [Generate Certificate]                           │
└─────────────────────────────────────────────────────────────────┘
```

## Donors Tab

```
┌─────────────────────────────────────────────────────────────────┐
│ Search: ____________________                                    │
├─────────────────────────────────────────────────────────────────┤
│ Name            │ Email                  │ Total    │ Count │   │
├─────────────────────────────────────────────────────────────────┤
│ Rajesh Kumar    │ rajesh@example.com     │ ₹15,000  │ 3    │ 👁│
│ Priya Singh     │ priya@example.com      │ ₹5,000   │ 2    │ 👁│
│ Arjun Patel     │ arjun@example.com      │ ₹10,000  │ 1    │ 👁│
└─────────────────────────────────────────────────────────────────┘

[Click eye icon to view profile]

┌─────────────────────────────────────────────────────────────────┐
│ Donor Profile: Rajesh Kumar                                 [X] │
├─────────────────────────────────────────────────────────────────┤
│ Name: Rajesh Kumar                │ Email: rajesh@example.com   │
│ Phone: +91-9876543210             │ Status: [Active]            │
│ Total Contributions: ₹15,000       │ Donation Count: 3           │
│                                                                  │
│ [Send Email] [Export Data]                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Certificates Tab

```
PENDING CERTIFICATES (5)

┌──────────────────────┐  ┌──────────────────────┐
│ Rajesh Kumar         │  │ Priya Singh          │
│ +91-9876543210       │  │ +91-8765432109       │
│ ₹5,000               │  │ ₹2,500               │
│                      │  │                      │
│ [Generate & Email]   │  │ [Generate & Email]   │
│ [Download]           │  │ [Download]           │
└──────────────────────┘  └──────────────────────┘
[More cards...]

ISSUED CERTIFICATES

✓ Rajesh Kumar        ₹5,000   Jan 2, 2025
✓ Arjun Patel        ₹10,000  Dec 31, 2024
```

## Reports Tab

```
REVENUE SUMMARY

┌──────────────────┬──────────────────┬──────────────────┐
│ Daily Revenue    │ Monthly Revenue  │ Year-to-Date     │
│ ₹5,000           │ ₹45,000          │ ₹128,000         │
└──────────────────┴──────────────────┴──────────────────┘

PAYMENT METHODS BREAKDOWN

Credit/Debit Card: ████████████████░░ 48% (18 txns, ₹62,500)
UPI:               ██████████░░░░░░░░ 30% (12 txns, ₹38,000)
Net Banking:       ███████░░░░░░░░░░░ 19% (8 txns, ₹25,000)
Wallet:            ░░░░░░░░░░░░░░░░░░  2% (2 txns, ₹2,500)

DONATION TYPES

┌──────────────────┬──────────────────┐
│ One-Time         │ Monthly Recurring │
│ 28 donations     │ 12 subscriptions  │
│ ₹95,000          │ ₹33,000           │
└──────────────────┴──────────────────┘

[Export to CSV] [Export to PDF] [Refresh Data]
```

## Feature Matrix

| Feature | Transactions | Donors | Certificates | Reports |
|---------|:-----:|:----:|:----------:|:-----:|
| View List | ✓ | ✓ | ✓ | ✓ |
| Search | ✓ | ✓ | - | - |
| Filter | ✓ | - | - | - |
| View Details | ✓ | ✓ | - | - |
| Send Email | ✓ | ✓ | - | - |
| Generate Cert | ✓ | - | ✓ | - |
| Email Cert | - | - | ✓ | - |
| Download Cert | - | - | ✓ | - |
| Export Data | - | ✓ | - | ✓ |
| Analytics | - | - | - | ✓ |
| Statistics | - | - | - | ✓ |

## Color Coding

- **Verified** (Green) - Transaction successfully completed
- **Pending** (Yellow) - Awaiting action or confirmation
- **Failed** (Red) - Transaction failed or error occurred
- **Active** (Green) - Donor account is active
- **Issued** (Green checkmark) - Certificate generated and sent

## Mobile Responsive

```
┌─────────────┐
│ Admin       │
│ Dashboard   │
├─────────────┤
│[Txns▼]      │
├─────────────┤
│ [Search...]│
├─────────────┤
│ Stat Cards  │
│ Stack down  │
├─────────────┤
│ Table scrolls
│ horizontally
├─────────────┤
│ Details     │
│ expand modal
└─────────────┘
```

## Navigation Flow

```
                     /admin
                       |
        ┌──────────┬───┴───┬──────────┬─────────┐
        |          |       |          |         |
   Transactions  Donors  Certificates Reports  |
        |          |       |          |         |
        ├─Search   ├─List  ├─Pending  ├─Summary│
        ├─Filter   ├─Search├─Issued   ├─Methods│
        ├─View     ├─View  ├─Generate ├─Types  │
        ├─Details  ├─Profile├─Email    ├─Export│
        └─Actions  └─Actions└─Download └─Stats │
```

## Data Flow

```
┌─────────────────────────────────┐
│   Admin Dashboard Frontend      │
│  (Mock Data for Demo)           │
└──────────────────┬──────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────┐          ┌────▼────┐
    │Display │          │ Filter &│
    │Data    │          │ Search  │
    └────┬───┘          └────┬────┘
         │                   │
    ┌────▼───────────────────▼────┐
    │ Show Details / Take Actions  │
    └────┬───────────────────┬────┘
         │                   │
    ┌────▼────┐          ┌──▼─────┐
    │  Modal  │          │Confirm │
    │  View   │          │ Action │
    └─────────┘          └────────┘

[Future] Backend API Integration
    ↓
[Replace Mock Data with Real API Calls]
```

## Key Statistics Available

### At a Glance
- Total Revenue: ₹128,000
- Total Transactions: 40
- Successful Transactions: 35 (87.5%)
- Donors: 25
- Active Donors: 25 (100%)
- Pending Certificates: 5
- Average Donation: ₹3,200
- Highest Donation: ₹10,000
- Lowest Donation: ₹1,000

### By Method
- Card: 45% (₹62,500)
- UPI: 30% (₹38,000)
- Net Banking: 19% (₹25,000)
- Wallet: 2% (₹2,500)

### By Type
- One-Time: 70% (28 donations)
- Monthly: 30% (12 subscriptions)

## User Actions Available

### Transaction Actions
- ✓ View Details
- ✓ Send Receipt Email
- ✓ Generate Certificate
- ✓ Download Receipt
- ✓ Verify Signature (future)
- ✓ Mark as Reconciled (future)

### Donor Actions
- ✓ View Profile
- ✓ View All Transactions
- ✓ Send Email
- ✓ Export Data
- ✓ View Contact Info

### Certificate Actions
- ✓ View Pending
- ✓ Generate Certificate
- ✓ Email Certificate
- ✓ Download Certificate
- ✓ View Issued History

### Report Actions
- ✓ View Summary Statistics
- ✓ View Revenue Analytics
- ✓ View Payment Method Breakdown
- ✓ Export to CSV
- ✓ Export to PDF
- ✓ Refresh Data

---

**Visual Overview Created**: January 2, 2026
**Admin Dashboard Version**: 1.0
**Status**: Ready for Backend Integration
