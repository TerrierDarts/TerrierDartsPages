
const client = new StreamerbotClient({
  host: '127.0.0.1',
  port: 8080
});


function updateData(t,c,g)
{
 
  document.getElementById("currentGame").innerHTML = c;
  document.getElementById("total").innerHTML = "Total Deaths: "+t;
  document.getElementById("gameboxArt").src = g; 
}





client.on('Raw.SubAction' ,(event) => {
  console.log(event);
  if (!event.data) return;

  const data = JSON.parse(event);
  console.log(data);
  if (!data.event || !data.event.type) return;
  if (data.data.name == "** SHOW DEATHS **") {
  console.log(data.data.arguments.deathTotal);
  console.log(data.data.arguments.deathCount);
  console.log(data.data.arguments.game);
  var t = data.data.arguments.deathTotal;
  var c = data.data.arguments.deathCount;
  var g = data.data.arguments.gameBoxArtUrl;
    updateData(t,c,g)
  }
  
  });