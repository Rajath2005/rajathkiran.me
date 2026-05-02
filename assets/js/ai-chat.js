/**
 * AI Chat Logic for Ask Rajath
 */

document.addEventListener('DOMContentLoaded', () => {
  const chatBtn = document.getElementById('ai-chat-btn');
  const chatPanel = document.getElementById('ai-chat-panel');
  const closeBtn = document.getElementById('ai-chat-close');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const chatMessages = document.getElementById('ai-chat-messages');

  if (!chatBtn || !chatPanel || !closeBtn || !chatForm || !chatInput || !chatMessages) {
    console.error('One or more AI chat elements not found');
    return;
  }

  // Toggle chat panel
  chatBtn.addEventListener('click', () => {
    chatPanel.classList.toggle('active');
    if (chatPanel.classList.contains('active')) {
      chatInput.focus();
    }
  });

  // Close chat panel
  closeBtn.addEventListener('click', () => {
    chatPanel.classList.remove('active');
  });

  // Handle form submission
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;

    // Append user message
    appendMessage(question, 'user');
    chatInput.value = '';

    // Show typing indicator
    const typingIndicator = showTyping();

    try {
      const response = await fetch('/.netlify/functions/ask-rajath', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      // Remove typing indicator and append bot message
      typingIndicator.remove();
      
      if (data.error) {
        appendMessage("I'm sorry, I'm having a little trouble right now. Please try again later!", 'bot');
      } else {
        appendMessage(data.answer, 'bot');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      typingIndicator.remove();
      appendMessage("Sorry, I'm having trouble connecting to my brain right now. Please try again later!", 'bot');
    }
  });

  function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
  }

  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing';
    typingDiv.textContent = 'Rajath AI is typing...';
    chatMessages.appendChild(typingDiv);
    
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
    
    return typingDiv;
  }
});
