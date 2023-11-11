import { Bot, InlineKeyboard } from 'grammy';

//Store bot screaming status
let screaming = true;

//Create a new bot
const bot = new Bot('6745364268:AAHVq3qRJvTSLTiBzkQA-0_NW1tF0ix_2w4');

//This function handles the /scream command
bot.command('scream', () => {
  screaming = true;
});

//This function handles /whisper command
bot.command('whisper', () => {
  screaming = false;
});

//Pre-assign menu text
const firstMenu = '<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.';
const secondMenu = '<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.';

//Pre-assign button text
const nextButton = 'Next';
const backButton = 'Back';
const tutorialButton = 'Tutorial';

//Build keyboards
const firstMenuMarkup = new InlineKeyboard().text(nextButton);

const secondMenuMarkup = new InlineKeyboard()
  .text(backButton, backButton)
  .text(tutorialButton, 'https://core.telegram.org/bots/tutorial');

//This handler sends a menu with the inline buttons we pre-assigned above
bot.command('m', async (ctx) => {
  await ctx.reply(firstMenu, {
    parse_mode: 'HTML',
    reply_markup: firstMenuMarkup,
  });
});

bot.command('n', async (ctx) => {
  await ctx.reply(secondMenu, {
    parse_mode: 'HTML',
    reply_markup: secondMenuMarkup,
  });
});

//This handler processes back button on the menu
bot.callbackQuery(backButton, async (ctx) => {
  console.log('bot.callbackQuery(backButton....');
  //Update message content with corresponding menu section
  await ctx.reply(firstMenu, {
    reply_markup: firstMenuMarkup,
    parse_mode: 'HTML',
  });
});

//This handler processes next button on the menu
bot.callbackQuery(nextButton, async (ctx) => {
  console.log('bot.callbackQuery(nextButton....');
  //Update message content with corresponding menu section
  try {
    await ctx.reply(secondMenu, {
      reply_markup: secondMenuMarkup,
      parse_mode: 'HTML',
    });
  } catch (err) {
    console.log(err);
  }
});

//This function would be added to the dispatcher as a handler for messages coming from the Bot API
bot.on('message', async (ctx) => {
  //Print to console
  console.log(
    `${ctx.from.first_name} wrote ${'text' in ctx.message ? ctx.message.text : ''}`,
    ctx.from,
    '!',
    ctx
  );

  if (screaming && ctx.message.text) {
    console.log('if');
    //Scream the message
    await ctx.reply(ctx.message.text.toUpperCase(), {
      entities: ctx.message.entities,
    });
  } else {
    console.log('else');
    //This is equivalent to forwarding, without the sender's name
    await ctx.copyMessage(ctx.message.chat.id);
  }
});

bot.callbackQuery('click-payload', async (ctx) => {
  console.log('reply!!', ctx.from, ctx.msg?.text);
  await ctx.answerCallbackQuery({
    text: 'You were curious, indeed!',
  });
});

//Start the Bot
bot.start();
