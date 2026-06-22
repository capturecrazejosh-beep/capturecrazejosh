'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BentoItem {
  id: number;
  type: 'image' | 'video';
  src: string; // for images, it's the file path; for videos, it's the video source URL
  poster?: string; // only for videos
  className: string;
  title: string;
  device: string;
  deviceIcon: string;
  blog: string;
}

const bentoItems: BentoItem[] = [
  {
    id: 1,
    type: 'video',
    src: 'https://github.com/user-attachments/assets/afbbaedf-7fab-4296-9eae-b5a1f59d41a9',
    poster: '/thumbnail.jpg',
    className: 'item bento-2x2 video-card',
    title: 'Book Reel',
    device: 'Video Reel',
    deviceIcon: 'fa-video',
    blog: 'Unspoken Corners in motion. A compilation of quiet moments, light, and shadows captured across Kerala. From the misty roads of Munnar to the peaceful sunsets of Paruthumpara, this reel brings the silent stories of everyday spaces to life.',
  },
  {
    id: 2,
    type: 'video',
    src: 'https://github.com/user-attachments/assets/4a4beb44-6dfb-4f45-a37f-9dc066cda202',
    poster: '/thumbnail 2.jpg',
    className: 'item bento-2x2 video-card',
    title: 'Book Reel',
    device: 'Video Reel',
    deviceIcon: 'fa-video',
    blog: 'Unspoken Corners in motion. A compilation of quiet moments, light, and shadows captured across Kerala. From the misty roads of Munnar to the peaceful sunsets of Paruthumpara, this reel brings the silent stories of everyday spaces to life.',
  },
  {
    id: 3,
    type: 'image',
    src: '/img/photo3.jpg',
    className: 'item bento-1x2',
    title: 'Roots That Remember',
    device: 'Moto G85',
    deviceIcon: 'fa-camera',
    blog: `The forest didn’t feel silent—it felt watchful. Twisted roots spread across the ground like veins, holding on to stories older than time. Standing there during our school tour, in the quiet afternoon light of Gunacave, it felt as if nature itself was breathing slowly around us.
This tree, bent yet unbroken, felt deeply human—scarred, grounded, and still standing tall despite everything beneath it. The fog softened the chaos, turning tangled roots and branches into a calm rhythm. For a moment, the noise of friends, laughter, and schedules faded, and it was just this scene and me.
Shot on Moto G85, this frame wasn’t planned. It was felt.
A pause in a busy day.
A reminder that even in confusion, there is strength in staying rooted.`,
  },
  {
    id: 4,
    type: 'image',
    src: '/img/photo13.jpg',
    className: 'item bento-1x1',
    title: 'Whispers of Lavender',
    device: 'vivo Y11',
    deviceIcon: 'fa-camera',
    blog: `The photo was taken in Vagamon, a beautiful location with hills that speak of nature softly and showcase beauty in small forms. It was taken using a vivo y11, and what attracted me to this wildflower was not its size, but its presence.
The soft purple bloom stood out gently against the dark, blurry background, creating a natural separation between the subject and the environment. I decided to keep the framing simple, giving the flower space to breathe. The shallow focus helps to emphasize the beauty of the textures on the flower, as each little piece has a story to tell.
Vagamon has a way of slowness. In such an atmosphere, events like this take you by surprise. This was no instance of capturing the perfect flower shot; it was about celebrating an aspect that could easily pass one by.
Through this image, I hoped to convey a sense of tranquility, emphasizing that sometimes it is the smallest details that create the greatest lasting impression, even when in a wide expanse.`,
  },
  {
    id: 5,
    type: 'image',
    src: '/img/photo6.jpg',
    className: 'item bento-1x1',
    title: 'Quiet Guardian of Light',
    device: 'vivo Y11',
    deviceIcon: 'fa-camera',
    blog: `Resting in a pool of soft artificial light, this little angel feels almost alive. The shadows wrap gently around its face, while the glow highlights every curve, every delicate detail. There is a sense of innocence here, mixed with calm, like a silent guardian watching over the room.
Captured in a simple studio setup at home, this decor piece becomes more than an object. It feels thoughtful, almost human, as if it is listening rather than speaking. The darkness around it gives space for emotion, letting the light tell its own story. Moments like this remind us that beauty does not always need grand places. Sometimes it lives quietly on a shelf, waiting to be noticed.
Shot on vivo Y11, this frame is about patience and observation. A small setup, a controlled light, and a peaceful subject coming together to create a gentle mood.`,
  },
  {
    id: 6,
    type: 'image',
    src: '/img/photo11.jpg',
    className: 'item bento-2x1',
    title: 'Windows of Quiet Memories',
    device: 'vivo Y11',
    deviceIcon: 'fa-camera',
    blog: `After school, on the way home, this monastery stood calm—unchanged, unhurried. The blue windows and doors felt like gentle pauses in time, holding years of silence, prayers, and footsteps of those who passed through before us. At Mannanam, the presence of St. Chavara feels close, not loud just steady, like a memory that never fades.
The building didn’t ask for attention. It simply existed, clean and composed, letting the afternoon light rest on its white walls. Looking at it now, it brings back school-day thoughts bags on our shoulders, tired feet, and minds full of small dreams. Some places don’t speak they remind.
Shot on vivo Y11, this frame is less about architecture and more about feeling. A moment between school and home. Between noise and calm. Between who we were and who we’re becoming.`,
  },
  {
    id: 7,
    type: 'image',
    src: '/img/photo5.jpg',
    className: 'item bento-2x2',
    title: 'Where the Road Slows You Down',
    device: 'vivo Y11',
    deviceIcon: 'fa-camera',
    blog: `On our school tour to Munnar, this road felt like a gentle pause in motion. Curving through endless tea plantations, it didn’t rush anywhere it invited you to slow down and look around. The green hills rolled quietly under a cloudy sky, each layer softer than the last.
Standing there, surrounded by tea gardens, the air felt cooler and lighter, carrying the calm that only mountains know. Laughter from friends echoed somewhere behind, but this moment stayed still, almost personal. It felt like the road was teaching us something simple: not every journey is about reaching fast—some are meant to be felt.
Shot on vivo Y11, this frame holds more than a landscape.
It holds a school day memory, fresh wind, and a bend in the road that made us stop and breathe.`,
  },
  {
    id: 8,
    type: 'image',
    src: '/img/photo2.jpg',
    className: 'item bento-2x1',
    title: 'Rain Interrupted Ride',
    device: 'vivo Y11',
    deviceIcon: 'fa-camera',
    blog: `Resting in a pool of soft artificial light, this little angel feels almost alive. The shadows wrap gently around its face, while the glow highlights every curve, every delicate detail. There is a sense of innocence here, mixed with calm, like a silent guardian watching over the room.
Captured in a simple studio setup at home, this decor piece becomes more than an object. It feels thoughtful, almost human, as if it is listening rather than speaking. The darkness around it gives space for emotion, letting the light tell its own story. Moments like this remind us that beauty does not always need grand places. Sometimes it lives quietly on a shelf, waiting to be noticed.
Shot on vivo Y11, this frame is about patience and observation. A small setup, a controlled light, and a peaceful subject coming together to create a gentle mood.`,
  },
  {
    id: 9,
    type: 'image',
    src: '/img/photo14.jpg',
    className: 'item bento-2x1',
    title: '🌿 Carrying the Weight of Seasons 🧺',
    device: 'moto g85',
    deviceIcon: 'fa-camera',
    blog: 'Captured during our school tour on the Kambam–Theni route — a simple yet powerful moment of a woman carrying the harvest beneath endless vines. Amid the beauty of the journey, this frame quietly tells a story of hard work, strength, and everyday life.',
  },
  {
    id: 10,
    type: 'image',
    src: '/img/photo1.jpg',
    className: 'item bento-2x2',
    title: 'Sunset Silhouette',
    device: 'Moto G85',
    deviceIcon: 'fa-camera',
    blog: `Image captured at Paruthumpara View Point at sunset, captured with a Moto G85 mobile phone. No pre-planned plan, just a random moment of convergence of light, sky, silence.
With the sun sinking below the horizon, the clouds formed a layered pattern in the sky. They moved from a warm gold color to dark shadows. The contrast was strong and peaceful, a breath before nightfall. I saw two people on the outskirts of the hillside, and they became the grounding element for the background. Keeping them in shadows was important, as details might have taken away from the emotional impact.
I decided to let the foreground sink into darkness, letting the sky guide the narrative. The light didn’t need any additional help, as it conveyed its own atmosphere. This image isn’t about who these people are, but rather what they symbolize, which is shared silence, shared presence, and the beauty of being there.
The fact that I used my mobile to shoot reminded me that photography is not about gears but simply awareness. One needs to be able to observe when the sky intends to make some noise.`,
  },
  {
    id: 11,
    type: 'image',
    src: '/img/photo4.jpg',
    className: 'item bento-1x2',
    title: 'Before the Rain Speaks',
    device: 'vivo Y11',
    deviceIcon: 'fa-camera',
    blog: `Captured on my Vivo Y11 during our school tour, this was one of those unexpected moments that didn’t ask for attention but deserved it.
At Mattupetti Dam, the sky slowly turned heavy with dark clouds. The lake stayed calm, almost like it was holding its breath. The colorful boats resting by the shore added a quiet contrast to the moody sky above.
There was no plan to take this shot. No perfect timing. Just a sudden feeling to pause and frame what I saw. Sometimes the most beautiful memories are the ones we don’t prepare for 📷✨`,
  },
  {
    id: 12,
    type: 'image',
    src: '/img/photo12.jpg',
    className: 'item bento-1x2',
    title: 'Framed by Silence',
    device: 'Samsung M15',
    deviceIcon: 'fa-camera',
    blog: `Captured on my Samsung M15, this was one of those completely unexpected shots that felt perfectly composed without trying too hard.
The moon sat quietly in the deep blue sky, while the branches naturally framed it like a gentle outline. I didn’t plan the composition. I just looked up and felt the balance between darkness and light.
The leaves turned into silhouettes, the sky became a soft canvas, and the moon stood there calm and confident. Sometimes composition is not about rules. It is about feeling the frame before pressing the shutter 📷🤍`,
  },
];

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Custom cursor DOM references
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // Lightbox Modal state & references
  const [activeItem, setActiveItem] = useState<BentoItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [typedDesc, setTypedDesc] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Instagram Feed State
  const [igToken, setIgToken] = useState('');
  const [igPosts, setIgPosts] = useState<any[]>([]);
  const [igStatus, setIgStatus] = useState('Checking feed status...');
  const [igStatusSuccess, setIgStatusSuccess] = useState<boolean | null>(null);
  const [igLoading, setIgLoading] = useState(false);
  const [igPostsCount, setIgPostsCount] = useState(14);
  const [devModalOpen, setDevModalOpen] = useState(false);
  const [devTokenInput, setDevTokenInput] = useState('');
  const [configStatusText, setConfigStatusText] = useState('');
  const [configStatusSuccess, setConfigStatusSuccess] = useState(true);
  const devModalRef = useRef<HTMLDivElement>(null);
  const devModalContainerRef = useRef<HTMLDivElement>(null);

  // Handle active cursor hover triggers
  const handleMouseEnter = () => {
    cursorRef.current?.classList.add('active');
    followerRef.current?.classList.add('active');
  };

  const handleMouseLeave = () => {
    cursorRef.current?.classList.remove('active');
    followerRef.current?.classList.remove('active');
  };

  // ----------------------------------------------------
  // 1. Initial Load & Theme Synchronization
  // ----------------------------------------------------
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme as 'dark' | 'light');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    const token = localStorage.getItem('ig_access_token') || '';
    setIgToken(token);
  }, []);

  // ----------------------------------------------------
  // 2. Custom Cursor Follower Logic
  // ----------------------------------------------------
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tickerCallback = () => {
      posX += (mouseX - posX) / 6;
      posY += (mouseY - posY) / 6;
      gsap.set(cursor, { x: mouseX, y: mouseY });
      gsap.set(follower, { x: posX, y: posY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(tickerCallback);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  // ----------------------------------------------------
  // 3. Theme Toggle Trigger
  // ----------------------------------------------------
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    // GSAP theme toggle icon rotate micro-animation
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      gsap.fromTo(
        icon,
        { rotation: 0, scale: 0.5 },
        { rotation: 360, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );
    }
  };

  // ----------------------------------------------------
  // 4. GSAP Scroll Animations
  // ----------------------------------------------------
  useGSAP(() => {
    // Initial Load Sequence
    const tlLoad = gsap.timeline();
    tlLoad
      .from('.nav-bar', { y: -50, opacity: 0, duration: 1.2, ease: 'power4.out' })
      .from('.hero-tag', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .from(
        '.hero-title',
        { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out', filter: 'blur(10px)' },
        '-=0.8'
      )
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .from(
        '.main-leaf-svg',
        { opacity: 0, scale: 0.8, rotation: 15, duration: 2, ease: 'power2.out' },
        '-=1'
      )
      .fromTo(
        '.falling-leaf-svg',
        { scale: 0, opacity: 0, y: -20, rotation: -45 },
        { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
        '-=1'
      )
      .to('.falling-leaf-svg', {
        y: 40,
        rotation: 15,
        duration: 0.8,
        ease: 'power2.inOut',
      });

    // Scroll-linked Falling Leaf Translation
    const getTotalScroll = () => document.documentElement.scrollHeight - window.innerHeight;
    gsap.to('.falling-leaf-svg', {
      y: () => getTotalScroll() + 200,
      x: 'random(-150, 150)',
      rotation: 'random(-180, 180)',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // Gentle constant sway to the leaf
    gsap.to('.falling-leaf-svg', {
      rotation: '+=45',
      x: '+=30',
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      duration: 3,
    });

    // Apple-Style Sticky Text Reveal
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: '.explanation-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
    tlScroll
      .to('.text-1', { opacity: 1, y: -20, duration: 1, filter: 'blur(0px)' })
      .to('.text-1', { opacity: 0, scale: 1.1, y: -50, duration: 1, filter: 'blur(10px)' }, '+=0.5')
      .to('.text-2', { opacity: 1, y: -20, duration: 1, filter: 'blur(0px)' })
      .to('.text-2', { opacity: 0, scale: 1.1, y: -50, duration: 1, filter: 'blur(10px)' }, '+=0.5')
      .to('.text-3', { opacity: 1, y: -20, duration: 1, filter: 'blur(0px)' })
      .to('.text-3', { opacity: 0, scale: 1.1, y: -50, duration: 1, filter: 'blur(10px)' }, '+=0.5');

    // About Me Section Stagger Reveal
    const tlAbout = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 60%',
      },
    });
    tlAbout
      .from('.about-content', {
        scale: 0.95,
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power4.out',
        filter: 'blur(10px)',
      })
      .from('.about-title', { y: 20, opacity: 0, duration: 1 }, '-=1')
      .from(
        '.about-text-inner',
        {
          y: '100%',
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.5'
      );

    // Gallery section header fade-in
    gsap.from('.gallery-header', {
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Bento Grid Items Stagger Load
    gsap.from('.item', {
      scrollTrigger: {
        trigger: '.gallery',
        start: 'top 80%',
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      filter: 'blur(5px)',
    });

    // Inner Image Parallax (larger screens)
    const motionQuery = gsap.matchMedia();
    motionQuery.add('(min-width: 769px)', () => {
      gsap.utils.toArray<HTMLElement>('.item').forEach((item) => {
        const mediaElement = item.querySelector('img, .card-video-bg');
        if (!mediaElement) return;

        gsap.fromTo(
          mediaElement,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    });

    // Footer Stagger Reveal
    gsap.from('.footer-content > *', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    });
  });

  // ----------------------------------------------------
  // 5. Image Lightbox Modal Animation & Typewriter Effect
  // ----------------------------------------------------
  const handleItemClick = (item: BentoItem) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // GSAP animations for opening/closing the Lightbox modal
  useEffect(() => {
    const modal = modalRef.current;
    const container = modalContainerRef.current;
    if (!modal || !container) return;

    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      gsap.killTweensOf([modal, container]);
      gsap.set(modal, { display: 'block', opacity: 0 });
      gsap.set(container, { scale: 0.95, y: 30, opacity: 0 });

      gsap
        .timeline()
        .to(modal, { opacity: 1, duration: 0.45, ease: 'power2.out' })
        .to(
          container,
          { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' },
          '-=0.25'
        );
    } else {
      if (modal.style.display !== 'none') {
        gsap
          .timeline({
            onComplete: () => {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
              setActiveItem(null);
            },
          })
          .to(container, { scale: 0.96, y: 20, opacity: 0, duration: 0.4, ease: 'power3.in' })
          .to(modal, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.25');
      }
    }
  }, [modalOpen]);

  // Typewriter effect logic
  useEffect(() => {
    if (!modalOpen || !activeItem || activeItem.type !== 'image') {
      setTypedDesc('');
      return;
    }

    setTypedDesc('');
    let idx = 0;
    const text = activeItem.blog.split('\n').map((line) => line.trim()).join('\n');
    let currentText = '';

    const interval = setInterval(() => {
      if (idx < text.length) {
        const char = text.charAt(idx);
        if (char === '\n') {
          currentText += '<br>';
        } else {
          currentText += char;
        }
        setTypedDesc(currentText);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 12);

    gsap.fromTo(
      '.modal-blog',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    return () => {
      clearInterval(interval);
    };
  }, [modalOpen, activeItem]);

  // Keyboard navigation support for closing modals (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
        setDevModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ----------------------------------------------------
  // 6. Instagram Feed Integration
  // ----------------------------------------------------
  const fetchInstagramFeed = async (token: string, force = false) => {
    if (igLoading) return;
    if (!token) {
      setIgStatus('Awaiting Token Setup');
      setIgStatusSuccess(null);
      return;
    }

    const timestampEl = new Date();
    const timeString = timestampEl.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // If forcing or first render, empty container states
    if (force || igPosts.length === 0) {
      setIgLoading(true);
    }

    try {
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${token}&limit=12&_t=${Date.now()}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data && data.data && data.data.length > 0) {
        const posts = data.data;
        posts.sort(
          (a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setIgPosts(posts);
        setIgStatus(`Connected · Updated at ${timeString}`);
        setIgStatusSuccess(true);
        setIgPostsCount(Math.max(posts.length, 14));
      } else {
        throw new Error('No media found');
      }
    } catch (error: any) {
      console.error('Instagram feed fetch failed:', error);
      setIgStatus(`Sync Error · Tried at ${timeString}`);
      setIgStatusSuccess(false);
    } finally {
      setIgLoading(false);
    }
  };

  useEffect(() => {
    if (igToken) {
      fetchInstagramFeed(igToken);

      // 10 minute polling
      const pollInterval = setInterval(() => {
        fetchInstagramFeed(igToken);
      }, 600000);

      // Focus listeners
      const handleWindowFocus = () => {
        fetchInstagramFeed(igToken);
      };
      window.addEventListener('focus', handleWindowFocus);

      return () => {
        clearInterval(pollInterval);
        window.removeEventListener('focus', handleWindowFocus);
      };
    } else {
      setIgStatus('Awaiting Token Setup');
      setIgStatusSuccess(null);
    }
  }, [igToken]);

  // Instagram Cards Entry Animation
  useEffect(() => {
    if (igPosts.length > 0) {
      // Animate Instagram Header reveal
      gsap.from('#instagram .instagram-header', {
        scrollTrigger: {
          trigger: '#instagram',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate dynamic ig cards
      gsap.from('.ig-card', {
        scrollTrigger: {
          trigger: '.instagram-feed',
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        filter: 'blur(5px)',
      });
    }
  }, [igPosts]);

  // ----------------------------------------------------
  // 7. Developer Setup Modal Logic
  // ----------------------------------------------------
  useEffect(() => {
    const modal = devModalRef.current;
    const container = devModalContainerRef.current;
    if (!modal || !container) return;

    if (devModalOpen) {
      setDevTokenInput(localStorage.getItem('ig_access_token') || '');
      setConfigStatusText('');
      document.body.style.overflow = 'hidden';

      gsap.killTweensOf([modal, container]);
      gsap.set(modal, { display: 'block', opacity: 0 });
      gsap.set(container, { scale: 0.95, y: 30, opacity: 0 });

      gsap
        .timeline()
        .to(modal, { opacity: 1, duration: 0.45, ease: 'power2.out' })
        .to(
          container,
          { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' },
          '-=0.25'
        );
    } else {
      if (modal.style.display !== 'none') {
        gsap
          .timeline({
            onComplete: () => {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
            },
          })
          .to(container, { scale: 0.96, y: 20, opacity: 0, duration: 0.4, ease: 'power3.in' })
          .to(modal, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.25');
      }
    }
  }, [devModalOpen]);

  const handleSaveIgToken = (e: React.FormEvent) => {
    e.preventDefault();
    const token = devTokenInput.trim();
    if (token) {
      localStorage.setItem('ig_access_token', token);
      setIgToken(token);
      setConfigStatusSuccess(true);
      setConfigStatusText('Token saved successfully!');

      fetchInstagramFeed(token, true);

      setTimeout(() => {
        setDevModalOpen(false);
      }, 1200);
    } else {
      setConfigStatusSuccess(false);
      setConfigStatusText('Token cannot be empty.');
    }
  };

  const handleClearIgToken = () => {
    localStorage.removeItem('ig_access_token');
    setIgToken('');
    setIgPosts([]);
    setDevTokenInput('');
    setConfigStatusSuccess(false);
    setConfigStatusText('Token deleted successfully.');

    setTimeout(() => {
      setDevModalOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Custom Cursors */}
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
      <div className="ambient-bg"></div>

      {/* Navigation Bar */}
      <nav className="nav-bar" aria-label="Primary navigation">
        <a
          href="#home"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </a>
        <a
          href="#about"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          About
        </a>
        <a
          href="#gallery"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Gallery
        </a>
        <a
          href="#instagram"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Instagram
        </a>
        <a
          href="#contact"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Contact
        </a>
        <button
          id="themeToggle"
          className="theme-toggle-btn"
          aria-label="Toggle dark/light theme"
          onClick={toggleTheme}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>
      </nav>

      {/* Container */}
      <div className="container">
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="hero-tag">Passionate Photographer</p>
            <h1 className="hero-title">JOSHUA JOBY</h1>
            <h2 className="hero-subtitle">Capturing the beauty hidden in everyday life.</h2>
          </div>

          {/* Nature Elements */}
          <div className="nature-scene">
            <svg className="main-leaf-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 95 C 20 80, 5 40, 40 5 C 80 20, 95 60, 50 95 Z"
                fill="none"
                stroke="rgba(0, 210, 255, 0.4)"
                strokeWidth="0.5"
              />
              <path d="M40 5 C 45 40, 48 70, 50 95" fill="none" stroke="rgba(0, 210, 255, 0.2)" strokeWidth="0.5" />
              <path d="M45 25 Q 30 30 25 45" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
              <path d="M47 45 Q 35 50 25 65" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
              <path d="M49 65 Q 40 70 35 80" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
              <path d="M42 15 Q 60 20 70 30" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
              <path d="M46 35 Q 65 45 75 60" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
              <path d="M48 55 Q 60 65 65 80" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
            </svg>
            <svg className="falling-leaf-svg" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0 C 30 10, 30 30, 15 40 C 0 30, 0 10, 15 0 Z" fill="url(#leafGradient)" />
              <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#9D50BB" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>
      </div>

      {/* Apple-Style Scroll Section */}
      <section className="explanation-section">
        <div className="sticky-container">
          <h2 className="explain-text text-1">Photography isn&apos;t just about what you see.</h2>
          <h2 className="explain-text text-2">It&apos;s about how the light makes you feel.</h2>
          <h2 className="explain-text text-3">Every corner has a story waiting to be told.</h2>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container about-content">
          <h3 className="about-title">About Me</h3>
          <p className="about-paragraph">
            <span className="about-text-line">
              <span className="about-text-inner">
                I am Joshua Joby, a photographer known online as
              </span>
            </span>
            <span className="about-text-line">
              <span className="about-text-inner">
                <strong>Capturecrazejosh</strong>
              </span>
            </span>
            <span className="about-text-line">
              <span className="about-text-inner">Through my lens, I explore light,</span>
            </span>
            <span className="about-text-line">
              <span className="about-text-inner">
                perspective, and atmosphere, transforming quiet everyday spaces
              </span>
            </span>
            <span className="about-text-line">
              <span className="about-text-inner">
                into cinematic visual stories. My work focuses on revealing the
              </span>
            </span>
            <span className="about-text-line">
              <span className="about-text-inner">
                hidden beauty and emotion within moments that often go unnoticed.
              </span>
            </span>
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h3>Visual Stories</h3>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>
              Click any image to reveal the hidden narrative.
            </p>
          </div>

          <main className="gallery">
            {bentoItems.map((item) => (
              <div
                key={item.id}
                className={item.className}
                role="button"
                tabIndex={0}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleItemClick(item);
                  }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {item.type === 'video' ? (
                  <>
                    <video className="card-video-bg" poster={item.poster} preload="metadata" muted playsInline>
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <div className="video-overlay-icon">
                      <i className="fa-solid fa-play"></i>
                    </div>
                  </>
                ) : (
                  <img src={item.src} alt={item.title} loading="lazy" />
                )}
                <div className="item-content">
                  <h4>{item.title}</h4>
                  <p>{item.device}</p>
                </div>
                <span className="device-badge">
                  <i className={`fa-solid ${item.deviceIcon}`}></i> {item.device}
                </span>
              </div>
            ))}
          </main>

          <div className="see-more-wrapper">
            <p style={{ opacity: 0.5, marginBottom: '30px', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Discover more unspoken stories
            </p>
            <a
              href="https://drive.google.com/drive/folders/1ZpGchlmHQU6h1qaQZlySL6o0M57p5RIj"
              target="_blank"
              rel="noreferrer"
              className="see-more-btn"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              View Full Archive
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section id="instagram" className="instagram-section">
        <div className="container">
          <div className="instagram-header">
            <div className="instagram-profile">
              <div className="instagram-avatar">
                <img src="/img/photo13.jpg" alt="Joshua Joby Avatar" loading="lazy" />
                <div className="avatar-ring"></div>
              </div>
              <div className="instagram-meta">
                <span className="ig-badge">
                  <i className="fa-brands fa-instagram"></i> Instagram Feed
                </span>
                <h3>@_capturecrazejosh_</h3>
                <p className="ig-bio">Turning ordinary scenes into compelling visual stories.</p>
                <div className="ig-last-updated">{igStatus}</div>
                <button
                  id="devSetupBtn"
                  className="dev-setup-btn"
                  aria-label="Open developer configuration"
                  onClick={() => setDevModalOpen(true)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fa-solid fa-gear"></i> Dev Setup
                </button>
              </div>
            </div>
            <div className="instagram-stats-cta">
              <div className="ig-stats">
                <div className="stat-item">
                  <span className="stat-val">{igPostsCount}</span>
                  <span className="stat-lbl">Posts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">1.2k</span>
                  <span className="stat-lbl">Followers</span>
                </div>
              </div>
              <a
                href="https://www.instagram.com/_capturecrazejosh_?igsh=dGltNXVwMmV1eDdn"
                target="_blank"
                rel="noreferrer"
                className="ig-follow-btn"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <i className="fa-brands fa-instagram"></i> Follow
              </a>
            </div>
          </div>

          <div id="instagram-feed" className="instagram-feed">
            {igLoading ? (
              <div className="ig-loader">
                <div className="spinner"></div>
                <p>Connecting to Instagram...</p>
              </div>
            ) : igToken === '' ? (
              <div className="ig-loader" style={{ padding: '60px 20px', textAlign: 'center', gridColumn: '1 / -1' }}>
                <i className="fa-solid fa-lock" style={{ fontSize: '2rem', color: 'var(--accent-purple)', marginBottom: '15px' }}></i>
                <p style={{ textTransform: 'none', letterSpacing: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  Live Feed Ready but Not Configured
                </p>
                <p style={{ textTransform: 'none', letterSpacing: 0, fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '6px', maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
                  Click the &quot;Dev Setup&quot; button in the profile header to enter your Instagram User Access Token securely. The token is saved locally and never committed to GitHub.
                </p>
              </div>
            ) : igStatusSuccess === false ? (
              <div className="ig-loader" style={{ padding: '60px 20px', textAlign: 'center', gridColumn: '1 / -1' }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2rem', color: '#ff304f', marginBottom: '15px' }}></i>
                <p style={{ textTransform: 'none', letterSpacing: 0, fontSize: '1rem', color: '#ff304f', fontWeight: 700 }}>
                  Connection Failed
                </p>
                <p style={{ textTransform: 'none', letterSpacing: 0, fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '6px', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
                  Could not fetch posts. The access token might be invalid or expired. Check Dev Setup.
                </p>
              </div>
            ) : (
              igPosts.slice(0, 12).map((post) => {
                const imageUrl = post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url;
                const captionText = post.caption || 'Unspoken Corners';
                const isVideo = post.media_type === 'VIDEO';
                const postLink = post.permalink || 'https://www.instagram.com/_capturecrazejosh_/';
                const likesCount = post.like_count || Math.floor(Math.random() * 150) + 120;
                const commentsCount = post.comments_count || Math.floor(Math.random() * 20) + 8;

                return (
                  <a
                    key={post.id}
                    href={postLink}
                    target="_blank"
                    rel="noreferrer"
                    className="ig-card"
                    role="button"
                    aria-label={`Instagram post: ${captionText}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img className="ig-card-img" src={imageUrl} alt={captionText.substring(0, 50)} loading="lazy" />
                    <span className="ig-meta-top">
                      <i className={`fa-${isVideo ? 'solid fa-video' : 'brands fa-instagram'}`}></i>
                    </span>
                    <div className="ig-overlay">
                      <div className="ig-likes-comments">
                        <span><i className="fa-solid fa-heart"></i> {likesCount}</span>
                        <span><i className="fa-solid fa-comment"></i> {commentsCount}</span>
                      </div>
                      <p className="ig-caption">{captionText}</p>
                    </div>
                  </a>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact">
        <div className="container footer-content">
          <span className="footer-logo">Capturecrazejosh.</span>
          <p style={{ color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '4px', fontSize: '0.85rem', marginTop: '30px' }}>
            CONNECT WITH ME
          </p>

          <div className="social-links">
            <a
              href="https://wa.me/918157982581"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a
              href="https://www.instagram.com/_capturecrazejosh_?igsh=dGltNXVwMmV1eDdn"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://x.com/Capturecrazjosh"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '1.5rem', height: '1.5rem', fill: 'currentColor' }}>
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/joshua-joby-94748638b"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="mailto:capturecrazejosh@gmail.com"
              aria-label="Email"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-regular fa-envelope"></i>
            </a>
          </div>

          <p style={{ fontSize: '1.2rem', opacity: 0.8, fontWeight: 300 }}>
            Turning ordinary scenes into compelling visual stories.
          </p>
          <p className="footer-credits">© 2026 JOSHUA JOBY · UNSPOKEN CORNERS</p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <div id="imageModal" ref={modalRef} className="modal">
        <button
          className="close-modal"
          type="button"
          aria-label="Close image story"
          onClick={handleCloseModal}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        {activeItem && (
          <div ref={modalContainerRef} className={`modal-container ${activeItem.type === 'video' ? 'no-blog' : ''}`}>
            {activeItem.type === 'image' ? (
              <>
                <img className="modal-content" src={activeItem.src} alt={activeItem.title} />
                <div className="modal-blog">
                  <h4>{activeItem.title}</h4>
                  <p dangerouslySetInnerHTML={{ __html: typedDesc }}></p>
                  <button
                    className="back-btn"
                    onClick={handleCloseModal}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <i className="fa-solid fa-arrow-left"></i> Return to Gallery
                  </button>
                </div>
              </>
            ) : (
              <video ref={modalVideoRef} className="modal-content" controls playsInline autoPlay src={activeItem.src}></video>
            )}
          </div>
        )}
      </div>

      {/* Instagram Config Modal */}
      <div id="igConfigModal" ref={devModalRef} className="modal ig-config-modal">
        <button
          className="close-modal"
          id="closeIgConfig"
          type="button"
          aria-label="Close configuration"
          onClick={() => setDevModalOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div ref={devModalContainerRef} className="modal-container no-blog">
          <div className="modal-blog config-box">
            <h4>Feed Developer Setup</h4>
            <p>This setting is stored locally in your browser&apos;s <code>localStorage</code>. It is never committed to GitHub or exposed publicly.</p>
            
            <form id="igConfigForm" onSubmit={handleSaveIgToken}>
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label
                  htmlFor="igAccessToken"
                  style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: '8px' }}
                >
                  Instagram Access Token
                </label>
                <input
                  type="password"
                  id="igAccessToken"
                  placeholder="Paste your Access Token here..."
                  autoComplete="current-password"
                  value={devTokenInput}
                  onChange={(e) => setDevTokenInput(e.target.value)}
                  style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: 'inherit', fontSize: '0.95rem', transition: 'var(--transition)' }}
                />
                <small style={{ display: 'block', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Generate this via your Meta Developer Dashboard (using the Instagram User Token Generator).
                </small>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                <button
                  type="submit"
                  className="back-btn save-btn"
                  style={{ background: 'var(--accent-purple)', borderColor: 'var(--accent-purple)', color: '#fff' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fa-solid fa-check"></i> Save Token
                </button>
                <button
                  type="button"
                  className="back-btn clear-btn"
                  onClick={handleClearIgToken}
                  style={{ background: 'rgba(220, 39, 67, 0.1)', borderColor: 'rgba(220, 39, 67, 0.3)', color: '#ff304f' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i className="fa-solid fa-trash"></i> Delete Token
                </button>
              </div>
            </form>
            {configStatusText && (
              <div
                id="configStatus"
                className="config-status-message"
                style={{ marginTop: '20px', fontSize: '0.9rem', fontWeight: 500, color: configStatusSuccess ? '#4ade80' : '#f87171' }}
              >
                <i className={`fa-solid ${configStatusSuccess ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i> {configStatusText}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
