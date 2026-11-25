/**
 * Portfolio Intelligence Layer
 * Simplified: Certificates, Project Tags, FAQ, AI Chat, Easter Egg
 * Removed: Adaptive Environments, Recruiter Mode, Command Dock
 */

/* ===================================================
   ANALYTICS (preserved for visitor insights)
=================================================== */
let osAnalytics = JSON.parse(localStorage.getItem('os_analytics')) || {
    sectionsVisited: [],
    totalVisits: 0,
    easterEggHintShown: false
};
osAnalytics.totalVisits = (osAnalytics.totalVisits || 0) + 1;
if (!osAnalytics.sectionsVisited) osAnalytics.sectionsVisited = [];
localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));

/* ===================================================
   INIT
=================================================== */
const initPortfolio = () => {
    renderCertificates();
    injectProjectTags();
    attachAIChatLoader();
    attachKeyboardShortcuts();
    trackSectionVisits();
    startEasterEggWatch();
};

/* ===================================================
   AI CHAT LAZY LOADER
=================================================== */
const attachAIChatLoader = () => {
    document.getElementById('ai-chat-btn')?.addEventListener('click', async () => {
        if (!window.aiChatLoaded) {
            window.aiChatLoaded = true;
            try {
                document.body.style.cursor = 'wait';
                const aiChatModule = await import('./ai-chat.js');
                if (aiChatModule.initAIChat) {
                    aiChatModule.initAIChat();
                }
            } catch (err) {
                console.error("Failed to load AI Chat", err);
                window.aiChatLoaded = false;
            } finally {
                document.body.style.cursor = '';
            }
        }
    });
};

/* ===================================================
   KEYBOARD SHORTCUTS
=================================================== */
const attachKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
            if (e.key === 'Escape') {
                e.target.blur();
            } else {
                return;
            }
        }
        if (e.key === 'Escape') {
            document.getElementById('ai-chat-panel')?.classList.remove('active');
            document.getElementById('modal')?.classList.remove('active');
            document.querySelectorAll('.modal-container.active, .project-modal-container.active').forEach(el => el.classList.remove('active'));
            return;
        }
        if (!e.shiftKey) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        switch (e.key.toLowerCase()) {
            case 'a':
                e.preventDefault();
                document.getElementById('ai-chat-btn')?.click();
                break;
        }
    });
};

/* ===================================================
   SECTION VISIT TRACKING
=================================================== */
const trackSectionVisits = () => {
    document.querySelectorAll('[data-nav-link]').forEach(link => {
        link.addEventListener('click', () => {
            const section = link.textContent.trim();
            if (!osAnalytics.sectionsVisited.includes(section)) {
                osAnalytics.sectionsVisited.push(section);
                localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));
            }
        });
    });
};

/* ===================================================
   EASTER EGG HINT (kept as requested)
=================================================== */
let easterEggTimer = null;

const startEasterEggWatch = () => {
    if (osAnalytics.easterEggHintShown) return;

    let timeOnSite = 0;
    easterEggTimer = setInterval(() => {
        timeOnSite++;
        if (!osAnalytics.easterEggHintShown &&
            timeOnSite >= 60 &&
            osAnalytics.sectionsVisited.length >= 2 &&
            window.innerWidth > 768) {
            showEasterEggHint();
            osAnalytics.easterEggHintShown = true;
            localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));
            clearInterval(easterEggTimer);
        }
    }, 1000);
};

const showEasterEggHint = () => {
    const toast = document.createElement('div');
    toast.className = 'easter-egg-toast';
    toast.innerHTML = `
        <div class="easter-toast-icon"><ion-icon name="terminal-outline"></ion-icon></div>
        <div class="easter-toast-content">
            <p class="easter-toast-title">System Alert</p>
            <p class="easter-toast-msg">\u{1F3AF} You seem curious.<br><br>Try typing <code>rajath2005</code> on your keyboard to unlock kernel access.</p>
        </div>
        <button class="easter-toast-close" aria-label="Close"><ion-icon name="close-outline"></ion-icon></button>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('active'));

    toast.querySelector('.easter-toast-close')?.addEventListener('click', () => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 400);
    });

    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 400);
    }, 12000);
};

/* ===================================================
   PROJECT TECH TAGS
=================================================== */
const injectProjectTags = () => {
    const defaultTags = {
        'web development': ['HTML', 'CSS', 'JavaScript', 'React'],
        'applications': ['React', 'Node.js', 'Express', 'Supabase'],
        'cloud': ['Google Cloud', 'Docker', 'Kubernetes'],
        'web design': ['Figma', 'UI/UX', 'Wireframing']
    };

    const specificTags = {
        'https://github.com/Rajath2005/COPD-Detection': ['Python', 'TensorFlow', 'CNN', 'LSTM'],
        'https://shramik.rajathkiran.me/': ['JavaScript', 'Voice AI', 'NLP', 'Rule Validation'],
        'https://mediq-health.netlify.app/': ['React', 'Supabase', 'Node.js', 'Gemini AI'],
        'https://ayudost-chatbot.onrender.com/': ['Python', 'NLP', 'Flask', 'Google Cloud'],
        'https://github.com/Rajath2005': ['Open Source', 'Full Stack', 'Cloud'],
        'https://www.figma.com/community/file/1632301825171230889': ['Figma', 'Prototyping', 'IEEE'],
        'https://cloud.rajathkiran.me/': ['GCP', 'Cloud Architect', 'DevOps'],
        'https://huggingface.co/spaces/BugHunter28/code-review-env': ['Python', 'HuggingFace', 'RL Benchmark', 'LLMs'],
        'https://github.com/Rajath2005/SmartCityApp': ['Java', 'OOP', 'Console App'],
        'https://github.com/Rajath2005/TextUtils': ['React', 'JavaScript', 'Utility App']
    };

    document.querySelectorAll('.project-item').forEach(item => {
        if (item.querySelector('.project-tech-tags')) return;

        const url = item.querySelector('a')?.getAttribute('data-project-url') || '';
        const category = item.getAttribute('data-category')?.toLowerCase() || '';
        const tags = specificTags[url] || defaultTags[category] || ['Software Engineering'];

        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'project-tech-tags';
        tagsContainer.innerHTML = tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

        const contentBox = item.querySelector('.project-content');
        if (contentBox) contentBox.appendChild(tagsContainer);
    });
};

/* ===================================================
   CERTIFICATES RENDERING
=================================================== */
const ALL_CERTIFICATES = [
    { id: 1, title: 'IEEE I2 Connect Competition Winning Cert', src: 'assets/images/certificate-1.webp', thumb: 'assets/images/certificate-1.webp', isPremium: true },
    { id: 16, title: 'Node JS Certification', src: 'assets/images/certificate-16.webp', thumb: 'assets/images/certificate-16.webp', isPremium: true },
    { id: 8, title: 'Responsive Web Design', src: 'assets/images/certificate-8.webp', thumb: 'assets/images/certificate-8.webp', isPremium: true },
    { id: 6, title: 'Infosys SpringBoard', src: 'assets/images/certificate-6.webp', thumb: 'assets/images/certificate-6.webp', isPremium: true },
    { id: 2, title: 'Aura 2K24 Competition Winner', src: 'assets/images/certificate-2.webp', thumb: 'assets/images/certificate-2.webp', isPremium: true },
    { id: 5, title: 'Linux for Beginners Certifications', src: 'assets/images/certificate-5.webp', thumb: 'assets/images/certificate-5.webp', isPremium: true },
    { id: 7, title: 'Fundamental of CSS', src: 'assets/images/certificate-7.webp', thumb: 'assets/images/certificate-7.webp', isPremium: false },
    { id: 10, title: 'Intro to Cybersecurity', src: 'assets/images/certificate-10.webp', thumb: 'assets/images/certificate-10.webp', isPremium: false },
    { id: 11, title: 'Git Sheet', src: 'assets/images/certificate-11.webp', thumb: 'assets/images/certificate-11.webp', isPremium: false },
    { id: 12, title: 'Open Source', src: 'assets/images/certificate-12.webp', thumb: 'assets/images/certificate-12.webp', isPremium: false },
    { id: 13, title: 'Fundamentals of HTML', src: 'assets/images/certificate-13.webp', thumb: 'assets/images/certificate-13.webp', isPremium: false },
    { id: 15, title: 'Code360 Masterclass', src: 'assets/images/certificate-15.webp', thumb: 'assets/images/certificate-15.webp', isPremium: false },
];

const renderCertificates = () => {
    const container = document.getElementById('dynamic-certificates-container');
    if (!container) return;

    let html = `
        <div class="cert-category">
            <h4 class="cert-category-title" style="margin-bottom: 20px; font-size: 18px; color: var(--white-2); display: flex; align-items: center; gap: 8px;"><ion-icon name="trophy" style="color: var(--orange-yellow-crayola);"></ion-icon> Premium & Featured</h4>
            <ul class="certificate-list">
    `;

    ALL_CERTIFICATES.filter(c => c.isPremium).forEach(cert => {
        html += buildCertItem(cert, true);
    });

    html += `
            </ul>
        </div>
        <div class="cert-category" style="margin-top: 40px;">
            <h4 class="cert-category-title" style="margin-bottom: 20px; font-size: 18px; color: var(--light-gray); display: flex; align-items: center; gap: 8px;"><ion-icon name="medal"></ion-icon> Foundational Skills</h4>
            <div style="position: relative;">
                <ul class="certificate-list" id="foundational-certs-list" style="max-height: 380px; overflow: hidden; position: relative; transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);">
    `;

    ALL_CERTIFICATES.filter(c => !c.isPremium).forEach(cert => {
        html += buildCertItem(cert, false);
    });

    html += `
                </ul>
                <div class="cert-fade-overlay" id="cert-fade-overlay" style="position: absolute; bottom: 0; left: 0; right: 0; height: 150px; background: linear-gradient(to top, var(--eerie-black-2), transparent); pointer-events: none;"></div>
            </div>
            <button class="form-btn" id="view-more-certs-btn" style="margin: 20px auto 0; max-width: max-content; display: flex; align-items: center; gap: 8px; padding: 12px 24px;">
                <ion-icon name="chevron-down"></ion-icon> <span>View More</span>
            </button>
        </div>
    `;

    container.innerHTML = html;

    // Hover effects
    document.querySelectorAll('.cert-img-wrapper').forEach(wrapper => {
        wrapper.addEventListener('mouseenter', () => wrapper.querySelector('.cert-overlay').style.opacity = '1');
        wrapper.addEventListener('mouseleave', () => wrapper.querySelector('.cert-overlay').style.opacity = '0');
    });

    // View more toggle
    const viewMoreBtn = document.getElementById('view-more-certs-btn');
    const foundationalList = document.getElementById('foundational-certs-list');
    const fadeOverlay = document.getElementById('cert-fade-overlay');

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            if (foundationalList.style.maxHeight === '380px' || foundationalList.style.maxHeight === '') {
                foundationalList.style.maxHeight = '3000px';
                fadeOverlay.style.opacity = '0';
                viewMoreBtn.querySelector('ion-icon').setAttribute('name', 'chevron-up');
                viewMoreBtn.querySelector('span').textContent = 'View Less';
            } else {
                foundationalList.style.maxHeight = '380px';
                fadeOverlay.style.opacity = '1';
                viewMoreBtn.querySelector('ion-icon').setAttribute('name', 'chevron-down');
                viewMoreBtn.querySelector('span').textContent = 'View More';
                setTimeout(() => foundationalList.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            }
        });
    }
};

const buildCertItem = (cert, isPremium) => `
    <li class="certificate-item ${isPremium ? 'premium-cert-item' : ''}">
        <div class="cert-img-wrapper" onclick="openCertModal('${cert.src}', '${cert.title}', ${cert.isPdf || false})" style="cursor: pointer; position: relative; background: var(--eerie-black-2); display: flex; align-items: center; justify-content: center; min-height: 160px; border-radius: 12px; overflow: hidden; border: 1px solid var(--jet);">
            ${cert.isPdf ? `<ion-icon name="document-text" style="font-size: 48px; color: var(--light-gray);"></ion-icon>` : `<img src="${cert.thumb}" alt="${cert.title}" class="thumbnail" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">`}
            <div class="cert-overlay" style="position: absolute; inset: 0; background: hsla(0,0%,0%,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;">
                <ion-icon name="${cert.isPdf ? 'document-text' : 'expand'}" style="color: white; font-size: 32px;"></ion-icon>
            </div>
        </div>
        <p>${cert.title} ${isPremium ? '<ion-icon name="ribbon" style="color: var(--orange-yellow-crayola); margin-left: 5px;"></ion-icon>' : ''}</p>
    </li>
`;

/* ===================================================
   CERTIFICATE MODAL
=================================================== */
window.openCertModal = (src, title, isPdf) => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalIframe = document.getElementById('modal-iframe');
    const modalLoader = document.getElementById('cert-modal-loader');
    const captionText = document.getElementById('caption');

    if (!modal) return;

    modal.classList.add('active');
    if (captionText) captionText.innerHTML = title;
    if (modalLoader) modalLoader.style.display = "block";
    if (modalImage) modalImage.style.display = "none";
    if (modalIframe) modalIframe.style.display = "none";

    if (isPdf && modalIframe) {
        modalIframe.src = src;
        modalIframe.onload = () => {
            if (modalLoader) modalLoader.style.display = "none";
            modalIframe.style.display = "block";
        };
        setTimeout(() => {
            if (modalLoader) modalLoader.style.display = "none";
            modalIframe.style.display = "block";
        }, 1500);
    } else if (modalImage) {
        modalImage.src = src;
        modalImage.onload = () => {
            if (modalLoader) modalLoader.style.display = "none";
            modalImage.style.display = "block";
        };
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('cert-modal-close');
    const modal = document.getElementById('modal');
    const modalIframe = document.getElementById('modal-iframe');

    if (closeBtn && modal) {
        closeBtn.onclick = function () {
            modal.classList.remove('active');
            if (modalIframe) modalIframe.src = '';
        }
        modal.onclick = function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                if (modalIframe) modalIframe.src = '';
            }
        }
    }
});

/* ===================================================
   FAQ ACCORDION
=================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            faqToggles.forEach(otherToggle => {
                otherToggle.setAttribute('aria-expanded', 'false');
                const content = otherToggle.nextElementSibling;
                if (content) content.style.maxHeight = null;
            });

            if (!isExpanded) {
                toggle.setAttribute('aria-expanded', 'true');
                const content = toggle.nextElementSibling;
                if (content) content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

// Boot on DOM load
document.addEventListener('DOMContentLoaded', initPortfolio);
