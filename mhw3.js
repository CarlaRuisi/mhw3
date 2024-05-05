function menuopen(event){
 const menubox=event.currentTarget;
 const index=menubox.dataset.index;
 const tendina=document.querySelector('#menu-tendina');
 tendina.classList.remove('hidden');
 menuassociato(index,1);
 menubox.removeEventListener('mouveover',menuopen);
 menubox.addEventListener('mouseout',menuclose);
}
function menuclose(event){
    const menubox=event.currentTarget;
    const index=menubox.dataset.index;
    const tendina=document.querySelector('#menu-tendina');
    tendina.classList.add('hidden');
    menuassociato(index,0);
}
function menuassociato(numero,x){
for( let i of indexmenu){
    if(numero===i.dataset.index){
        console.log(i);
        if(x===1){
        i.classList.remove('hidden');
        i.classList.add('blocc');
    }
    else{
        i.classList.add('hidden');
        i.classList.remove('blocc');
    }
   }
 }
}

const menu=document.querySelectorAll("#header_intestazione-items-navigazione a");
for( const menubox of menu){
menubox.addEventListener('mouseover',menuopen);
}
const menutendina=document.querySelectorAll("#menu-tendina ul");
let indexmenu=[]; 
for(let item of menutendina){
    indexmenu.push(item);
}


let scelta=0;
function changeimg(event){
    const image1=event.currentTarget;
    if(scelta===0){
    image1.src='immagini/ok.png';
    scelta=1;
    }
    else
    {
    image1.src='immagini/foto5.png';
    scelta=0;
    }
    
}

const immagine=document.querySelectorAll("#tabella-blocco2-container-contenuto img");
for(let item of immagine){
item.addEventListener('click',changeimg);
}

function addul(event){
    const button=event.currentTarget;
    const ul=document.querySelector('.section-blocco3 ul');
    ul.classList.remove('hidden');
    const bottone=document.createElement('button');
    bottone.textContent="Nascondi";
    bottone.classList.add('colore');
    const contenitore=document.querySelector('.bottone-return');
    contenitore.appendChild(bottone);
    bottone.addEventListener('click',removeaddul);
    button.removeEventListener('click',addul);
}
function removeaddul(event){
    const bottone=event.currentTarget;
    bottone.remove();
    const ul=document.querySelector('.section-blocco3 ul');
    ul.classList.add('hidden');
    bottone.removeEventListener('click',removeaddul);
    const button=document.querySelector('.section-blocco3 button');
    button.addEventListener('click',addul);
}
const button=document.querySelector('.section-blocco3 button');
button.addEventListener('click',addul);

function maggiorinfo(event){
    const freccia=event.currentTarget;
    const index=freccia.dataset.index;
    freccia.classList.add('ruota');
    scoprinfo(index,1);
    freccia.removeEventListener('click',maggiorinfo);
    freccia.addEventListener('click',nascondinfo);
}
function nascondinfo(event){
    const freccia=event.currentTarget;
    const index=freccia.dataset.index;
    console.log(index);
    freccia.classList.remove('ruota');
    scoprinfo(index,0);
    freccia.removeEventListener('click',nascondinfo);
    freccia.addEventListener('click',maggiorinfo);
}
function scoprinfo(numero,x){
   for(let i of vettinfo){
    if(i.dataset.index===numero){
        if(x===1){
        i.classList.remove('hidden');
     }
       if(x===0){
        i.classList.add('hidden');
       }
    }
   }
}
const freccia=document.querySelectorAll(".section-blocco5-container-lista img");
for(let item of freccia){
    item.addEventListener('click',maggiorinfo);
    console.log(item);
}
const info=document.querySelectorAll('#casellainfo');
let vettinfo=[];
for(let i of info){
    vettinfo.push(i);
    console.log(i);
}