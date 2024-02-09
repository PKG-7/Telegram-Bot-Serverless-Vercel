import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { HuggingFaceCaption } from "../functions/ai/hugging-face.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.on("message:photo", logHandle("photo-message"), async (ctx) => {
  const photo = ctx.message.photo.pop();
  if (!photo) {
    return ctx.reply("I couldn't handle this photo, sorry.");
  }
  const file = await ctx.api.getFile(photo.file_id);
  if (!file) {
    return ctx.reply("I couldn't get the photo file, sorry.");
  }
  const filePath = file.file_path;
  const photoUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;

  // Prepare the request payload
  const payload = JSON.stringify({
    inputs: photoUrl,
  });

  const result = await HuggingFaceCaption(payload);
  if (!result) return ctx.reply("Failed to generate caption.");

  return ctx.reply(result[0].generated_text);
});

feature.on("message", logHandle("unhandled-message"), (ctx) => {
  return ctx.reply(ctx.t("unhandled"));
});

feature.on("callback_query", logHandle("unhandled-callback-query"), (ctx) => {
  return ctx.answerCallbackQuery();
});

export { composer as unhandledFeature };
