// ===== 무기 데이터 (최종 29개) =====
const WEAPONS = [
  { name: "나무 검", min: 10, max: 20, speed: 0.7 },
  { name: "들 검", min: 12, max: 24, speed: 0.7 },
  { name: "철 검", min: 16, max: 32, speed: 0.8 },
  { name: "왕의 검", min: 20, max: 40, speed: 0.7 },
  { name: "고블린의 분노", min: 20, max: 40, speed: 0.9 },
  { name: "샌드 단검", min: 12.5, max: 25, speed: 0.3 },
  { name: "강철 대검", min: 28, max: 56, speed: 1.0 },
  { name: "맹세의 검", min: 34, max: 68, speed: 0.7 },
  { name: "미라 학살자", min: 29, max: 58, speed: 0.5 },
  { name: "데저트의 전설", min: 46, max: 92, speed: 0.8 },
  { name: "골렘 파괴자", min: 39, max: 78, speed: 0.4 },
  { name: "마그마 대검", min: 57, max: 114, speed: 0.7 },
  { name: "카타나", min: 62, max: 124, speed: 0.6 },
  { name: "냉기의 검", min: 69, max: 138, speed: 0.5 },
  { name: "툰드라의 기회", min: 74, max: 148, speed: 0.7 },
  { name: "일렉트릭 아이서", min: 90, max: 180, speed: 0.9 },
  { name: "선혈도", min: 85, max: 170, speed: 0.6 },
  { name: "여명의 손길", min: 95, max: 190, speed: 0.7 },
  { name: "저주받은 눈", min: 100, max: 200, speed: 0.6 },
  { name: "겨울성의 재보", min: 135, max: 270, speed: 0.8 },
  { name: "저주혈검", min: 165, max: 330, speed: 0.65 },
  { name: "벚꽃도", min: 190, max: 380, speed: 0.7 },
  { name: "급사의 파훼", min: 220, max: 440, speed: 0.7 },
  { name: "프로스트론", min: 260, max: 520, speed: 0.8 },
  { name: "고대 낚싯대", min: 315, max: 630, speed: 0.7 },
  { name: "심연의 파동", min: 345, max: 690, speed: 0.65 },

  { name: "용화도", min: 230, max: 460, speed: 0.6 },
  { name: "심연속의 빛", min: 380, max: 760, speed: 0.65 },
  { name: "심연의 끝", min: 440, max: 880, speed: 0.7 },
  
  { name: "다크 파이어", min: 140, max: 280, speed: 0.7 },
  { name: "천멸추", min: 180, max: 360, speed: 1.2 }
];

// ===== DOM =====
const weaponSelect = document.getElementById("weapon");
const resultEl = document.getElementById("result");
const dpsEl = document.getElementById("dps");

// ===== 드롭다운 =====
WEAPONS.forEach((w, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `${w.name} (${w.min}~${w.max})`;
  weaponSelect.appendChild(opt);
});

// ===== 계산 =====
document.getElementById("calcBtn").addEventListener("click", () => {
  const weapon = WEAPONS[weaponSelect.value];

  const base = (weapon.max) / 1;
  const quality = Number(document.getElementById("quality").value) || 0;
  const enhance = Number(document.getElementById("enhance").value) || 0;
  const stat = Number(document.getElementById("stat").value) || 0;
  const hp = Number(document.getElementById("hp").value) || 0;
  const mana = Number(document.getElementById("mana").value) || 0;

  const bingwan = document.getElementById("bingwan").checked;
  const lifesteal = document.getElementById("lifesteal").checked;
  const scythe = document.getElementById("scythe").checked;

  // ===== 1. 기본 데미지 =====
  let dmg =
    (base / 2) *
    ((quality + 100) / 100) *
    Math.pow(1.07, enhance);

  // ===== 2. 생명포식자 (추가 후 전체 배율 적용됨) =====
  if (lifesteal) {
    dmg += hp * 0.035;
  }

  // ===== 3. 스탯 배율 =====
  dmg *= {(100 + stat) / 100};

  // ===== 4. 마나코어 배율 =====
  let manaMul = 0.25;
  if (bingwan) manaMul += 0.05;
  if (scythe) manaMul += 0.0175;

  dmg + (1+ mana * manaMul);

  // ===== 5. DPS =====
  const dps = dmg / weapon.speed;

  // ===== 출력 =====
  animateNumber(resultEl, dmg);
  animateNumber(dpsEl, dps);
});

// ===== 애니메이션 =====
function animateNumber(el, target) {
  const duration = 400;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = target * progress;

    el.textContent = Math.floor(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
