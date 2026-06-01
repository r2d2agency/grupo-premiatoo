Transform the current admin interface into a complete CMS with branding, modular control, and advanced user management.

### Backend Changes
- Add `PUT /api/users/:id` endpoint for profile updates.
- Add `PUT /api/users/:id/password` endpoint for security updates.
- Ensure `SiteContent` model supports new `branding` and `modules` configuration fields.

### Frontend - Layout & Navigation
- Implement `AdminSidebar` with a modern CMS look (Navy & Gold brand colors).
- Create `AdminLayout` to wrap all administrative pages.
- Update branding across the CMS to use the brand's primary colors.

### Frontend - Features
- **User Management**:
  - Update `UserManagement.tsx` with Edit profile, Change Password, and Role management (Admin, Editor, Viewer).
  - Add "Enable/Disable" logic (simulated with status or roles for now).
- **Branding Control**:
  - Create `/admin/branding` page to allow real-time changes to primary/secondary colors and logo.
- **Modular Content Control**:
  - Create `/admin/modules` page with toggles for every site section (Header, Hero, Stats, etc.).
- **Content Dashboard**:
  - Refactor `/admin` (index) to focus on content editing within the new modular structure.

### Technical Details
- Use `lucide-react` for consistent iconography.
- Leverage `sonner` for user feedback (toasts).
- Ensure responsive design for the admin dashboard.
- Update `api.ts` types to reflect the new `SiteContent` structure.
