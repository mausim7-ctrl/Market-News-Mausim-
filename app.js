const reports = [
  {
    date:"2026-08-19", bias:"Cautious / Mildly Bearish", emoji:"🟡",
    summary:"Crude above $90, geopolitical uncertainty and weak global cues pressure sentiment, while FII/DII buying and strong Indian earnings provide a cushion.",
    metrics:[["Nifty","24,154.90"],["Crude",">$90"],["USD/INR","~₹95.68"],["FII + DII","Buying"]],
    news:[
      ["Crude remains above $90","negative","high","Higher crude raises India's import bill and can pressure INR, inflation and fuel-sensitive sectors.","Aviation, paints, chemicals, tyres, logistics"],
      ["US/global cues remain weak","negative","high","Higher Treasury yields and weaker global risk appetite can weigh on Indian equities.","IT, financials, index sentiment"],
      ["FII and DII buying","positive","high","Both institutional groups recently bought equities, helping absorb selling pressure.","Banks, large caps, broad market"],
      ["Indian Q1 earnings remain strong","positive","high","Nifty 50 profit growth has remained robust, giving the market a fundamental cushion.","Banks, autos, metals, pharma"],
      ["Six-session Nifty decline","neutral","high","A prolonged decline increases the probability of short covering, but a support break can accelerate selling.","Index, options"],
      ["Rupee near ₹95.7/$","negative","medium","Currency weakness can raise imported inflation and input costs, although exporters may benefit.","IT positive; importers negative"]
    ],
    levels:[["24,300+","Recovery / bullish confirmation"],["24,250–24,300","First resistance"],["24,100","Key support"],["24,000","Major psychological support"]],
    radar:[["Bullish trigger","24,100 holds + reclaim 24,250–24,300"],["Bearish trigger","Break 24,100 with crude staying above $90"],["No-trade zone","Choppy action between key levels"],["Invalidation","Unexpected geopolitical/oil reversal"]],
  },
  {
    date:"2026-08-18", bias:"Cautious / Bearish", emoji:"🔴",
    summary:"Crude above $91 and the US-Iran ceasefire expiry increased downside risk; 24,200 was the key support.",
    metrics:[["Nifty","24,287.65"],["Crude",">$91"],["Geopolitics","Risk ↑"],["FII/DII","Mixed"]],
    news:[
      ["Crude oil above $91","negative","high","Higher crude is a direct macro headwind for India.","Aviation, paints, chemicals, tyres"],
      ["US-Iran ceasefire expired","negative","high","Geopolitical uncertainty supported oil prices and reduced risk appetite.","Broad market"],
      ["24,200 key support","neutral","high","A decisive break could open the 24,100–24,000 zone.","Nifty, options"],
      ["Domestic institutions buying","positive","medium","DII demand can cushion foreign selling.","Large caps, banks"]
    ],
    levels:[["24,400–24,450","Bullish recovery zone"],["24,300–24,350","Immediate battle"],["24,200","Major support"],["24,000","Next psychological level"]],
    radar:[["Bullish trigger","Hold 24,200 and reclaim 24,350"],["Bearish trigger","Break 24,200 decisively"],["No-trade zone","First 15–30 minutes without confirmation"],["Invalidation","Rapid crude/geopolitical relief"]],
  },
  {
    date:"2026-08-17", bias:"Cautious", emoji:"🟡",
    summary:"Crude near $89 and US-Iran uncertainty were the main risks, while US equities, FPI buying and earnings offered support.",
    metrics:[["Nifty","24,354.85"],["Crude","~$89"],["FPI","Buying"],["Bias","Cautious"]],
    news:[
      ["Crude near $89","negative","high","Oil remained the dominant macro risk for India.","Aviation, paints, chemicals"],
      ["US equities supportive","positive","medium","Firm US equities helped prevent a deeper risk-off opening.","Large caps, technology"],
      ["FPI buying improved","positive","high","Foreign buying offered a cushion after earlier selling pressure.","Broad market"],
      ["Indian earnings resilient","positive","medium","Strong revenue and profit growth supported medium-term fundamentals.","Banks, autos, metals, pharma"]
    ],
    levels:[["24,500+","Bullish control"],["24,400–24,500","Resistance"],["24,300","Key support"],["24,200","Breakdown level"]],
    radar:[["Bullish trigger","Reclaim 24,400"],["Bearish trigger","Break 24,300"],["No-trade zone","24,300–24,400 chop"],["Invalidation","Oil/geopolitical shock"]]
  }
];

let current = reports[0];

function fmtDate(s){
  return new Date(s+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
}
function render(report){
  current=report;
  document.getElementById("reportDate").textContent=fmtDate(report.date);
  document.getElementById("headline").textContent=report.bias;
  document.querySelector(".score").textContent=report.emoji;
  document.getElementById("summary").textContent=report.summary;
  document.getElementById("metrics").innerHTML=report.metrics.map(x=>`<div class="metric"><div class="label">${x[0]}</div><div class="value">${x[1]}</div></div>`).join("");
  document.getElementById("levels").innerHTML=report.levels.map(x=>`<div class="level-row"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
  document.getElementById("radar").innerHTML=report.radar.map(x=>`<div class="level-row"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
  renderNews();
  loadNote();
}
function renderNews(){
  const q=document.getElementById("search").value.toLowerCase();
  const f=document.getElementById("filter").value;
  const list=current.news.filter(n=>{
    const text=n.join(" ").toLowerCase();
    const matchQ=!q||text.includes(q);
    const matchF=f==="all"||n[1]===f||n[2]===f;
    return matchQ&&matchF;
  });
  document.getElementById("count").textContent=`${list.length} items`;
  document.getElementById("newsList").innerHTML=list.map(n=>`
    <article class="news">
      <div class="news-top"><div class="news-title">${n[0]}</div><span class="badge ${n[1]}">${n[1]==="positive"?"🟢":n[1]==="negative"?"🔴":"🟡"} ${n[2]}</span></div>
      <p>${n[3]}</p><div class="impact"><b>Likely effect:</b> ${n[4]}</div>
    </article>`).join("");
}
function renderHistory(){
  document.getElementById("history").innerHTML=reports.map(r=>`
    <div class="history-row" data-date="${r.date}">
      <div><b>${fmtDate(r.date)}</b><br><small>${r.summary.slice(0,90)}…</small></div>
      <div>${r.emoji} ${r.bias}</div>
    </div>`).join("");
  document.querySelectorAll(".history-row").forEach(row=>row.addEventListener("click",()=>{
    const r=reports.find(x=>x.date===row.dataset.date); if(r) render(r);
    window.scrollTo({top:0,behavior:"smooth"});
  }));
}
function noteKey(){return "market-news-note-"+current.date}
function loadNote(){document.getElementById("note").value=localStorage.getItem(noteKey())||""}
document.getElementById("search").addEventListener("input",renderNews);
document.getElementById("filter").addEventListener("change",renderNews);
document.getElementById("saveNote").addEventListener("click",()=>{
  localStorage.setItem(noteKey(),document.getElementById("note").value);
  document.getElementById("saved").textContent="Saved ✓";
  setTimeout(()=>document.getElementById("saved").textContent="",1800);
});
document.getElementById("todayBtn").addEventListener("click",()=>render(reports[0]));
renderHistory(); render(reports[0]);
