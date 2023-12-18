/*ORIGINAL GIF

https://24.media.tumblr.com/tumblr_m6ga5fNjMc1rze8pxo1_500.gif


 ───▄█████▄────────────────────────────────────
 ──███▄██▀─────────────────────────────────────
 ─▐█████────█────█────█────█────█────█────█────
 ──██████▄─────────────────────────────────────
 ───▀█████▀────────────────────────────────────

*/
const client = new StreamerbotClient({ onConnect });

function onConnect() {
  console.log("Connected to Streamer.bot");
}

client.on("Twitch.ChatMessage", async (data) => {
  console.log(data);
  var user = data.data.message.displayName;
  var internal = data.data.message.internal;
  var profileImage =  await addImage(user);
  if(internal)
    {
      return;
    }
  const addUser = document.createElement('div');
  addUser.id = "feed";
  addUser.innerHTML = `<img id="profile" src="${profileImage}"></div>`;
  document.body.appendChild(addUser);
 
  setTimeout(() => {
    document.body.removeChild(addUser);
  }, 15000);

});

client.on("YouTube.Message", async (data) => {
  console.log(data);
  var profileImage =  data.data.user.profileImageUrl;
  const addUser = document.createElement('div');
  addUser.id = "feed";
  addUser.innerHTML = `<img id="profile" src="${profileImage}"></div>`;
  document.body.appendChild(addUser);
 
  setTimeout(() => {
    document.body.removeChild(addUser);
  }, 15000);

});


const userCache = new Map();

async function addImage(user) {
  if (userCache.has(user)) return userCache.get(user);
  var url = 'https://decapi.me/twitch/avatar/' + user;
  let resp = await fetch(url);
  let txt = await resp.text();
  userCache.set(user, txt);
  return txt;
}