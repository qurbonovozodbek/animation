document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Three.js background
    initThreeJS();
    
    // Preloader animation
    const preloaderTL = gsap.timeline({
        onComplete: () => document.querySelector('.preloader').style.display = 'none'
    });
    
    preloaderTL.to('.preloader-circle', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
    })
    .to('.preloader-text', {
        y: 20,
        opacity: 0,
        duration: 0.3
    }, '-=0.2');
    
    // Navigation scroll effect
    gsap.to('.floating-nav', {
        backgroundColor: 'rgba(26, 26, 46, 0.9)',
        borderBottomWidth: '1px',
        duration: 0.3,
        scrollTrigger: {
            trigger: 'body',
            start: '50px top',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Hero section animations
    const heroTL = gsap.timeline();
    
    // Animate each line of the title separately
    gsap.utils.toArray('.title-line').forEach((line, i) => {
        heroTL.from(line, {
            y: '100%',
            opacity: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });
    
    heroTL.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.primary-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.secondary-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.4');
    
    // Create SVG morphing animation in hero
    initSVGMorphing();
    
    // Feature cards animation
    const features = [
        {
            icon: '✨',
            title: '60FPS Smoothness',
            desc: 'Buttery smooth animations optimized for performance across all devices.'
        },
        {
            icon: '🌀',
            title: 'Scroll Magic',
            desc: 'Create stunning scroll-triggered sequences with minimal code.'
        },
        {
            icon: '⚡',
            title: 'Lightning Fast',
            desc: 'Optimized engine that won\'t bog down your site or app.'
        },
        {
            icon: '🧩',
            title: 'Plugin Ecosystem',
            desc: 'Extend functionality with our powerful plugin system.'
        },
        {
            icon: '📱',
            title: 'Responsive Ready',
            desc: 'Animations that adapt seamlessly to any screen size.'
        },
        {
            icon: '🔌',
            title: 'Framework Friendly',
            desc: 'Works perfectly with React, Vue, Angular and more.'
        }
    ];
    
    const featuresGrid = document.querySelector('.features-grid');
    features.forEach((feature, i) => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card';
        featureCard.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-desc">${feature.desc}</p>
        `;
        featuresGrid.appendChild(featureCard);
        
        gsap.to(featureCard, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: '.features-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Interactive code demo animation
    const demoTL = gsap.timeline({
        scrollTrigger: {
            trigger: '.demo-section',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    demoTL.from('.demo-container', {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from('.editor-header', {
        x: -20,
        opacity: 0,
        duration: 0.5
    }, '-=0.5')
    .from('.code-block', {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, '-=0.3')
    .from('.demo-preview', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6
    }, '-=0.4');
    
    // Animate the demo elements when code is visible
    ScrollTrigger.create({
        trigger: '.demo-section',
        start: 'top 50%',
        onEnter: () => {
            const demoAnimation = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });
            
            demoAnimation.to('.preview-box', {
                x: 100,
                rotation: 180,
                borderRadius: '20px',
                duration: 1.5,
                ease: 'elastic.out(1, 0.5)'
            })
            .to('.preview-circle', {
                y: -100,
                scale: 1.5,
                duration: 1.5,
                ease: 'back.out(1.7)'
            }, '-=1.5')
            .to('.preview-title', {
                fontSize: '2.5rem',
                color: '#f72585',
                duration: 1.5,
                ease: 'power2.inOut'
            }, '-=1.5');
        }
    });
    
    // Showcase slider functionality
    const showcaseItems = document.querySelectorAll('.showcase-item');
    let currentItem = 0;
    
    function showItem(index) {
        showcaseItems.forEach(item => item.classList.remove('active'));
        showcaseItems[index].classList.add('active');
        
        // Animate in the new item
        gsap.from(showcaseItems[index], {
            opacity: 0,
            x: index > currentItem ? 100 : -100,
            duration: 0.6,
            ease: 'power2.out'
        });
        
        currentItem = index;
    }
    
    document.querySelector('.next-btn').addEventListener('click', () => {
        const nextIndex = (currentItem + 1) % showcaseItems.length;
        showItem(nextIndex);
    });
    
    document.querySelector('.prev-btn').addEventListener('click', () => {
        const prevIndex = (currentItem - 1 + showcaseItems.length) % showcaseItems.length;
        showItem(prevIndex);
    });
    
    // Initialize first showcase item
    showItem(0);
    
    // Footer animation
    gsap.from('.footer-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.animated-footer',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Three.js Background Initialization
    function initThreeJS() {
        const container = document.getElementById('three-container');
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create a galaxy of particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 2000;
        
        const posArray = new Float32Array(particleCount * 3);
        const sizeArray = new Float32Array(particleCount);
        const colorArray = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount * 3; i++) {
            // Position particles in a sphere
            const radius = Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = radius * Math.cos(phi);
            
            // Random sizes
            sizeArray[i/3] = Math.random() * 0.2 + 0.05;
            
            // Color variations
            colorArray[i] = 0.3 + Math.random() * 0.2; // R
            colorArray[i + 1] = 0.8 + Math.random() * 0.2; // G
            colorArray[i + 2] = 0.9 + Math.random() * 0.1; // B
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Add a central glow
        const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x4cc9f0,
            transparent: true,
            opacity: 0.2
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glow);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0005;
            
            // Pulsing glow effect
            const pulse = Math.sin(Date.now() * 0.001) * 0.1 + 0.5;
            glow.scale.set(pulse, pulse, pulse);
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    // SVG Morphing Animation
    function initSVGMorphing() {
        const svg = document.getElementById('morph-svg');
        const paths = [
            'M250,100 C300,50 400,50 450,100 C500,150 500,250 450,300 C400,350 300,350 250,300 C200,250 200,150 250,100 Z',
            'M250,150 C275,100 325,100 350,150 C375,200 375,250 350,300 C325,350 275,350 250,300 C225,250 225,200 250,150 Z',
            'M250,200 C300,150 350,175 400,200 C450,225 450,275 400,300 C350,325 300,300 250,300 C200,300 150,275 150,225 C150,175 200,150 250,200 Z',
            'M200,200 C250,150 300,150 350,200 C400,250 400,300 350,350 C300,400 250,400 200,350 C150,300 150,250 200,200 Z'
        ];
        
        // Create initial path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', paths[0]);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#4cc9f0');
        path.setAttribute('stroke-width', '3');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
        
        // Morph animation
        const morphTL = gsap.timeline({ repeat: -1, yoyo: true });
        
        paths.forEach((p, i) => {
            if (i > 0) {
                morphTL.to(path, {
                    attr: { d: p },
                    duration: 2,
                    ease: 'sine.inOut'
                });
            }
        });
        
        // Glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        glow.setAttribute('stdDeviation', '5');
        glow.setAttribute('result', 'glow');
        
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'glow-filter');
        filter.appendChild(glow);
        
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.appendChild(filter);
        svg.insertBefore(defs, svg.firstChild);
        
        path.setAttribute('filter', 'url(#glow-filter)');
        
        // Animate glow
        gsap.to(glow, {
            attr: { stdDeviation: 10 },
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
    
    // Floating cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .feature-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                backgroundColor: 'rgba(76, 201, 240, 0.3)',
                duration: 0.2
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'rgba(76, 201, 240, 0.1)',
                duration: 0.2
            });
        });
    });
    
    // Add custom cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #4cc9f0;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: exclusion;
            background: rgba(76, 201, 240, 0.1);
            backdrop-filter: blur(1px);
        }
        
        @media (pointer: coarse) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});