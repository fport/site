export async function POST() {
  const mockResponses = [
    "Hey! I'm Porti 🍊, Furkan's AI assistant. I'm still learning, but feel free to ask about his work, projects, or just say hi!",
    "Furkan is a frontend developer who loves clean code and exploring new tech. Want to know about his projects? 🍊",
    "I'm currently in training mode! Soon I'll know everything about Furkan's work. For now, check out his writings above! 🍊",
    "Orange you glad you're chatting with me? I'm Porti, here to help! Though I'm still a work in progress. 🍊",
    "Great question! Furkan has worked on some cool stuff - from micro frontends to AI integrations. What interests you most?",
  ];

  const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

  // Simple text streaming
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = response.split(' ');
      for (let i = 0; i < words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        const text = words[i] + (i < words.length - 1 ? ' ' : '');
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
