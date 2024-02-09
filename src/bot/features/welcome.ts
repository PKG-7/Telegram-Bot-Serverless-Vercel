import { Composer, Keyboard } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

const keyboard = new Keyboard()
  .text("🎁 Pencil ")
  .oneTime()
  .requestLocation("Геопозиция")
  .row()
  .requestContact("Ваш номер")
  .requestPoll("Poll")
  .requestUsers("Users", 2)
  .requestChat("chat", 1)
  .row()
  .webApp("asd", "https://ebites.ru/");

feature.command("start", logHandle("command-start"), async (ctx) => {
  // Define the keyboard layout

  // Reply with a message and the keyboard
  await ctx.reply(ctx.t("welcome"), {
    reply_markup: keyboard,
  });
});

export { composer as welcomeFeature };
