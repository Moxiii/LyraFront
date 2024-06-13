const apiKey = "jnzFCjsg2DbZYfQtNOHM6tihOXEkUX2h";
const client = new MistralClient(apiKey);

export default async function generateResponse(content) {
  const chatStreamResponse = await client.chatStream({
    model: "mistral-large",
    messages: [{ role: "user", content: content }],
  });

  console.log("Chat Stream:");
  for await (const chunk of chatStreamResponse) {
    if (chunk.choices[0].delta.content !== undefined) {
      const streamText = chunk.choices[0].delta.content;
      process.stdout.write(streamText);
    }
  }
}
