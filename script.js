// ============================================
// GSAP & ScrollTrigger Setup
// ============================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// Custom Cursor & Lens Flare
// ============================================
const lensFlare = document.getElementById('lens-flare');

document.addEventListener('mousemove', (e) => {
    // Cursor
    gsap.to('body::after', {
        duration: 0.1,
        css: {
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        }
    });
    
    // Lens flare follows mouse
    gsap.to(lensFlare, {
        duration: 0.5,
        left: e.clientX - 150,
        top: e.clientY - 150,
        ease: 'power2.out'
    });
});

// ============================================
// Hero Section Animations
// ============================================
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    // Cinematic title reveal with 3D transform
    tl.to('.title-line', {
        y: 0,
        rotateX: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        stagger: 0.3,
        ease: 'power4.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.8')
    .to('.cta-button', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.4)'
    }, '-=0.4')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4');
    
    // Add glitch effect to title
    setInterval(() => {
        if (Math.random() > 0.95) {
            gsap.to('.title-line', {
                x: Math.random() * 10 - 5,
                duration: 0.05,
                yoyo: true,
                repeat: 1,
                ease: 'power4.inOut'
            });
        }
    }, 100);
});

// ============================================
// About Section Animations with Cinematic Camera
// ============================================
gsap.utils.toArray('.about-paragraph').forEach((paragraph, i) => {
    gsap.to(paragraph, {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: paragraph,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
                // Parallax effect
                gsap.to(paragraph, {
                    y: -20,
                    duration: 2,
                    ease: 'power1.inOut',
                    yoyo: true,
                    repeat: -1
                });
            }
        },
        delay: i * 0.3
    });
});

// Add section title glitch data attribute
document.querySelectorAll('.section-title').forEach(title => {
    title.setAttribute('data-text', title.textContent);
});

// ============================================
// Services Section Animations
// ============================================
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        delay: i * 0.15
    });
});

// ============================================
// THREE.JS - Hero Scene (Enhanced)
// ============================================
function createHeroScene() {
    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Enhanced Particle System with trails
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Create spiral galaxy distribution
        const radius = Math.random() * 15;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 10;
        
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = height;
        positions[i + 2] = Math.sin(angle) * radius;

        // Vibrant color palette
        const colorChoice = Math.random();
        if (colorChoice < 0.25) {
            colors[i] = 0.545; colors[i + 1] = 0.239; colors[i + 2] = 1; // Purple
        } else if (colorChoice < 0.5) {
            colors[i] = 0; colors[i + 1] = 0.831; colors[i + 2] = 1; // Cyan Blue
        } else if (colorChoice < 0.75) {
            colors[i] = 1; colors[i + 1] = 0; colors[i + 2] = 0.333; // Red
        } else {
            colors[i] = 0; colors[i + 1] = 1; colors[i + 2] = 1; // Cyan
        }
        
        sizes[i / 3] = Math.random() * 0.1 + 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Neural Network Lines
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineCount = 100;

    for (let i = 0; i < lineCount; i++) {
        const start = new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        const end = new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        
        linePositions.push(start.x, start.y, start.z);
        linePositions.push(end.x, end.y, end.z);
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x8B3DFF,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Mouse interaction & Cinematic Camera
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation with cinematic camera movement
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Spiral rotation
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.001;
        
        lines.rotation.x += 0.0002;
        lines.rotation.y += 0.0007;

        // Cinematic camera fly-through
        const cameraRadius = 5 + Math.sin(time * 0.5) * 2;
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.03;
        camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.03;
        camera.position.z = cameraRadius + Math.sin(time * 0.3) * 0.5;
        camera.lookAt(scene.position);
        
        // Particle flow animation
        const positionsArray = particles.geometry.attributes.position.array;
        for (let i = 0; i < positionsArray.length; i += 3) {
            positionsArray[i] += Math.sin(time + i) * 0.001;
            positionsArray[i + 1] += Math.cos(time + i) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// THREE.JS - About Scene
// ============================================
function createAboutScene() {
    const canvas = document.getElementById('about-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create 3D Human Face/Head using particles
    const faceGeometry = new THREE.BufferGeometry();
    const faceCount = 3000;
    const facePositions = new Float32Array(faceCount * 3);
    const faceColors = new Float32Array(faceCount * 3);

    // Create realistic human head shape
    for (let i = 0; i < faceCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / faceCount);
        const theta = Math.sqrt(faceCount * Math.PI) * phi;
        
        // Head shape (ellipsoid)
        let x = Math.sin(phi) * Math.cos(theta);
        let y = Math.sin(phi) * Math.sin(theta);
        let z = Math.cos(phi);
        
        // Scale to head proportions (narrower sides, taller)
        x *= 0.7;
        y *= 0.85;
        z *= 0.75;
        
        // Add face features by modifying depth
        const faceFront = z > 0.3;
        if (faceFront) {
            // Nose area (center protrusion)
            if (Math.abs(x) < 0.15 && y > 0 && y < 0.4) {
                z += 0.15 * (1 - Math.abs(y - 0.2) * 3);
            }
            
            // Eye sockets (indentations)
            const leftEye = Math.sqrt(Math.pow(x - 0.25, 2) + Math.pow(y - 0.3, 2));
            const rightEye = Math.sqrt(Math.pow(x + 0.25, 2) + Math.pow(y - 0.3, 2));
            if (leftEye < 0.15) z -= 0.1 * (1 - leftEye / 0.15);
            if (rightEye < 0.15) z -= 0.1 * (1 - rightEye / 0.15);
            
            // Cheekbones (slight protrusions)
            const leftCheek = Math.sqrt(Math.pow(x - 0.35, 2) + Math.pow(y - 0.1, 2));
            const rightCheek = Math.sqrt(Math.pow(x + 0.35, 2) + Math.pow(y - 0.1, 2));
            if (leftCheek < 0.2) z += 0.08 * (1 - leftCheek / 0.2);
            if (rightCheek < 0.2) z += 0.08 * (1 - rightCheek / 0.2);
            
            // Mouth area (slight indentation)
            if (Math.abs(x) < 0.2 && y > -0.3 && y < -0.15) {
                z -= 0.05;
            }
        }
        
        // Chin definition (narrower at bottom)
        if (y < -0.3) {
            x *= 0.7;
            z *= 0.8;
        }
        
        // Back of head (rounded)
        if (z < 0) {
            const backCurve = 1 - Math.abs(z) * 0.3;
            x *= backCurve;
            y *= backCurve;
        }
        
        facePositions[i * 3] = x * 1.5;
        facePositions[i * 3 + 1] = y * 1.5;
        facePositions[i * 3 + 2] = z * 1.5;
        
        // Color gradient from blue to purple based on depth
        const colorMix = (z + 1) / 2;
        faceColors[i * 3] = 0.545 * colorMix + 0 * (1 - colorMix); // R
        faceColors[i * 3 + 1] = 0.239 * colorMix + 0.831 * (1 - colorMix); // G
        faceColors[i * 3 + 2] = 1; // B
    }

    faceGeometry.setAttribute('position', new THREE.BufferAttribute(facePositions, 3));
    faceGeometry.setAttribute('color', new THREE.BufferAttribute(faceColors, 3));

    const faceMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const face = new THREE.Points(faceGeometry, faceMaterial);
    scene.add(face);

    // Ambient particles
    const ambientGeometry = new THREE.BufferGeometry();
    const ambientCount = 800;
    const ambientPositions = new Float32Array(ambientCount * 3);

    for (let i = 0; i < ambientCount * 3; i += 3) {
        ambientPositions[i] = (Math.random() - 0.5) * 15;
        ambientPositions[i + 1] = (Math.random() - 0.5) * 15;
        ambientPositions[i + 2] = (Math.random() - 0.5) * 15;
    }

    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));

    const ambientMaterial = new THREE.PointsMaterial({
        color: 0x8B3DFF,
        size: 0.03,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const ambient = new THREE.Points(ambientGeometry, ambientMaterial);
    scene.add(ambient);

    // Neural connections (lines connecting face particles)
    const connectionsGeometry = new THREE.BufferGeometry();
    const connectionPositions = [];
    const connectionCount = 150;
    
    for (let i = 0; i < connectionCount; i++) {
        const idx1 = Math.floor(Math.random() * faceCount) * 3;
        const idx2 = Math.floor(Math.random() * faceCount) * 3;
        
        connectionPositions.push(
            facePositions[idx1], facePositions[idx1 + 1], facePositions[idx1 + 2],
            facePositions[idx2], facePositions[idx2 + 1], facePositions[idx2 + 2]
        );
    }
    
    connectionsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    
    const connectionsMaterial = new THREE.LineBasicMaterial({
        color: 0x00D4FF,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    
    const connections = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
    scene.add(connections);

    // Animation with zoom effect
    let aboutTime = 0;
    function animate() {
        requestAnimationFrame(animate);
        aboutTime += 0.01;

        // Slow rotation
        face.rotation.y += 0.004;
        connections.rotation.y += 0.004;
        ambient.rotation.x += 0.0002;
        ambient.rotation.y += 0.0005;
        
        // Breathing/pulsing effect
        const scale = 1 + Math.sin(aboutTime) * 0.05;
        face.scale.set(scale, scale, scale);
        
        // Camera zoom in/out
        camera.position.z = 5 + Math.sin(aboutTime * 0.5) * 0.3;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// THREE.JS - Services Scene
// ============================================
function createServicesScene() {
    const canvas = document.getElementById('services-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Geometric shapes
    const geometries = [
        new THREE.IcosahedronGeometry(0.5, 0),
        new THREE.OctahedronGeometry(0.5, 0),
        new THREE.TetrahedronGeometry(0.5, 0),
        new THREE.TorusGeometry(0.4, 0.1, 16, 100)
    ];

    const shapes = [];

    geometries.forEach((geo, i) => {
        const material = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0xFF0055 : 0x8B3DFF,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5
        );
        scene.add(mesh);
        shapes.push(mesh);
    });

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xFF0055,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation with dynamic movement
    let servicesTime = 0;
    function animate() {
        requestAnimationFrame(animate);
        servicesTime += 0.01;

        shapes.forEach((shape, i) => {
            shape.rotation.x += 0.007 * (i + 1);
            shape.rotation.y += 0.01 * (i + 1);
            
            // Floating motion
            shape.position.y += Math.sin(servicesTime + i) * 0.002;
            shape.position.x += Math.cos(servicesTime + i * 0.5) * 0.001;
        });

        particles.rotation.y += 0.0008;
        
        // Camera orbit
        camera.position.x = Math.sin(servicesTime * 0.2) * 0.5;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// THREE.JS - Contact Scene
// ============================================
function createContactScene() {
    const canvas = document.getElementById('contact-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Energy field particles
    const fieldGeometry = new THREE.BufferGeometry();
    const fieldCount = 2000;
    const fieldPositions = new Float32Array(fieldCount * 3);

    for (let i = 0; i < fieldCount; i++) {
        const radius = 3 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        fieldPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        fieldPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        fieldPositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    fieldGeometry.setAttribute('position', new THREE.BufferAttribute(fieldPositions, 3));

    const fieldMaterial = new THREE.PointsMaterial({
        color: 0xFF00FF,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const field = new THREE.Points(fieldGeometry, fieldMaterial);
    scene.add(field);

    // Core sphere
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x8B3DFF,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });

    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Animation with energy waves
    let contactTime = 0;
    function animate() {
        requestAnimationFrame(animate);
        contactTime += 0.01;

        field.rotation.x += 0.002;
        field.rotation.y += 0.003;
        
        core.rotation.x += 0.005;
        core.rotation.y += 0.007;

        // Pulsing effect with waves
        const scale = 1 + Math.sin(contactTime * 2) * 0.15;
        core.scale.set(scale, scale, scale);
        
        // Field expansion waves
        const fieldScale = 1 + Math.sin(contactTime * 1.5) * 0.1;
        field.scale.set(fieldScale, fieldScale, fieldScale);
        
        // Camera rotation
        camera.position.x = Math.sin(contactTime * 0.3) * 1;
        camera.position.y = Math.cos(contactTime * 0.2) * 0.5;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// Ambient Particle Overlay
// ============================================
function createAmbientParticles() {
    const overlay = document.getElementById('particle-overlay');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = `rgba(${Math.random() > 0.5 ? '139, 61, 255' : '0, 212, 255'}, 0.3)`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = `0 0 10px rgba(139, 61, 255, 0.5)`;
        
        overlay.appendChild(particle);

        gsap.to(particle, {
            y: -window.innerHeight,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 5
        });
    }
}

// ============================================
// THREE.JS - Floating Humans in Hero
// ============================================
function createHeroHumans() {
    const canvas = document.getElementById('hero-humans-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 8;

    const humans = [];
    
    // Create 3 floating human silhouettes
    for (let h = 0; h < 3; h++) {
        const humanGroup = new THREE.Group();
        
        // Human body made of particles
        const bodyGeometry = new THREE.BufferGeometry();
        const bodyCount = 1200;
        const bodyPositions = new Float32Array(bodyCount * 3);
        const bodyColors = new Float32Array(bodyCount * 3);
        
        for (let i = 0; i < bodyCount; i++) {
            const t = i / bodyCount;
            const angle = t * Math.PI * 2 * 3;
            
            // Head (sphere)
            if (t < 0.15) {
                const phi = Math.random() * Math.PI;
                const theta = Math.random() * Math.PI * 2;
                const r = 0.3;
                bodyPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                bodyPositions[i * 3 + 1] = 1.2 + r * Math.cos(phi);
                bodyPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
            }
            // Torso
            else if (t < 0.45) {
                const torsoT = (t - 0.15) / 0.3;
                bodyPositions[i * 3] = (Math.random() - 0.5) * 0.5;
                bodyPositions[i * 3 + 1] = 1.2 - torsoT * 1.0;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
            }
            // Left Arm
            else if (t < 0.6) {
                const armT = (t - 0.45) / 0.15;
                bodyPositions[i * 3] = -0.25 - armT * 0.5;
                bodyPositions[i * 3 + 1] = 0.9 - armT * 0.4;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            }
            // Right Arm
            else if (t < 0.75) {
                const armT = (t - 0.6) / 0.15;
                bodyPositions[i * 3] = 0.25 + armT * 0.5;
                bodyPositions[i * 3 + 1] = 0.9 - armT * 0.4;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            }
            // Left Leg
            else if (t < 0.875) {
                const legT = (t - 0.75) / 0.125;
                bodyPositions[i * 3] = -0.15 + (Math.random() - 0.5) * 0.15;
                bodyPositions[i * 3 + 1] = 0.2 - legT * 1.0;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            }
            // Right Leg
            else {
                const legT = (t - 0.875) / 0.125;
                bodyPositions[i * 3] = 0.15 + (Math.random() - 0.5) * 0.15;
                bodyPositions[i * 3 + 1] = 0.2 - legT * 1.0;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            }
            
            // Color gradient cyan to purple
            const colorMix = Math.random();
            if (colorMix < 0.5) {
                bodyColors[i * 3] = 0; bodyColors[i * 3 + 1] = 1; bodyColors[i * 3 + 2] = 1; // Cyan
            } else {
                bodyColors[i * 3] = 0.545; bodyColors[i * 3 + 1] = 0.239; bodyColors[i * 3 + 2] = 1; // Purple
            }
        }
        
        bodyGeometry.setAttribute('position', new THREE.BufferAttribute(bodyPositions, 3));
        bodyGeometry.setAttribute('color', new THREE.BufferAttribute(bodyColors, 3));
        
        const bodyMaterial = new THREE.PointsMaterial({
            size: 0.06,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        
        const human = new THREE.Points(bodyGeometry, bodyMaterial);
        humanGroup.add(human);
        
        // Position humans in space
        humanGroup.position.set(
            (h - 1) * 5 + (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 5 - 2
        );
        
        humanGroup.rotation.y = Math.random() * Math.PI * 2;
        
        scene.add(humanGroup);
        humans.push({
            group: humanGroup,
            floatSpeed: 0.3 + Math.random() * 0.4,
            rotateSpeed: 0.001 + Math.random() * 0.002
        });
    }
    
    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        humans.forEach((human, i) => {
            // Floating motion
            human.group.position.y += Math.sin(time * human.floatSpeed + i) * 0.003;
            human.group.rotation.y += human.rotateSpeed;
            
            // Gentle rotation
            human.group.rotation.z = Math.sin(time * 0.5 + i) * 0.1;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// THREE.JS - Floating Humans in Services
// ============================================
function createServicesHumans() {
    const canvas = document.getElementById('services-humans-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 10;

    const astronauts = [];
    
    // Create 2 astronaut figures
    for (let a = 0; a < 2; a++) {
        const astronautGroup = new THREE.Group();
        
        // Astronaut with helmet
        const helmetGeometry = new THREE.SphereGeometry(0.35, 16, 16);
        const helmetMaterial = new THREE.MeshBasicMaterial({
            color: a === 0 ? 0xFF0055 : 0x00D4FF,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
        helmet.position.y = 1.3;
        astronautGroup.add(helmet);
        
        // Body particles
        const bodyGeometry = new THREE.BufferGeometry();
        const bodyCount = 800;
        const bodyPositions = new Float32Array(bodyCount * 3);
        
        for (let i = 0; i < bodyCount; i++) {
            const t = i / bodyCount;
            
            if (t < 0.4) { // Torso
                const torsoT = t / 0.4;
                bodyPositions[i * 3] = (Math.random() - 0.5) * 0.6;
                bodyPositions[i * 3 + 1] = 1.0 - torsoT * 0.8;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
            } else if (t < 0.7) { // Arms
                const armT = (t - 0.4) / 0.3;
                const side = Math.random() < 0.5 ? -1 : 1;
                bodyPositions[i * 3] = side * (0.3 + armT * 0.4);
                bodyPositions[i * 3 + 1] = 0.8 - armT * 0.5;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            } else { // Legs
                const legT = (t - 0.7) / 0.3;
                const side = Math.random() < 0.5 ? -1 : 1;
                bodyPositions[i * 3] = side * 0.2;
                bodyPositions[i * 3 + 1] = 0.2 - legT * 0.9;
                bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            }
        }
        
        bodyGeometry.setAttribute('position', new THREE.BufferAttribute(bodyPositions, 3));
        
        const bodyMaterial = new THREE.PointsMaterial({
            color: a === 0 ? 0xFF0055 : 0x00D4FF,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const body = new THREE.Points(bodyGeometry, bodyMaterial);
        astronautGroup.add(body);
        
        // Position
        astronautGroup.position.set(
            a === 0 ? -6 : 6,
            (Math.random() - 0.5) * 4,
            -3
        );
        
        astronautGroup.rotation.y = a === 0 ? 0.5 : -0.5;
        
        scene.add(astronautGroup);
        astronauts.push({
            group: astronautGroup,
            helmet: helmet,
            speed: 0.5 + Math.random() * 0.3
        });
    }
    
    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        astronauts.forEach((astronaut, i) => {
            // Floating
            astronaut.group.position.y += Math.sin(time * astronaut.speed + i * 2) * 0.004;
            
            // Gentle rotation
            astronaut.group.rotation.y += 0.002;
            astronaut.helmet.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// Initialize All Scenes
// ============================================
createHeroScene();
createHeroHumans();
createAboutScene();
createServicesScene();
createServicesHumans();
createContactScene();
createAmbientParticles();

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: target,
                ease: 'power3.inOut'
            });
        }
    });
});

// ============================================
// CTA Button Interaction
// ============================================
document.querySelector('.cta-button').addEventListener('click', () => {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: '#about',
        ease: 'power3.inOut'
    });
});

// ============================================
// Form Submission
// ============================================
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    gsap.to('.cta-button', {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            alert('Message transmitted to the NEXUS network!');
        }
    });
});
