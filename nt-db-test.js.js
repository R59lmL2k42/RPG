(function(){
var d=document.getElementById("nt-jutsus-db");
if(!d){console.warn("NT DB: no existe #nt-jutsus-db");return}
var t=[
["externa_katon_prueba",{"name":"Katon: Técnica de prueba externa","translation":"","art":"Ninjutsu","type":"Instantánea","rank":"C","icon":"火","color":"#C94A32","cost":"80 Chakra","attrs":"CCH 25","availability":"Libre","clanSchool":"—","damage":"60 base + CCH × 1.5","nature":"Katon (Fuego)","yy":"No","seals":"Sellos estándar","range":"15 metros","area":"Objetivo individual","cooldown":"2 turnos","effects":"Técnica cargada desde archivo externo.","description":"El usuario concentra chakra Katon y lo libera en forma de una llamarada de prueba."}],
["externa_suiton_prueba",{"name":"Suiton: Técnica de prueba externa","translation":"","art":"Ninjutsu","type":"Instantánea","rank":"D","icon":"水","color":"#4DA7C7","cost":"45 Chakra","attrs":"CCH 15","availability":"Libre","clanSchool":"—","damage":"35 base + CCH × 1","nature":"Suiton (Agua)","yy":"No","seals":"Sellos estándar","range":"10 metros","area":"Objetivo individual","cooldown":"1 turno","effects":"Técnica cargada desde archivo externo.","description":"El usuario moldea chakra Suiton y dispara una pequeña corriente de agua."}]
];
t.forEach(function(x){
 if(document.querySelector('.nt-jutsu-entry[data-id="'+x[0]+'"]'))return;
 var e=document.createElement("textarea");
 e.className="nt-jutsu-entry";
 e.dataset.id=x[0];
 e.style.display="none";
 e.value=JSON.stringify(x[1],null,1);
 d.appendChild(e);
});
window.NT_EXTERNAL_TECHNIQUES_LOADED=t.length;
console.log("NT DB externa inyectada:",t.length);
})();
