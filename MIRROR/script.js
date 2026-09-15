const eras=[
 {year:'1995',title:'The Hand-Coded Web',desc:'Pages were documents first: simple typography, tiled backgrounds and carefully placed links.',genre:'Web 1.0 / Static',signal:'01',tag:'The web is a collection of places.',device:'Desktop CRT',def:'Hyperlinks',vibe:'Experimental'},
 {year:'2001',title:'The Portal Era',desc:'Search, mail, news and chat converge into busy homepages built to keep you online.',genre:'Portal / Directory',signal:'02',tag:'More links. More everything.',device:'Desktop',def:'Portal home',vibe:'Dense'},
 {year:'2005',title:'The Social Web',desc:'Publishing becomes personal. Profiles, comments, feeds and video turn visitors into participants.',genre:'Social / UGC',signal:'03',tag:'Everyone gets a homepage.',device:'Laptop',def:'Profile',vibe:'Personal'},
 {year:'2012',title:'The Mobile Shift',desc:'Responsive layouts and touch-first thinking move the web from desk to pocket.',genre:'Responsive / Mobile',signal:'04',tag:'The screen gets smaller. The web gets closer.',device:'Smartphone',def:'Swipe',vibe:'Immediate'},
 {year:'2018',title:'The Platform Web',desc:'Design systems, feeds and cloud services standardize how millions of people experience software.',genre:'Platform / System',signal:'05',tag:'Interfaces become infrastructure.',device:'Every screen',def:'Feed',vibe:'Polished'},
 {year:'2026',title:'The AI-Native Web',desc:'Interfaces become adaptive, conversational and increasingly generated in real time.',genre:'Generative / Platform',signal:'∞',tag:'The web starts talking back.',device:'Every screen',def:'Adaptive UI',vibe:'Intent-first'}
];
const facts=[
 'The visual rules of a decade often reveal more about available technology than the content itself.',
 'A browser is not only a window into the web; it is a snapshot of what people expected computers to do.',
 'When mobile arrived, the web stopped being a place you visited and became a layer around everyday life.',
 'Modern interfaces hide more complexity than early web pages ever could. Simplicity is often engineered.',
 'The biggest shift is not from ugly to beautiful. It is from pages to systems, then from systems to context.'
];
const $=id=>document.getElementById(id);
const rail=$('timelineRail');
const content=$('browserContent');
function renderRail(){rail.innerHTML=eras.map((e,i)=>`<button class="time-item ${i===5?'active':''}" data-year="${e.year}" role="listitem"><small>${e.year}</small><strong>${e.title}</strong></button>`).join('')}
function renderBrowser(e){
 content.className='browser-content';
 if(e.year==='1995') content.innerHTML=`<div class="retro-window"><div class="retro-title">MIRROR ARCHIVE — WELCOME</div><div class="retro-grid"><div><b>HOME</b><br><br>About<br>Links<br>Guestbook</div><div><div class="retro-home">HELLO, WEB.</div><p>Welcome to my little corner of the internet.</p><p>Best viewed at 800×600.</p></div></div></div>`;
 else if(e.year==='2001') content.innerHTML=`<div class="retro-window"><div class="retro-title">MIRROR PORTAL</div><div class="retro-grid"><div><b>CHANNELS</b><br><br>News<br>Mail<br>Sports<br>Weather</div><div><div class="retro-home">TODAY ONLINE</div><p>Top stories, search, inbox and chat — all in one noisy homepage.</p><hr><small>Welcome back, member.</small></div></div></div>`;
 else if(e.year==='2005') content.innerHTML=`<div class="gradient-card"><span class="mini-pill">● YOUR PROFILE</span><h3>Make the web yours.</h3><p>Post a photo. Share a thought. Leave a comment. The audience is no longer “them.” It is everybody.</p></div>`;
 else if(e.year==='2012') content.innerHTML=`<div class="mobile-phone"><header><span>mirror</span><span>9:41</span></header><div class="mobile-card"><small>DISCOVER</small><h3>Web, in your pocket.</h3><p>Touch, scroll, tap. A layout designed for a thumb instead of a mouse.</p></div></div>`;
 else if(e.year==='2018') content.innerHTML=`<div class="web2-wrap"><h3>One system. Many surfaces.</h3><p>Cards, feeds, components, notifications and design tokens create a coherent product language.</p><div class="web2-links"><span>DESIGN SYSTEM</span><span>FEED</span><span>CLOUD</span><span>APP SHELL</span></div></div>`;
 else content.innerHTML=`<div class="modern-home"><span class="mini-pill">✦ CONTEXT READY</span><h3>Ask the interface.</h3><p>Instead of navigating a maze of pages, describe what you need and let the system assemble the next step.</p><div class="modern-input">Try: “Show me how the web changed between 2005 and 2018.”</div></div>`;
 content.parentElement.className=`browser-window browser-${e.year==='1995'||e.year==='2001'?'retro':e.year==='2005'?'gradient':e.year==='2012'?'mobile':e.year==='2018'?'web2':'modern'}`;
}
function selectEra(year){const e=eras.find(x=>x.year===year)||eras[5];document.body.dataset.era=e.year;$('eraEyebrow').textContent=`ERA ${String(eras.indexOf(e)+1).padStart(2,'0')} / ${e.year}`;$('eraTitle').textContent=e.title;$('eraDescription').textContent=e.desc;$('eraGenre').textContent=e.genre;$('eraSignal').textContent=e.signal;$('eraTagline').textContent=e.tag;$('eraDevice').textContent=e.device;$('eraDefault').textContent=e.def;$('eraVibe').textContent=e.vibe;$('browserYear').textContent=e.year;$('terminalMode').textContent=e.title.toUpperCase();document.querySelectorAll('.time-item').forEach(b=>b.classList.toggle('active',b.dataset.year===e.year));renderBrowser(e)}
renderRail();selectEra('2026');
rail.addEventListener('click',e=>{const b=e.target.closest('.time-item');if(b)selectEra(b.dataset.year)});
$('exploreBtn').addEventListener('click',()=>document.querySelector('#timeline').scrollIntoView({behavior:'smooth'}));
$('randomEraBtn').addEventListener('click',()=>selectEra(eras[Math.floor(Math.random()*eras.length)].year));
$('themeToggle').addEventListener('click',()=>document.body.classList.toggle('soft-mode'));
let fact=0;function nextFact(){fact=(fact+1)%facts.length;$('factIndex').textContent=String(fact+1).padStart(2,'0');$('factText').textContent=facts[fact]}
$('nextFactBtn').addEventListener('click',nextFact);$('shuffleFactBtn').addEventListener('click',()=>{fact=Math.floor(Math.random()*facts.length)-1;nextFact()});
