(function () {
    // ============================================================
    //  AI VOICE WELCOME - ONLY ONCE (SIMPLIFIED)
    // ============================================================
    let voicePlayed = false;

    function speakWelcome() {
        if (voicePlayed) return;
        try {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                
                const message = "Welcome to Hamza Malik's Portfolio. I'm a MERN Stack Developer, building scalable, responsive, real-world web applications. Feel free to explore my work and connect with me.";
                const utterance = new SpeechSynthesisUtterance(message);
                utterance.rate = 0.9;
                utterance.pitch = 1;
                utterance.volume = 1;
                utterance.lang = 'en-US';
                
                const voices = speechSynthesis.getVoices();
                const femaleVoice = voices.find(v => v.name.includes('Google UK') || v.name.includes('Samantha') || v.name.includes('Female'));
                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                }
                
                utterance.onend = function() {
                    voicePlayed = true;
                };
                
                setTimeout(() => {
                    speechSynthesis.speak(utterance);
                }, 1000);
            }
        } catch (e) {
            console.log('Speech synthesis not supported');
        }
    }

    window.addEventListener('load', function() {
        setTimeout(function() {
            speakWelcome();
        }, 500);
    });

    // ============================================================
    //  🎵 SOUND EFFECTS SYSTEM
    // ============================================================
    
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function playSound(type = 'click') {
        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            const now = ctx.currentTime;
            
            switch(type) {
                case 'click':
                    // Button click sound
                    oscillator.frequency.setValueAtTime(800, now);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
                    oscillator.type = 'sine';
                    gainNode.gain.setValueAtTime(0.15, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                    oscillator.start(now);
                    oscillator.stop(now + 0.12);
                    break;
                    
                case 'hover':
                    // Card hover sound (soft)
                    oscillator.frequency.setValueAtTime(600, now);
                    oscillator.frequency.exponentialRampToValueAtTime(900, now + 0.06);
                    oscillator.type = 'sine';
                    gainNode.gain.setValueAtTime(0.08, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                    oscillator.start(now);
                    oscillator.stop(now + 0.08);
                    break;
                    
                case 'success':
                    // Form submit success
                    oscillator.frequency.setValueAtTime(523, now);
                    oscillator.frequency.setValueAtTime(659, now + 0.1);
                    oscillator.frequency.setValueAtTime(784, now + 0.2);
                    oscillator.type = 'sine';
                    gainNode.gain.setValueAtTime(0.12, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                    oscillator.start(now);
                    oscillator.stop(now + 0.3);
                    break;
                    
                case 'error':
                    // Form validation error
                    oscillator.frequency.setValueAtTime(300, now);
                    oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.2);
                    oscillator.type = 'sawtooth';
                    gainNode.gain.setValueAtTime(0.1, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    oscillator.start(now);
                    oscillator.stop(now + 0.2);
                    break;
                    
                case 'modal':
                    // Modal open
                    oscillator.frequency.setValueAtTime(440, now);
                    oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.15);
                    oscillator.type = 'sine';
                    gainNode.gain.setValueAtTime(0.1, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                    oscillator.start(now);
                    oscillator.stop(now + 0.15);
                    break;
                    
                case 'menu':
                    // Menu toggle
                    oscillator.frequency.setValueAtTime(500, now);
                    oscillator.frequency.exponentialRampToValueAtTime(700, now + 0.1);
                    oscillator.type = 'triangle';
                    gainNode.gain.setValueAtTime(0.1, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    oscillator.start(now);
                    oscillator.stop(now + 0.1);
                    break;
                    
                case 'resume':
                    // Resume download
                    oscillator.frequency.setValueAtTime(600, now);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
                    oscillator.type = 'sine';
                    gainNode.gain.setValueAtTime(0.12, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    oscillator.start(now);
                    oscillator.stop(now + 0.2);
                    break;
                    
                case 'filter':
                    // Filter button
                    oscillator.frequency.setValueAtTime(700, now);
                    oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
                    oscillator.type = 'square';
                    gainNode.gain.setValueAtTime(0.08, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    oscillator.start(now);
                    oscillator.stop(now + 0.1);
                    break;
                    
                default:
                    oscillator.frequency.setValueAtTime(800, now);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
                    oscillator.type = 'sine';
                    gainNode.gain.setValueAtTime(0.12, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                    oscillator.start(now);
                    oscillator.stop(now + 0.12);
            }
        } catch (e) {
            // Silent fail
        }
    }

    // ============================================================
    //  🔘 BUTTON CLICK SOUNDS (NO HOVER)
    // ============================================================
    
    // All buttons - click only (no hover)
    document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-success, .btn-large, .filter-btn, #submitBtn, .modal-close, .back-to-top, .menu-toggle').forEach(el => {
        el.addEventListener('click', function(e) {
            // Don't interfere with form submission
            if (this.id === 'submitBtn') return;
            playSound('click');
        });
    });

    // ============================================================
    //  🎯 CARD HOVER SOUNDS ONLY
    // ============================================================
    
    document.querySelectorAll('.project-card, .profile-card, .skills-card, .hire-card, .cert-card, .education-card, .skill-category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            playSound('hover');
        });
    });

    // ============================================================
    //  🔗 NAV LINKS - CLICK ONLY (NO HOVER)
    // ============================================================
    
    document.querySelectorAll('.nav-links a, .mobile-menu a, .footer-links a, .social-links a').forEach(link => {
        link.addEventListener('click', function() {
            playSound('click');
        });
    });

    // ============================================================
    //  📱 MOBILE MENU
    // ============================================================
    
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            playSound('menu');
            mobileMenu.classList.toggle('show');
            menuToggle.innerHTML = mobileMenu.classList.contains('show') ?
                '<i class="fa-solid fa-xmark"></i>' :
                '<i class="fa-solid fa-bars"></i>';
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                playSound('click');
                mobileMenu.classList.remove('show');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // ============================================================
    //  🏠 BACK TO TOP
    // ============================================================
    
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', function() {
        playSound('click');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================
    //  📄 RESUME DOWNLOAD
    // ============================================================
    
    document.querySelectorAll('#resumeBtn, #resumeHeroBtn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            playSound('resume');
        });
    });

    // ============================================================
    //  🎯 MODAL
    // ============================================================
    
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalGrid = document.getElementById('modalGrid');

    // Modal close sound
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            playSound('click');
            closeModal();
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                playSound('click');
                closeModal();
            }
        });
    }

    // ============================================================
    //  🔍 FILTER BUTTONS
    // ============================================================
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playSound('filter');
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProjects(this.dataset.filter);
        });
    });

    // ============================================================
    //  📧 CONTACT FORM
    // ============================================================
    
    const submitBtn = document.getElementById('submitBtn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';

            if (!name || !email || !subject || !message) {
                playSound('error');
                showToast('⚠️ Please fill all fields.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                playSound('error');
                showToast('⚠️ Please enter a valid email address.');
                return;
            }

            playSound('success');
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            if (typeof emailjs !== 'undefined') {
                emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    { name, email, subject, message }
                )
                    .then(() => {
                        playSound('success');
                        showToast('✅ Message sent successfully! I\'ll get back to you within 24 hours.');
                        document.getElementById('name').value = '';
                        document.getElementById('email').value = '';
                        document.getElementById('subject').value = '';
                        document.getElementById('message').value = '';
                    })
                    .catch(() => {
                        playSound('error');
                        showToast('❌ Failed to send message. Please try again.');
                    })
                    .finally(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                playSound('error');
                showToast('⚠️ Email service not initialized. Please try again later.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================================
    //  EMAILJS CONFIGURATION
    // ============================================================
    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_3wo28zq',
        TEMPLATE_ID: 'template_9i3qgbq',
        PUBLIC_KEY: 'S6SdSwrWnRACWx662'
    };

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }

    // ============================================================
    //  PROJECTS DATA
    // ============================================================
    const projectsData = [{
        id: 1,
        title: "PakClassified - Car Marketplace",
        desc: "A full-featured classified marketplace platform where users can buy and sell cars online. Features include user authentication, real-time search, category filters, price range filtering, and responsive UI.",
        cover: "img/S1.png",
        images: ["img/S1.png", "img/S2.png", "img/S3.png", "img/S4.png", "img/S5.png"],
        tag: "Full-Stack App",
        tech: ["React", "Node", "Express", "MongoDB", "JWT", "Bcrypt"]
    }, {
        id: 2,
        title: "BrandStore - E-Commerce",
        desc: "A complete e-commerce store platform with admin dashboard, product management, shopping cart, category-based filtering, user authentication, and order placement.",
        cover: "img/C1.png",
        images: ["img/C1.png", "img/C2.png", "img/C3.png", "img/C4.png", "img/C5.png", "img/C6.png", "img/C7.png"],
        tag: "E-Commerce Store",
        tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Stripe", "Bootstrap"]
    }, {
        id: 3,
        title: "Tasker - Task Management",
        desc: "A comprehensive task management application with CRUD operations, task categories, due dates, image upload using Multer, and fully responsive design.",
        cover: "img/T1.png",
        images: ["img/T1.png", "img/T2.png", "img/T3.png", "img/T4.png"],
        tag: "Task Management App",
        tech: ["React", "Node.js", "Express", "MongoDB", "Multer", "Bootstrap"]
    }];

    // ============================================================
    //  CERTIFICATIONS DATA
    // ============================================================
    const certData = [{
        title: "Full Stack Web Development",
        org: "EVS Institute — 2024",
        desc: "Professional training covering frontend and backend development with MERN stack."
    }, {
        title: "MERN Stack Web Developer",
        org: "EVS Institute — 2024",
        desc: "Specialized training in React.js, Node.js, Express.js, and MongoDB."
    }, {
        title: "Frontend Web Development",
        org: "EVS Institute — 2024",
        desc: "HTML, CSS, JavaScript, and responsive design principles."
    }];

    // ============================================================
    //  RENDER ALL SECTIONS
    // ============================================================
    
    // 1. Render Certifications
    const certGrid = document.getElementById('certGrid');
    if (certGrid) {
        certData.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'cert-card';
            card.innerHTML = `
                <i class="fa-solid fa-certificate"></i>
                <h4>${cert.title}</h4>
                <div class="cert-org">${cert.org}</div>
                <p>${cert.desc}</p>
            `;
            certGrid.appendChild(card);
        });
    }

    // 2. Render Projects
    const projectsGrid = document.getElementById('projectsGrid');

    function renderProjects(filter = 'all') {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.tag === filter);
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-img">
                    <img src="${item.cover}" alt="${item.title}" loading="lazy" onerror="this.src='img/placeholder.png'">
                    <div class="overlay"><i class="fa-regular fa-eye"></i></div>
                </div>
                <div class="project-body">
                    <span class="tag">${item.tag}</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="tech">
                        ${item.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
            `;
            // Click - Modal sound
            card.addEventListener('click', function() {
                playSound('modal');
                openModal(item);
            });
            // Hover - Card hover sound
            card.addEventListener('mouseenter', function() {
                playSound('hover');
            });
            projectsGrid.appendChild(card);
        });
    }

    // ============================================================
    //  MODAL FUNCTIONS
    // ============================================================
    function openModal(item) {
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc + ' | Tech: ' + item.tech.join(', ');
        modalGrid.innerHTML = '';
        const imgs = item.images || [item.cover];
        imgs.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = item.title;
            img.loading = 'lazy';
            img.onerror = function() { this.src = 'img/placeholder.png'; };
            modalGrid.appendChild(img);
        });
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================================
    //  TOAST
    // ============================================================
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(msg) {
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ============================================================
    //  COUNTERS WITH ANIMATION
    // ============================================================
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = Math.ceil(target / 40);
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            element.textContent = current + suffix;
        }, 30);
    }

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const expEl = document.getElementById('expCount');
                const projEl = document.getElementById('projectCount');
                const certEl = document.getElementById('certCount');
                const codeEl = document.getElementById('codeCount');
                if (expEl) animateCounter(expEl, 1, '+');
                if (projEl) animateCounter(projEl, 3);
                if (certEl) animateCounter(certEl, 3);
                if (codeEl) animateCounter(codeEl, 50, '+');
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) heroObserver.observe(heroSection);

    // ============================================================
    //  SKILL PROGRESS BARS
    // ============================================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    const width = bar.dataset.width || 0;
                    setTimeout(() => { bar.style.width = width + '%'; }, 400);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skills-bars').forEach(el => skillObserver.observe(el));

    // ============================================================
    //  HEADER SCROLL EFFECT
    // ============================================================
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // ============================================================
    //  3D LAPTOP SCENE
    // ============================================================
    (function initLaptopScene() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const setCanvasSize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
        };
        setCanvasSize();

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.2, 6);
        camera.lookAt(0, 0, 0);

        const ambient = new THREE.AmbientLight(0x404060);
        scene.add(ambient);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(3, 4, 5);
        scene.add(dirLight);
        const fillLight = new THREE.DirectionalLight(0x6c5ce7, 0.3);
        fillLight.position.set(-3, 1, -3);
        scene.add(fillLight);

        const group = new THREE.Group();
        scene.add(group);

        const bodyGeo = new THREE.BoxGeometry(2.4, 0.15, 1.6);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1f2a, roughness: 0.3, metalness: 0.7 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = -0.1;
        group.add(body);

        const screenGeo = new THREE.BoxGeometry(2.2, 1.5, 0.06);
        const screenMat = new THREE.MeshStandardMaterial({ color: 0x0a0e14, emissive: 0x6c5ce7, emissiveIntensity: 0.15 });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(0, 0.8, -0.03);
        group.add(screen);

        const borderGeo = new THREE.BoxGeometry(2.28, 1.58, 0.02);
        const borderMat = new THREE.MeshStandardMaterial({ color: 0x6c5ce7, emissive: 0x6c5ce7, emissiveIntensity: 0.08 });
        const border = new THREE.Mesh(borderGeo, borderMat);
        border.position.set(0, 0.8, -0.02);
        group.add(border);

        const kbGeo = new THREE.BoxGeometry(1.8, 0.04, 0.9);
        const kbMat = new THREE.MeshStandardMaterial({ color: 0x11151e, roughness: 0.8 });
        const kb = new THREE.Mesh(kbGeo, kbMat);
        kb.position.set(0, 0.02, 0.2);
        group.add(kb);

        const tpGeo = new THREE.BoxGeometry(0.6, 0.02, 0.5);
        const tpMat = new THREE.MeshStandardMaterial({ color: 0x222a38, roughness: 0.6, metalness: 0.3 });
        const tp = new THREE.Mesh(tpGeo, tpMat);
        tp.position.set(0, 0.03, -0.35);
        group.add(tp);

        const linesMat = new THREE.MeshStandardMaterial({ color: 0x6c5ce7, emissive: 0x6c5ce7, emissiveIntensity: 0.12 });
        for (let i = 0; i < 8; i++) {
            const line = new THREE.Mesh(new THREE.BoxGeometry(1.6 - i * 0.1, 0.02, 0.01), linesMat);
            line.position.set(0, 0.6 - i * 0.12, -0.02);
            group.add(line);
        }

        const logoGroup = new THREE.Group();
        group.add(logoGroup);
        const radius = 2.4;
        const logos = [
            { color: 0x61dafb, label: 'React' },
            { color: 0x68a063, label: 'Node' },
            { color: 0x000000, label: 'Express' },
            { color: 0x47a248, label: 'MongoDB' },
            { color: 0xf05032, label: 'Git' },
            { color: 0xffffff, label: 'GitHub' }
        ];
        logos.forEach((logo, idx) => {
            const angle = (idx / logos.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.28, 16, 16),
                new THREE.MeshStandardMaterial({ color: logo.color, emissive: logo.color, emissiveIntensity: 0.25 })
            );
            sphere.position.set(x, 0.2 + Math.sin(angle * 2) * 0.1, z);
            sphere.userData = { angle: angle, radius: radius, baseY: 0.2 };
            logoGroup.add(sphere);
        });

        const starsGeo = new THREE.BufferGeometry();
        const starsCount = 2000;
        const starsPos = new Float32Array(starsCount * 3);
        for (let i = 0; i < starsCount * 3; i += 3) {
            const r = 10 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            starsPos[i] = r * Math.sin(phi) * Math.cos(theta);
            starsPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            starsPos[i + 2] = r * Math.cos(phi);
        }
        starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
        const starsMat = new THREE.PointsMaterial({ color: 0x6c5ce7, size: 0.12, transparent: true, opacity: 0.3 });
        const stars = new THREE.Points(starsGeo, starsMat);
        scene.add(stars);

        const resize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            renderer.setSize(w, h);
            renderer.setPixelRatio(dpr);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 100);
        });
        resize();

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            group.rotation.y = elapsed * 0.2;
            group.rotation.x = Math.sin(elapsed * 0.08) * 0.04;
            group.rotation.z = Math.cos(elapsed * 0.06) * 0.02;

            logoGroup.children.forEach((child, i) => {
                const angle = child.userData.angle + elapsed * 0.15;
                const radius = child.userData.radius;
                child.position.x = Math.cos(angle) * radius;
                child.position.z = Math.sin(angle) * radius;
                child.position.y = child.userData.baseY + Math.sin(elapsed * 0.8 + i) * 0.2;
            });

            screenMat.emissiveIntensity = 0.15 + Math.sin(elapsed * 0.5) * 0.08;
            stars.rotation.y = elapsed * 0.005;

            renderer.render(scene, camera);
        };
        animate();
    })();

    // ============================================================
    //  TYPED.JS
    // ============================================================
    const typedEl = document.getElementById('typedRoles');
    if (typedEl && typeof Typed !== 'undefined') {
        new Typed('#typedRoles', {
            strings: ['MERN Stack Developer', 'React.js Developer', 'Node.js Developer', 'Full Stack Developer'],
            typeSpeed: 70,
            backSpeed: 36,
            backDelay: 1700,
            smartBackspace: true,
            loop: true,
            cursorChar: '|'
        });
    }

    // ============================================================
    //  ⭐ GSAP ANIMATIONS WITH PROPER VISIBILITY
    // ============================================================
    
    function makeCardsVisible() {
        const allCards = document.querySelectorAll('.project-card, .profile-card, .skills-card, .hire-card, .cert-card, .education-card, .skill-category-card');
        allCards.forEach(card => {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.transform = 'translateY(0)';
        });
    }

    makeCardsVisible();

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from('.hero-title', {
                opacity: 0,
                y: 60,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.3
            });

            gsap.from('.hero-subtitle', {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power3.out',
                delay: 0.6
            });

            gsap.from('.hero-actions', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.9
            });

            gsap.from('.hero-stats', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                delay: 1.2
            });

            document.querySelectorAll('.section').forEach(section => {
                const elements = section.querySelectorAll('.project-card, .profile-card, .skills-card, .hire-card, .cert-card, .education-card, .skill-category-card');
                if (elements.length > 0) {
                    gsap.from(elements, {
                        opacity: 0,
                        y: 50,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                            invalidateOnRefresh: true
                        }
                    });
                }
            });

            document.querySelectorAll('.section-header').forEach(header => {
                gsap.from(header, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            ScrollTrigger.refresh();

            setTimeout(() => {
                const allCards = document.querySelectorAll('.project-card, .profile-card, .skills-card, .hire-card, .cert-card, .education-card, .skill-category-card');
                allCards.forEach(card => {
                    if (card.style.opacity === '0' || card.style.opacity === '') {
                        card.style.opacity = '1';
                        card.style.visibility = 'visible';
                        card.style.transform = 'translateY(0)';
                    }
                });
            }, 2000);

        } catch (e) {
            console.warn('GSAP animation error, but cards are already visible:', e);
        }
    } else {
        console.log('GSAP not loaded, using fallback visibility');
    }

    // ============================================================
    //  NAV ACTIVE STATE
    // ============================================================
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            playSound('click');
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ============================================================
    //  INIT - RENDER ALL PROJECTS
    // ============================================================
    renderProjects('all');

})();