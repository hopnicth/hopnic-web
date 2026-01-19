# 🧪 Mock Mode Testing Guide

**Date:** 2026-01-19  
**Purpose:** Test Portfolio System UI without database

---

## 📋 Overview

Mock Mode allows you to test the Portfolio Management System's UI and functionality **without requiring a PostgreSQL database**. This is perfect for:

- ✅ Testing UI/UX
- ✅ Demonstrating features
- ✅ Development without Docker
- ✅ Quick prototyping

---

## 🎯 What Works in Mock Mode

### ✅ Fully Functional

#### **Public Portfolio Pages**
- ✅ Portfolio list page (`/portfolio`)
- ✅ Tag filtering (Design, ME, Automation, PLC & Control)
- ✅ Project cards with images
- ✅ Portfolio detail page (`/portfolio/[id]`)
- ✅ Image gallery with navigation
- ✅ Responsive design

#### **Dashboard (Read-Only)**
- ✅ Dashboard home with statistics
- ✅ Projects list view
- ✅ View project details

#### **Authentication**
- ✅ Login page
- ✅ Logout functionality
- ✅ Session management
- ✅ Protected routes

---

## 🚫 What Doesn't Work in Mock Mode

### ❌ Disabled Features

- ❌ Create new projects
- ❌ Edit existing projects
- ❌ Delete projects
- ❌ Upload images
- ❌ Delete images

**Reason:** These operations require database connection.

---

## 📊 Mock Data

### Sample Projects (4 projects)

1. **ระบบ Automation สำหรับโรงงานผลิตอาหาร**
   - Tags: Automation, PLC & Control
   - Images: 2 images

2. **ออกแบบเครื่องจักร Custom Machine**
   - Tags: Design, ME
   - Images: 1 image

3. **ระบบ SCADA สำหรับโรงงานน้ำ**
   - Tags: Automation, PLC & Control
   - Images: 3 images

4. **ออกแบบ Conveyor System**
   - Tags: Design, ME, Automation
   - Images: 1 image

### Statistics
- Total Projects: 4
- Total Images: 7
- This Month: 2

---

## 🚀 How to Use Mock Mode

### 1. Start Development Server

```bash
npm run dev
```

Server will start at: **http://localhost:5174**

### 2. Test Public Pages

#### Portfolio List
```
http://localhost:5174/portfolio
```

**Test:**
- Click on "All" to see all projects
- Click on "Design" to filter design projects
- Click on "ME" to filter mechanical engineering projects
- Click on "Automation" to filter automation projects
- Click on "PLC & Control" to filter PLC projects

#### Portfolio Detail
```
http://localhost:5174/portfolio/1
http://localhost:5174/portfolio/2
http://localhost:5174/portfolio/3
http://localhost:5174/portfolio/4
```

**Test:**
- View project details
- Navigate through image gallery (if multiple images)
- Click "← กลับไปหน้า Portfolio" to go back

### 3. Test Dashboard

#### Login
```
http://localhost:5174/login
```

**Credentials:**
- Password: `admin123` (from `.env` file)

#### Dashboard Home
```
http://localhost:5174/dashboard
```

**View:**
- Total projects count
- Total images count
- Projects created this month

#### Projects List
```
http://localhost:5174/dashboard/projects
```

**View:**
- All projects in table format
- Project thumbnails
- Project titles and tags
- Created dates

**Note:** Create/Edit buttons are disabled in mock mode.

---

## 🔧 Technical Details

### Files Modified for Mock Mode

1. **`src/lib/server/mock-data.ts`** (NEW)
   - Contains 4 sample projects
   - Mock statistics
   - Helper functions

2. **`src/routes/(public)/portfolio/+page.server.ts`**
   - Uses `getMockProjects()` instead of database

3. **`src/routes/(public)/portfolio/[id]/+page.server.ts`**
   - Uses `getMockProjectById()` instead of database

4. **`src/routes/dashboard/+page.server.ts`**
   - Uses `getMockStats()` instead of database

5. **`src/routes/dashboard/projects/+page.server.ts`**
   - Uses `getMockProjects()` instead of database
   - Delete action returns mock success

6. **`src/routes/dashboard/projects/+page.svelte`**
   - Shows "Mock Mode" indicator
   - Hides create button

---

## 🔄 Switching to Database Mode

When you're ready to use the real database:

### 1. Start PostgreSQL

```bash
docker-compose up -d db
```

### 2. Run Migrations

```bash
npx prisma migrate deploy
```

### 3. Uncomment Database Code

In each modified file, uncomment the database code and comment out mock code:

**Example:**
```typescript
// Mock Mode (comment this out)
// const projects = getMockProjects();

// Database Mode (uncomment this)
const projects = await getAllProjects();
```

**Files to update:**
- `src/routes/(public)/portfolio/+page.server.ts`
- `src/routes/(public)/portfolio/[id]/+page.server.ts`
- `src/routes/dashboard/+page.server.ts`
- `src/routes/dashboard/projects/+page.server.ts`

### 4. Restore UI Elements

In `src/routes/dashboard/projects/+page.svelte`:
- Remove "Mock Mode" indicator
- Restore create button

---

## 📸 Testing Checklist

### Public Pages
- [ ] Visit portfolio page
- [ ] Test "All" filter
- [ ] Test "Design" filter
- [ ] Test "ME" filter
- [ ] Test "Automation" filter
- [ ] Test "PLC & Control" filter
- [ ] Click on project card
- [ ] View project detail
- [ ] Navigate image gallery (project 1 or 3)
- [ ] Test on mobile (responsive)

### Dashboard
- [ ] Login with password
- [ ] View dashboard home
- [ ] Check statistics display
- [ ] View projects list
- [ ] Verify mock mode indicator shows
- [ ] Logout

### Navigation
- [ ] Test navbar links
- [ ] Test mobile menu
- [ ] Test breadcrumbs
- [ ] Test back buttons

---

## 🎨 UI/UX Testing

### Things to Check

1. **Typography**
   - ✅ Bai Jamjuree font loads correctly
   - ✅ Thai text displays properly
   - ✅ Font sizes are readable

2. **Colors**
   - ✅ Corporate identity colors used
   - ✅ Contrast is sufficient
   - ✅ Hover states work

3. **Icons**
   - ✅ Iconoir icons display correctly
   - ✅ Icons are appropriate for context

4. **Responsive Design**
   - ✅ Mobile layout works
   - ✅ Tablet layout works
   - ✅ Desktop layout works

5. **Animations**
   - ✅ Transitions are smooth
   - ✅ Hover effects work
   - ✅ Loading states (if any)

---

## 📝 Notes

### Image Sources
Mock data uses **Unsplash** images for demonstration:
- High-quality placeholder images
- Technology/industrial themed
- Free to use for testing

### Limitations
- No data persistence (refresh resets everything)
- Can't test file upload functionality
- Can't test database relationships
- Can't test error handling for database operations

### Benefits
- Fast development iteration
- No Docker required
- Easy to demonstrate
- Perfect for UI/UX testing

---

## 🚀 Next Steps

After testing in Mock Mode:

1. ✅ Verify all UI elements work correctly
2. ✅ Test responsive design on different devices
3. ✅ Check accessibility (keyboard navigation, screen readers)
4. ✅ Test all navigation flows
5. 🔄 Switch to Database Mode
6. 🔄 Test full CRUD operations
7. 🔄 Deploy to production

---

## 📚 Related Documentation

- **[TEST-RESULTS.md](./TEST-RESULTS.md)** - Build and test results
- **[PHASE-2-COMPLETE.md](./PHASE-2-COMPLETE.md)** - Complete Phase 2 documentation
- **[PROJECT-JOURNEY.md](./PROJECT-JOURNEY.md)** - Project overview

---

**Status:** ✅ **MOCK MODE ACTIVE - READY FOR UI TESTING**

Enjoy testing! 🎉

