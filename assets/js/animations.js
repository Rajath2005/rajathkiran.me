/**
 * Scroll Animations (P7)
 * Implements native IntersectionObserver for stagger-sequences and state-transitions.
 */

export const initScrollAnimations = (context = document) => {
    const enableScrollAnimations = window.matchMedia("(min-width: 768px)").matches;
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Optional: remove to allow re-animating when scrolling back up
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // 1. Animate Individual Sections and Articles (Exclude projects section)
    const sections = context.querySelectorAll('section:not(.journey-horizontal-section):not(.projects), .timeline-item.premium-card');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        const parentArticle = section.closest('article');
        if (parentArticle && parentArticle.classList.contains('active')) {
            section.classList.add('is-visible');
            if (!enableScrollAnimations) {
                return;
            }
        }
        if (enableScrollAnimations) {
            observer.observe(section);
        } else {
            section.classList.add('is-visible');
        }
    });

    // Projects section: Always visible on page load (no scroll animation)
    const projectsSection = context.querySelector('section.projects');
    if (projectsSection) {
        projectsSection.classList.add('is-visible');
    }

    // 2. Animate Lists with Stagger Sequence
    const lists = context.querySelectorAll('.service-list, .testimonials-list, .coding-profiles-list, .skills-list, .timeline-list');
    lists.forEach(list => {
        list.classList.add('stagger-sequence');
        if (enableScrollAnimations) {
            observer.observe(list);
        } else {
            list.classList.add('is-visible');
        }
    });

    // 3. Special handling for Timeline Line drawing if needed
    initTimelineLineAnimation(context);

    // 4. Horizontal Journey Storytelling
    initHorizontalJourney(context);
};

export const initHorizontalJourney = (context = document) => {
    // Check if the wrapper exists in the provided context or globally
    const wrapper = document.querySelector('#journey-wrapper');
    const track = document.querySelector('#journey-track');
    const panels = document.querySelectorAll('.journey-panel');

    if (!wrapper || !track) return;

    // Add class to parent article for sticky support (fallback for :has)
    const parentArticle = wrapper.closest('article');
    if (parentArticle) parentArticle.classList.add('has-journey');

    // Robust Full-Width Breakout Alignment
    const alignWrapper = () => {
        const currentWrapper = document.querySelector('#journey-wrapper');
        const currentTrack = document.querySelector('#journey-track');
        const currentPanels = document.querySelectorAll('.journey-panel');
        const mainContent = document.querySelector('.main-content');
        
        if (!currentWrapper || !currentTrack) return;
        
        // Skip if not visible
        if (currentWrapper.offsetParent === null) {
            if (mainContent) mainContent.classList.remove('is-journey-active');
            return;
        }

        // Add class for overflow management
        if (mainContent) mainContent.classList.add('is-journey-active');
        
        const parentWidth = currentWrapper.parentElement.offsetWidth;
        
        // Force panels to match content width
        currentPanels.forEach(panel => {
            panel.style.width = `${parentWidth}px`;
        });

        currentWrapper.style.width = `${parentWidth}px`;
        currentWrapper.style.marginLeft = `0`; // Reset any previous breakout

        // Calculate height based on actual track width
        const horizontalDistance = currentTrack.scrollWidth - parentWidth;
        currentWrapper.style.height = `${horizontalDistance + window.innerHeight}px`;
    };

    // Prepare per-word animation
    const prepareWordAnimation = () => {
        const textElements = document.querySelectorAll('.panel-text');
        textElements.forEach(el => {
            if (el.hasAttribute('data-words-prepared')) return;
            const words = el.textContent.split(' ');
            el.innerHTML = words.map((word, i) => 
                `<span style="transition-delay: ${i * 40}ms">${word}</span>`
            ).join(' ');
            el.setAttribute('data-words-prepared', 'true');
        });
    };

    // Initial alignment with a small delay to ensure layout is ready
    setTimeout(alignWrapper, 100);
    prepareWordAnimation();
    window.addEventListener('resize', alignWrapper);

    // Ensure first panel is active on load
    if (panels.length > 0) panels[0].classList.add('active');

    // Use a named function to allow checking/removing if needed
    if (window._journeyScrollAttached) return;
    window._journeyScrollAttached = true;

    window.addEventListener('scroll', () => {
        const currentWrapper = document.querySelector('#journey-wrapper');
        const currentTrack = document.querySelector('#journey-track');
        const currentPanels = document.querySelectorAll('.journey-panel');

        if (!currentWrapper || !currentTrack) return;

        alignWrapper(); // Re-align on scroll for dynamic layouts

        const rect = currentWrapper.getBoundingClientRect();
        const wrapperTop = rect.top;
        const wrapperHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // If the section is in view (sticky area)
        if (wrapperTop <= 0 && wrapperTop >= -(wrapperHeight - viewportHeight)) {
            let progress = -wrapperTop / (wrapperHeight - viewportHeight);
            progress = Math.max(0, Math.min(1, progress));
            
            // Use the actual container width (rect.width) instead of window.innerWidth
            const totalWidth = currentTrack.scrollWidth - rect.width;
            const translateX = progress * totalWidth;

            currentTrack.style.transform = `translateX(-${translateX}px)`;

            // Switch active panel when it's more than 50% in view
            const activeIndex = Math.round(progress * (currentPanels.length - 1));
            currentPanels.forEach((panel, index) => {
                if (index === activeIndex) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        } else if (wrapperTop > 0) {
            // Before starting
            currentTrack.style.transform = 'translateX(0px)';
            currentPanels.forEach((p, i) => {
                if (i === 0) p.classList.add('active');
                else p.classList.remove('active');
            });
        } else if (wrapperTop < -(wrapperHeight - viewportHeight)) {
            // After finishing
            const totalWidth = currentTrack.scrollWidth - rect.width;
            currentTrack.style.transform = `translateX(-${totalWidth}px)`;
            currentPanels.forEach((p, i) => {
                if (i === currentPanels.length - 1) p.classList.add('active');
                else p.classList.remove('active');
            });
        }
    }, { passive: true });
};

export const initTimelineLineAnimation = (context = document) => {
    const timelineLines = context.querySelectorAll('.timeline-line-fill');
    
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.height = '100%';
            } else {
                entry.target.style.height = '0%';
            }
        });
    }, { threshold: 0.1 });

    timelineLines.forEach(line => {
        line.style.transition = 'height 1.5s ease-in-out';
        lineObserver.observe(line);
    });
};

// Initial Load Animation
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // CRITICAL FIX: Make sure project items are visible on initial load
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.classList.add('is-visible');
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.visibility = 'visible';
    });

    // Sidebar entrance
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.opacity = '0';
        sidebar.style.transform = 'translateX(-50px)';
        sidebar.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            sidebar.style.opacity = '1';
            sidebar.style.transform = 'translateX(0)';
        }, 100);
    }
});

// Function to animate page transition (exported for script.js)
export const animatePageChange = (activePage) => {
    activePage.classList.remove('is-visible');
    setTimeout(() => {
        activePage.classList.add('is-visible');
        initScrollAnimations(activePage);
        
        // CRITICAL FIX FOR NAVBAR REGRESSION:
        // Force immediate visibility on all animating elements inside the newly active page
        // to bypass IntersectionObserver race conditions during display:block transitions.
        const animatedElements = activePage.querySelectorAll('section, .service-list, .testimonials-list, .coding-profiles-list, .skills-list, .timeline-list, .timeline-item');
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });

        // CRITICAL FIX: If this is the projects page, immediately show all project items
        if (activePage.classList.contains('projects')) {
            const projectItems = activePage.querySelectorAll('.project-item');
            projectItems.forEach(item => {
                item.classList.add('is-visible');
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.visibility = 'visible';
            });
            
            const projectList = activePage.querySelector('.project-list');
            if (projectList) {
                projectList.classList.add('is-visible');
                projectList.style.display = 'grid';
                projectList.style.opacity = '1';
                projectList.style.visibility = 'visible';
            }
        }
    }, 50);
};
