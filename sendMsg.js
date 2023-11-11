let tg = {
  token: '6745364268:AAHVq3qRJvTSLTiBzkQA-0_NW1tF0ix_2w4', // Your bot's token that got from @BotFather
  chat_id: '6872379322', // The user's(that you want to send a message) telegram chat id
};

/**
 * By calling this function you can send message to a specific user()
 * @param {String} the text to send
 *
 */
function sendMessage(text) {
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage`; // The url to request

  const obj = {
    chat_id: tg.chat_id, // Telegram chat id
    text: text, // The text to send
  };

  const xht = new XMLHttpRequest();
  xht.open('POST', url, true);
  xht.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xht.send(JSON.stringify(obj));
}

// Now you can send any text(even a form data) by calling sendMessage function.
// For example if you want to send the 'hello', you can call that function like this:

sendMessage('hello');
