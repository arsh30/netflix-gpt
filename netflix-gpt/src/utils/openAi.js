import OpenAI from "openai";
import { OPENAI_API_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true, // because frontend par use krre hai, bydefault allow nahi krta use ke liye
});

// async function main() {
//   const chatCompletion = await client.chat.completions.create({
//     messages: [{ role: "user", content: "Say this is a test" }],
//     model: "gpt-3.5-turbo",
//   });
// }

// main();

export default openai;
