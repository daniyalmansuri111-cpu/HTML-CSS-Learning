const appWindow=document.getElementById("appWindow");
const appTitle=document.getElementById("appTitle");
const appContent=document.getElementById("appContent");
const home=document.getElementById("home");
const shade=document.getElementById("shade");
const screen=document.getElementById("screen");
const statusTime=document.getElementById("statusTime");
const shadeTime=document.getElementById("shadeTime");

const apps={
phone:{title:"Phone",html:`<h2>Phone</h2><div class="card"><strong>123 456 7890</strong><p style="opacity:.6">Tap a number to build a call.</p></div><div class="keypad">${["1","2","3","4","5","6","7","8","9","*","0","#"].map(n=>'<button>'+n+'</button>').join("")}</div><div class="card" style="margin-top:14px;text-align:center">☎ Call</div>`},
messages:{title:"Messages",html:`<h2>Messages</h2><div class="messages-list"><div class="card"><div class="avatar">A</div><div><strong>Alex</strong><p>Are we still on for today?</p></div></div><div class="card"><div class="avatar">S</div><div><strong>Sam</strong><p>Looks great! 🔥</p></div></div><div class="card"><div class="avatar">M</div><div><strong>Mom</strong><p>Call me when you are free.</p></div></div></div>`},
internet:{title:"Samsung Internet",html:`<h2>Internet</h2><div class="card"><strong>Search or enter address</strong><p style="margin-top:8px;opacity:.55">https://www.google.com</p></div><div class="card"><strong>Quick access</strong><p style="margin-top:8px">YouTube · GitHub · Gmail</p></div>`},
camera:{title:"Camera",html:`<h2>Camera</h2><div class="camera-view"><button class="shutter" aria-label="Take photo"></button></div>`},
gallery:{title:"Gallery",html:`<h2>Gallery</h2><div class="gallery-grid"><div class="photo"></div><div class="photo"></div><div class="photo"></div><div class="photo"></div></div>`},
settings:{title:"Settings",html:`<h2>Settings</h2><div class="card"><strong>Connections</strong><p>Wi-Fi · Bluetooth · Mobile networks</p></div><div class="card"><strong>Sounds and vibration</strong><p>Volume · Ringtone · Notifications</p></div><div class="card"><strong>Display</strong><p>Brightness · Motion smoothness · Dark mode</p></div><div class="card"><strong>About phone</strong><p>Galaxy S24 · Android interface concept</p></div>`},
calculator:{title:"Calculator",html:`<h2>Calculator</h2><div class="card" id="calcDisplay" style="text-align:right;font-size:30px;min-height:64px">0</div><div class="keypad">${["7","8","9","÷","4","5","6","×","1","2","3","−","C","0",".","+"].map(n=>'<button class="calc-key">'+n+'</button>').join("")}</div>`},
calendar:{title:"Calendar",html:`<h2>September 2026</h2><div class="card"><strong>24 Thu</strong><p style="margin-top:8px">Today · MCA class</p></div><div class="card"><strong>25 Fri</strong><p style="margin-top:8px">Gym · Back & Triceps</p></div><div class="card"><strong>27 Sun</strong><p style="margin-top:8px">Rest day</p></div>`}
};

function openApp(name){
  const app=apps[name];
  if(!app)return;
  appTitle.textContent=app.title;
  appContent.innerHTML=app.html;
  appWindow.classList.add("open");
  home.style.opacity="0";
  home.style.pointerEvents="none";
  shade.classList.remove("open");
  if(name==="calculator")bindCalculator();
}
function closeApp(){
  appWindow.classList.remove("open");
  home.style.opacity="1";
  home.style.pointerEvents="auto";
}
function bindCalculator(){
  let expr="";
  const display=document.getElementById("calcDisplay");
  document.querySelectorAll(".calc-key").forEach(key=>{
    key.addEventListener("click",()=>{
      const value=key.textContent;
      if(value==="C"){expr="";display.textContent="0";return;}
      expr+=value.replace("×","*").replace("÷","/").replace("−","-");
      display.textContent=expr;
    });
  });
}
document.querySelectorAll("[data-app]").forEach(btn=>btn.addEventListener("click",()=>openApp(btn.dataset.app)));
document.getElementById("shadeBtn").addEventListener("click",()=>shade.classList.add("open"));
document.getElementById("closeShade").addEventListener("click",()=>shade.classList.remove("open"));
document.getElementById("backBtn").addEventListener("click",closeApp);
document.getElementById("homeBtn").addEventListener("click",()=>{shade.classList.remove("open");closeApp();});
document.getElementById("recentBtn").addEventListener("click",()=>alert("Recent apps: Phone, Messages, Internet"));
document.getElementById("brightness").addEventListener("input",e=>screen.style.filter=`brightness(${e.target.value/100})`);
document.querySelectorAll(".quick").forEach(q=>q.addEventListener("click",()=>q.classList.toggle("active")));

function updateTime(){
  const d=new Date();
  const t=d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
  statusTime.textContent=t;
  shadeTime.textContent=t;
}
updateTime();
setInterval(updateTime,30000);