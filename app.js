(() => {
'use strict';
const d=window.JC_EPK_DATA;
const $=s=>document.querySelector(s);
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const tr={
 it:{albumEyebrow:"IL CONCEPT ALBUM · A.MA RECORDS · 2026",albumLead:"Un viaggio attraverso la memoria, la trasformazione interiore e il risveglio.",albumStoryLabel:"LA STORIA DIETRO IL SUONO",albumStoryMinor:"Con il quintetto e la partecipazione dei Tenori di Santu Larettu di Silanus.",albumNarrativeLabel:"UN DISCO, TRE DIMENSIONI",chapterOneTitle:"Le origini",chapterOneBody:"L’infanzia, la Sardegna e il senso di appartenenza. Un paesaggio interiore prima ancora che geografico.",chapterTwoTitle:"Il distacco",chapterTwoBody:"La partenza verso il Continente, i passaggi difficili, i nuovi sguardi su ciò che siamo stati.",chapterThreeTitle:"Il ritorno",chapterThreeBody:"Il canto a tenore e i suoni della campagna sarda: il percorso si chiude lasciando aperto un nuovo risveglio.",albumQuote:"«Per me la vita è un ininterrotto processo di risveglio.»",navVideo:'Video',navMusic:'Awakenings',navPress:'Stampa',navRecords:'Discografia',navBio:'Bio',navContact:'Booking',role:'VIBRAFONISTA · COMPOSITORE',listen:'Ascolta qui',watch:'Video',musicTitle:'L’album',albumText:'Dodici tracce in un flusso narrativo: memoria, distacco, trasformazione. Il jazz contemporaneo incontra i suoni della vita urbana e la voce ancestrale del canto a tenore sardo.',spotifyLink:'Apri su Spotify',spotifyPlay:'Ascolta Awakenings',spotifyReveal:'Ascolta su Spotify',soloVideo:'Vibrafono solo',channelLink:'Canale YouTube',lineupTitle:'Formazione e crediti',recordLabel:'Etichetta',vibes:'Vibrafono · Composizioni',piano:'Pianoforte',sax:'Sassofono contralto',bass:'Contrabbasso',drums:'Batteria · Produzione',youtubeLink:'Apri su YouTube ↗',soloLink:'Vibrafono solo ↗',pressTitle:'Stampa',recordsTitle:'Discografia',recordsLabel:'Registrazioni selezionate',bioTitle:'Biografia',bioMore:'Leggi la biografia completa',contactTitle:'Booking e contatti',emailAction:'Scrivi una email',copyright:'',pressRead:'Leggi la recensione',allReviews:'Tutte le recensioni'},
 en:{albumEyebrow:"THE CONCEPT ALBUM · A.MA RECORDS · 2026",albumLead:"A journey through memory, inner transformation and awakening.",albumStoryLabel:"THE STORY BEHIND THE SOUND",albumStoryMinor:"Featuring the quintet and the Tenori di Santu Larettu from Silanus.",albumNarrativeLabel:"ONE ALBUM, THREE DIMENSIONS",chapterOneTitle:"Origins",chapterOneBody:"Childhood, Sardinia and belonging. An inner landscape as much as a geographical one.",chapterTwoTitle:"Departure",chapterTwoBody:"Leaving Sardinia for the mainland, facing difficult transitions and seeing the past from a new perspective.",chapterThreeTitle:"Return",chapterThreeBody:"Tenore singing and sounds of the Sardinian countryside bring the journey home while opening the way to another awakening.",albumQuote:"“For me, life is an uninterrupted process of awakening.”",navVideo:'Videos',navMusic:'Awakenings',navPress:'Press',navRecords:'Discography',navBio:'Bio',navContact:'Booking',role:'VIBRAPHONIST · COMPOSER',listen:'Listen here',watch:'Videos',musicTitle:'The album',albumText:'Twelve tracks forming a continuous narrative of memory, departure and transformation. Contemporary jazz meets the sounds of urban life and the ancestral voices of Sardinian tenore singing.',spotifyLink:'Open in Spotify',spotifyPlay:'Play Awakenings',spotifyReveal:'Listen on Spotify',soloVideo:'Solo vibraphone',channelLink:'YouTube channel',lineupTitle:'Personnel and credits',recordLabel:'Label',vibes:'Vibraphone · Compositions',piano:'Piano',sax:'Alto saxophone',bass:'Double bass',drums:'Drums · Production',youtubeLink:'Watch on YouTube ↗',soloLink:'Solo vibraphone ↗',pressTitle:'Press',recordsTitle:'Discography',recordsLabel:'Selected recordings',bioTitle:'Biography',bioMore:'Read full biography',contactTitle:'Booking & Contact',emailAction:'Send an email',copyright:'',pressRead:'Read the review',allReviews:'All reviews'}
};
function records(){
 $('#recordList').innerHTML=d.albums.map(a=>`<article class="record"><a class="record-cover" href="${escapeHTML(a.spotify)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(a.title)} — Spotify"><img src="assets/${escapeHTML(a.local_cover)}" loading="lazy" alt="${escapeHTML(a.title)} — album cover"></a><h3><a href="${escapeHTML(a.spotify)}" target="_blank" rel="noopener noreferrer">${escapeHTML(a.title)}</a></h3><p>${escapeHTML(a.project)} · ${escapeHTML(a.year)}</p></article>`).join('');
}
function press(){
 const uk=d.press.find(x=>x.name==='UK Vibe');
 const paris=d.press.find(x=>x.name==='Paris-Move');
 const others=d.press.filter(x=>!['UK Vibe','Paris-Move','Blue in Green Radio'].includes(x.name));
 const langCode=document.documentElement.lang==='en'?'en':'it';
 const allReviewsLabel=tr[langCode].allReviews;
 const allReviewsUrl='https://www.amaedizioni.it/artist?id=55';
 const ukFull='I have listened over and over to this release and, for the sake of balance, went looking for fault. I could not find any. Awakenings is a statement by a band who know one another well, making music that is first and foremost enjoyable to them and to the listener. There is no showboating. It’s marvellous.';
 const quoteDoppio='memoria, migrazione e consapevolezza individuale trovano una corrispondenza nella materia sonora';
 const quoteIndie='ambienti sonori di indiscutibile bellezza';
 const doppioUrl='https://doppiojazz.it/wp/en/2026/09/26/awakenings-di-jordan-corda-il-linguaggio-jazzistico-fra-dimensione-geografica-e-indagine-interiore-a-ma-records-2026/';
 const indieUrl='https://indiepercui.altervista.org/jordan-corda-awakenings-a-ma-records/';
 $('#pressContent').innerHTML=`<div class="press-feature">
 <figure class="press-card press-primary"><blockquote lang="en">“${escapeHTML(ukFull)}”</blockquote><figcaption><a href="${escapeHTML(uk.url)}" target="_blank" rel="noopener noreferrer">UK Vibe <span>· Steve Williams · 5/5</span></a></figcaption></figure>
 <div class="press-aside">
  <figure class="press-card press-secondary"><blockquote lang="en">“${escapeHTML(paris.excerpt)}”</blockquote><figcaption><a href="${escapeHTML(paris.url)}" target="_blank" rel="noopener noreferrer">Paris-Move <span>· Thierry De Clemensat</span></a></figcaption></figure>
  <div class="press-tiles">
   <figure class="press-card press-tertiary"><blockquote lang="it">“${escapeHTML(quoteDoppio)}”</blockquote><figcaption><a href="${escapeHTML(doppioUrl)}" target="_blank" rel="noopener noreferrer">Doppio Jazz <span>· Francesco Cataldo Verrina</span></a></figcaption></figure>
   <figure class="press-card press-accent"><blockquote lang="it">“${escapeHTML(quoteIndie)}”</blockquote><figcaption><a href="${escapeHTML(indieUrl)}" target="_blank" rel="noopener noreferrer">IndiePerCui</a></figcaption></figure>
  </div>
 </div>
 </div><div class="press-more" aria-label="Altre quattro recensioni">
 <figure class="press-card" tabindex="0"><blockquote lang="it">“Il passato, in Awakenings, non è un luogo in cui tornare. È una materia da attraversare.”</blockquote><figcaption><a href="https://www.jazzinfamily.com/jordan-corda-awakenings/" target="_blank" rel="noopener noreferrer">Jazz in Family <span>· Mario Ferraioli</span></a></figcaption></figure>
 <figure class="press-card" tabindex="0"><blockquote lang="it">“Jordan Corda rivive gli episodi più importanti della sua vita in un concept album”</blockquote><figcaption><a href="https://www.jazzconvention.net/?id=1310&amp;option=com_content&amp;view=article" target="_blank" rel="noopener noreferrer">Jazz Convention <span>· Fabio Ciminiera</span></a></figcaption></figure>
 <figure class="press-card" tabindex="0"><blockquote lang="it">“al panorama internazionale del contemporary jazz”</blockquote><figcaption><a href="https://www.online-jazz.net/2026/10/01/i-nostri-cd-le-autumn-leaves-di-amedeo-furfaro-prima-parte/" target="_blank" rel="noopener noreferrer">A Proposito di Jazz <span>· Amedeo Furfaro</span></a></figcaption></figure>
 <figure class="press-card" tabindex="0"><blockquote lang="en">“Fresh writing and linear improvisation.”</blockquote><figcaption><a href="https://www.amaedizioni.it/review?id=541&amp;lang=en" target="_blank" rel="noopener noreferrer">Windout Magazine <span>· Giuseppe Maggioli</span></a></figcaption></figure>
 </div><div class="press-notes">${others.map(item=>`<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.name)}</a>`).join('')}<a href="${allReviewsUrl}" target="_blank" rel="noopener noreferrer">${allReviewsLabel}</a></div>`;
 initPressMotion();
}
let stopPressMotion=null;
function initPressMotion(){
 if(stopPressMotion)stopPressMotion();
 const cards=[...document.querySelectorAll('#press .press-card')];
 const scene=document.querySelector('#press');
 if(!scene||!cards.length)return;
 cards.forEach(c=>{c.tabIndex=0;c.title='Clicca sulla frase per fermare o riprendere il movimento';});
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const mobile=window.matchMedia('(max-width: 760px)');
 let targetX=0,targetY=0,smoothX=0,smoothY=0,phaseTime=0,lastTime=0,speed=1,pointerWeight=1,pinned=false,raf=0;
 const hovered=new Set();
 const offsets=[{ax:23,ay:30,phase:.1},{ax:29,ay:22,phase:2.1},{ax:24,ay:27,phase:4},{ax:26,ay:21,phase:1.3},{ax:26,ay:27,phase:2.9},{ax:21,ay:30,phase:5},{ax:28,ay:25,phase:.8},{ax:24,ay:29,phase:3.6}];
 const onMove=e=>{if(e.pointerType==='touch')return;const r=scene.getBoundingClientRect();targetX=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));targetY=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2));};
 const onLeave=()=>{targetX=0;targetY=0;hovered.clear();};
 scene.addEventListener('pointermove',onMove,{passive:true});scene.addEventListener('pointerleave',onLeave);
 cards.forEach(c=>{
  c.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')hovered.add(c)});
  c.addEventListener('pointerleave',()=>hovered.delete(c));
  c.addEventListener('focusin',()=>hovered.add(c));
  c.addEventListener('focusout',()=>hovered.delete(c));
  c.addEventListener('click',e=>{if(!e.target.closest('a'))pinned=!pinned});
  c.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===c){e.preventDefault();pinned=!pinned}});
 });
 function animate(now){
  const dt=lastTime?Math.min(now-lastTime,40):16.7;lastTime=now;
  if(reduced.matches||mobile.matches){cards.forEach(c=>c.style.transform='none');raf=requestAnimationFrame(animate);return;}
  const alpha=1-Math.exp(-dt/300);
  const slowing=pinned||hovered.size>0;
  speed+=((slowing?0:1)-speed)*(1-Math.exp(-dt/430));
  pointerWeight+=((slowing?.30:1)-pointerWeight)*alpha;
  smoothX+=(targetX-smoothX)*alpha;smoothY+=(targetY-smoothY)*alpha;
  phaseTime+=dt*speed;
  cards.forEach((card,i)=>{const o=offsets[i%offsets.length],a=phaseTime*.00068+o.phase;
   const x=Math.sin(a)*o.ax+smoothX*pointerWeight*(i%2?17:23);
   const y=Math.cos(a*.83)*o.ay+smoothY*pointerWeight*(i%2?16:12);
   card.style.transform='translate3d('+x.toFixed(2)+'px,'+y.toFixed(2)+'px,0)';
  });
  raf=requestAnimationFrame(animate);
 }
 raf=requestAnimationFrame(animate);
 stopPressMotion=()=>{cancelAnimationFrame(raf);scene.removeEventListener('pointermove',onMove);scene.removeEventListener('pointerleave',onLeave);};
}

function lang(code){
 const copy=tr[code];document.documentElement.lang=code;
 document.querySelectorAll('[data-t]').forEach(node=>{const val=copy[node.dataset.t];if(val!==undefined)node.textContent=val});
 $('#bioShort').textContent=d.bio[code][0];
 $('#bioLong').innerHTML=d.bio[code].slice(1).map(p=>`<p>${escapeHTML(p)}</p>`).join('');
 for(const id of ['it','en'])$('#'+id).setAttribute('aria-pressed',id===code?'true':'false');
 press();
 try{localStorage.setItem('jc_epk_language',code)}catch(e){}
}
records();press();
// Spotify album preview is embedded directly and remains playable within the page.
document.querySelectorAll('.video-box').forEach(box=>{
 const button=box.querySelector('button');
 // Use a genuine automatic frame from the actual Awakenings video.
 // Prefer YouTube's 1280x720 video still. If missing, fall back to its other
 // timed stills, not the separate custom collage thumbnail.
 if(button && box.dataset.video==='t7Ljt7eULN0' && box.closest('#music .featured-video-between-intro-and-album')){
  const frames=['maxres1.jpg','sd1.jpg','hq1.jpg'];
  const tryFrame=(index)=>{
   if(index>=frames.length)return;
   const url='https://i.ytimg.com/vi/t7Ljt7eULN0/'+frames[index];
   const probe=new Image();
   const minWidth=index===0?700:index===1?600:400;
   probe.onload=()=>{
    if(probe.naturalWidth>=minWidth){
     button.style.setProperty('--video-thumb','url("'+url+'")');
    }else{
     tryFrame(index+1);
    }
   };
   probe.onerror=()=>tryFrame(index+1);
   probe.src=url;
  };
  tryFrame(0);
 }
 button?.addEventListener('click',()=>{
  const iframe=document.createElement('iframe');
  iframe.title=box.dataset.video==='t7Ljt7eULN0'?'Awakenings — video':'Vibrafono solo — video';
  iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(box.dataset.video)+'?rel=0&autoplay=1';
  iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy='strict-origin-when-cross-origin';
  iframe.allowFullscreen=true;
  box.replaceChildren(iframe);
  // Approved video-only change: position the player beneath the sticky navigation.
  if(box.closest('#music .featured-video-between-intro-and-album')){
   requestAnimationFrame(()=>{
    const header=document.querySelector('.site-head');
    const headerHeight=header?header.getBoundingClientRect().height:0;
    box.style.scrollMarginTop=`${Math.ceil(headerHeight)+12}px`;
    box.scrollIntoView({
     block:'start',
     behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'
    });
   });
  }
 });
});

function scrollToSection(target, behavior='smooth'){
 if(!target)return;
 // Awakenings: la prima riga resta sotto la barra a qualunque zoom.
 // Calcolo a ogni clic, senza assumere un'altezza fissa dell'header.
 if(target.id==='music'){
  const kicker=target.querySelector('.album-kicker');
  const head=document.querySelector('.site-head');
  if(kicker){
   const headerHeight=head ? head.getBoundingClientRect().height : 0;
   const top=Math.round(kicker.getBoundingClientRect().top+window.scrollY-headerHeight-27);
   window.scrollTo({top:Math.max(0,top),behavior});
   return;
  }
 }
 const head=document.querySelector('.site-head');
 const headerHeight=head ? head.getBoundingClientRect().height : 0;
 const pressOffset=target.id==='press'?120:0;
 const top=Math.round(target.getBoundingClientRect().top+window.scrollY-headerHeight-22+pressOffset);
 window.scrollTo({top:Math.max(0,top),behavior});
}

document.querySelectorAll('a[href^="#"]').forEach(link=>{
 link.addEventListener('click',ev=>{
  const href = link.getAttribute('href');
  if(!href || href==='#') return;
  const target = document.querySelector(href);
  if(!target) return;
  ev.preventDefault();
  // Il logo deve tornare all'inizio del documento (barra inclusa), non all'inizio di <main>.
  if(href==='#top') window.scrollTo({top:0, behavior:'smooth'});
  else scrollToSection(target, 'smooth');
  if(history.replaceState) history.replaceState(null, '', href);
  else location.hash = href;
 });
});
if(location.hash){
 const target = document.querySelector(location.hash);
 if(target){
  window.addEventListener('load',()=>{
   if(location.hash==='#top') window.scrollTo({top:0, behavior:'auto'});
   else scrollToSection(target, 'auto');
  }, {once:true});
 }
}


// La barra resta visibile e trasparente sopra la fotografia;
// dalla sezione Awakenings compare il nome e il menu scivola a destra.
(() => {
 const head=document.querySelector('.site-head');
 const hero=document.querySelector('.hero');
 if(!head || !hero) return;
 // Desktop only: keep the existing header appearance, but hide it
 // after 1.5s without scrolling beyond the first section.
 const desktop=window.matchMedia('(min-width:761px)');
 let scheduled=false;
 let hideTimer=null;
 let pastHero=false;
 let lastY=window.scrollY;
 function reveal(){
  head.classList.remove('nav-auto-hidden');
 }
 function cancelHide(){
  if(hideTimer!==null){clearTimeout(hideTimer);hideTimer=null;}
 }
 function scheduleHide(){
  cancelHide();
  if(!desktop.matches||!pastHero)return;
  hideTimer=window.setTimeout(()=>{
   if(!head.matches(':focus-within'))head.classList.add('nav-auto-hidden');
   hideTimer=null;
  },1500);
 }
 function update(){
  scheduled=false;
  const heroBottom=hero.getBoundingClientRect().bottom;
  const headHeight=head.getBoundingClientRect().height;
  const wasPastHero=pastHero;
  pastHero=heroBottom<=headHeight;
  head.classList.toggle('after-hero',pastHero);
  if(!desktop.matches||!pastHero){
   cancelHide();
   reveal();
  }else if(!wasPastHero){
   reveal();
   scheduleHide();
  }
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
 function onScroll(){
  const moved=Math.abs(window.scrollY-lastY)>1;
  lastY=window.scrollY;
  if(desktop.matches&&moved){reveal();scheduleHide();}
  schedule();
 }
 function onTopPointer(e){
  if(desktop.matches&&pastHero&&e.clientY<=28){
   reveal();
   scheduleHide();
  }
 }
 window.addEventListener('scroll',onScroll,{passive:true});
 window.addEventListener('resize',()=>{schedule();lastY=window.scrollY;},{passive:true});
 document.addEventListener('pointermove',onTopPointer,{passive:true});
 head.addEventListener('focusin',()=>{cancelHide();reveal();});
 head.addEventListener('focusout',()=>scheduleHide());
 desktop.addEventListener('change',()=>{schedule();if(!desktop.matches){cancelHide();reveal();}else scheduleHide();});
 schedule();
 requestAnimationFrame(()=>{if(desktop.matches&&pastHero)scheduleHide();});
})();

$('#it').addEventListener('click',()=>lang('it'));
$('#en').addEventListener('click',()=>lang('en'));
let start='it';try{if(localStorage.getItem('jc_epk_language')==='en')start='en'}catch(e){}
lang(start);
})();

/* Approved mobile menu, only initialized for phones; Mac untouched. */
(()=>{
 const header=document.querySelector('.site-head');
 const inner=header?.querySelector('.head-inner');
 const nav=inner?.querySelector('.nav');
 if(!header||!inner||!nav||!window.matchMedia('(max-width:760px)').matches)return;
 const trigger=document.createElement('button');
 trigger.type='button';trigger.className='mobile-menu-trigger';
 trigger.setAttribute('aria-label','Apri menu di navigazione');
 trigger.setAttribute('aria-expanded','false');
 nav.id=nav.id||'jc-mobile-nav';trigger.setAttribute('aria-controls',nav.id);
 trigger.innerHTML='<span class="bar" aria-hidden="true"></span><span class="bar" aria-hidden="true"></span><span class="bar" aria-hidden="true"></span>';
 inner.insertBefore(trigger,nav);
 const setOpen=open=>{header.classList.toggle('mobile-menu-open',open);trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'Chiudi menu di navigazione':'Apri menu di navigazione');};
 trigger.addEventListener('click',()=>setOpen(!header.classList.contains('mobile-menu-open')));
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
 document.addEventListener('pointerdown',e=>{if(!header.contains(e.target))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
})();
