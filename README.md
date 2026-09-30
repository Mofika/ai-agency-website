# NEXUS AI - Futuristic AI Agency Website

A fully immersive, cinematic AI agency website built with Three.js, WebGL, and GSAP, featuring abstract digital universes, cosmic human visuals, and premium interactive experiences.

## 🌌 Features

### Immersive 3D Environments
- **Hero Scene**: Neural network particle systems with 2000+ particles, interconnected nodes, and mouse-reactive camera movements
- **About Scene**: Abstract human silhouette made of particles representing digital consciousness
- **Services Scene**: Rotating geometric shapes (icosahedron, octahedron, tetrahedron, torus) with wireframe aesthetics
- **Contact Scene**: Pulsing energy field with spherical particle distribution

### Cinematic Experience
- **Smooth ScrollTrigger animations** synchronized with scroll position
- **Oversized typography** with gradient text effects (4rem - 12rem responsive)
- **Scene transitions** that feel like traveling through digital dimensions
- **Camera movements** responding to mouse position for depth and immersion

### Sci-Fi Aesthetics
- **Vibrant color palette**: Purple (#8B3DFF), Blue (#00D4FF), Red (#FF0055), Pink (#FF00FF)
- **Glow effects** and atmospheric lighting throughout
- **Additive blending** for particle systems creating ethereal visuals
- **Gradient animations** on text and interactive elements

### Interactive Elements
- **Custom cursor** with glowing trail effect
- **Hover interactions** on navigation, buttons, and service cards
- **Ambient particles** floating across the entire page
- **Form animations** with focus states and submission feedback

### Performance Optimizations
- **Pixel ratio capping** at 2x for high-DPI displays
- **Responsive canvas** resizing on window resize events
- **RequestAnimationFrame** for smooth 60fps animations
- **Particle count optimization** for mobile devices

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open** `index.html` in a modern web browser
3. **Experience** the immersive digital universe

### Requirements
- Modern browser with WebGL support (Chrome, Firefox, Safari, Edge)
- No build process or dependencies needed - works directly in browser

## 📁 Project Structure

```
ai-agency-website/
├── index.html          # Main HTML structure with 4 sections
├── style.css           # Sci-fi styling with gradients and effects
├── script.js           # Three.js scenes + GSAP animations
└── README.md           # Documentation
```

## 🎨 Design System

### Colors
- **Primary Purple**: `#8B3DFF` - Intelligence, innovation
- **Accent Blue**: `#00D4FF` - Technology, trust  
- **Highlight Red**: `#FF0055` - Energy, action
- **Cosmic Pink**: `#FF00FF` - Creativity, future
- **Deep Dark**: `#0A0A0F` - Professional depth
- **Darker**: `#050508` - Ultimate contrast

### Typography Scale
- **Hero Title**: 4rem - 12rem (responsive with clamp)
- **Section Titles**: 3rem - 8rem (responsive)
- **Body Text**: 1.2rem - 1.8rem (responsive)
- **Navigation**: 0.9rem with 2px letter-spacing

### Spacing System
- Sections: 100vh minimum height
- Padding: 2rem - 5rem responsive
- Grid gaps: 3rem
- Card padding: 3rem

## 🛠️ Technologies

### Core
- **Three.js r128** - WebGL 3D rendering
- **GSAP 3.12** - Professional animation library
- **ScrollTrigger** - Scroll-based animations
- **Vanilla JavaScript** - No framework dependencies

### 3D Elements
- Point cloud systems with 800-2000 particles per scene
- BufferGeometry for optimized rendering
- Custom shaders using PointsMaterial
- Wireframe geometries for futuristic aesthetics

### Animation Techniques
- Timeline sequences for hero entrance
- Stagger animations for content reveals
- Scroll-triggered parallax effects
- Mouse-reactive camera movements
- Pulsing and rotation animations

## 📱 Responsive Design

- **Desktop**: Full immersive experience with all effects
- **Tablet**: Optimized particle counts and typography
- **Mobile**: Simplified animations, touch-friendly navigation
- **Breakpoint**: 768px with mobile-first approach

## 🎭 Sections

### 1. Hero
"INTELLIGENCE REDEFINED" - Neural network particle system with interconnected nodes

### 2. About
"BEYOND BOUNDARIES" - Abstract human silhouette representing digital consciousness

### 3. Services
"OUR DIMENSIONS" - Four service cards with geometric 3D backgrounds
- Neural Systems
- Quantum Analysis
- Digital Consciousness
- Cosmic Vision

### 4. Contact
"CONNECT WITH THE FUTURE" - Contact form with pulsing energy field

## ⚡ Performance Tips

- Tested at 60fps on modern hardware
- GPU acceleration enabled by default
- Particle systems optimized for mobile
- Lazy loading for off-screen canvases (can be implemented)
- requestAnimationFrame for smooth rendering

## 🎯 Future Enhancements

- [ ] Add loading screen with progress bar
- [ ] Implement WebGL post-processing effects
- [ ] Add audio reactivity to particle systems
- [ ] Create more interactive 3D models
- [ ] Implement WebGL shaders for custom effects
- [ ] Add page transitions between sections
- [ ] Mobile gesture controls for 3D scenes

## 📄 License

Free to use for personal and commercial projects.

## 🌟 Credits

Created with passion for immersive web experiences.
Powered by Three.js, GSAP, and modern web technologies.

---

**Experience the future of web design. Welcome to NEXUS AI.**
