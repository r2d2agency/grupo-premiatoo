Implement responsive images (Desktop, Tablet, Mobile) with automatic WebP conversion and compression for the CMS modules, primarily focusing on the Hero section.

### User Interface Changes
- Update `ImageUpload` component to support image compression and WebP conversion client-side before sending to the backend.
- Enhance the Hero administration in `admin.index.tsx` to allow uploading three versions of each banner image:
  - Desktop
  - Tablet
  - Mobile
- Update the Hero display component to use the `<picture>` tag or responsive background images for optimized loading on different devices.

### Technical Implementation
- **Image Compression & Conversion**:
  - Integrate a client-side library or use the Canvas API to resize and convert images to WebP format.
  - Apply compression to ensure files remain under the storage limit while maintaining quality.
- **Schema Updates**:
  - Modify `SiteContent` type in `lib/api.ts` to include responsive image paths (`imageDesktop`, `imageTablet`, `imageMobile`) instead of a single `image` field for banners.
- **Frontend Components**:
  - `Hero.tsx`: Implement responsive rendering logic.
  - `ImageUpload.tsx`: Add compression logic using `canvas`.
  - `admin.index.tsx`: Update the UI to show three upload fields for each banner.

### Verification Plan
- Test image upload in the admin panel and verify WebP conversion.
- Verify that different images are loaded when resizing the browser (Desktop/Tablet/Mobile viewports).
- Check that the application remains fully responsive across all modules.
