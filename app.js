(() => {
'use strict';
const d=window.JC_EPK_DATA;
const $=s=>document.querySelector(s);
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const t={
 it:{navAlbum:'Album',navWatch:'Video',navLive:'Concerti',navPress:'Stampa',navRecords:'Discografia',navAbout:'Biografia',navContact:'Contatti',heroLabel:'VIBRAFONISTA · COMPOSITORE',heroIntro:'Con Awakenings (A.MA Records, 2026) presenta il suo primo album da leader: dodici brani originali tra memoria, trasformazione e improvvisazione collettiva.',heroListen:'Ascolta Awakenings ↗',heroWatch:'Guarda il video ↓',albumTitle:'Il disco',albumIntro:'Un album sulle diverse forme di risveglio che attraversano la vita.',albumText:'Dodici brani originali che attraversano memoria, Sardegna e trasformazione personale, interpretati da un quintetto in cui scrittura e improvvisazione dialogano.',vibes:'Vibrafono, composizioni',piano:'Pianoforte',sax:'Sassofono contralto',bass:'Contrabbasso',drums:'Batteria · Produzione',openSpotify:'Ascolta l’album su Spotify ↗',watchTitle:'Video',videoTitle:'Awakenings — video di presentazione',videoInfo:'Il video di presentazione dell’album.',youtubeWatch:'Apri su YouTube ↗',solo:'Video: vibrafono solo ↗',channel:'Canale YouTube ↗',liveTitle:'Prossimi concerti',pressTitle:'Stampa',recordsTitle:'Discografia',discIntro:'Una selezione di registrazioni realizzate con altri gruppi e musicisti.',aboutTitle:'Biografia',contactTitle:'Booking & contatti',contactInfo:'Per concerti, festival, collaborazioni e richieste stampa.',emailAction:'Scrivi una email ↗',spotify:'Spotify ↗',details:'Dettagli ↗',eventInfo:'Informazioni ↗',noUpcoming:'Nessuna data futura attualmente in programma.',reviewSource:'Leggi la recensione ↗',otherPress:'Altre recensioni',pressArchive:'Altre recensioni sul sito dell’etichetta ↗'},
 en:{navAlbum:'Album',navWatch:'Video',navLive:'Live',navPress:'Press',navRecords:'Discography',navAbout:'Biography',navContact:'Contact',heroLabel:'VIBRAPHONIST · COMPOSER',heroIntro:'With Awakenings (A.MA Records, 2026), he presents his first album as leader: twelve original pieces shaped by memory, transformation and collective improvisation.',heroListen:'Listen to Awakenings ↗',heroWatch:'Watch the video ↓',albumTitle:'The album',albumIntro:'An album about the moments of awakening that shape a life.',albumText:'Twelve original pieces explore memory, Sardinia and personal transformation, performed by a quintet in which composition and improvisation are in constant dialogue.',vibes:'Vibraphone, compositions',piano:'Piano',sax:'Alto saxophone',bass:'Double bass',drums:'Drums · Production',openSpotify:'Listen to the album on Spotify ↗',watchTitle:'Video',videoTitle:'Awakenings — release video',videoInfo:'The official video introducing the album.',youtubeWatch:'Watch on YouTube ↗',solo:'Solo vibraphone video ↗',channel:'YouTube channel ↗',liveTitle:'Upcoming concerts',pressTitle:'Press',recordsTitle:'Discography',discIntro:'Selected recordings with other ensembles and musicians.',aboutTitle:'Biography',contactTitle:'Booking & contact',contactInfo:'For concerts, festivals, collaborations and press enquiries.',emailAction:'Send an email ↗',spotify:'Spotify ↗',details:'Album details ↗',eventInfo:'Event details ↗',noUpcoming:'No upcoming performances currently listed.',reviewSource:'Read original review ↗',otherPress:'Further coverage',pressArchive:'More reviews on the label’s website ↗'}
};
function renderRecords(lang){
 const text=t[lang];
 $('#recordList').innerHTML=d.albums.map(a=>`<article class="record"><img class="record-cover" src="assets/${escapeHTML(a.local_cover)}" alt="${escapeHTML(a.title)} — original album cover" loading="lazy"><div class="record-info"><h3>${escapeHTML(a.title)}</h3><div class="project">${escapeHTML(a.project)}</div><div class="meta">${escapeHTML(a.year)} · ${escapeHTML(a.label)}</div><div class="record-links"><a href="${escapeHTML(a.spotify)}" target="_blank" rel="noopener noreferrer">${text.spotify}</a>${a.url&&a.url!==a.spotify?`<a href="${escapeHTML(a.url)}" target="_blank" rel="noopener noreferrer">${text.details}</a>`:''}</div></div></article>`).join('');
}
function romeDateToday(){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const part=x=>parts.find(p=>p.type===x)?.value;
 return `${part('year')}-${part('month')}-${part('day')}`;
}
function renderEvents(lang){
 const today=romeDateToday();
 const list=d.events.filter(e=>e.date>=today).sort((a,b)=>a.date.localeCompare(b.date));
 $('#eventList').innerHTML=list.length?list.map(e=>{
  const year=+e.date.substring(0,4),month=+e.date.substring(5,7)-1,day=+e.date.substring(8,10);
  const formatted=new Intl.DateTimeFormat(lang==='it'?'it-IT':'en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'Europe/Rome'}).format(new Date(Date.UTC(year,month,day,12)));
  const loc=[e.venue,e.city].filter(Boolean).join(' · ')+(e.time?' · '+e.time:'');
  return `<div class="show"><span class="show-date">${escapeHTML(formatted)}</span><div class="show-title">${escapeHTML(e.project)}</div><div class="show-location">${escapeHTML(loc)}</div>${e.url?`<a href="${escapeHTML(e.url)}" rel="noopener noreferrer" target="_blank">${t[lang].eventInfo}</a>`:''}</div>`;
 }).join(''):`<p class="no-upcoming">${t[lang].noUpcoming}</p>`;
}
function renderPress(lang){
 const items=d.press;
 const quote=items.find(p=>p.kind==='quote');
 const highlights=items.filter(p=>p.kind==='headline'||p.kind==='secondary-quote');
 const others=items.filter(p=>p.kind==='link');
 const q=quote?`<div class="press-lead"><blockquote lang="en">“${escapeHTML(quote.excerpt)}”</blockquote><a class="press-by" href="${escapeHTML(quote.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(quote.name)}${quote.rating?` · ${escapeHTML(quote.rating)}`:''} — ${escapeHTML(quote.author)} ↗</a></div>`:'';
 const h=`<div class="press-secondary">${highlights.map(p=>`<div class="press-mention"><a href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer">${p.kind==='secondary-quote'?`“${escapeHTML(p.excerpt)}”` : escapeHTML(p.excerpt)} ↗</a><small>${escapeHTML(p.name)} · ${escapeHTML(p.author)}</small></div>`).join('')}</div>`;
 const rest=`<div class="press-others">${others.map(p=>`<a href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(p.name)} ↗</a>`).join('')}</div>`;
 $('#pressContent').innerHTML=q+h+rest;
}
function chooseLanguage(lang){
 const tr=t[lang];
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-t]').forEach(el=>{if(Object.hasOwn(tr,el.dataset.t))el.textContent=tr[el.dataset.t]});
 for(const l of ['it','en'])document.getElementById(l).setAttribute('aria-pressed',String(l===lang));
 $('#biography').innerHTML=d.bio[lang].map(p=>`<p>${escapeHTML(p)}</p>`).join('');
 renderEvents(lang);renderRecords(lang);renderPress(lang);
 try{localStorage.setItem('jc_epk_language',lang)}catch(e){}
}
$('#it').addEventListener('click',()=>chooseLanguage('it'));
$('#en').addEventListener('click',()=>chooseLanguage('en'));
let initial='it';try{if(localStorage.getItem('jc_epk_language')==='en')initial='en'}catch(e){}
chooseLanguage(initial);
})();