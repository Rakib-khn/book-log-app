async function getAIResponse(userMessage) {
  const apiKey = 'AIzaSyBgpCNredvw_i2GzdXQy-zrXw9cRonjCPg';
  const endpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  const requestPayload = {
    contents: [
      {
        parts: [
          {
            text: userMessage,
          },
        ],
      },
    ],
  };

  try {
    // Send the request to the Gemini API
    const response = await fetch(
      `${endpoint}?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Gemini API');
    }

    // Parse the response body as JSON
    const data = await response.json();
    console.log('Gemini API response:', data);

    if (
      data &&
      data.candidates &&
      data.candidates.length > 0
    ) {
      if (
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0].text
      ) {
        const aiResponse =
          data.candidates[0].content.parts[0].text.trim();
        return aiResponse;
      } else {
        throw new Error(
          'Text property is missing in the Gemini API response'
        );
      }
    } else {
      throw new Error(
        'No valid candidates in the Gemini API response'
      );
    }
  } catch (error) {
    console.error(
      'Error communicating with Gemini:',
      error
    );
    return "Sorry, I couldn't get a response right now. Try again later!";
  }
}

// Event listener for chatbot input submission
document
  .getElementById('chatbotInput')
  .addEventListener('keydown', async function (event) {
    if (event.key === 'Enter' && this.value.trim() !== '') {
      const userMessage = this.value;
      const chatbotResponse = await getAIResponse(
        userMessage
      );

      const chatbotWindow =
        document.getElementById('chatbotWindow');
      const chatbotResponseDiv = document.getElementById(
        'chatbotResponse'
      );

      // Display the response
      chatbotResponseDiv.innerHTML = `<p><strong>AI:</strong> ${chatbotResponse}</p>`;
      chatbotWindow.scrollTop = chatbotWindow.scrollHeight;
      this.value = '';
    }
  });
document
  .getElementById('chatbotSendButton')
  .addEventListener('click', async function () {
    document
      .getElementById('chatbotInput')
      .dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );
  });

// Toggle chatbot window visibility
document
  .getElementById('chatbotBtn')
  .addEventListener('click', () => {
    const chatbotWindow =
      document.getElementById('chatbotWindow');
    chatbotWindow.style.display =
      chatbotWindow.style.display === 'none'
        ? 'block'
        : 'none';
  });
