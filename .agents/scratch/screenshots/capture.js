const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(res => setTimeout(res, ms));

async function clickNavLink(page, linkText) {
    await page.evaluate((text) => {
        const links = Array.from(document.querySelectorAll('[data-nav-link]'));
        const link = links.find(el => el.innerText.trim() === text);
        if (link) link.click();
    }, linkText);
    await delay(1000);
}

(async () => {
    const outputDir = 'd:/DevWorkspace/Github_Repos/rajathkiran.io/docs/images';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const browser = await puppeteer.launch({ headless: "new", defaultViewport: { width: 1920, height: 1080 } });
    const page = await browser.newPage();

    console.log("Navigating to homepage...");
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
    await delay(2000);

    // 1. Desktop Homepage
    await page.screenshot({ path: path.join(outputDir, 'homepage-desktop.png') });
    console.log("Captured homepage-desktop.png");

    // 2. Sidebar
    const sidebar = await page.$('.sidebar');
    if (sidebar) {
        await sidebar.screenshot({ path: path.join(outputDir, 'sidebar.png') });
        console.log("Captured sidebar.png");
    }

    // 3. Resume
    await clickNavLink(page, "Resume");
    await page.screenshot({ path: path.join(outputDir, 'resume.png') });
    console.log("Captured resume.png");

    // 4. Projects
    await clickNavLink(page, "Projects");
    await page.screenshot({ path: path.join(outputDir, 'projects.png') });
    console.log("Captured projects.png");

    // 9. Project Modal
    await page.evaluate(() => {
        const firstProject = document.querySelector('.project-item');
        if (firstProject) firstProject.click();
    });
    await delay(1000);
    await page.screenshot({ path: path.join(outputDir, 'project-modal.png') });
    console.log("Captured project-modal.png");
    // Close modal
    await page.evaluate(() => {
        const closeBtn = document.querySelector('[data-project-modal-close]');
        if (closeBtn) closeBtn.click();
    });
    await delay(500);

    // 5. Certificates
    await clickNavLink(page, "Blog");
    await page.screenshot({ path: path.join(outputDir, 'certificates.png') });
    console.log("Captured certificates.png");

    // 10. Certificate Viewer
    await page.evaluate(() => {
        const firstCert = document.querySelector('.blog-post-item');
        if (firstCert) firstCert.click();
    });
    await delay(1000);
    await page.screenshot({ path: path.join(outputDir, 'certificate-viewer.png') });
    console.log("Captured certificate-viewer.png");
    // Close modal
    await page.evaluate(() => {
        const closeBtn = document.querySelector('[data-modal-close-btn]');
        if (closeBtn) closeBtn.click();
    });
    await delay(500);

    // 6. Contact
    await clickNavLink(page, "Contact");
    await page.screenshot({ path: path.join(outputDir, 'contact.png') });
    console.log("Captured contact.png");

    // 11. AI Chat
    await clickNavLink(page, "About");
    await page.evaluate(() => {
        const aiDockIcon = document.querySelector('.dock-chat-btn') || document.querySelector('[onclick*="toggleChat"]');
        if (aiDockIcon) aiDockIcon.click();
        else {
           // fallback if we can't find the dock icon by simple selector
           const btns = Array.from(document.querySelectorAll('button'));
           const aiBtn = btns.find(b => b.innerHTML.includes('hardware-chip-outline') || b.id === 'toggle-ai-chat');
           if (aiBtn) aiBtn.click();
        }
    });
    await delay(1500);
    await page.screenshot({ path: path.join(outputDir, 'ai-chat.png') });
    console.log("Captured ai-chat.png");

    // Close chat
    await page.evaluate(() => {
        const closeBtn = document.querySelector('#close-chat');
        if (closeBtn) closeBtn.click();
    });
    await delay(500);

    // 12. Hacker Terminal
    await page.keyboard.type('hacker');
    await delay(2000);
    await page.keyboard.type('whoami\n');
    await delay(2000);
    await page.screenshot({ path: path.join(outputDir, 'hacker-terminal.png') });
    console.log("Captured hacker-terminal.png");

    // Exit terminal
    await page.keyboard.type('exit\n');
    await delay(1000);

    // Mobile Viewports
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await delay(1000);
    await page.screenshot({ path: path.join(outputDir, 'homepage-mobile.png') });
    console.log("Captured homepage-mobile.png");

    // Mobile navigation
    const dock = await page.$('.bottom-nav-list') || await page.$('.navbar');
    if (dock) {
        await dock.screenshot({ path: path.join(outputDir, 'mobile-navigation.png') });
        console.log("Captured mobile-navigation.png");
    }

    // Additional Pages
    await page.setViewport({ width: 1920, height: 1080 });
    try {
        await page.goto('http://localhost:8000/ayudost.html', { waitUntil: 'networkidle0' });
        await delay(1000);
        await page.screenshot({ path: path.join(outputDir, 'cloud-project-ayudost.png') });
        console.log("Captured cloud-project-ayudost.png");
    } catch(e) { console.error("Could not capture Ayudost"); }

    try {
        await page.goto('http://localhost:8000/copd-detection.html', { waitUntil: 'networkidle0' });
        await delay(1000);
        await page.screenshot({ path: path.join(outputDir, 'cloud-project-copd.png') });
        console.log("Captured cloud-project-copd.png");
    } catch(e) { console.error("Could not capture COPD"); }

    await browser.close();
    console.log("All screenshots captured successfully.");
})();
