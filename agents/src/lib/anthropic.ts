import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL = "claude-opus-4-7";

// SDK 0.52.x doesn't type "adaptive" yet — double cast
export const ADAPTIVE_THINKING = { type: "adaptive" } as unknown as Anthropic.ThinkingConfigParam;
