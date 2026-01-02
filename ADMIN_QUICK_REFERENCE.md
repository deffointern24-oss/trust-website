# Admin Dashboard Quick Reference

## Quick Access Links
- Admin Dashboard: `/admin`
- Transactions: `/admin#transactions`
- Donors: `/admin#donors`
- Certificates: `/admin#certificates`
- Reports: `/admin#reports`

## Key Features at a Glance

### 📊 Dashboard Statistics
| Metric | What it shows |
|--------|---------------|
| Total Revenue | Sum of all verified donations |
| Total Transactions | Count of all payment records |
| Total Donors | Number of unique donors |
| Pending Certificates | Verified payments without certificates |

### 💳 Transactions Tab
**Search & Filter**: Find transactions by:
- Donor name
- Email address
- Order ID

**Status Filters**:
- All - Show all transactions
- Verified ✓ - Successful, verified payments
- Pending ⏳ - Awaiting verification
- Failed ✗ - Failed transactions

**Quick Actions**:
1. Click on any transaction row to view full details
2. **Send Receipt** - Email payment confirmation to donor
3. **Generate Certificate** - Create tax exemption certificate (verified transactions only)

### 👥 Donors Tab
**View All Donors**: Complete list with:
- Total amount donated
- Number of donations
- Last donation date
- Current status

**Search**: Find donors by name or email

**Donor Profile**:
- View complete donor information
- Send direct emails
- Export donor data

### 📄 Certificates Tab
**Two Sections**:

1. **Pending Certificates** (showing cards)
   - Shows all verified donations without certificates
   - Donor name and amount
   - **Generate & Email** - Auto-create and send certificate
   - **Download** - Get PDF for manual distribution

2. **Issued Certificates** (showing list)
   - All completed certificate issuances
   - Marked with green checkmark

### 📈 Reports Tab
**Revenue Summary**:
- Daily Revenue
- Monthly Revenue
- Year-to-Date Revenue

**Payment Methods**:
- Visual breakdown by method (Card, UPI, Net Banking, Wallet)
- Transaction count and amount per method
- Percentage distribution

**Donation Types**:
- One-Time Donations
- Monthly Recurring

**Export Options**:
- Export to CSV
- Export to PDF
- Refresh Data

---

## Common Tasks

### Task: Issue a Tax Certificate
1. Go to **Certificates** tab
2. Find donor in "Pending Certificates" section
3. Click **Generate & Email** button
4. Certificate will be generated and emailed to donor

### Task: Track a Specific Donor
1. Go to **Donors** tab
2. Search by donor name or email
3. Click eye icon to view full profile
4. See all transactions and total contributions

### Task: Verify a Failed Payment
1. Go to **Transactions** tab
2. Filter by "Failed" status
3. Click transaction to view details
4. Review donor contact info to reach out

### Task: Get Revenue Report
1. Go to **Reports** tab
2. View revenue cards at top
3. See payment method breakdown
4. Click **Export to PDF** for formal report

### Task: Find Recent Donations
1. Go to **Transactions** tab
2. Transactions are listed by date (newest first)
3. Scroll or search for specific dates

---

## Dashboard Walkthrough

### Step 1: Login (Future Feature)
- Visit `/admin`
- Enter credentials
- Dashboard loads with current data

### Step 2: Check Overview
- Review 4 stat cards at top
- See at a glance: revenue, transaction count, donor count, pending work

### Step 3: Navigate Sections
- Use tabs to switch between Transactions, Donors, Certificates, Reports
- Each section is independent

### Step 4: Take Action
- Search/filter data
- Click to view details
- Use action buttons (Send Email, Generate Certificate, etc.)

### Step 5: Export & Report
- Use Reports tab for analytics
- Export data in CSV or PDF
- Share with stakeholders

---

## Data Displayed in Each Section

### Transactions Table Columns
- **Order ID** - Unique order identifier
- **Donor Name** - Who made the donation
- **Amount** - Donation amount in ₹
- **Status** - Verified/Pending/Failed
- **Method** - Card/UPI/NetBanking/Wallet
- **Date** - Transaction date
- **Actions** - View details button

### Donors Table Columns
- **Name** - Donor name
- **Email** - Contact email
- **Total Donations** - Cumulative amount
- **Count** - Number of transactions
- **Last Donation** - Most recent donation date
- **Actions** - View profile button

---

## Tips & Best Practices

✅ **Do's**:
- Check pending certificates daily
- Send receipts to all donors
- Export monthly reports
- Search by email for donor inquiries

❌ **Don'ts**:
- Don't share admin links publicly
- Don't expose sensitive donor data
- Don't delete transaction records
- Don't modify historical data

---

## Need Help?

### What if transactions aren't loading?
1. Refresh the page
2. Check internet connection
3. Try clearing browser cache

### What if certificates won't generate?
1. Verify transaction is marked "Verified"
2. Check donor email is correct
3. Try downloading instead of emailing

### What if I can't find a transaction?
1. Try different search terms
2. Check date range
3. Use filters to narrow down

---

## Security Reminder ⚠️

**Important**: This admin dashboard will require authentication before production use.
- Never share your admin URL
- Always log out when finished
- Don't leave admin dashboard open on shared computers
- Report suspicious activity immediately

---

**Last Updated**: January 2, 2026
**Version**: 1.0
