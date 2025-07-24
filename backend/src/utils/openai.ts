import { OpenAI } from 'openai';

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI | null {
    if (!process.env.OPENAI_API_KEY) {
        console.warn('⚠️ OpenAI API key is missing.');
        return null;
    }
    if (!client) {
        client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return client;
}
