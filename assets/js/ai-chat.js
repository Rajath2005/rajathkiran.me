/**
 * AI Chat Logic — Ask Rajath AI
 * Upgraded: quick-prompt chips, animated typing indicator, chip hide on first message
 */

export function initAIChat() {
  const chatBtn = document.getElementById('ai-chat-btn');
  const chatPanel = document.getElementById('ai-chat-panel');
  const closeBtn = document.getElementById('ai-chat-close');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const chatMessages = document.getElementById('ai-chat-messages');

  if (!chatBtn || !chatPanel || !closeBtn || !chatForm || !chatInput || !chatMessages) {
    console.warn('AI Chat: one or more elements not found, skipping init.');
    return;
  }

  // Initial open since it was just loaded via click
  chatPanel.classList.add('active');
  chatBtn.classList.add('active');
  chatInput.focus();

  // Toggle chat panel open/close for future clicks
  chatBtn.addEventListener('click', () => {
    const isOpen = chatPanel.classList.toggle('active');
    if (isOpen) {
      chatInput.focus();
      chatBtn.classList.add('active');
    } else {
      chatBtn.classList.remove('active');
    }
  });

  closeBtn.addEventListener('click', () => {
    chatPanel.classList.remove('active');
    chatBtn.classList.remove('active');
  });

  // Quick-prompt chips — fill input and submit
  chatMessages.addEventListener('click', (e) => {
    const chip = e.target.closest('.ai-chip');
    if (!chip) return;

    const prompt = chip.getAttribute('data-prompt');
    if (!prompt) return;

    chatInput.value = prompt;
    chatForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  });

  // Main form submission
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;

    // Hide quick-prompt chips after first use
    const quickPrompts = chatMessages.querySelector('.ai-quick-prompts');
    if (quickPrompts) quickPrompts.remove();

    appendMessage(question, 'user');
    chatInput.value = '';
    chatInput.disabled = true;

    const typingIndicator = showTyping();

    try {
      const response = await fetch('/.netlify/functions/ask-rajath', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      typingIndicator.remove();
      chatInput.disabled = false;
      chatInput.focus();

      if (!response.ok) {
        const errorMessage = data.message || data.error || "I'm having trouble connecting right now.";
        appendMessage(`Sorry, ${errorMessage} Please try again later!`, 'bot');
        return;
      }

      if (data.error) {
        appendMessage("I'm sorry, I'm having a little trouble right now. Please try again later!", 'bot');
      } else {
        appendMessage(data.answer, 'bot');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      typingIndicator.remove();
      chatInput.disabled = false;
      appendMessage(
        "Sorry, I'm having trouble connecting right now. Please check your connection or try again later!",
        'bot'
      );
    }
  });

  function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}`;
    
    // Parse basic markdown if it's a bot message
    if (sender === 'bot') {
      let parsedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: var(--neon-blue); text-decoration: underline;">$1</a>')
        .replace(/\n/g, '<br>');
      messageDiv.innerHTML = parsedText;
    } else {
      messageDiv.textContent = text;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
  }

  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    return typingDiv;
  }
}
