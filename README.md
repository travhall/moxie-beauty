# Moxie Beauty Studio Website

A modern, accessible, and performant website for Moxie Beauty Studio - specializing in bespoke lash and brow transformations in Wisconsin.

## 🎨 Features

- **Booking Integration**: Direct Square appointments booking with sophisticated error handling
- **Responsive Design**: Three distinct layouts optimized for mobile, tablet, and desktop
- **Scroll-Driven Animations**: Smooth parallax effects and fade-in animations using IntersectionObserver
- **Dark Mode**: System-aware theme switching with manual override
- **Accessibility First**: WCAG compliant with comprehensive ARIA labels, focus management, and keyboard navigation
- **Performance Optimized**: Next.js 15 with image optimization, lazy loading, and efficient animations
- **SEO Enhanced**: Structured data (JSON-LD), Open Graph tags, and semantic HTML

## 🚀 Tech Stack

- **Framework**: [Next.js 15.3.1](https://nextjs.org/) with App Router
- **Language**: TypeScript 5.8.3
- **Styling**: [Tailwind CSS 4.1.4](https://tailwindcss.com/) with OKLCH color space
- **Animations**: CSS animations + IntersectionObserver
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Google Fonts (Mulish) + Custom fonts (Nyght Serif family)
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm

## 📦 Project Structure

```
moxie-beauty/
├── app/
│   ├── layout.tsx          # Root layout with metadata & structured data
│   ├── page.tsx            # Home page with all sections
│   ├── globals.css         # Global styles & animations
│   └── style-guide/        # Component showcase
├── components/
│   ├── about.tsx           # About Moxie section
│   ├── appointments.tsx    # Multi-device appointment journey
│   ├── booking-overlay.tsx # Square booking integration
│   ├── button.tsx          # Accessible button component
│   ├── footer.tsx          # Site footer
│   ├── logo.tsx            # Animated logo component
│   ├── navigation.tsx      # Scroll-aware navigation
│   ├── service-card.tsx    # Individual service cards
│   ├── service-overlay.tsx # Service detail modal
│   ├── services.tsx        # Services grid section
│   ├── testimonials.tsx    # Customer testimonials
│   └── theme-toggle.tsx    # Dark mode toggle
├── hooks/
│   ├── useFadeInOnScroll.ts      # Fade-in animation hook
│   ├── useIntersectionObserver.ts # Scroll tracking hook
│   └── useSlideAnimation.ts      # Slide animations
├── providers/
│   └── theme-provider.tsx  # Theme context provider
├── public/
│   ├── fonts/              # Custom Nyght Serif fonts
│   ├── images/             # Optimized images
│   └── favicon.svg
└── utils/
    └── scroll-utils.ts     # Scroll helper functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/travhall/moxie-beauty.git
cd moxie-beauty
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 🎯 Key Components

### Booking System
- **BookingOverlay**: Full-screen modal with Square appointments iframe
- **Features**: Loading states, error handling, timeout detection, retry functionality
- **Accessibility**: Focus trapping, keyboard navigation, ARIA attributes

### Appointments Section
Adaptive implementation based on screen size:
- **Mobile (<768px)**: Vertical cards with stacked content
- **Tablet (768px-1024px)**: Interactive split panel with clickable steps
- **Desktop (>1024px)**: Scroll-driven parallax experience with 300vh scroll container

### Navigation
- **Scroll tracking**: Updates active section based on viewport position
- **Progress bar**: Visual indicator of page scroll progress
- **Responsive**: Bottom-fixed on mobile, sticky sidebar on desktop

## 🎨 Design System

### Colors (OKLCH)
- **Ivory Rose**: Background and neutral tones
- **Rose Gold**: Primary accent color
- **Midnite**: Dark mode background
- **Monstera**: Reserved for future use

### Typography
- **Body**: Mulish (Google Fonts)
- **Headings**: Nyght Serif Light
- **Emphasis**: Nyght Serif Dark

### Animation Principles
- **Fade-in on scroll**: Uses IntersectionObserver with blur effect
- **Staggered delays**: 100ms increments for sequential reveals
- **Performance**: CSS animations with requestAnimationFrame for scroll tracking

## 🔧 Configuration

### Environment Variables
Currently, no environment variables are required. All configuration is in the codebase.

### Customization
- **Colors**: Modify in `app/globals.css` under `@theme inline`
- **Animations**: Adjust timing in `app/globals.css` keyframe definitions
- **Booking URL**: Update iframe src in `components/booking-overlay.tsx`

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (latest)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles for complex interactions
- Keyboard navigation support (Tab, Enter, Escape)
- Focus management in modals and overlays
- Screen reader announcements for loading states
- High contrast mode support
- Reduced motion preference respected

## 🚀 Performance

- Lighthouse Score Target: 90+ across all metrics
- Image optimization with Next.js Image component
- Code splitting with Next.js App Router
- CSS animations over JavaScript for smoother performance
- RequestAnimationFrame for scroll-based updates
- Lazy loading for below-the-fold content

## 📈 SEO

- Structured data (JSON-LD) for local business
- Open Graph tags for social sharing
- Twitter Card meta tags
- Semantic HTML with proper heading hierarchy
- Optimized meta descriptions
- Sitemap and robots.txt

## 🔄 Future Enhancements

- [ ] CMS integration for content management
- [ ] Customer portal for appointment management
- [ ] Email reminder system
- [ ] Testimonial submission form
- [ ] Before/after gallery
- [ ] Multi-language support
- [ ] Advanced analytics integration

## 📄 License

Proprietary - All rights reserved by Moxie Beauty Studio

## 👤 Author

**Travis Hall**
- GitHub: [@travhall](https://github.com/travhall)

## 🙏 Acknowledgments

- Design inspiration from modern beauty studio websites
- Animation techniques from Framer Motion community
- Accessibility patterns from A11y Project

---

Built with ❤️ using Next.js and Tailwind CSS
