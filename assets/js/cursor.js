export const initCustomCursor = () => {
    // specific cursor element
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    // Style the cursor via JS or ensure CSS is present (doing minimal JS styling here for safety)
    Object.assign(cursor.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        border: '1px solid var(--neon-blue)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        mixBlendMode: 'difference' // Cool effect on different backgrounds
    });

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Magnetic Buttons & Links
    const interactiveElements = document.querySelectorAll('button, a, .content-card, .certificate-item, .project-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(0, 216, 255, 0.1)'; // faint blue
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
};
