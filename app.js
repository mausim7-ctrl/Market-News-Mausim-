const reports=[
{date:"2026-08-19",bias:"Cautious / Mildly Bearish",emoji:"🟡",summary:"Crude above $90, geopolitical uncertainty and weak global cues pressure sentiment, while FII/DII buying and strong Indian earnings provide a cushion.",metrics:[["Nifty","24,154.90"],["Crude",">$90"],["USD/INR","~₹95.68"],["FII + DII","Buying"]],news:[
["🛢️ Crude remains above $90","negative","high","Higher crude raises India's import bill and can pressure INR, inflation and fuel-sensitive sectors.","Aviation • Paints • Chemicals • Tyres • Logistics"],
["🌍 US/global cues remain weak","negative","high","Higher Treasury yields and weaker global risk appetite can weigh on Indian equities.","IT • Financials • Index sentiment"],
["💰 FII and DII buying","positive","high","Institutional buying can absorb some selling pressure.","Banks • Large caps • Broad market"],
["🇮🇳 Indian Q1 earnings remain strong","positive","high","Robust profit growth gives the market a fundamental cushion.","Banks • Autos • Metals • Pharma"],
["📉 Six-session Nifty decline","neutral","high","A prolonged decline increases short-covering potential, but support breaks can accelerate selling.","Nifty • Options"],
["💵 Rupee near ₹95.7/$","negative","medium","Currency weakness raises imported-cost pressure, while exporters may benefit.","IT positive • Importers negative"]],levels:[["24,300+","Recovery / bullish confirmation"],["24,250–24,300","First resistance"],["24,100","Key support"],["24,000","Major psychological support"]],radar:[["🟢 Bullish trigger","24,100 holds + reclaim 24,250–24,300"],["🔴 Bearish trigger","Break 24,100 with crude >$90"],["⚪ Avoid / chop","Choppy action between key levels"],["⚠️ Invalidation","Unexpected oil / geopolitical reversal"]]},
{date:"2026-08-18",bias:"Cautious / Bearish",emoji:"🔴",summary:"Crude above $91 and US-Iran uncertainty increased downside risk; 24,200 was the key support.",metrics:[["Nifty","24,287.65"],["Crude",">$91"],["Geopolitics","Risk ↑"],["FII/DII","Mixed"]],news:[["🛢️ Crude oil above $91","negative","high","Higher crude is a direct macro headwind for India.","Aviation • Paints • Chemicals • Tyres"],["⚠️ US-Iran ceasefire expired","negative","high","Geopolitical uncertainty supported oil and reduced risk appetite.","Broad market"],["📊 24,200 key support","neutral","high","A decisive break could open the 24,100–24,000 zone.","Nifty • Options"],["🏦 Domestic institutions buying","positive","medium","DII demand can cushion foreign selling.","Large caps • Banks"]],levels:[["24,400–24,450","Bullish recovery zone"],["24,300–24,350","Immediate battle"],["24,200","Major support"],["24,000","Next psychological level"]],radar:[["🟢 Bullish trigger","Hold 24,200 + reclaim 24,350"],["🔴 Bearish trigger","Break 24,200 decisively"],["⚪ Avoid / chop","First 15–30 minutes without confirmation"],["⚠️ Invalidation","Rapid crude / geopolitical relief"]]},
{date:"2026-08-17",bias:"Cautious",emoji:"🟡",summary:"Crude near $89 and US-Iran uncertainty were the main risks, while US equities, FPI buying and earnings offered support.",metrics:[["Nifty","24,354.85"],["Crude","~$89"],["FPI","Buying"],["Bias","Cautious"]],news:[["🛢️ Crude near $89","negative","high","Oil remained the dominant macro risk for India.","Aviation • Paints • Chemicals"],["🇺🇸 US equities supportive","positive","medium","Firm US equities helped prevent a deeper risk-off opening.","Large caps • Technology"],["💰 FPI buying improved","positive","high","Foreign buying offered a cushion after earlier selling pressure.","Broad market"],["📈 Indian earnings resilient","positive","medium","Strong revenue and profit growth supported medium-term fundamentals.","Banks • Autos • Metals • Pharma"]],levels:[["24,500+","Bullish control"],["24,400–24,500","Resistance"],["24,300","Key support"],["24,200","Breakdown level"]],radar:[["🟢 Bullish trigger","Reclaim 24,400"],["🔴 Bearish trigger","Break 24,300"],["⚪ Avoid / chop","24,300–24,400"],["⚠️ Invalidation","Oil / geopolitical shock"]]}
];
let current=reports[0], selectedDate=reports[0].date, activeFilter="all", calendarMonth=new Date(2026,7,1);

const $=id=>document.getElementById(id), fmt=s=>new Date(s+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
function go(id){
 document.querySelectorAll(".screen").forEach(x=>x.classList.toggle("active",x.id===id));
 document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.go===id));
 window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));

function setReport(r){
 current=r; selectedDate=r.date;
 $("homeDate").textContent=fmt(r.date); $("homeBias").textContent=r.bias; $("homeEmoji").textContent=r.emoji; $("homeSummary").textContent=r.summary; $("reviewBias").textContent=r.bias;
 $("metrics").innerHTML=r.metrics.map(x=>`<div class="metric"><small>${x[0]}</small><b>${x[1]}</b></div>`).join("");
 $("topNews").innerHTML=r.news.slice(0,3).map(n=>miniNews(n)).join("");
 $("homeSetup").innerHTML=r.levels.slice(0,3).map(x=>`<div class="row"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
 renderNews(); renderEffect(); renderCalendar(); loadNote();
}
function miniNews(n){return `<div class="news" style="margin:8px 0;padding:12px"><div class="news-top"><div class="news-title">${n[0]}</div><span class="badge ${n[1]}">${n[2]==="high"?"HIGH":"WATCH"}</span></div><div class="why">${n[3]}</div></div>`}
function renderNews(){
 const q=$("search").value.toLowerCase(), list=current.news.filter(n=>(!q||n.join(" ").toLowerCase().includes(q))&&(activeFilter==="all"||n[1]===activeFilter||n[2]===activeFilter));
 $("newsList").innerHTML=list.map(n=>`<article class="news"><div class="news-top"><div class="news-title">${n[0]}</div><span class="badge ${n[1]}">${n[1]==="positive"?"🟢":n[1]==="negative"?"🔴":"🟡"} ${n[2]==="high"?"HIGH":"WATCH"}</span></div><div class="why"><b>Why it matters</b><br>${n[3]}</div><div class="effect"><b>Likely market effect:</b> ${n[4]}</div></article>`).join("");
}
function renderEffect(){
 $("effectList").innerHTML=current.news.slice(0,4).map(n=>`<article class="card effect-card"><div class="news-top"><div class="news-title">${n[0]}</div><span class="badge ${n[1]}">${n[2]==="high"?"HIGH IMPACT":"WATCH"}</span></div><div class="flow"><div class="flow-step"><small>NEWS</small><b>${n[3]}</b></div><div class="arrow">↓</div><div class="flow-step"><small>INDIA / SECTORS</small><b>${n[4]}</b></div><div class="arrow">↓</div><div class="flow-step"><small>INDEX VIEW</small><b>${n[1]==="negative"?"Nifty / sentiment: Negative":"Nifty / sentiment: Supportive"}</b></div><div class="arrow">↓</div><div class="flow-step"><small>TIME HORIZON</small><b>${n[2]==="high"?"Intraday + 1–3 days":"Intraday / short term"}</b></div></div></article>`).join("");
}
function renderCalendar(){
 const y=calendarMonth.getFullYear(),m=calendarMonth.getMonth();
 $("monthTitle").textContent=calendarMonth.toLocaleDateString("en-IN",{month:"long",year:"numeric"});
 const first=new Date(y,m,1), days=new Date(y,m+1,0).getDate(), start=(first.getDay()+6)%7;
 let html="";
 for(let i=0;i<start;i++) html+=`<button class="day empty"></button>`;
 for(let d=1;d<=days;d++){
  const key=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,r=reports.find(x=>x.date===key);
  html+=`<button class="day ${key===selectedDate?"selected":""}" data-date="${key}">${d}${r?`<span class="dot">${r.emoji}</span>`:""}</button>`;
 }
 $("calendarGrid").innerHTML=html;
 document.querySelectorAll(".day:not(.empty)").forEach(b=>b.addEventListener("click",()=>{const r=reports.find(x=>x.date===b.dataset.date);if(r){setReport(r);renderSelected(r)}else{$("selectedHint").textContent="No saved edition for "+fmt(b.dataset.date);$("selectedReport").innerHTML="<p>No report saved for this date yet.</p>"}}));
 renderSelected(reports.find(x=>x.date===selectedDate)||current);
}
function renderSelected(r){$("selectedHint").textContent=r?fmt(r.date):"Tap a date above."; $("selectedReport").innerHTML=r?`<div class="selected-report"><b>${r.emoji} ${r.bias}</b><p>${r.summary}</p></div>`:"";}
$("prevMonth").addEventListener("click",()=>{calendarMonth.setMonth(calendarMonth.getMonth()-1);renderCalendar()});
$("nextMonth").addEventListener("click",()=>{calendarMonth.setMonth(calendarMonth.getMonth()+1);renderCalendar()});
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;renderNews()}));
$("search").addEventListener("input",renderNews);
$("todayBtn").addEventListener("click",()=>{setReport(reports[0]);go("home")});
function noteKey(){return"market-news-note-"+selectedDate}
function loadNote(){$("note").value=localStorage.getItem(noteKey())||""}
$("saveNote").addEventListener("click",()=>{localStorage.setItem(noteKey(),$("note").value);$("saved").textContent="Saved ✓";setTimeout(()=>$("saved").textContent="",1600)});
setReport(reports[0]);
