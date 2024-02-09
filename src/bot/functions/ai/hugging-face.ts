// Send the photo to Hugging Face API
export async function HuggingFaceCaption(payload: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      method: "POST",
      body: payload,
    },
  );
  const result = await response.json();
  return result;
}
