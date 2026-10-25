(() => {
'use strict';
const d=window.JC_EPK_DATA;
const $=s=>document.querySelector(s);
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const tr={
 it:{navVideo:'Video',navMusic:'Awakenings',navPress:'Stampa',navRecords:'Discografia',navBio:'Bio',navContact:'Booking',role:'VIBRAFONISTA · COMPOSITORE',listen:'Ascolta qui',watch:'Video',musicTitle:'L’album',albumText:'Dodici composizioni originali tra memoria, Sardegna e trasformazione personale. Un quintetto, tra scrittura e improvvisazione.',spotifyLink:'Apri su Spotify',spotifyPlay:'Ascolta Awakenings',spotifyReveal:'Ascolta su Spotify',soloVideo:'Vibrafono solo',channelLink:'Canale YouTube',lineupTitle:'Formazione e crediti',recordLabel:'Etichetta',vibes:'Vibrafono · Composizioni',piano:'Pianoforte',sax:'Sassofono contralto',bass:'Contrabbasso',drums:'Batteria · Produzione',youtubeLink:'Apri su YouTube ↗',soloLink:'Vibrafono solo ↗',pressTitle:'Stampa',recordsTitle:'Discografia',recordsLabel:'Registrazioni selezionate',bioTitle:'Biografia',bioMore:'Leggi la biografia completa',contactTitle:'Booking e contatti',emailAction:'Scrivi una email',copyright:'',pressRead:'Leggi la recensione',allReviews:'Tutte le recensioni'},
 en:{navVideo:'Videos',navMusic:'Awakenings',navPress:'Press',navRecords:'Discography',navBio:'Bio',navContact:'Booking',role:'VIBRAPHONIST · COMPOSER',listen:'Listen here',watch:'Videos',musicTitle:'The album',albumText:'Twelve original compositions exploring memory, Sardinia and personal transformation. A quintet balancing composition and improvisation.',spotifyLink:'Open in Spotify',spotifyPlay:'Play Awakenings',spotifyReveal:'Listen on Spotify',soloVideo:'Solo vibraphone',channelLink:'YouTube channel',lineupTitle:'Personnel and credits',recordLabel:'Label',vibes:'Vibraphone · Compositions',piano:'Piano',sax:'Alto saxophone',bass:'Double bass',drums:'Drums · Production',youtubeLink:'Watch on YouTube ↗',soloLink:'Solo vibraphone ↗',pressTitle:'Press',recordsTitle:'Discography',recordsLabel:'Selected recordings',bioTitle:'Biography',bioMore:'Read full biography',contactTitle:'Booking & Contact',emailAction:'Send an email',copyright:'',pressRead:'Read the review',allReviews:'All reviews'}
};
function records(){
 $('#recordList').innerHTML=d.albums.map(a=>`<article class="record"><a class="record-cover" href="${escapeHTML(a.spotify)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(a.title)} — Spotify"><img src="assets/${escapeHTML(a.local_cover)}" loading="lazy" alt="${escapeHTML(a.title)} — album cover"></a><h3><a href="${escapeHTML(a.spotify)}" target="_blank" rel="noopener noreferrer">${escapeHTML(a.title)}</a></h3><p>${escapeHTML(a.project)} · ${escapeHTML(a.year)}</p></article>`).join('');
}
function press(){
 const uk=d.press.find(x=>x.name==='UK Vibe');
 const paris=d.press.find(x=>x.name==='Paris-Move');
 const others=d.press.filter(x=>!['UK Vibe','Paris-Move'].includes(x.name));
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
 </div><div class="press-notes">${others.map(item=>`<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.name)}</a>`).join('')}<a href="${allReviewsUrl}" target="_blank" rel="noopener noreferrer">${allReviewsLabel}</a></div>`;
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
 button?.addEventListener('click',()=>{
  const iframe=document.createElement('iframe');
  iframe.title=box.dataset.video==='t7Ljt7eULN0'?'Awakenings — video':'Vibrafono solo — video';
  iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(box.dataset.video)+'?rel=0&autoplay=1';
  iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy='strict-origin-when-cross-origin';
  iframe.allowFullscreen=true;
  box.replaceChildren(iframe);
 });
});

function scrollToSection(target, behavior='smooth'){
 if(!target)return;
 // Scrolling lands at the beginning of the section, not in the preceding one.
 const top = Math.round(target.getBoundingClientRect().top + window.scrollY);
 window.scrollTo({top: Math.max(0,top), behavior});
}

document.querySelectorAll('a[href^="#"]').forEach(link=>{
 link.addEventListener('click',ev=>{
  const href = link.getAttribute('href');
  if(!href || href==='#') return;
  const target = document.querySelector(href);
  if(!target) return;
  ev.preventDefault();
  scrollToSection(target, 'smooth');
  if(history.replaceState) history.replaceState(null, '', href);
  else location.hash = href;
 });
});
if(location.hash){
 const target = document.querySelector(location.hash);
 if(target){
  window.addEventListener('load',()=>scrollToSection(target, 'auto'), {once:true});
 }
}

$('#it').addEventListener('click',()=>lang('it'));
$('#en').addEventListener('click',()=>lang('en'));
let start='it';try{if(localStorage.getItem('jc_epk_language')==='en')start='en'}catch(e){}
lang(start);
})();
