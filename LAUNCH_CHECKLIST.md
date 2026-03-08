# Moxie Beauty Studio - Pre-Launch Checklist

## ✅ Completed Items

- [x] Structured data (JSON-LD) for local business SEO
- [x] Enhanced metadata with Open Graph tags
- [x] Twitter Card meta tags  
- [x] Sitemap.xml implementation
- [x] Robots.txt file
- [x] Comprehensive README documentation
- [x] Booking system integration
- [x] Accessibility improvements
- [x] Performance optimizations

## 🔍 Items to Complete Before Launch

### 1. Content Review & Customization

#### Business Information (layout.tsx)
- [ ] Update business address in structured data (currently generic "Wisconsin")
- [ ] Add specific city and street address
- [ ] Add GPS coordinates (latitude/longitude) for map integration
- [ ] Update business hours if different from defaults (Mon-Fri 9-5)
- [ ] Add social media URLs to structured data:
  ```typescript
  sameAs: [
    "https://www.facebook.com/moxiebeautystudio",
    "https://www.instagram.com/moxiebeautystudio",
  ]
  ```
  
#### SEO Verification
- [ ] Add Google Search Console verification code
- [ ] Add other search engine verification codes if needed
- [ ] Update the verification section in `app/layout.tsx`

#### Domain Configuration  
- [ ] Ensure all URLs reference your actual domain
- [ ] Update all instances of "https://moxiebeautystudiowi.com" if different
- [ ] Configure domain DNS settings
- [ ] Set up SSL certificate (should be automatic with Vercel)

### 2. Testing Requirements

#### Booking Flow Testing
- [ ] Test booking on desktop Chrome
- [ ] Test booking on desktop Safari
- [ ] Test booking on desktop Firefox
- [ ] Test booking on mobile Safari (iOS)
- [ ] Test booking on mobile Chrome (Android)
- [ ] Test booking on tablet (iPad/Android)
- [ ] Verify Square appointments page loads correctly
- [ ] Test timeout/error scenarios (disconnect internet mid-load)
- [ ] Test retry functionality
- [ ] Verify phone number fallback displays correctly

#### Accessibility Testing
Run automated tests:
- [ ] Run axe DevTools browser extension
- [ ] Run WAVE browser extension
- [ ] Test keyboard navigation (Tab, Enter, Escape keys)
- [ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Verify all images have alt text
- [ ] Check color contrast ratios (WCAG AA minimum)
- [ ] Test with browser zoom at 200%

#### Performance Testing
- [ ] Run Lighthouse audit (target 90+ all scores)
- [ ] Test page load time on 3G connection
- [ ] Verify images are optimized and properly sized
- [ ] Check for unused CSS/JavaScript
- [ ] Test First Contentful Paint (FCP) < 1.8s
- [ ] Test Largest Contentful Paint (LCP) < 2.5s
- [ ] Test Cumulative Layout Shift (CLS) < 0.1

#### Cross-Browser Testing
Desktop:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Mobile:
- [ ] Safari on iOS (latest)
- [ ] Chrome on Android (latest)
- [ ] Test on actual devices, not just simulators

#### Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1920px+)
- [ ] Test orientation changes (portrait/landscape)

### 3. SEO & Analytics Setup

#### Google Search Console
- [ ] Add and verify property
- [ ] Submit sitemap.xml
- [ ] Monitor indexing status
- [ ] Set up URL parameters if needed

#### Google Analytics (Optional)
- [ ] Create GA4 property
- [ ] Add tracking code
- [ ] Set up conversion goals (appointment bookings)
- [ ] Configure event tracking

#### Local Business Listings
- [ ] Claim/update Google Business Profile
- [ ] Add business to Yelp
- [ ] Add business to other relevant directories
- [ ] Ensure NAP (Name, Address, Phone) consistency across all listings

### 4. Security & Privacy

- [ ] Review and update privacy policy if needed
- [ ] Add cookie consent if required
- [ ] Ensure HTTPS is enforced
- [ ] Test form security (if any contact forms added)
- [ ] Review GDPR compliance if applicable

### 5. Content Final Review

- [ ] Proofread all copy for typos/grammar
- [ ] Verify all phone numbers are correct
- [ ] Verify all email addresses are correct
- [ ] Check all links work (no 404s)
- [ ] Verify business hours are accurate
- [ ] Confirm pricing information is current
- [ ] Review service descriptions for accuracy

### 6. Technical Deployment

#### Pre-Deployment
- [ ] Run `pnpm build` locally and fix any errors
- [ ] Test production build locally with `pnpm start`
- [ ] Review build output for warnings
- [ ] Commit all changes to git
- [ ] Tag release version (e.g., v1.0.0)

#### Vercel Deployment (if using Vercel)
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set environment variables (if any)
- [ ] Configure custom domain
- [ ] Test preview deployment
- [ ] Deploy to production

#### Post-Deployment
- [ ] Test live site thoroughly
- [ ] Verify SSL certificate is active
- [ ] Test all booking flows on live site
- [ ] Monitor error logs for first 24 hours
- [ ] Set up uptime monitoring (e.g., UptimeRobot)

### 7. Marketing & Launch

- [ ] Prepare launch announcement
- [ ] Update social media profiles with website link
- [ ] Send announcement to existing customers
- [ ] Consider soft launch to limited audience first
- [ ] Plan official launch date
- [ ] Prepare social media posts
- [ ] Consider Google Ads campaign

## 🔧 Quick Fixes Needed

### Immediate Updates in Code

1. **Update Business Address** (app/layout.tsx, line ~90)
```typescript
address: {
  "@type": "PostalAddress",
  streetAddress: "123 Main Street",      // Add actual address
  addressLocality: "Your City",          // Add city
  addressRegion: "WI",                   // State abbreviation
  postalCode: "12345",                   // Add ZIP
  addressCountry: "US",
},
```

2. **Add GPS Coordinates** (app/layout.tsx, line ~98)
```typescript
geo: {
  "@type": "GeoCoordinates",
  latitude: 43.0731,   // Replace with actual coordinates
  longitude: -89.4012, // Replace with actual coordinates
},
```

3. **Update Social Media** (app/layout.tsx, line ~111)
```typescript
sameAs: [
  "https://www.facebook.com/your-actual-page",
  "https://www.instagram.com/your-actual-handle",
  // Add other social profiles
],
```

## 📊 Analytics Goals to Track

1. **Appointment Booking Conversions**
   - Track when booking overlay opens
   - Track when booking is completed
   - Track booking abandonment rate

2. **User Engagement**
   - Time on site
   - Pages per session
   - Scroll depth
   - Section visibility

3. **Traffic Sources**
   - Organic search keywords
   - Direct traffic
   - Social media referrals
   - Paid advertising (if applicable)

## 🎯 Performance Targets

- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Lighthouse Best Practices**: 90+
- **Lighthouse SEO**: 95+
- **Page Load Time**: < 3 seconds on 3G
- **Time to Interactive**: < 3.8 seconds

## 📱 Contact Information to Verify

Current information in the site:
- Phone: (262) 332-6072
- Email: hello@moxiebeautystudiowi.com
- Booking: Square appointments integration

Verify these are:
- [ ] Correct and active
- [ ] Monitored regularly
- [ ] Set up for customer service responses

## 🚀 Post-Launch Monitoring (First Week)

- [ ] Monitor website uptime
- [ ] Check for JavaScript errors in browser console
- [ ] Review server logs for 404 errors
- [ ] Track conversion rate for bookings
- [ ] Monitor page load times
- [ ] Check mobile usability
- [ ] Review user feedback
- [ ] Monitor search console for crawl errors

## 📈 One Month Post-Launch Review

- [ ] Review analytics data
- [ ] Assess SEO performance
- [ ] Evaluate booking conversion rate
- [ ] Gather customer feedback
- [ ] Plan improvements based on data
- [ ] Consider A/B testing opportunities

---

## Notes

- Keep this checklist updated as items are completed
- Document any issues found during testing
- Save screenshots of testing results
- Keep backup of current site before major updates
