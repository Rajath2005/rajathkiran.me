/**
 * Adaptive Identity Operating System
 * Phase 7.5: Visitor Intelligence Layer
 * v2.0: Command Dock, Keyboard Shortcuts, Professional Environment Systems
 */

const RESUME_MAP = {
    'mission-control': { label: 'Cloud Engineer', file: 'Rajath Kiran A - Resume.pdf', default: false },
    'neural-nexus': { label: 'AI/ML Engineer', file: 'Rajath_Kiran_ML_Intern_Resume.pdf', default: false },
    'aurora-studio': { label: 'Full Stack Developer', file: 'Rajath_Kiran_FullStack_ATS_Resume.pdf', default: false },
    'research-lab': { label: 'AI/ML Researcher', file: 'Rajath_Kiran_ML_Intern_Resume.pdf', default: false },
    'project-foundry': { label: 'Full Stack Developer', file: 'Rajath_Kiran_FullStack_ATS_Resume.pdf', default: true },
    'innovation-garage': { label: 'Prototyper & Hacker', file: 'Rajath_Kiran_OpenSource_Hackathon_Resume.pdf', default: false }
};

const SKILL_PROFILES = {
    'mission-control': {
        name: 'Cloud Engineer',
        keywords: ['gcp', 'google cloud', 'kubernetes', 'docker', 'gke', 'terraform', 'ci/cd', 'load balancing', 'pub/sub', 'compute engine', 'cloud storage', 'devops', 'infrastructure', 'helm', 'istio', 'cloud sql', 'spanner', 'monitoring', 'iac', 'microservices']
    },
    'neural-nexus': {
        name: 'AI/ML Engineer',
        keywords: ['tensorflow', 'pytorch', 'cnn', 'lstm', 'nlp', 'machine learning', 'deep learning', 'neural network', 'computer vision', 'rag', 'llm', 'natural language processing', 'classification', 'regression', 'scikit-learn', 'pandas', 'numpy', 'huggingface', 'transformer', 'embedding', 'model deployment', 'mlops']
    },
    'project-foundry': {
        name: 'Full Stack Developer',
        keywords: ['react', 'next.js', 'node.js', 'javascript', 'typescript', 'html', 'css', 'supabase', 'postgresql', 'api', 'rest', 'frontend', 'backend', 'full stack', 'express', 'flask', 'tailwind', 'bootstrap', 'responsive', 'webpack', 'vite']
    },
    'aurora-studio': {
        name: 'Full Stack Developer',
        keywords: ['react', 'next.js', 'node.js', 'javascript', 'typescript', 'html', 'css', 'supabase', 'postgresql', 'api', 'rest', 'frontend', 'backend', 'full stack', 'express', 'flask', 'tailwind', 'bootstrap', 'responsive', 'webpack', 'vite']
    },
    'research-lab': {
        name: 'AI/ML Researcher',
        keywords: ['tensorflow', 'pytorch', 'machine learning', 'deep learning', 'nlp', 'computer vision', 'research', 'ieee', 'paper', 'algorithm', 'statistics', 'data analysis', 'python', 'jupyter', 'experiment']
    },
    'innovation-garage': {
        name: 'Full Stack Developer',
        keywords: ['react', 'node.js', 'javascript', 'python', 'flask', 'prototype', 'mvp', 'api', 'full stack', 'frontend', 'backend', 'rapid development', 'firebase', 'vercel', 'netlify']
    }
};

const getActiveResume = () => RESUME_MAP[currentEnvironment || 'project-foundry'];
const getActiveSkillProfile = () => SKILL_PROFILES[currentEnvironment || 'project-foundry'];
const getResumeUrl = () => `./assets/resumes/${getActiveResume().file}`;
const getResumeViewerUrl = () => `resume.html?role=${currentEnvironment || 'project-foundry'}`;

const ENVIRONMENTS = {
    'mission-control': {
        name: 'Mission Control',
        role: 'Cloud Engineer',
        motto: 'Building scalable cloud infrastructure and intelligent systems.',
        metrics: [
            { label: 'Cloud Badges', value: '15+' },
            { label: 'Technologies', value: 'GCP · K8s · Docker' },
            { label: 'Labs Completed', value: '50+' }
        ],
        spotlight: { title: 'Cloud Intelligence Center', desc: 'Enterprise architecture on GCP.', url: 'https://www.skills.google/public_profiles/09886862-52b8-44a4-86a5-9559a3952dd0' },
        icon: 'cloud-outline',
        shortLabel: 'Cloud'
    },
    'neural-nexus': {
        name: 'Neural Nexus',
        role: 'AI/ML Builder',
        motto: 'Exploring intelligence through machine learning and real-world AI systems.',
        metrics: [
            { label: 'AI Projects', value: '8+' },
            { label: 'Research Initiatives', value: '3' },
            { label: 'Systems Built', value: '5' }
        ],
        spotlight: { title: 'COPD Detection', desc: 'Deep learning screening using respiratory sounds.', url: 'https://github.com/Rajath2005/COPD-Detection' },
        icon: 'hardware-chip-outline',
        shortLabel: 'AI/ML'
    },
    'aurora-studio': {
        name: 'Aurora Studio',
        role: 'Designer + Frontend',
        motto: 'Crafting thoughtful digital experiences through design and engineering.',
        metrics: [
            { label: 'Design Projects', value: '10+' },
            { label: 'Interfaces Built', value: '20+' },
            { label: 'UX Experiments', value: '5' }
        ],
        spotlight: { title: 'rajathkiran.me', desc: 'Adaptive Identity Operating System (you are here).', url: '#' },
        icon: 'color-palette-outline',
        shortLabel: 'Design'
    },
    'research-lab': {
        name: 'Research Lab',
        role: 'Researcher + Explorer',
        motto: 'Exploring ideas, technologies, and systems through research.',
        metrics: [
            { label: 'IEEE Activities', value: 'Active' },
            { label: 'Explorations', value: 'Continuous' },
            { label: 'Learning Paths', value: 'Deep Tech' }
        ],
        spotlight: { title: 'IEEE Investigations', desc: 'Figma UI/UX design concept for IEEE web presence.', url: 'https://www.figma.com/community/file/1632301825171230889' },
        icon: 'flask-outline',
        shortLabel: 'Research'
    },
    'project-foundry': {
        name: 'Project Foundry',
        role: 'Builder + Engineer',
        motto: 'Turning ideas into products through engineering execution.',
        metrics: [
            { label: 'Apps Built', value: '15+' },
            { label: 'Deployments', value: '30+' },
            { label: 'Open Source', value: 'Active' }
        ],
        spotlight: { title: 'MediQ Health', desc: 'Ayurvedic healthcare platform with AI integration.', url: 'https://mediq-health.netlify.app/' },
        icon: 'construct-outline',
        shortLabel: 'Foundry'
    },
    'innovation-garage': {
        name: 'Innovation Garage',
        role: 'Prototyper + Hacker',
        motto: 'Building MVPs, prototypes, and experimental ideas fast.',
        metrics: [
            { label: 'MVPs Shipped', value: '5+' },
            { label: 'Prototypes', value: '10+' },
            { label: 'Experiments', value: 'Always' }
        ],
        spotlight: { title: 'AyuDost AI', desc: 'Rapid prototype: Ayurvedic support chatbot.', url: 'https://ayudost-chatbot.onrender.com/' },
        icon: 'bulb-outline',
        shortLabel: 'Garage'
    }
};

// Comprehensive knowledge base for JD matching
const PROJECT_SKILLS = {
    'https://github.com/Rajath2005/COPD-Detection': {
        name: 'COPD Detection & Severity Classification',
        keywords: ['python', 'tensorflow', 'pytorch', 'cnn', 'lstm', 'deep learning', 'audio processing', 'signal processing', 'classification', 'healthcare ai', 'medical imaging', 'respiratory', 'machine learning', 'neural networks', 'research'],
        domain: ['healthcare', 'ai/ml', 'research'],
        highlight: 'Deep learning for respiratory sound classification'
    },
    'https://ayudost-chatbot.onrender.com/': {
        name: 'AyuDost AI',
        keywords: ['python', 'nlp', 'flask', 'react', 'node.js', 'rag', 'llm', 'tensorflow', 'google cloud', 'chatbot', 'natural language processing', 'transformer', 'embedding', 'api', 'healthcare', 'ayurvedic'],
        domain: ['healthcare', 'ai/ml', 'full stack'],
        highlight: 'AI healthcare chatbot with RAG architecture'
    },
    'https://mediq-health.netlify.app/': {
        name: 'MediQ Health Platform',
        keywords: ['react', 'supabase', 'node.js', 'postgresql', 'tailwind', 'healthcare', 'full stack', 'api', 'authentication', 'database', 'responsive'],
        domain: ['healthcare', 'full stack', 'web development'],
        highlight: 'Ayurvedic healthcare platform with AI integration'
    },
    'http://cloud.rajathkiran.me/': {
        name: 'Cloud Infrastructure (GCP)',
        keywords: ['gcp', 'google cloud', 'compute engine', 'load balancing', 'networking', 'high availability', 'vm', 'health checks', 'auto scaling', 'cloud architecture', 'infrastructure', 'devops'],
        domain: ['cloud', 'devops', 'infrastructure'],
        highlight: 'Highly available multi-VM architecture on GCP'
    },
    'https://github.com/Rajath2005': {
        name: 'GitHub Profile',
        keywords: ['open source', 'git', 'version control', 'collaboration', 'code review', 'ci/cd', 'github actions', 'documentation', 'api', 'full stack', 'python', 'javascript', 'java', 'c++'],
        domain: ['development', 'open source', 'devops'],
        highlight: '70+ repositories across AI, cloud, and web'
    },
    'https://huggingface.co/spaces/BugHunter28/code-review-env': {
        name: 'Code Review Env',
        keywords: ['python', 'reinforcement learning', 'openai gym', 'code review', 'ai agent', 'benchmark', 'mlops', 'huggingface', 'testing', 'automation'],
        domain: ['ai/ml', 'devtools', 'research'],
        highlight: 'RL benchmark for training AI code reviewers'
    },
    'https://www.figma.com/community/file/1632301825171230889': {
        name: 'IEEE Web Design (Figma)',
        keywords: ['figma', 'ui/ux', 'prototyping', 'wireframing', 'design systems', 'responsive design', 'user research', 'accessibility', 'frontend'],
        domain: ['design', 'frontend', 'ui/ux'],
        highlight: 'UI/UX concept for IEEE web presence'
    },
    'https://sitexar.netlify.app/': {
        name: 'Sitexar',
        keywords: ['react', 'javascript', 'html', 'css', 'netlify', 'frontend', 'responsive', 'team collaboration', 'web development', 'startup'],
        domain: ['full stack', 'web development', 'startup'],
        highlight: 'Freelance startup website built by 6-member team'
    },
    'https://reactlabexp.netlify.app/': {
        name: 'React Lab',
        keywords: ['react', 'javascript', 'frontend', 'hooks', 'state management', 'components', 'spa', 'routing'],
        domain: ['frontend', 'web development'],
        highlight: 'React experiments and UI practice projects'
    }
};

const PROJECT_METADATA = {
    'https://github.com/Rajath2005/COPD-Detection': { recruiterPriority: 1, environments: ['neural-nexus'], featured: true, featuredType: 'ai' },
    'https://mediq-health.netlify.app/': { recruiterPriority: 2, environments: ['project-foundry', 'aurora-studio'], featured: true, featuredType: 'web' },
    'https://www.skills.google/public_profiles/09886862-52b8-44a4-86a5-9559a3952dd0': { recruiterPriority: 3, environments: ['mission-control', 'project-foundry'] },
    'https://github.com/Rajath2005': { recruiterPriority: 4, environments: ['project-foundry', 'innovation-garage'] },
    'https://ayudost-chatbot.onrender.com/': { recruiterPriority: 5, environments: ['neural-nexus', 'innovation-garage'], featured: true, featuredType: 'ai' },
    'https://www.figma.com/community/file/1632301825171230889': { recruiterPriority: 6, environments: ['research-lab', 'aurora-studio'] },
    'https://huggingface.co/spaces/BugHunter28/code-review-env': { recruiterPriority: 7, environments: ['neural-nexus', 'project-foundry'], featured: true, featuredType: 'tools' }
};

let currentEnvironment = '';
let isRecruiterMode = false;
let osAnalytics = JSON.parse(localStorage.getItem('os_analytics')) || {
    timeSpent: Object.fromEntries(Object.keys(ENVIRONMENTS).map(k => [k, 0])),
    visited: [],
    sectionsVisited: [],
    envSwitches: 0,
    easterEggHintShown: false,
    onboarding: {
        welcomeShown: false,
        pulseShown: false,
        sectionHintShown: false
    }
};
// Backwards compatibility
if (!osAnalytics.sectionsVisited) osAnalytics.sectionsVisited = [];
if (typeof osAnalytics.envSwitches === 'undefined') osAnalytics.envSwitches = 0;
if (!osAnalytics.onboarding) osAnalytics.onboarding = { welcomeShown: false, pulseShown: false, sectionHintShown: false };
let recommendationTimer = null;

/* ===================================================
   INIT
=================================================== */
export const initOS = () => {
    buildEnvironmentSelector();
    attachEventListeners();
    attachKeyboardShortcuts();
    renderCertificates();

    // URL parameter routing (for personalized hire/ links)
    const urlParams = new URLSearchParams(location.search);
    const urlEnv = urlParams.get('env');
    const urlRecruiter = urlParams.get('recruiter');

    // Origin-based routing
    const referrer = document.referrer.toLowerCase();
    let initialEnv = 'project-foundry';

    if (urlEnv && ENVIRONMENTS[urlEnv]) initialEnv = urlEnv;
    else if (referrer.includes('linkedin.com')) initialEnv = 'mission-control';
    else if (referrer.includes('github.com')) initialEnv = 'project-foundry';
    else if (referrer.includes('twitter.com') || referrer.includes('x.com')) initialEnv = 'innovation-garage';
    else {
        let maxTime = -1;
        for (const [env, time] of Object.entries(osAnalytics.timeSpent)) {
            if (time > maxTime) { maxTime = time; if (time > 0) initialEnv = env; }
        }
        // Randomize for brand-new visitors
        if (maxTime <= 0 && !referrer) {
            const envKeys = Object.keys(ENVIRONMENTS);
            initialEnv = envKeys[Math.floor(Math.random() * envKeys.length)];
        }
    }

    switchEnvironment(initialEnv, true);
    injectProjectTags();

    // Activate recruiter mode if URL param says so
    if (urlRecruiter === 'true') {
        setTimeout(() => {
            document.getElementById('toggle-recruiter-mode')?.click();
        }, 500);
    }

    // Start onboarding discovery (only if never switched)
    startOnboarding();

    // Analytics timer & Easter Egg Hint
    setInterval(() => {
        if (currentEnvironment && !isRecruiterMode) {
            osAnalytics.timeSpent[currentEnvironment]++;
            localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));

            const totalTime = Object.values(osAnalytics.timeSpent).reduce((a, b) => a + b, 0);

            // Trigger Smart Easter Egg Hint
            if (!osAnalytics.easterEggHintShown &&
                totalTime >= 60 &&
                osAnalytics.envSwitches >= 1 &&
                osAnalytics.sectionsVisited.length >= 2) {

                // Desktop only
                if (window.innerWidth > 768) {
                    showEasterEggHint();
                    osAnalytics.easterEggHintShown = true;
                    localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));
                }
            }
        }
    }, 1000);
};

/* ===================================================
   EVENT LISTENERS
=================================================== */
const attachEventListeners = () => {
    // Recruiter mode toggle
    document.getElementById('toggle-recruiter-mode')?.addEventListener('click', () => {
        isRecruiterMode = !isRecruiterMode;
        document.body.setAttribute('data-recruiter-mode', isRecruiterMode);
        const btn = document.getElementById('toggle-recruiter-mode');
        if (btn) btn.setAttribute('aria-pressed', isRecruiterMode);
        hybridSortProjects(isRecruiterMode);

        // Animate score ring
        const ringFill = document.querySelector('.score-ring-fill');
        if (ringFill) {
            if (isRecruiterMode) {
                ringFill.style.strokeDasharray = '0, 100';
                setTimeout(() => { ringFill.style.strokeDasharray = '94, 100'; }, 100);
            } else {
                ringFill.style.strokeDasharray = '0, 100';
            }
        }

        // Close dock on action
        document.getElementById('environment-orbit')?.classList.remove('active');
    });

    // Exit recruiter mode banner button
    document.getElementById('btn-exit-recruiter')?.addEventListener('click', () => {
        isRecruiterMode = false;
        document.body.setAttribute('data-recruiter-mode', 'false');
        document.getElementById('toggle-recruiter-mode')?.setAttribute('aria-pressed', 'false');
        hybridSortProjects(false);

        const ringFill = document.querySelector('.score-ring-fill');
        if (ringFill) ringFill.style.strokeDasharray = '0, 100';
    });

    // Toast close
    document.getElementById('toast-close')?.addEventListener('click', () => {
        document.getElementById('smart-recommendation-toast')?.classList.remove('active');
    });

    // Environment orbit toggle
    document.getElementById('toggle-environment-selector')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const orbit = document.getElementById('environment-orbit');
        const btn = document.getElementById('toggle-environment-selector');
        const isOpen = orbit?.classList.toggle('active');
        btn?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Track navbar section visits
    document.querySelectorAll('[data-nav-link]').forEach(link => {
        link.addEventListener('click', () => {
            const section = link.textContent.trim();
            if (!osAnalytics.sectionsVisited.includes(section)) {
                osAnalytics.sectionsVisited.push(section);
                localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));
            }
            // Trigger contextual onboarding hint based on section
            if (osAnalytics.envSwitches === 0 && !osAnalytics.onboarding.sectionHintShown) {
                const hints = {
                    'Projects': `Viewing projects? Switch to <strong>Neural Nexus</strong> to see AI projects first, or <strong>Mission Control</strong> for cloud infrastructure.`,
                    'Resume': `Your resume auto-adapts! Switch profiles to see a <strong>role-tailored resume</strong> for Cloud, AI/ML, or Full Stack.`,
                    'Contact': `Tell recruiters about the environment switcher — it shows your adaptability!`
                };
                const hint = hints[section];
                if (hint) {
                    setTimeout(() => {
                        showOnboardingToast('Pro Tip', hint, 'bulb-outline', 7000);
                        osAnalytics.onboarding.sectionHintShown = true;
                        localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));
                    }, 2000);
                }
            }
        });
    });

    // Lazy load AI Chat
    document.getElementById('ai-chat-btn')?.addEventListener('click', async (e) => {
        if (!window.aiChatLoaded) {
            window.aiChatLoaded = true;
            try {
                // Change cursor to indicate loading
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

    // Close orbit when clicking outside
    document.addEventListener('click', (e) => {
        const orbit = document.getElementById('environment-orbit');
        const selector = document.getElementById('toggle-environment-selector');
        const dock = document.getElementById('command-dock');
        if (orbit && !orbit.contains(e.target) && !selector?.contains(e.target) && !dock?.contains(e.target)) {
            orbit.classList.remove('active');
            selector?.setAttribute('aria-expanded', 'false');
        }
    });

    // Quick Apply
    const qaModal = document.getElementById('quick-apply-modal');
    const qaBtn = document.getElementById('quick-apply-btn');
    const qaClose = document.getElementById('quick-apply-close');
    const qaOverlay = document.querySelector('[data-quick-apply-overlay]');

    // Hire Me → opens Quick Apply
    const hireBtn = document.getElementById('hire-me-btn');
    if (hireBtn && qaModal) {
        hireBtn.addEventListener('click', () => qaModal.classList.add('active'));
    }

    if (qaBtn && qaModal) {
        qaBtn.addEventListener('click', () => qaModal.classList.add('active'));
    }
    if (qaClose && qaModal) {
        qaClose.addEventListener('click', () => qaModal.classList.remove('active'));
    }
    if (qaOverlay && qaModal) {
        qaOverlay.addEventListener('click', () => qaModal.classList.remove('active'));
    }

    document.querySelectorAll('.qa-role-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const role = btn.getAttribute('data-role');
            const resume = RESUME_MAP[role] || RESUME_MAP['project-foundry'];
            const profile = SKILL_PROFILES[role] || SKILL_PROFILES['project-foundry'];
            const subject = encodeURIComponent(`Internship Application — Rajath Kiran A — ${resume.label}`);
            const body = encodeURIComponent(
`Hi,

I'm Rajath Kiran A, a Computer Science student at VCET graduating in 2027. I'm writing to express my interest in a ${resume.label} internship opportunity.

My resume (tailored for ${resume.label}) is attached for your review.

Here's a quick snapshot of my relevant skills:
${profile.keywords.slice(0, 8).map(k => `- ${k}`).join('\n')}

I've built and deployed production AI/cloud projects including AyuDost AI and COPD Detection. I'm open to relocation and available for an immediate start.

Portfolio: https://rajathkiran.me
Resume: https://rajathkiran.me/resume.html?role=${role}
GitHub: https://github.com/Rajath2005 (70+ repos)
LinkedIn: https://www.linkedin.com/in/rajath-kiran/

I'd welcome the opportunity to discuss how I can contribute to your team.

Best,
Rajath Kiran A
rajathajeru@gmail.com
+91 9113275894`
            );
            document.location.href = `mailto:rajathajeru@gmail.com?subject=${subject}&body=${body}`;
            qaModal.classList.remove('active');
        });
    });

    // JD Match
    const jdModal = document.getElementById('jd-match-modal');
    const jdBtn = document.getElementById('jd-match-btn');
    const jdClose = document.getElementById('jd-match-close');
    const jdOverlay = document.querySelector('[data-jd-overlay]');
    const jdInput = document.getElementById('jd-input');
    const jdAnalyze = document.getElementById('jd-analyze-btn');
    const jdResults = document.getElementById('jd-results');

    if (jdBtn && jdModal) {
        jdBtn.addEventListener('click', () => {
            jdModal.classList.add('active');
            jdResults.style.display = 'none';
            jdInput.value = '';
        });
    }

    // JD sample query buttons
    document.querySelectorAll('.jd-sample-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            jdInput.value = btn.getAttribute('data-sample');
            jdResults.style.display = 'none';
            jdAnalyze.click();
        });
    });
    if (jdClose && jdModal) {
        jdClose.addEventListener('click', () => jdModal.classList.remove('active'));
    }
    if (jdOverlay && jdModal) {
        jdOverlay.addEventListener('click', () => jdModal.classList.remove('active'));
    }

    if (jdAnalyze && jdInput && jdResults) {
        jdAnalyze.addEventListener('click', () => {
            const jd = jdInput.value.toLowerCase();
            if (!jd.trim()) { jdResults.innerHTML = '<p style="color: var(--orange-yellow-crayola);">Please paste a job description first.</p>'; jdResults.style.display = 'block'; return; }

            const words = jd.split(/[^a-zA-Z0-9+#.]+/).filter(w => w.length > 2);
            const wordSet = new Set(words);

            // ---- 1. Role Match (weighted 60%) ----
            let roleScores = [];
            for (const [key, profile] of Object.entries(SKILL_PROFILES)) {
                const matched = profile.keywords.filter(kw => words.some(w => w.includes(kw) || kw.includes(w)));
                const score = Math.round((matched.length / Math.max(profile.keywords.length, 1)) * 100);
                roleScores.push({ key, name: profile.name, score, matched, total: profile.keywords.length });
            }
            roleScores.sort((a, b) => b.score - a.score);
            const bestRole = roleScores[0];

            // ---- 2. Project Match (weighted 25%) ----
            let projectMatches = [];
            for (const [url, proj] of Object.entries(PROJECT_SKILLS)) {
                const matched = proj.keywords.filter(kw => words.some(w => w.includes(kw) || kw.includes(w)));
                const score = Math.round((matched.length / Math.max(proj.keywords.length, 1)) * 100);
                if (score > 0) {
                    projectMatches.push({ url, name: proj.name, score, matched, highlight: proj.highlight, domain: proj.domain });
                }
            }
            projectMatches.sort((a, b) => b.score - a.score);
            const topProjects = projectMatches.slice(0, 4);

            // ---- 3. Domain Detection ----
            const domainKeywords = {
                'Cloud': ['gcp', 'cloud', 'kubernetes', 'docker', 'devops', 'infrastructure', 'aws', 'azure', 'deployment', 'ci/cd', 'terraform'],
                'AI/ML': ['machine learning', 'deep learning', 'nlp', 'computer vision', 'tensorflow', 'pytorch', 'neural', 'classification', 'rag', 'llm', 'data science'],
                'Full Stack': ['react', 'frontend', 'backend', 'full stack', 'api', 'database', 'web', 'javascript', 'node.js', 'supabase'],
                'Research': ['research', 'paper', 'experiment', 'algorithm', 'analysis', 'statistics', 'ieee', 'publication']
            };
            let domainScores = {};
            for (const [domain, kws] of Object.entries(domainKeywords)) {
                const hits = kws.filter(kw => words.some(w => w.includes(kw) || kw.includes(w)));
                domainScores[domain] = hits.length;
            }
            const topDomain = Object.entries(domainScores).sort((a, b) => b[1] - a[1])[0];

            // ---- 4. GitHub/Open Source Match (weighted 15%) ----
            const gitKeywords = ['open source', 'git', 'github', 'version control', 'collaboration', 'ci/cd', 'documentation', 'agile', 'scrum', 'jira', 'code review', 'testing'];
            const gitHits = gitKeywords.filter(kw => words.some(w => w.includes(kw) || kw.includes(w)));

            // ---- Composite Score ----
            const roleWeight = 0.60;
            const projectWeight = 0.25;
            const gitWeight = 0.15;
            const avgProjectScore = topProjects.length > 0 ? topProjects.reduce((s, p) => s + p.score, 0) / topProjects.length : 0;
            const gitScore = Math.round((gitHits.length / gitKeywords.length) * 100);
            const composite = Math.round(
                (bestRole.score * roleWeight) +
                (avgProjectScore * projectWeight) +
                (gitScore * gitWeight)
            );

            // ---- Build Results ----
            const pctColor = composite >= 70 ? '#00ff88' : composite >= 45 ? '#ffaa00' : '#ff6666';
            const envLabel = ENVIRONMENTS[bestRole.key]?.shortLabel || bestRole.name;

            // Matched skills (from best role + projects)
            const allMatched = new Set([
                ...bestRole.matched,
                ...topProjects.flatMap(p => p.matched)
            ]);
            const matchedList = [...allMatched].slice(0, 18);

            // Missing from best role
            const missingList = SKILL_PROFILES[bestRole.key]?.keywords
                .filter(kw => !words.some(w => w.includes(kw) || kw.includes(w)))
                .filter(kw => kw.length > 3)
                .slice(0, 10) || [];

            const matchedHtml = matchedList.map(t => `<span class="jd-skill-tag matched">${t}</span>`).join('');
            const missingHtml = missingList.map(t => `<span class="jd-skill-tag missing">${t}</span>`).join('');
            const projectHtml = topProjects.map(p =>
                `<div class="jd-project-match"><ion-icon name="folder-outline"></ion-icon><span>${p.name}</span><span class="jd-project-pct">${p.score}%</span></div>`
            ).join('');

            const domainHint = topDomain && topDomain[1] > 0
                ? `<div style="margin-bottom: 12px; padding: 10px 14px; border-radius: 8px; background: hsla(195, 100%, 68%, 0.06); border: 1px solid hsla(195, 100%, 68%, 0.15);">
                    <div style="font-size: 13px; color: var(--light-gray);">This JD leans toward <strong style="color: var(--neon-blue);">${topDomain[0]}</strong></div>
                   </div>` : '';

            jdResults.innerHTML = `
                <div class="jd-match-score">
                    <div class="jd-match-pct" style="color: ${pctColor};">${composite}%</div>
                    <div>
                        <div class="jd-match-label" style="font-weight: 600; color: var(--white-1);">Best Role: ${bestRole.name}</div>
                        <div class="jd-match-label" style="font-size: 12px; color: var(--light-gray-70);">Skills matched in JD · ${bestRole.score}% role fit</div>
                    </div>
                </div>

                ${domainHint}

                ${matchedList.length > 0 ? `
                <div style="margin-bottom: 12px;">
                    <div style="font-size: 13px; color: var(--light-gray); margin-bottom: 6px;">
                        <ion-icon name="checkmark-circle" style="color: #00ff88; vertical-align: middle;"></ion-icon> Matched Skills
                    </div>
                    <div class="jd-skill-match">${matchedHtml}</div>
                </div>` : ''}

                ${missingList.length > 0 ? `
                <div style="margin-bottom: 12px;">
                    <div style="font-size: 13px; color: var(--light-gray); margin-bottom: 6px;">
                        <ion-icon name="alert-circle" style="color: #ffaa00; vertical-align: middle;"></ion-icon> Skills to Highlight
                    </div>
                    <div class="jd-skill-match">${missingHtml}</div>
                </div>` : ''}

                ${topProjects.length > 0 ? `
                <div style="margin-bottom: 12px;">
                    <div style="font-size: 13px; color: var(--light-gray); margin-bottom: 6px;">
                        <ion-icon name="folder-open" style="color: var(--neon-blue); vertical-align: middle;"></ion-icon> Relevant Projects
                    </div>
                    <div class="jd-project-list">${projectHtml}</div>
                </div>` : ''}

                <div style="margin-top: 14px; padding: 14px; border-radius: 10px; background: hsla(195, 100%, 68%, 0.06); border: 1px solid hsla(195, 100%, 68%, 0.2);">
                    <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                        <span style="font-size: 13px; color: var(--light-gray);">
                            <strong style="color: var(--neon-blue);">Next step:</strong>
                            <strong id="jd-auto-apply" style="color: var(--orange-yellow-crayola); cursor: pointer;">Quick Apply</strong>
                            with ${bestRole.name} resume
                        </span>
                        <span style="font-size: 12px; color: var(--light-gray-70);">·</span>
                        <span style="font-size: 13px; color: var(--light-gray);">
                            Switch to <strong id="jd-switch-env" style="color: var(--neon-blue); cursor: pointer;">${envLabel}</strong>
                        </span>
                    </div>
                </div>
            `;
            jdResults.style.display = 'block';

            // Quick Apply from JD results
            const autoApply = document.getElementById('jd-auto-apply');
            if (autoApply) {
                autoApply.addEventListener('click', () => {
                    jdModal.classList.remove('active');
                    document.getElementById('quick-apply-btn')?.click();
                });
            }

            // Switch environment from JD results
            const switchEnv = document.getElementById('jd-switch-env');
            if (switchEnv) {
                switchEnv.addEventListener('click', () => {
                    jdModal.classList.remove('active');
                    if (currentEnvironment !== bestRole.key) {
                        switchEnvironment(bestRole.key);
                    }
                });
            }
        });
    }
};

/* ===================================================
   KEYBOARD SHORTCUTS
=================================================== */
const attachKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
        // Don't fire if user is typing in an input
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
        // Require Shift key for these shortcuts to avoid conflict with normal typing (like the easter egg)
        if (!e.shiftKey) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        switch (e.key.toLowerCase()) {
            case 'k':
                e.preventDefault();
                document.getElementById('toggle-environment-selector')?.click();
                break;
            case 'r':
                e.preventDefault();
                document.getElementById('toggle-recruiter-mode')?.click();
                break;
            case 'a':
                e.preventDefault();
                document.getElementById('ai-chat-btn')?.click();
                break;
            case 'escape':
                document.getElementById('environment-orbit')?.classList.remove('active');
                document.getElementById('toggle-environment-selector')?.setAttribute('aria-expanded', 'false');
                document.getElementById('ai-chat-panel')?.classList.remove('active');
                document.getElementById('modal')?.classList.remove('active');
                document.getElementById('quick-apply-modal')?.classList.remove('active');
                document.getElementById('jd-match-modal')?.classList.remove('active');
                document.querySelectorAll('.modal-container.active, .project-modal-container.active').forEach(el => el.classList.remove('active'));
                break;
        }
    });
};

/* ===================================================
   BUILD ENVIRONMENT SELECTOR
=================================================== */
const buildEnvironmentSelector = () => {
    const orbit = document.getElementById('environment-orbit');
    if (!orbit) return;

    orbit.innerHTML = `<div class="orbit-header">Switch Identity</div>`;

    Object.entries(ENVIRONMENTS).forEach(([envKey, config]) => {
        const btn = document.createElement('button');
        btn.className = 'orbit-btn';
        btn.setAttribute('role', 'menuitem');
        btn.setAttribute('data-env', envKey);
        btn.innerHTML = `
            <ion-icon name="${config.icon}"></ion-icon>
            <span>${config.name}</span>
        `;
        btn.addEventListener('click', () => {
            orbit.classList.remove('active');
            document.getElementById('toggle-environment-selector')?.setAttribute('aria-expanded', 'false');
            switchEnvironment(envKey);
        });
        orbit.appendChild(btn);
    });
};

/* ===================================================
   SWITCH ENVIRONMENT
=================================================== */
const updateResumeLinks = () => {
    document.querySelectorAll('[data-resume-download]').forEach(el => {
        el.href = getResumeUrl();
    });
    document.querySelectorAll('[data-resume-view]').forEach(el => {
        el.href = getResumeViewerUrl();
    });
    const badge = document.getElementById('resume-role-badge');
    if (badge) badge.textContent = getActiveResume().label;
};

export const switchEnvironment = (envId, isInitial = false) => {
    if (currentEnvironment === envId) return;

    const triggerMorph = () => {
        currentEnvironment = envId;
        document.body.setAttribute('data-environment', envId);

        // Analytics
        if (!osAnalytics.visited.includes(envId)) {
            osAnalytics.visited.push(envId);
        }
        if (!isInitial) {
            osAnalytics.envSwitches++;
            clearOnboarding();
        }
        localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));

        updateDockState(envId);
        updateIdentityExplorer();
        updateHeroMetrics(envId);
        hybridSortProjects(false);
        triggerSmartRecommendation(envId);
        updateNavbarIndicator(envId);
        markActiveOrbitBtn(envId);
        updateResumeLinks();
    };

    if (isInitial) {
        triggerMorph();
    } else {
        const overlay = document.getElementById('glass-morph-overlay');
        if (overlay) {
            overlay.classList.add('active');
            setTimeout(() => {
                triggerMorph();
                setTimeout(() => overlay.classList.remove('active'), 300);
            }, 400);
        } else {
            triggerMorph();
        }
    }
};

/* ===================================================
   UPDATE DOCK STATE (icon + label in dock button)
=================================================== */
const updateDockState = (envId) => {
    const config = ENVIRONMENTS[envId];
    const iconEl = document.getElementById('dock-env-icon');
    const labelEl = document.getElementById('dock-env-label');

    if (iconEl) iconEl.setAttribute('name', config.icon);
    if (labelEl) labelEl.textContent = config.shortLabel;
};

/* ===================================================
   UPDATE NAVBAR INDICATOR
=================================================== */
const updateNavbarIndicator = (envId) => {
    // The CSS custom property --neon-blue is already set by the environment body selector.
    // This forces the browser to repaint the navbar::after pseudo-element transition.
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
        // Tiny class toggle to force re-render of the transition
        link.classList.add('env-switching');
        requestAnimationFrame(() => link.classList.remove('env-switching'));
    });
};

/* ===================================================
   MARK ACTIVE ORBIT BUTTON
=================================================== */
const markActiveOrbitBtn = (envId) => {
    document.querySelectorAll('.orbit-btn').forEach(btn => {
        btn.classList.toggle('active-env', btn.dataset.env === envId);
    });
};

/* ===================================================
   UPDATE HERO METRICS
=================================================== */
const updateHeroMetrics = (envId) => {
    const config = ENVIRONMENTS[envId];

    // Update typing text role
    const changingText = document.getElementById('changing-text');
    if (changingText) changingText.textContent = config.role;

    // Spotlight card
    const spotlightContainer = document.getElementById('os-hero-spotlight');
    if (spotlightContainer) {
        spotlightContainer.innerHTML = `
            <div class="spotlight-card">
                <span class="spotlight-badge">Featured in ${config.name}</span>
                <h4>${config.spotlight.title}</h4>
                <p>${config.spotlight.desc}</p>
                <a href="${config.spotlight.url}" target="_blank" rel="noopener">Explore <ion-icon name="arrow-forward-outline"></ion-icon></a>
            </div>
        `;
    }

    // Metrics grid
    const metricsContainer = document.getElementById('os-hero-metrics');
    if (metricsContainer) {
        metricsContainer.innerHTML = config.metrics.map(m => `
            <div class="metric-item">
                <span class="metric-val">${m.value}</span>
                <span class="metric-label">${m.label}</span>
            </div>
        `).join('');
    }
};

/* ===================================================
   UPDATE IDENTITY EXPLORER
=================================================== */
const updateIdentityExplorer = () => {
    const list = document.getElementById('explorer-list');
    if (!list) return;

    list.innerHTML = Object.entries(ENVIRONMENTS).map(([envKey, config]) => {
        const isVisited = osAnalytics.visited.includes(envKey);
        return `
            <li class="${envKey === currentEnvironment ? 'active' : ''} ${isVisited ? 'visited' : ''}">
                <ion-icon name="${isVisited ? 'checkmark-circle' : 'ellipse-outline'}"></ion-icon>
                <span>${config.name}</span>
            </li>
        `;
    }).join('');
};

/* ===================================================
   SMART RECOMMENDATION TOAST
=================================================== */
const triggerSmartRecommendation = (envId) => {
    clearTimeout(recommendationTimer);
    const toast = document.getElementById('smart-recommendation-toast');
    if (toast) toast.classList.remove('active');

    recommendationTimer = setTimeout(() => {
        if (isRecruiterMode) return;
        const msg = document.getElementById('toast-message');
        if (msg) msg.textContent = `Explore the ${ENVIRONMENTS[envId].spotlight.title} project!`;
        if (toast) {
            toast.classList.add('active');
            setTimeout(() => toast.classList.remove('active'), 8000);
        }
    }, 15000);
};

/* ===================================================
   PROJECT TAGS (TECH STACK BADGES)
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
        'https://mediq-health.netlify.app/': ['React', 'Supabase', 'Node.js', 'Gemini AI'],
        'https://ayudost-chatbot.onrender.com/': ['Python', 'NLP', 'Flask', 'Google Cloud'],
        'https://github.com/Rajath2005': ['Open Source', 'Full Stack', 'Cloud'],
        'https://www.figma.com/community/file/1632301825171230889': ['Figma', 'Prototyping', 'IEEE'],
        'https://cloud.rajathkiran.me/': ['GCP', 'Cloud Architect', 'DevOps'],
        'https://huggingface.co/spaces/BugHunter28/code-review-env': ['Python', 'HuggingFace', 'RL Benchmark', 'LLMs']
    };

    document.querySelectorAll('.project-item').forEach(item => {
        // Prevent duplicate injections
        if (item.querySelector('.project-tech-tags')) return;

        const url = item.querySelector('a')?.getAttribute('data-project-url') || '';
        const category = item.getAttribute('data-category')?.toLowerCase() || '';
        const tags = specificTags[url] || defaultTags[category] || ['Software Engineering'];

        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'project-tech-tags';
        tagsContainer.innerHTML = tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

        const contentBox = item.querySelector('.project-content');
        if (contentBox) contentBox.appendChild(tagsContainer);

        // Inject Featured Badge
        const meta = PROJECT_METADATA[url];
        if (meta && meta.featured && !item.querySelector('.featured-badge')) {
            const badge = document.createElement('div');
            badge.className = `featured-badge ${meta.featuredType ? 'featured-' + meta.featuredType : ''}`;

            let icon = 'star';
            if (meta.featuredType === 'ai') icon = 'sparkles';
            if (meta.featuredType === 'web') icon = 'globe';
            if (meta.featuredType === 'tools') icon = 'construct';

            badge.innerHTML = `<ion-icon name="${icon}"></ion-icon> Featured`;
            const imgWrapper = item.querySelector('.project-img-wrapper');
            if (imgWrapper) imgWrapper.appendChild(badge);
        }
    });
};

const showEasterEggHint = () => {
    clearTimeout(recommendationTimer);
    const toast = document.getElementById('smart-recommendation-toast');
    if (!toast) return;

    const title = toast.querySelector('.toast-title');
    const msg = document.getElementById('toast-message');
    const icon = toast.querySelector('.toast-icon ion-icon');

    if (title) title.textContent = "System Alert";
    if (msg) msg.innerHTML = "🎯 You seem curious.<br><br>Try typing <code>rajath2005</code> on your keyboard to unlock kernel access.";
    if (icon) icon.setAttribute('name', 'terminal-outline');

    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
        // Reset text back after hiding
        setTimeout(() => {
            if (title) title.textContent = "Recommendation";
            if (icon) icon.setAttribute('name', 'bulb-outline');
        }, 500);
    }, 12000);
};

/* ===================================================
   ONBOARDING — Feature Discovery System
=================================================== */
let onboardingTimers = [];

const showOnboardingToast = (title, msg, icon = 'bulb-outline', duration = 8000) => {
    clearTimeout(recommendationTimer);
    const toast = document.getElementById('smart-recommendation-toast');
    if (!toast) return;
    toast.classList.remove('active');
    setTimeout(() => {
        const t = toast.querySelector('.toast-title');
        const m = document.getElementById('toast-message');
        const i = toast.querySelector('.toast-icon ion-icon');
        if (t) t.textContent = title;
        if (m) m.innerHTML = msg;
        if (i) i.setAttribute('name', icon);
        toast.classList.add('active', 'onboarding-toast');
        setTimeout(() => {
            toast.classList.remove('active', 'onboarding-toast');
            setTimeout(() => {
                if (t) t.textContent = 'Recommendation';
                if (i) i.setAttribute('name', 'bulb-outline');
            }, 300);
        }, duration);
    }, 100);
};

const pulseEnvButton = () => {
    const btn = document.getElementById('toggle-environment-selector');
    if (btn) btn.classList.add('env-unexplored');
    const tooltip = document.getElementById('onboarding-tooltip');
    if (tooltip) setTimeout(() => tooltip.classList.add('active'), 300);
};

const clearOnboarding = () => {
    onboardingTimers.forEach(t => clearTimeout(t));
    onboardingTimers = [];
    const btn = document.getElementById('toggle-environment-selector');
    if (btn) btn.classList.remove('env-unexplored');
    const tooltip = document.getElementById('onboarding-tooltip');
    if (tooltip) tooltip.classList.remove('active');
};

const startOnboarding = () => {
    if (osAnalytics.envSwitches > 0) return;
    const obs = osAnalytics.onboarding;

    // Stage 1: Welcome toast after 15s
    if (!obs.welcomeShown) {
        const t1 = setTimeout(() => {
            if (osAnalytics.envSwitches > 0) return;
            const envMsg = `You're currently in <strong>${ENVIRONMENTS[currentEnvironment]?.name || 'Project Foundry'}</strong>.
                Try switching between profiles — each environment tailors projects, skills, and even your resume!`;
            showOnboardingToast('Discover Profiles', envMsg, 'planet-outline', 10000);
            osAnalytics.onboarding.welcomeShown = true;
            localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));
        }, 15000);
        onboardingTimers.push(t1);
    }

    // Stage 2: Pulse + tooltip after 35s if still no switch
    if (!obs.pulseShown) {
        const t2 = setTimeout(() => {
            if (osAnalytics.envSwitches > 0) return;
            pulseEnvButton();
            showOnboardingToast('Try It Now',
                'Click the <strong>planet icon</strong> on the right dock to switch between Cloud Engineer, AI/ML, and Full Stack profiles.',
                'planet-outline', 10000);
            osAnalytics.onboarding.pulseShown = true;
            localStorage.setItem('os_analytics', JSON.stringify(osAnalytics));
        }, 35000);
        onboardingTimers.push(t2);
    }

};

/* ===================================================
   HYBRID PROJECT SORTING
=================================================== */
const hybridSortProjects = (forceRecruiter) => {
    const projectList = document.querySelector('.project-list');
    if (!projectList) return;

    const items = Array.from(projectList.querySelectorAll('.project-item'));
    const isMobile = window.innerWidth <= 768;

    items.forEach(item => {
        const url = item.querySelector('a')?.getAttribute('data-project-url') || '';
        const meta = PROJECT_METADATA[url] || { recruiterPriority: 99, environments: [] };

        let priority = forceRecruiter
            ? meta.recruiterPriority
            : (meta.environments.includes(currentEnvironment) ? meta.recruiterPriority : 50 + meta.recruiterPriority);

        if (forceRecruiter || isMobile) {
            item.dataset.sortOrder = priority;
        } else {
            item.style.order = priority;
            item.dataset.sortOrder = priority;
        }
    });

    if (forceRecruiter || isMobile) {
        items.sort((a, b) => parseInt(a.dataset.sortOrder) - parseInt(b.dataset.sortOrder));
        items.forEach(item => projectList.appendChild(item));
        items.forEach(item => item.style.removeProperty('order'));
    }
};

/* ===================================================
   CERTIFICATES RENDERING
=================================================== */
const ALL_CERTIFICATES = [
    // --- PREMIUM CERTIFICATES ---
    { id: 1, title: 'IEEE I2 Connect Competition Winning Cert', src: 'assets/images/certificate-1.webp', thumb: 'assets/images/certificate-1.webp', isPremium: true },
    { id: 16, title: 'Node JS Certification', src: 'assets/images/certificate-16.webp', thumb: 'assets/images/certificate-16.webp', isPremium: true },
    { id: 8, title: 'Responsive Web Design', src: 'assets/images/certificate-8.webp', thumb: 'assets/images/certificate-8.webp', isPremium: true },
    { id: 26, title: 'Professional Certification', src: 'assets/images/certificate-26.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: true },
    { id: 6, title: 'Infosys SpringBoard', src: 'assets/images/certificate-6.webp', thumb: 'assets/images/certificate-6.webp', isPremium: true },
    { id: 2, title: 'Aura 2K24 Competition Winner', src: 'assets/images/certificate-2.webp', thumb: 'assets/images/certificate-2.webp', isPremium: true },
    { id: 19, title: 'Technical Certification', src: 'assets/images/certificate-19.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: true },
    { id: 24, title: 'Advanced Certification', src: 'assets/images/certificate-24.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: true },
    { id: 25, title: 'Specialized Training', src: 'assets/images/certificate-25.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: true },
    { id: 5, title: 'Linux for Beginners Certifications', src: 'assets/images/certificate-5.webp', thumb: 'assets/images/certificate-5.webp', isPremium: true },

    // --- FOUNDATIONAL SKILLS ---
    { id: 7, title: 'Fundamental of CSS', src: 'assets/images/certificate-7.webp', thumb: 'assets/images/certificate-7.webp', isPremium: false },
    { id: 9, title: 'Basic CSS', src: 'assets/images/certificate-9.webp', thumb: 'assets/images/certificate-9.webp', isPremium: false },
    { id: 10, title: 'Intro to Cybersecurity', src: 'assets/images/certificate-10.webp', thumb: 'assets/images/certificate-10.webp', isPremium: false },
    { id: 11, title: 'Git Sheet', src: 'assets/images/certificate-11.webp', thumb: 'assets/images/certificate-11.webp', isPremium: false },
    { id: 12, title: 'Open Source', src: 'assets/images/certificate-12.webp', thumb: 'assets/images/certificate-12.webp', isPremium: false },
    { id: 13, title: 'Fundamentals of HTML', src: 'assets/images/certificate-13.webp', thumb: 'assets/images/certificate-13.webp', isPremium: false },
    { id: 14, title: 'CHATGPT', src: 'assets/images/certificate-14.webp', thumb: 'assets/images/certificate-14.webp', isPremium: false },
    { id: 15, title: 'Code360 Masterclass', src: 'assets/images/certificate-15.webp', thumb: 'assets/images/certificate-15.webp', isPremium: false },
    { id: 17, title: 'Certificate 17', src: 'assets/images/certificate-17.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: false },
    { id: 18, title: 'Certificate 18', src: 'assets/images/certificate-18.webp', thumb: 'assets/images/certificate-18.webp', isPremium: false },
    { id: 20, title: 'Certificate 20', src: 'assets/images/certificate-20.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: false },
    { id: 21, title: 'Certificate 21', src: 'assets/images/certificate-21.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: false },
    { id: 22, title: 'Certificate 22', src: 'assets/images/certificate-22.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: false },
    { id: 23, title: 'Certificate 23', src: 'assets/images/certificate-23.pdf', thumb: 'assets/images/icon-pdf-placeholder.png', isPdf: true, isPremium: false },
];

const renderCertificates = () => {
    const container = document.getElementById('dynamic-certificates-container');
    if (!container) return;

    let html = `
        <div class="cert-category">
            <h4 class="cert-category-title" style="margin-bottom: 20px; font-size: 18px; color: var(--white-2); display: flex; align-items: center; gap: 8px;"><ion-icon name="trophy" style="color: var(--orange-yellow-crayola);"></ion-icon> Premium & Featured</h4>
            <ul class="certificate-list">
    `;

    const premiumCerts = ALL_CERTIFICATES.filter(c => c.isPremium);
    premiumCerts.forEach(cert => {
        html += `
            <li class="certificate-item premium-cert-item">
                <div class="cert-img-wrapper" onclick="openCertModal('${cert.src}', '${cert.title}', ${cert.isPdf || false})" style="cursor: pointer; position: relative; background: var(--eerie-black-2); display: flex; align-items: center; justify-content: center; min-height: 160px; border-radius: 12px; overflow: hidden; border: 1px solid var(--jet);">
                    ${cert.isPdf ? `<ion-icon name="document-text" style="font-size: 48px; color: var(--light-gray);"></ion-icon>` : `<img src="${cert.thumb}" alt="${cert.title}" class="thumbnail" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">`}
                    <div class="cert-overlay" style="position: absolute; inset: 0; background: hsla(0,0%,0%,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;">
                        <ion-icon name="${cert.isPdf ? 'document-text' : 'expand'}" style="color: white; font-size: 32px;"></ion-icon>
                    </div>
                </div>
                <p>${cert.title} ${cert.isPremium ? '<ion-icon name="ribbon" style="color: var(--orange-yellow-crayola); margin-left: 5px;"></ion-icon>' : ''}</p>
            </li>
        `;
    });

    html += `
            </ul>
        </div>
        <div class="cert-category" style="margin-top: 40px;">
            <h4 class="cert-category-title" style="margin-bottom: 20px; font-size: 18px; color: var(--light-gray); display: flex; align-items: center; gap: 8px;"><ion-icon name="medal"></ion-icon> Foundational Skills</h4>
            <div style="position: relative;">
                <ul class="certificate-list" id="foundational-certs-list" style="max-height: 380px; overflow: hidden; position: relative; transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);">
    `;

    const foundationalCerts = ALL_CERTIFICATES.filter(c => !c.isPremium);
    foundationalCerts.forEach(cert => {
        html += `
            <li class="certificate-item">
                <div class="cert-img-wrapper" onclick="openCertModal('${cert.src}', '${cert.title}', ${cert.isPdf || false})" style="cursor: pointer; position: relative; background: var(--eerie-black-2); display: flex; align-items: center; justify-content: center; min-height: 160px; border-radius: 12px; overflow: hidden; border: 1px solid var(--jet);">
                    ${cert.isPdf ? `<ion-icon name="document-text" style="font-size: 48px; color: var(--light-gray);"></ion-icon>` : `<img src="${cert.thumb}" alt="${cert.title}" class="thumbnail" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">`}
                    <div class="cert-overlay" style="position: absolute; inset: 0; background: hsla(0,0%,0%,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;">
                        <ion-icon name="${cert.isPdf ? 'document-text' : 'expand'}" style="color: white; font-size: 32px;"></ion-icon>
                    </div>
                </div>
                <p>${cert.title}</p>
            </li>
        `;
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

    // Hover effect for dynamic cert overlays
    document.querySelectorAll('.cert-img-wrapper').forEach(wrapper => {
        wrapper.addEventListener('mouseenter', () => wrapper.querySelector('.cert-overlay').style.opacity = '1');
        wrapper.addEventListener('mouseleave', () => wrapper.querySelector('.cert-overlay').style.opacity = '0');
    });

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
                // Scroll back up slightly
                setTimeout(() => foundationalList.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            }
        });
    }
};

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
        // Fallback
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

// Also close logic attached to DOM
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

// Boot OS on DOM load
document.addEventListener('DOMContentLoaded', initOS);

/* ===================================================
   FAQ ACCORDION LOGIC
=================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Close all other accordions
            faqToggles.forEach(otherToggle => {
                otherToggle.setAttribute('aria-expanded', 'false');
                const content = otherToggle.nextElementSibling;
                if (content) content.style.maxHeight = null;
            });

            // Toggle current
            if (!isExpanded) {
                toggle.setAttribute('aria-expanded', 'true');
                const content = toggle.nextElementSibling;
                if (content) content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
