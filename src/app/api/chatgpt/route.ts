import { NextRequest, NextResponse } from "next/server";

const { Configuration, OpenAIApi } = require("openai");

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const configuration = new Configuration({
      apiKey: data.apikey,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${data.message}. No explaination and Don't include the question in your response and got only the code as output. Don't seperate html and css please response in once`,
        },
      ],
      max_tokens: 1000,
      n: 1,
      stream: false,
      stop: null,
      temperature: 1,
      top_p: 1,
    });
    const answer =
      response.data.choices[0]?.message?.content || "Sorry I don't know";
    return NextResponse.json({
      message: answer,
    });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.error();
  }
}