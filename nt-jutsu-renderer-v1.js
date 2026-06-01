(function(){
 console.log("NT RENDERER EXT: iniciado");

 var NT_RAW={};
 var NT_READY=0;
 var NT_DB_SCRIPTS=[
  "https://cdn.jsdelivr.net/gh/R59lmL2k42/RPG@main/nt-db-hozuki-test-v2.js?v=1"
 ];

 window.NT_addJutsus=function(input){
  var k;
  var added=0;
  if(!input){return;}

  if(Array.isArray(input)){
   for(var i=0;i<input.length;i=i+1){
    if(Array.isArray(input[i])){
     addOne(input[i][0],input[i][1]);
    }
   }
  }else{
   for(k in input){
    if(Object.prototype.hasOwnProperty.call(input,k)){
     addOne(k,input[k]);
    }
   }
  }

  function addOne(id,data){
   if(!id){return;}
   if(!data){return;}
   id=String(id).toLowerCase().trim();
   data.id=id;
   NT_RAW[id]=data;
   added=added+1;
  }

  console.log("NT RENDERER EXT: técnicas recibidas "+added);
 };

 function loadScript(src,callback){
  var s=document.createElement("script");
  s.type="text/javascript";
  s.src=src;
  s.onload=function(){callback();};
  s.onerror=function(){console.error("NT RENDERER EXT: no se pudo cargar "+src);};
  document.head.appendChild(s);
 }

 function loadAllScripts(list,done){
  var i=0;
  function next(){
   if(i>=list.length){done();return;}
   loadScript(list[i],function(){i=i+1;next();});
  }
  next();
 }

 function esc(v){
  var s=String(v==null?"":v);
  s=s.replace(/&/g,"&amp;");
  s=s.replace(/</g,"&lt;");
  s=s.replace(/>/g,"&gt;");
  s=s.replace(/"/g,"&quot;");
  s=s.replace(/'/g,"&#039;");
  return s;
 }

 function colorSoft(hex,alpha){
  if(!hex){return "rgba(176,138,74,"+alpha+")";}
  if(hex.charAt(0)!=="#"){return hex;}
  var r=parseInt(hex.slice(1,3),16);
  var g=parseInt(hex.slice(3,5),16);
  var b=parseInt(hex.slice(5,7),16);
  if(isNaN(r)){return hex;}
  if(isNaN(g)){return hex;}
  if(isNaN(b)){return hex;}
  return "rgba("+r+","+g+","+b+","+alpha+")";
 }

 function makeCard(j,id){
  var color=j.color||"#B8322A";
  var shortcode="[jutsu:"+id+"]";
  var bgStyle="";

  if(j.bg){
   bgStyle=' style="background-image:url(\''+esc(j.bg).replace(/'/g,"%27")+'\')"';
  }

  return ''
  +'<div class="ntf-card" style="--ntf-element-soft:'+colorSoft(color,.42)+';--ntf-element-glow:'+colorSoft(color,.62)+';--ntf-element-glow-strong:'+colorSoft(color,.78)+';--ntf-element-halo:'+colorSoft(color,.35)+';--ntf-element-solid:'+esc(color)+';">'
  +'<div class="ntf-card-bg"'+bgStyle+'></div>'
  +'<div class="ntf-card-inner">'
  +'<div class="ntf-card-icon">'+esc(j.icon||"印")+'</div>'
  +'<div class="ntf-card-title">'
  +'<h2>'+esc(j.name||"Técnica sin nombre")+'</h2>'
  +(j.translation?'<div class="ntf-card-translation">'+esc(j.translation)+'</div>':'')
  +'<div class="ntf-card-sub">'+esc(j.art||"Ninjutsu")+' · '+esc(j.type||"Instantánea")+' · Rango '+esc(j.rank||"?")+'</div>'
  +'<button type="button" class="ntf-copy-code-btn" data-jutsu-code="'+esc(shortcode)+'">'+esc(shortcode)+'</button>'
  +'</div>'
  +'<div class="ntf-card-meta">'
  +'<div class="ntf-card-cell"><span>Coste</span><strong>'+esc(j.cost||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Atributos</span><strong>'+esc(j.attrs||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Disponibilidad</span><strong>'+esc(j.availability||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Clan / Escuela</span><strong>'+esc(j.clanSchool||"—")+'</strong></div>'
  +'<div class="ntf-card-cell ntf-card-damage"><span>Daño</span><strong>'+esc(j.damage||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Naturaleza</span><strong>'+esc(j.nature||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Yin/Yang</span><strong>'+esc(j.yy||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Sellos</span><strong>'+esc(j.seals||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Alcance</span><strong>'+esc(j.range||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Área</span><strong>'+esc(j.area||"—")+'</strong></div>'
  +'<div class="ntf-card-cell"><span>Enfriamiento</span><strong>'+esc(j.cooldown||"—")+'</strong></div>'
  +'</div>'
  +'<div class="ntf-card-block is-collapsible"><h4>Efectos</h4><p class="ntf-card-text">'+esc(j.effects||"Sin efectos adicionales definidos.")+'</p><button type="button" class="ntf-expand-btn">Expandir</button></div>'
  +'<div class="ntf-card-block is-collapsible"><h4>Descripción</h4><p class="ntf-card-text">'+esc(j.description||"Sin descripción.")+'</p><button type="button" class="ntf-expand-btn">Expandir</button></div>'
  +'</div>'
  +'</div>';
 }

 function replaceNode(node){
  var txt=node.nodeValue;
  var html;
  if(!txt){return;}
  if(txt.indexOf("[jutsu:")===-1){return;}

  html=txt.replace(/\[jutsu:([a-z0-9_-]+)\]/gi,function(match,id){
   id=String(id).toLowerCase().trim();
   if(!NT_RAW[id]){
    return '<span class="nt-jutsu-missing">[jutsu no encontrado: '+esc(id)+']</span>';
   }
   return makeCard(NT_RAW[id],id);
  });

  if(html===txt){return;}
  var t=document.createElement("template");
  t.innerHTML=html;
  node.parentNode.replaceChild(t.content,node);
 }

 function scan(){
  var walker;
  var nodes=[];
  var node;
  var i;

  walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
   acceptNode:function(n){
    var p;
    var tag;
    if(!n.nodeValue){return NodeFilter.FILTER_REJECT;}
    if(n.nodeValue.indexOf("[jutsu:")===-1){return NodeFilter.FILTER_REJECT;}
    p=n.parentNode;
    if(!p){return NodeFilter.FILTER_REJECT;}
    tag=p.tagName?p.tagName.toLowerCase():"";
    if(tag==="script"){return NodeFilter.FILTER_REJECT;}
    if(tag==="style"){return NodeFilter.FILTER_REJECT;}
    if(tag==="textarea"){return NodeFilter.FILTER_REJECT;}
    if(tag==="input"){return NodeFilter.FILTER_REJECT;}
    if(p.closest){
     if(p.closest(".ntf-card")){return NodeFilter.FILTER_REJECT;}
    }
    return NodeFilter.FILTER_ACCEPT;
   }
  });

  while((node=walker.nextNode())){
   nodes.push(node);
  }

  console.log("NT RENDERER EXT: shortcodes encontrados "+nodes.length);

  for(i=0;i<nodes.length;i=i+1){
   replaceNode(nodes[i]);
  }
 }

 function bindButtons(){
  document.addEventListener("click",function(ev){
   var btn;
   var block;
   var code;
   var oldText;
   var ta;

   btn=ev.target.closest?ev.target.closest(".ntf-expand-btn"):null;
   if(btn){
    block=btn.closest(".ntf-card-block");
    if(block){
     block.classList.toggle("is-expanded");
     btn.textContent=block.classList.contains("is-expanded")?"Contraer":"Expandir";
    }
    return;
   }

   btn=ev.target.closest?ev.target.closest(".ntf-copy-code-btn"):null;
   if(btn){
    code=btn.getAttribute("data-jutsu-code")||"";
    oldText=btn.textContent;
    ta=document.createElement("textarea");
    ta.value=code;
    ta.style.position="fixed";
    ta.style.left="-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try{document.execCommand("copy");}catch(err){}
    document.body.removeChild(ta);
    btn.textContent="Copiado";
    setTimeout(function(){btn.textContent=oldText;},1200);
   }
  });
 }

 function start(){
  if(NT_READY===1){return;}
  NT_READY=1;
  bindButtons();
  loadAllScripts(NT_DB_SCRIPTS,function(){
   console.log("NT RENDERER EXT: DB cargada",Object.keys(NT_RAW));
   setTimeout(scan,200);
   setTimeout(scan,900);
  });
 }

 if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",start);
 }else{
  start();
 }
})();
