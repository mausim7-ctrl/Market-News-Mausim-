const fallback={
date:"19 August 2026",time:"7:00 AM IST",mood:"Cautious / Mildly Bearish",
summary:"Crude above $90, geopolitical uncertainty and weak global cues pressure sentiment, while institutional buying and strong Indian earnings provide a cushion.",
stats:{nifty:"24,154.90",crude:">$90",usdinr:"≈₹95.68",fii:"Buying"},
drivers:[
["🛢️","Crude remains above $90","Higher crude raises India's import bill and can pressure INR, inflation and fuel-sensitive sectors.","HIGH"],
["🌍","US/global cues remain weak","Higher Treasury yields and weaker global risk appetite can weigh on Indian equities.","HIGH"],
["💰","FII and DII buying","Institutional buying can absorb some selling pressure.","HIGH"],
["🇮🇳","Indian Q1 earnings remain strong","Robust profit growth can provide a fundamental cushion.","HIGH"]],
setup:["24,300+","Recovery / bullish confirmation","24,250–24,300","First resistance","24,100","Key support"],
news:[
["Crude remains above $90","Higher crude keeps import-bill and inflation risks elevated.","Indian equities / INR","Bearish"],
["US/global cues remain weak","Treasury yields and global risk appetite remain important.","IT / Financials / Index","Bearish"],
["FII and DII buying","Institutional flows may cushion intraday selling.","Large caps / Index","Bullish"],
["Indian Q1 earnings remain strong","Earnings resilience supports downside stability.","Banks / Industrials","Bullish"],
["Six-session Nifty decline","A prolonged decline increases the probability of oversold bounces, but confirmation is needed.","Nifty","Neutral"]],
learning:[
["Why does crude affect India?","India imports a large share of its crude requirement. Higher oil can increase the import bill, pressure the rupee and raise inflation expectations."],
["FII vs DII flows","FII selling can pressure the index, while DII buying can absorb part of that supply. Persistence matters more than one day's number."],
["What is a confirmation level?","A price level becomes more useful when price reacts there and the reaction agrees with volume, breadth and broader market context."]],
history:[
["19 Aug 2026","Cautious / Mildly Bearish","Crude above $90; global cues weak; institutional buying offers a cushion."],
["18 Aug 2026","Cautious / Bearish","Global risk appetite and oil remained key pressure points."],
["17 Aug 2026","Cautious","Crude and global cues remained the dominant macro drivers."]]};
async function loadData(){try{let r=await fetch("data/reports.json?"+Date.now());if(!r.ok)throw 0;let j=await r.json();return j.reports?.[0]||j}catch(e){return fallback}}
function render(d){d={...fallback,...d,stats:{...fallback.stats,...(d.stats||{})}};dateLine.textContent=`${d.date} • ${d.time||"Daily pre-open"}`;mood.textContent=d.mood;summary.textContent=d.summary;
nifty.textContent=d.stats.nifty;crude.textContent=d.stats.crude;usdinr.textContent=d.stats.usdinr;fii.textContent=d.stats.fii;
drivers.innerHTML=d.drivers.map(x=>`<article class="driver"><span class="tag">${x[3]}</span><strong>${x[0]} ${x[1]}</strong><p>${x[2]}</p></article>`).join("");
setup.innerHTML=`<div class="effect-card"><b>${d.setup[0]}</b> — ${d.setup[1]}<br><b>${d.setup[2]}</b> — ${d.setup[3]}<br><b>${d.setup[4]}</b> — ${d.setup[5]}</div>`;
newsList.innerHTML=d.news.map(x=>`<article class="news-card"><span class="tag">${x[3]}</span><strong>${x[0]}</strong><p>${x[1]}</p><p><b>Likely effect:</b> ${x[2]}</p></article>`).join("");
effectList.innerHTML=d.news.map(x=>`<article class="effect-card"><strong>${x[0]}</strong><p>${x[1]}</p><div class="impact ${x[3].toLowerCase().includes("bull")?"bull":x[3].toLowerCase().includes("bear")?"bear":"neutral"}">${x[3]} → ${x[2]}</div></article>`).join("");
learningList.innerHTML=d.learning.map(x=>`<article class="learn-card"><strong>💡 ${x[0]}</strong><p>${x[1]}</p></article>`).join("");
historyList.innerHTML=d.history.map(x=>`<article class="history-card"><span class="tag">${x[1]}</span><strong>📅 ${x[0]}</strong><p>${x[2]}</p></article>`).join("")}
function route(){let id=location.hash.slice(1)||"home";document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".bottom-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));scrollTo(0,0)}
addEventListener("hashchange",route);todayBtn.onclick=()=>{location.hash="home";location.reload()};loadData().then(render);route();