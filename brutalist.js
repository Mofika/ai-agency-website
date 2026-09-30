// ============================================
// GSAP Setup
// ============================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// Custom Cursor
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    
    cursorOutline.style.left = cursorX + 'px';
    cursorOutline.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor interactions
document.querySelectorAll('a, button, .service-block').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = '#FF0000';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = '#FFFFFF';
    });
});

// ============================================
// Real-time Clock
// ============================================
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
}
updateClock();
setInterval(updateClock, 1000);

// ============================================
// Scene 01: Title Animation
// ============================================
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('.title-block', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
    })
    .to('.title-block::before', {
        width: '100%',
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.inOut'
    }, '-=0.8')
    .to('.scene-subtitle', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    .to('.scroll-prompt', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4');
});

// ============================================
// Scene 02: Manifesto Text Animation
// ============================================
gsap.to('.manifesto-text', {
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.scene-02',
        start: 'top 60%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    }
});

// ============================================
// Scene 03: Service Blocks Animation
// ============================================
gsap.utils.toArray('.service-block').forEach((block, i) => {
    gsap.to(block, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        delay: i * 0.1
    });
});

// ============================================
// Scene 04: Stats Counter Animation
// ============================================
gsap.utils.toArray('.stat-block').forEach((stat, i) => {
    const numberEl = stat.querySelector('.stat-number');
    const target = parseInt(numberEl.getAttribute('data-target'));
    
    gsap.to(stat, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    numberEl.textContent = Math.floor(current);
                }, 16);
            }
        },
        delay: i * 0.2
    });
});

// ============================================
// THREE.JS - Scene 01: Mysterious Figure
// ============================================
function createScene01() {
    const canvas = document.getElementById('scene-01-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 8;

    // Mysterious standing figure
    const figureGroup = new THREE.Group();
    
    // Human silhouette
    const bodyGeometry = new THREE.BufferGeometry();
    const bodyCount = 2000;
    const bodyPositions = new Float32Array(bodyCount * 3);
    
    for (let i = 0; i < bodyCount; i++) {
        const t = i / bodyCount;
        const angle = t * Math.PI * 2 * 5;
        
        // Head
        if (t < 0.15) {
            const phi = Math.random() * Math.PI;
            const theta = Math.random() * Math.PI * 2;
            const r = 0.35;
            bodyPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            bodyPositions[i * 3 + 1] = 1.4 + r * Math.cos(phi);
            bodyPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
        // Torso
        else if (t < 0.5) {
            const torsoT = (t - 0.15) / 0.35;
            const width = 0.6 - torsoT * 0.2;
            bodyPositions[i * 3] = (Math.random() - 0.5) * width;
            bodyPositions[i * 3 + 1] = 1.4 - torsoT * 1.2;
            bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
        // Arms
        else if (t < 0.7) {
            const armT = (t - 0.5) / 0.2;
            const side = Math.random() < 0.5 ? -1 : 1;
            bodyPositions[i * 3] = side * (0.35 + armT * 0.6);
            bodyPositions[i * 3 + 1] = 1.1 - armT * 0.7;
            bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
        }
        // Legs
        else {
            const legT = (t - 0.7) / 0.3;
            const side = Math.random() < 0.5 ? -1 : 1;
            bodyPositions[i * 3] = side * 0.2 + (Math.random() - 0.5) * 0.15;
            bodyPositions[i * 3 + 1] = 0.2 - legT * 1.2;
            bodyPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
        }
    }
    
    bodyGeometry.setAttribute('position', new THREE.BufferAttribute(bodyPositions, 3));
    
    const bodyMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.04,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });
    
    const figure = new THREE.Points(bodyGeometry, bodyMaterial);
    figureGroup.add(figure);
    
    figureGroup.position.set(3, -0.5, 0);
    scene.add(figureGroup);

    // Concentric rings around figure
    const rings = [];
    for (let i = 0; i < 5; i++) {
        const ringGeometry = new THREE.TorusGeometry(1.5 + i * 0.5, 0.01, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: i === 2 ? 0xFF0000 : 0xFFFFFF,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.copy(figureGroup.position);
        scene.add(ring);
        rings.push(ring);
    }

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        figureGroup.rotation.y = Math.sin(time * 0.3) * 0.2;
        
        rings.forEach((ring, i) => {
            ring.rotation.z += 0.001 * (i + 1);
            ring.scale.set(
                1 + Math.sin(time + i) * 0.05,
                1 + Math.sin(time + i) * 0.05,
                1
            );
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
// Scene 02: Waveform Visualization
// ============================================
function createWaveform() {
    const container = document.getElementById('waveform');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    canvas.width = container.offsetWidth;
    canvas.height = 200;
    
    let time = 0;
    
    function drawWaveform() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw multiple waveforms
        for (let layer = 0; layer < 3; layer++) {
            ctx.beginPath();
            ctx.strokeStyle = layer === 1 ? '#FF0000' : '#FFFFFF';
            ctx.lineWidth = layer === 1 ? 2 : 1;
            ctx.globalAlpha = layer === 1 ? 0.8 : 0.3;
            
            for (let x = 0; x < canvas.width; x++) {
                const frequency = 0.02 + layer * 0.005;
                const amplitude = 30 + layer * 10;
                const y = canvas.height / 2 + 
                         Math.sin(x * frequency + time + layer) * amplitude +
                         Math.sin(x * frequency * 2 + time * 1.5) * (amplitude / 2);
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        time += 0.05;
        requestAnimationFrame(drawWaveform);
    }
    
    drawWaveform();
    
    // Mouse interaction
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        time += (x / canvas.width - 0.5) * 0.1;
    });
}

// ============================================
// THREE.JS - Scene 02: Abstract Landscape
// ============================================
function createScene02() {
    const canvas = document.getElementById('scene-02-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Abstract terrain
    const terrainGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const positions = terrainGeometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 2;
    }
    
    terrainGeometry.computeVertexNormals();
    
    const terrainMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -2;
    scene.add(terrain);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        const positions = terrain.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            positions[i + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 2;
        }
        terrain.geometry.attributes.position.needsUpdate = true;
        terrain.geometry.computeVertexNormals();
        
        camera.position.z = 5 + Math.sin(time * 0.3) * 0.5;
        
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
// THREE.JS - Scene 03: Geometric Grid
// ============================================
function createScene03() {
    const canvas = document.getElementById('scene-03-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 10;

    // Grid of cubes
    const cubes = [];
    for (let x = -3; x <= 3; x++) {
        for (let y = -3; y <= 3; y++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.9 ? 0xFF0000 : 0xFFFFFF,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x * 2, y * 2, 0);
            scene.add(cube);
            cubes.push({ mesh: cube, baseY: y * 2 });
        }
    }

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        cubes.forEach((cube, i) => {
            cube.mesh.rotation.x += 0.01;
            cube.mesh.rotation.y += 0.01;
            cube.mesh.position.z = Math.sin(time + i * 0.1) * 2;
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
// THREE.JS - Scene 04: Data Sphere
// ============================================
function createScene04() {
    const canvas = document.getElementById('scene-04-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Central sphere with orbiting particles
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Orbiting particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        const radius = 2 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.008;
        
        particles.rotation.x += 0.002;
        particles.rotation.y += 0.003;
        
        const scale = 1 + Math.sin(time) * 0.1;
        sphere.scale.set(scale, scale, scale);
        
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
// THREE.JS - Scene 05: Portal
// ============================================
function createScene05() {
    const canvas = document.getElementById('scene-05-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Portal rings
    const rings = [];
    for (let i = 0; i < 8; i++) {
        const geometry = new THREE.TorusGeometry(1 + i * 0.3, 0.02, 16, 100);
        const material = new THREE.MeshBasicMaterial({
            color: i % 3 === 0 ? 0xFF0000 : 0xFFFFFF,
            transparent: true,
            opacity: 0.4
        });
        const ring = new THREE.Mesh(geometry, material);
        scene.add(ring);
        rings.push(ring);
    }

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        rings.forEach((ring, i) => {
            ring.rotation.x = Math.sin(time + i * 0.5) * 0.3;
            ring.rotation.y += 0.005 * (i + 1);
            ring.position.z = Math.sin(time * 0.5 + i) * 2;
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
// Form Submission
// ============================================
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    gsap.to('.submit-btn', {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            alert('[TRANSMISSION SUCCESSFUL]');
            e.target.reset();
        }
    });
});

// ============================================
// Initialize All Scenes
// ============================================
createScene01();
createWaveform();
createScene02();
createScene03();
createScene04();
createScene05();
