window.NT_addJutsus=function(input){
 var d=document.getElementById("nt-jutsus-db");
 if(!d){
  console.warn("NT DB: no existe #nt-jutsus-db");
  return;
 }

 var added=0;

 function addOne(id,data){
  var e;
  if(!id){return;}
  if(!data){return;}
  if(document.querySelector('.nt-jutsu-entry[data-id="'+id+'"]')){return;}

  e=document.createElement("textarea");
  e.className="nt-jutsu-entry";
  e.setAttribute("data-id",id);
  e.style.display="none";
  e.value=JSON.stringify(data,null,1);
  d.appendChild(e);
  added=added+1;
 }

 if(Array.isArray(input)){
  for(var i=0;i<input.length;i=i+1){
   if(Array.isArray(input[i])){
    addOne(input[i][0],input[i][1]);
   }
  }
 }else{
  if(input){
   if(typeof input==="object"){
    for(var k in input){
     if(Object.prototype.hasOwnProperty.call(input,k)){
      addOne(k,input[k]);
     }
    }
   }
  }
 }

 window.NT_DB_COUNT=(window.NT_DB_COUNT||0)+added;
 console.log("NT DB: añadidas "+added+" técnicas");
};
console.log("NT DB loader v2 cargado");
