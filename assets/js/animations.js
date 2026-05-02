/**
 * Scroll Animations (P7)
 * Implements native IntersectionObserver for stagger-sequences and state-transitions.
 */

export const initScrollAnimations = (context = document) => {
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

    // 1. Animate Individual Sections and Articles
    const sections = context.querySelectorAll('section, article, .timeline-item.premium-card');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // 2. Animate Lists with Stagger Sequence
    const lists = context.querySelectorAll('.service-list, .testimonials-list, .coding-profiles-list, .project-list, .skills-list, .timeline-list');
    lists.forEach(list => {
        list.classList.add('stagger-sequence');
        observer.observe(list);
    });

    // 3. Special handling for Timeline Line drawing if needed
    initTimelineLineAnimation(context);
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
    }, 50);
};
