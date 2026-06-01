window.NT_addJutsus=function(list){
 var d=document.getElementById("nt-jutsus-db");
 if(!d){console.warn("NT DB: no existe #nt-jutsus-db");return}
 list.forEach(function(x){
  if(document.querySelector('.nt-jutsu-entry[data-id="'+x[0]+'"]'))return;
  var e=document.createElement("textarea");
  e.className="nt-jutsu-entry";
  e.dataset.id=x[0];
  e.style.display="none";
  e.value=JSON.stringify(x[1],null,1);
  d.appendChild(e);
 });
 window.NT_DB_COUNT=(window.NT_DB_COUNT||0)+list.length;
 console.log("NT DB: añadidas",list.length,"técnicas");
};