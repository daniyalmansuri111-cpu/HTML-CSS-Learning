const furniture = [
  {id:'sofa',name:'Luna Sofa',category:'seating',price:38500,img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',emoji:'🛋️',w:190,h:75},
  {id:'chair',name:'Arc Lounge Chair',category:'seating',price:14500,img:'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=300&q=80',emoji:'🪑',w:90,h:100},
  {id:'table',name:'Oka Coffee Table',category:'tables',price:9800,img:'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=300&q=80',emoji:'◯',w:120,h:58},
  {id:'lamp',name:'Halo Floor Lamp',category:'decor',price:7200,img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80',emoji:'◐',w:48,h:130},
  {id:'plant',name:'Olive Tree',category:'decor',price:4200,img:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80',emoji:'🌿',w:70,h:120},
  {id:'rug',name:'Woven Sand Rug',category:'decor',price:11500,img:'https://images.unsplash.com/photo-1600166898405-da9535204843f?auto=format&fit=crop&w=300&q=80',emoji:'▱',w:180,h:55}
];

const list = document.querySelector('#furnitureList');
const canvas = document.querySelector('#roomCanvas');
const itemCount = document.querySelector('#itemCount');
const budgetTotal = document.querySelector('#budgetTotal');
const budgetBar = document.querySelector('#budgetBar');
const designScore = document.querySelector('#designScore');
const harmony = document.querySelector('#harmony');
const balance = document.querySelector('#balance');
const savedCount = document.querySelector('#savedCount');
const toast = document.querySelector('#toast');
let placed = [];
let activeCategory = 'all';

function money(v){ return `₹${v.toLocaleString('en-IN')}`; }
function showToast(message){ toast.textContent=message; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),1800); }
function saveState(){ localStorage.setItem('roomify-design',JSON.stringify(placed)); }
function loadState(){ try{placed=JSON.parse(localStorage.getItem('roomify-design'))||[]}catch{placed=[]} placed.forEach(renderPlaced); refreshStats(); }

function renderCatalog(){
  list.innerHTML='';
  furniture.filter(x=>activeCategory==='all'||x.category===activeCategory).forEach(item=>{
    const btn=document.createElement('button'); btn.className='furniture-item';
    btn.innerHTML=`<img src="${item.img}" alt="${item.name}"><div><span>${item.name}</span><small>${money(item.price)}</small></div>`;
    btn.addEventListener('click',()=>addItem(item)); list.appendChild(btn);
  });
}

function addItem(item){
  const index=placed.length;
  const entry={...item,uid:`${item.id}-${Date.now()}-${index}`,left:12+(index*8)%62,top:47-(index*6)%30};
  placed.push(entry); renderPlaced(entry); refreshStats(); saveState(); showToast(`${item.name} added to your room`); }

function renderPlaced(item){
  const el=document.createElement('button'); el.className='placed-item'; el.type='button'; el.title=`Remove ${item.name}`;
  el.style.left=item.left+'%'; el.style.top=item.top+'%';
  el.style.width=Math.max(46,item.w/2)+'px'; el.style.height=Math.max(44,item.h/2.2)+'px';
  el.style.background='rgba(255,255,255,.88)'; el.style.border='1px solid rgba(50,40,30,.14)'; el.style.borderRadius='12px';
  el.style.display='grid'; el.style.placeItems='center'; el.style.fontSize=Math.max(20,item.w/5)+'px';
  el.textContent=item.emoji;
  el.addEventListener('click',(e)=>{e.stopPropagation(); placed=placed.filter(p=>p.uid!==item.uid); el.remove(); refreshStats(); saveState(); showToast(`${item.name} removed`)});
  canvas.appendChild(el);
}

function refreshStats(){
  const total=placed.reduce((s,x)=>s+x.price,0);
  itemCount.textContent=`${placed.length} ${placed.length===1?'item':'items'}`;
  budgetTotal.textContent=money(total);
  budgetBar.style.width=Math.min(100,(total/250000)*100)+'%';
  const score=Math.min(98,62+placed.length*6);
  const harm=Math.min(96,78+Math.min(placed.length,3)*3);
  const bal=Math.min(94,64+Math.min(placed.length,5)*5);
  designScore.textContent=score; harmony.textContent=harm+'%'; balance.textContent=bal+'%';
  document.querySelector('#harmonyBar').style.width=harm+'%'; document.querySelector('#balanceBar').style.width=bal+'%';
  savedCount.textContent=localStorage.getItem('roomify-saved')==='1'?'1':'0';
}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeCategory=btn.dataset.category;renderCatalog()}));
document.querySelectorAll('.style-card').forEach(card=>card.addEventListener('click',()=>{
  document.querySelectorAll('.style-card').forEach(c=>c.classList.remove('active')); card.classList.add('active');
  document.querySelector('#roomStyleLabel').textContent=card.dataset.style==='Minimalist'?'Warm Minimal':card.dataset.style;
  showToast(`${card.dataset.style} style selected`);
}));
document.querySelectorAll('.swatch').forEach(sw=>sw.addEventListener('click',()=>{
  document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('active')); sw.classList.add('active');
  document.querySelector('.room-canvas').style.background=`linear-gradient(180deg,${sw.dataset.color} 0 68%,#b69270 68% 100%)`;
  showToast('Palette updated');
}));
document.querySelector('#clearBtn').addEventListener('click',()=>{placed=[];document.querySelectorAll('.placed-item').forEach(e=>e.remove());refreshStats();saveState();showToast('Room cleared')});
document.querySelector('#resetBtn').addEventListener('click',()=>{localStorage.removeItem('roomify-design');localStorage.removeItem('roomify-saved');placed=[];document.querySelectorAll('.placed-item').forEach(e=>e.remove());refreshStats();showToast('Design reset')});
document.querySelector('#undoBtn').addEventListener('click',()=>{const last=placed.pop();if(last){const el=[...document.querySelectorAll('.placed-item')].pop();el?.remove();refreshStats();saveState();showToast('Last item removed')}else showToast('Nothing to undo')});
document.querySelector('#saveBtn').addEventListener('click',()=>{localStorage.setItem('roomify-saved','1');refreshStats();showToast('Design saved locally')});
document.querySelector('#savedTop').addEventListener('click',()=>showToast(localStorage.getItem('roomify-saved')==='1'?'You have 1 saved design':'No saved designs yet'));
renderCatalog(); loadState();