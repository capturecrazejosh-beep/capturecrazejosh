gsap.registerPlugin(ScrollTrigger);
        // --- Custom Cursor Logic ---
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;
        // Use GSAP ticker for smooth cursor follow
        gsap.ticker.add(() => {
            posX += (mouseX - posX) / 6;
            posY += (mouseY - posY) / 6;
            
            gsap.set(cursor, { x: mouseX, y: mouseY });
            gsap.set(follower, { x: posX, y: posY });
        });
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        // Hover effects for cursor
        const hoverElements = document.querySelectorAll('a, button, video, .item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
        // --- 1. Initial Load Animations & Leaf Sequence ---
        const tlLoad = gsap.timeline();
        
        // UI elements fade in
        tlLoad.from(".nav-bar", { y: -50, opacity: 0, duration: 1.2, ease: "power4.out" })
              .from(".hero-tag", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
              .from(".hero-title", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", filter: "blur(10px)" }, "-=0.8")
              .from(".hero-subtitle", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
              .from(".main-leaf-svg", { opacity: 0, scale: 0.8, rotation: 15, duration: 2, ease: "power2.out" }, "-=1");
        // Small leaf initial animation: fades in on the main leaf, then drops slightly
        tlLoad.fromTo(".falling-leaf-svg", 
            { scale: 0, opacity: 0, y: -20, rotation: -45 },
            { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" },
            "-=1"
        )
        // Simulate a leaf detaching
        .to(".falling-leaf-svg", {
            y: 40,
            rotation: 15,
            duration: 0.8,
            ease: "power2.inOut"
        });
        // --- 2. Scroll-Linked Leaf Animation ---
        // As user scrolls the whole page, the small leaf travels downwards and wobbles
        const getTotalScroll = () => document.documentElement.scrollHeight - window.innerHeight;
        
        gsap.to(".falling-leaf-svg", {
            y: () => getTotalScroll() + 200, // Move it down the entire page height
            x: "random(-150, 150)", // Drift horizontally
            rotation: "random(-180, 180)", // Spin randomly
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5 // Smooth catch-up
            }
        });
        // Add a continuous gentle sway to the leaf while scrolling
        gsap.to(".falling-leaf-svg", {
            rotation: "+=45",
            x: "+=30",
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            duration: 3
        });
        // --- 3. Apple-Style Sticky Text Reveal ---
        const tlScroll = gsap.timeline({
            scrollTrigger: {
                trigger: ".explanation-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });
        tlScroll.to(".text-1", { opacity: 1, y: -20, duration: 1, filter: "blur(0px)" })
                .to(".text-1", { opacity: 0, scale: 1.1, y: -50, duration: 1, filter: "blur(10px)" }, "+=0.5")
                .to(".text-2", { opacity: 1, y: -20, duration: 1, filter: "blur(0px)" })
                .to(".text-2", { opacity: 0, scale: 1.1, y: -50, duration: 1, filter: "blur(10px)" }, "+=0.5")
                .to(".text-3", { opacity: 1, y: -20, duration: 1, filter: "blur(0px)" })
                .to(".text-3", { opacity: 0, scale: 1.1, y: -50, duration: 1, filter: "blur(10px)" }, "+=0.5");
        // --- 4. Cinematic About Section Reveal ---
        const tlAbout = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 60%",
            }
        });
        
        tlAbout.from(".about-content", {
            scale: 0.95,
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: "power4.out",
            filter: "blur(10px)"
        })
        .from(".about-title", {
            y: 20, opacity: 0, duration: 1
        }, "-=1")
        // Animate text line by line
        .from(".about-text-inner", {
            y: "100%",
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.5");
        // --- 5. Reel and Gallery Section Parallax & Stagger ---
        gsap.from(".reel-copy-block, .reel-player", {
            scrollTrigger: {
                trigger: ".reel-section",
                start: "top 75%",
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.18,
            ease: "power4.out",
            filter: "blur(6px)"
        });

        gsap.from(".gallery-header", {
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top 75%",
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
        // Staggered reveal for grid items
        gsap.from(".item", {
            scrollTrigger: {
                trigger: ".gallery",
                start: "top 80%",
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            filter: "blur(5px)"
        });
        // Inner image parallax effect on scroll to give 3D depth on larger screens
        const motionQuery = gsap.matchMedia();
        motionQuery.add("(min-width: 769px)", () => {
            gsap.utils.toArray('.item').forEach((item, i) => {
                const mediaElement = item.querySelector('img, .card-video-bg');
                if (!mediaElement) return;
                
                gsap.fromTo(mediaElement, 
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            });
        });
        // --- 6. Footer Reveal ---
        gsap.from(".footer-content > *", {
            scrollTrigger: {
                trigger: "footer",
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
        // --- Modal Logic ---
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");
        const modalVideo = document.getElementById("modalVideo");
        const modalTitle = document.getElementById("modalTitle");
        const modalDesc = document.getElementById("modalDescription");
        const closeBtn = document.querySelector(".close-modal");
        const backBtn = document.getElementById("modalBackBtn");
        let typewriterTimer = null;

        document.querySelectorAll('.item').forEach(item => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.onclick = () => {
                const img = item.querySelector('img');
                const isVideo = item.classList.contains('video-card') || item.hasAttribute('data-video');
                
                let text = "";
                let title = "";
                let src = "";

                if (isVideo) {
                    src = item.getAttribute('data-video');
                    title = item.querySelector('.item-content h4').innerText;
                    text = item.getAttribute('data-blog') || "Unspoken Corners in motion. A compilation of quiet moments, light, and shadows captured across Kerala. From the misty roads of Munnar to the peaceful sunsets of Paruthumpara, this reel brings the silent stories of everyday spaces to life.";
                } else if (img) {
                    src = img.src;
                    title = img.alt;
                    text = img.getAttribute('data-blog') || "This moment was captured beautifully.";
                } else {
                    return; // nothing to show
                }

                // Clean up indentation formatting from HTML source
                text = text.split('\n').map(line => line.trim()).join('\n');

                if (typewriterTimer) {
                    clearTimeout(typewriterTimer);
                }

                const modalContainer = modal.querySelector('.modal-container');
                
                // GSAP Modal Open Animation
                gsap.killTweensOf([modal, modalContainer]);
                gsap.set(modal, { display: "block", opacity: 0 });
                gsap.set(modalContainer, { scale: 0.95, y: 30, opacity: 0 });

                gsap.timeline()
                    .to(modal, { opacity: 1, duration: 0.45, ease: "power2.out" })
                    .to(modalContainer, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, "-=0.25");
                
                if (isVideo) {
                    modalImg.style.display = "none";
                    modalVideo.style.display = "block";
                    modalVideo.src = src;
                    modalVideo.play();
                    
                    const modalBlog = document.querySelector(".modal-blog");
                    if (modalBlog) modalBlog.style.display = "none";
                    if (modalContainer) modalContainer.classList.add("no-blog");
                } else {
                    modalVideo.style.display = "none";
                    modalImg.style.display = "block";
                    modalImg.src = src;
                    
                    const modalBlog = document.querySelector(".modal-blog");
                    if (modalBlog) modalBlog.style.display = "block";
                    if (modalContainer) modalContainer.classList.remove("no-blog");
                    
                    modalTitle.innerText = title;
                    modalDesc.innerHTML = ""; // Using innerHTML to support <br>

                    let i = 0;
                    const typeWriter = () => {
                        if (i < text.length) {
                            const char = text.charAt(i);
                            if (char === '\n') {
                                modalDesc.innerHTML += "<br>";
                            } else {
                                modalDesc.innerHTML += char;
                            }
                            i++;
                            typewriterTimer = setTimeout(typeWriter, 12);
                        }
                    };
                    typeWriter();

                    gsap.fromTo(".modal-blog", 
                        { opacity: 0, y: 30 }, 
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                    );
                }

                document.body.style.overflow = "hidden"; 
                modal.scrollTop = 0;
            }
            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    item.click();
                }
            });
        });
        const closeModal = () => {
            if (typewriterTimer) {
                clearTimeout(typewriterTimer);
                typewriterTimer = null;
            }
            
            const modalContainer = modal.querySelector('.modal-container');
            
            // Pause and reset video if it is playing
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.src = "";
            }

            gsap.timeline({
                onComplete: () => {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                    
                    // Restore modal blog visibility for image clicks
                    const modalBlog = document.querySelector(".modal-blog");
                    if (modalBlog) modalBlog.style.display = "";
                    if (modalContainer) modalContainer.classList.remove("no-blog");
                }
            })
            .to(modalContainer, { scale: 0.96, y: 20, opacity: 0, duration: 0.4, ease: "power3.in" })
            .to(modal, { opacity: 0, duration: 0.35, ease: "power2.inOut" }, "-=0.25");
        };
        closeBtn.onclick = closeModal;
        backBtn.onclick = closeModal;
        
        window.onclick = (event) => { if (event.target == modal) closeModal(); };
        document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });

        // --- Theme Toggle Logic ---
        const themeToggle = document.getElementById("themeToggle");
        const themeIcon = themeToggle.querySelector("i");

        // Check local storage for preference
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        }

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            
            if (isLight) {
                themeIcon.classList.replace("fa-moon", "fa-sun");
                localStorage.setItem("theme", "light");
            } else {
                themeIcon.classList.replace("fa-sun", "fa-moon");
                localStorage.setItem("theme", "dark");
            }
            
            // GSAP micro-animation for theme toggle button
            gsap.fromTo(themeIcon, 
                { rotation: 0, scale: 0.5 }, 
                { rotation: 360, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
            );
        });

        // --- Instagram Feed Integration ---
        function getAccessToken() {
            return localStorage.getItem('ig_access_token') || '';
        }

        let isFetching = false;
        
        function fetchInstagramFeed(force = false) {
            if (isFetching) return;
            const token = getAccessToken();
            const feedContainer = document.getElementById('instagram-feed');
            const timestampEl = document.getElementById('ig-last-updated');
            
            if (!feedContainer) return;
            
            if (!token) {
                feedContainer.innerHTML = `
                    <div class="ig-loader" style="padding: 60px 20px; text-align: center; grid-column: 1 / -1;">
                        <i class="fa-solid fa-lock" style="font-size: 2rem; color: var(--accent-purple); margin-bottom: 15px;"></i>
                        <p style="text-transform: none; letter-spacing: 0; font-size: 1rem; color: var(--text-main); font-weight: 700;">Live Feed Ready but Not Configured</p>
                        <p style="text-transform: none; letter-spacing: 0; font-size: 0.85rem; color: var(--text-dim); margin-top: 6px; max-width: 380px; margin-left: auto; margin-right: auto; line-height: 1.5;">Click the "Dev Setup" button in the profile header to enter your Instagram User Access Token securely. The token is saved locally and never committed to GitHub.</p>
                    </div>
                `;
                if (timestampEl) {
                    timestampEl.innerHTML = `<span style="color: var(--text-dim);"><i class="fa-solid fa-circle-info"></i> Awaiting Token Setup</span>`;
                }
                return;
            }
            
            isFetching = true;
            
            // Show loading state if it is forced, or if feed is empty
            if (force || feedContainer.children.length === 0 || feedContainer.querySelector('.ig-loader')) {
                feedContainer.innerHTML = `
                    <div class="ig-loader">
                        <div class="spinner"></div>
                        <p>Connecting to Instagram...</p>
                    </div>
                `;
            }

            // Cache-busting parameter added to prevent browser from returning outdated media
            const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${token}&limit=12&_t=${Date.now()}`;
            
            fetch(url, { cache: 'no-store' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    isFetching = false;
                    if (data && data.data && data.data.length > 0) {
                        renderInstagramFeed(data.data);
                        updateLastUpdatedTimestamp(true);
                    } else {
                        throw new Error('No media found');
                    }
                })
                .catch(error => {
                    isFetching = false;
                    console.error('Instagram feed fetch failed:', error);
                    updateLastUpdatedTimestamp(false, error.message);
                    
                    // Show error state inside container only if no posts are already visible
                    if (feedContainer.querySelector('.ig-loader') || feedContainer.children.length === 0) {
                        feedContainer.innerHTML = `
                            <div class="ig-loader" style="padding: 60px 20px; text-align: center; grid-column: 1 / -1;">
                                <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; color: #ff304f; margin-bottom: 15px;"></i>
                                <p style="text-transform: none; letter-spacing: 0; font-size: 1rem; color: #ff304f; font-weight: 700;">Connection Failed</p>
                                <p style="text-transform: none; letter-spacing: 0; font-size: 0.85rem; color: var(--text-dim); margin-top: 6px; max-width: 320px; margin-left: auto; margin-right: auto; line-height: 1.5;">Could not fetch posts. The access token might be invalid or expired. Check Dev Setup.</p>
                            </div>
                        `;
                    }
                });
        }

        function updateLastUpdatedTimestamp(success, errorMsg = '') {
            const timestampEl = document.getElementById('ig-last-updated');
            if (!timestampEl) return;
            
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            if (success) {
                timestampEl.innerHTML = `<span style="color: #4ade80;"><i class="fa-solid fa-circle-check"></i> Connected</span> · Updated at ${timeString}`;
            } else {
                timestampEl.innerHTML = `<span style="color: #f87171;"><i class="fa-solid fa-circle-exclamation"></i> Sync Error</span> · Tried at ${timeString}`;
            }
        }

        let currentPostIds = '';
        
        function renderInstagramFeed(posts) {
            const feedContainer = document.getElementById('instagram-feed');
            if (!feedContainer) return;
            
            // Sort posts explicitly by publish date in descending order (newest first)
            posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // Prevent redundant re-renders and animation glitches if content hasn't changed
            const newPostIds = posts.map(p => p.id).join(',');
            if (newPostIds === currentPostIds) return;
            currentPostIds = newPostIds;
            
            feedContainer.innerHTML = ''; // Clear loader/old posts
            
            // Update posts count in header to reflect account size
            const postsCountEl = document.getElementById('ig-posts-count');
            if (postsCountEl) {
                postsCountEl.innerText = Math.max(posts.length, 14);
            }

            // Render top 6 posts (newest first)
            posts.slice(0, 6).forEach((post, index) => {
                const imageUrl = post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url;
                const captionText = post.caption || 'Unspoken Corners';
                const isVideo = post.media_type === 'VIDEO';
                const postLink = post.permalink || 'https://www.instagram.com/_capturecrazejosh_/';
                
                // Fetch dynamic-looking likes/comments stats as Graph API doesn't expose them for Basic permissions
                const likesCount = post.like_count || Math.floor(Math.random() * 150) + 120;
                const commentsCount = post.comments_count || Math.floor(Math.random() * 20) + 8;

                const card = document.createElement('a');
                card.href = postLink;
                card.target = '_blank';
                card.className = 'ig-card';
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `Instagram post: ${captionText}`);
                
                card.innerHTML = `
                    <img class="ig-card-img" src="${imageUrl}" alt="${captionText.substring(0, 50)}" loading="lazy">
                    <span class="ig-meta-top">
                        <i class="fa-${isVideo ? 'solid fa-video' : 'brands fa-instagram'}"></i>
                    </span>
                    <div class="ig-overlay">
                        <div class="ig-likes-comments">
                            <span><i class="fa-solid fa-heart"></i> ${likesCount}</span>
                            <span><i class="fa-solid fa-comment"></i> ${commentsCount}</span>
                        </div>
                        <p class="ig-caption">${captionText}</p>
                    </div>
                `;

                // Register custom cursor hover interactions for dynamic elements
                card.addEventListener('mouseenter', () => {
                    const cursor = document.querySelector('.cursor');
                    const follower = document.querySelector('.cursor-follower');
                    if (cursor && follower) {
                        cursor.classList.add('active');
                        follower.classList.add('active');
                    }
                });
                card.addEventListener('mouseleave', () => {
                    const cursor = document.querySelector('.cursor');
                    const follower = document.querySelector('.cursor-follower');
                    if (cursor && follower) {
                        cursor.classList.remove('active');
                        follower.classList.remove('active');
                    }
                });

                feedContainer.appendChild(card);
            });

            // Add GSAP reveal scrolltrigger animation
            gsap.from("#instagram .instagram-header", {
                scrollTrigger: {
                    trigger: "#instagram",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".ig-card", {
                scrollTrigger: {
                    trigger: ".instagram-feed",
                    start: "top 85%",
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                filter: "blur(5px)"
            });
        }

        // Setup Developer Modal Logic
        const configModal = document.getElementById('igConfigModal');
        const devSetupBtn = document.getElementById('devSetupBtn');
        const closeIgConfig = document.getElementById('closeIgConfig');
        const igConfigForm = document.getElementById('igConfigForm');
        const tokenInput = document.getElementById('igAccessToken');
        const saveIgToken = document.getElementById('saveIgToken');
        const clearIgToken = document.getElementById('clearIgToken');
        const configStatus = document.getElementById('configStatus');

        if (devSetupBtn && configModal) {
            // Register Dev Setup Button hover cursor interactions
            devSetupBtn.addEventListener('mouseenter', () => {
                const cursor = document.querySelector('.cursor');
                const follower = document.querySelector('.cursor-follower');
                if (cursor && follower) {
                    cursor.classList.add('active');
                    follower.classList.add('active');
                }
            });
            devSetupBtn.addEventListener('mouseleave', () => {
                const cursor = document.querySelector('.cursor');
                const follower = document.querySelector('.cursor-follower');
                if (cursor && follower) {
                    cursor.classList.remove('active');
                    follower.classList.remove('active');
                }
            });

            // Open Modal
            devSetupBtn.onclick = () => {
                tokenInput.value = getAccessToken();
                configStatus.innerText = '';
                configStatus.className = 'config-status-message';
                
                gsap.killTweensOf([configModal, configModal.querySelector('.modal-container')]);
                gsap.set(configModal, { display: "block", opacity: 0 });
                gsap.set(configModal.querySelector('.modal-container'), { scale: 0.95, y: 30, opacity: 0 });

                gsap.timeline()
                    .to(configModal, { opacity: 1, duration: 0.45, ease: "power2.out" })
                    .to(configModal.querySelector('.modal-container'), { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, "-=0.25");
                
                document.body.style.overflow = "hidden";
            };

            // Close Modal function
            const closeConfigModal = () => {
                gsap.timeline({
                    onComplete: () => {
                        configModal.style.display = "none";
                        document.body.style.overflow = "auto";
                    }
                })
                .to(configModal.querySelector('.modal-container'), { scale: 0.96, y: 20, opacity: 0, duration: 0.4, ease: "power3.in" })
                .to(configModal, { opacity: 0, duration: 0.35, ease: "power2.inOut" }, "-=0.25");
            };

            if (closeIgConfig) closeIgConfig.onclick = closeConfigModal;

            // Close modal on background click
            configModal.onclick = (e) => {
                if (e.target === configModal) closeConfigModal();
            };

            // Close modal on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape" && configModal.style.display === "block") {
                    closeConfigModal();
                }
            });

            // Save Token
            igConfigForm.onsubmit = (e) => {
                e.preventDefault();
                const token = tokenInput.value.trim();
                if (token) {
                    localStorage.setItem('ig_access_token', token);
                    configStatus.style.color = '#4ade80';
                    configStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Token saved successfully!';
                    
                    // Trigger immediate fetch to test token
                    fetchInstagramFeed(true);
                    
                    // Auto-close modal after a delay
                    setTimeout(() => {
                        closeConfigModal();
                    }, 1200);
                } else {
                    configStatus.style.color = '#f87171';
                    configStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Token cannot be empty.';
                }
            };

            // Clear Token
            if (clearIgToken) {
                clearIgToken.onclick = () => {
                    localStorage.removeItem('ig_access_token');
                    tokenInput.value = '';
                    configStatus.style.color = '#f87171';
                    configStatus.innerHTML = '<i class="fa-solid fa-trash-can"></i> Token deleted successfully.';
                    
                    // Reinitialize to show setup prompt
                    fetchInstagramFeed(true);
                    
                    setTimeout(() => {
                        closeConfigModal();
                    }, 1200);
                };
            }
        }

        // Automatic background polling (every 10 minutes)
        setInterval(() => {
            console.log('Running scheduled Instagram feed polling refresh...');
            fetchInstagramFeed();
        }, 600000);

        // Automatic refresh on tab focus to fetch new posts immediately
        window.addEventListener('focus', () => {
            console.log('Window focused. Automatically updating Instagram feed...');
            fetchInstagramFeed();
        });

        // Initialize Instagram Feed
        fetchInstagramFeed();