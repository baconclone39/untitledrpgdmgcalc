// ===== 무기 =====
const WEAPONS = [
  { id:1,name:"나무 검",minDmg:10,maxDmg:20,speed:0.7 },
  { id:2,name:"들 검",minDmg:12,maxDmg:24,speed:0.7 },
  { id:3,name:"철 검",minDmg:16,maxDmg:32,speed:0.8 },
  { id:4,name:"왕의 검",minDmg:20,maxDmg:40,speed:0.7 },
  { id:5,name:"고블린의 분노",minDmg:20,maxDmg:40,speed:0.9 },
  { id:6,name:"샌드 단검",minDmg:12.5,maxDmg:25,speed:0.3 },
  { id:7,name:"강철 대검",minDmg:28,maxDmg:56,speed:1.0 },
  { id:8,name:"맹세의 검",minDmg:34,maxDmg:68,speed:0.7 },
  { id:9,name:"미라 학살자",minDmg:29,maxDmg:58,speed:0.5 },
  { id:10,name:"데저트의 전설",minDmg:46,maxDmg:92,speed:0.8 },
  { id:11,name:"골렘 파괴자",minDmg:39,maxDmg:78,speed:0.4 },
  { id:12,name:"마그마 대검",minDmg:57,maxDmg:114,speed:0.7 },
  { id:13,name:"카타나",minDmg:62,maxDmg:124,speed:0.6 },
  { id:14,name:"냉기의 검",minDmg:69,maxDmg:138,speed:0.5 },
  { id:15,name:"툰드라의 기회",minDmg:74,maxDmg:148,speed:0.7 },
  { id:16,name:"일렉트릭 아이서",minDmg:90,maxDmg:180,speed:0.9 },
  { id:17,name:"선혈도",minDmg:85,maxDmg:170,speed:0.6 },
  { id:18,name:"여명의 손길",minDmg:95,maxDmg:190,speed:0.7 },
  { id:19,name:"저주받은 눈",minDmg:100,maxDmg:200,speed:0.6 },
  { id:20,name:"겨울성의 재보",minDmg:135,maxDmg:270,speed:0.8 },
  { id:21,name:"저주혈검",minDmg:165,maxDmg:330,speed:0.65 },
  { id:22,name:"벚꽃도",minDmg:190,maxDmg:380,speed:0.7 },
  { id:23,name:"급사의 파훼",minDmg:220,maxDmg:440,speed:0.7 },
  { id:24,name:"프로스트론",minDmg:260,maxDmg:520,speed:0.8 },
  { id:25,name:"고대 낚싯대",minDmg:315,maxDmg:630,speed:0.7 },
  { id:26,name:"심연의 파동",minDmg:345,maxDmg:690,speed:0.65 }
];

// DOM
const weaponSelect = document.getElementById("weapon");
const quality = document.getElementById("quality");
const enhance = document.getElementById("enhance");
const stat = document.getElementById("stat");
const hp = document.getElementById("hp");
const mana = document.getElementById("mana");

const bingwan = document.getElementById("bingwan");
const lifesteal = document.getElementById("lifesteal");
const scythe = document.getElementById("scythe");

const resultEl = document.getElementById("result");
const dpsEl = document.getElementById("dps");

// 무기 넣기
WEAPONS.forEach(w=>{
  const opt=document.createElement("option");
  opt.value=w.id;
  opt.textContent=`${w.name} (${w.minDmg}~${w.maxDmg})`;
  weaponSelect.appendChild(opt);
});

// 애니메이션
function animate(el,val){
  let start=0;
  let t0=performance.now();
  function frame(t){
    let p=Math.min((t-t0)/300,1);
    el.textContent=Math.floor(start+(val-start)*p);
    if(p<1)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// 계산
function calc(){
  const w=WEAPONS.find(x=>x.id==weaponSelect.value);

  let base = w.minDmg + (w.maxDmg-w.minDmg)*(quality.value/100);

  let dmg =
    (base/2)*
    ((Number(quality.value)+100)/100)*
    Math.pow(1.07,enhance.value)*
    (stat.value/100);

  if(bingwan.checked) dmg *= 1+(mana.value*0.05);
  if(scythe.checked) dmg *= 1+(mana.value*0.0175);
  if(lifesteal.checked) dmg += hp.value*0.1;

  let dps = dmg / w.speed;

  animate(resultEl,dmg);
  animate(dpsEl,dps);
}

// 이벤트
document.getElementById("calcBtn").onclick=calc;
document.querySelectorAll("input,select").forEach(e=>{
  e.addEventListener("input",calc);
});

calc();