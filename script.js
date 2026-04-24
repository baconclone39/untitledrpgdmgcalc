// =========================
// 🔥 무기 데이터 (26개)
// =========================
const WEAPONS = [
  { id: 1,  name: "나무 검",        minDmg: 10,   maxDmg: 20,  speed: 0.7  },
  { id: 2,  name: "들 검",          minDmg: 12,   maxDmg: 24,  speed: 0.7  },
  { id: 3,  name: "철 검",          minDmg: 16,   maxDmg: 32,  speed: 0.8  },
  { id: 4,  name: "왕의 검",        minDmg: 20,   maxDmg: 40,  speed: 0.7  },
  { id: 5,  name: "고블린의 분노",  minDmg: 20,   maxDmg: 40,  speed: 0.9  },
  { id: 6,  name: "샌드 단검",      minDmg: 12.5, maxDmg: 25,  speed: 0.3  },
  { id: 7,  name: "강철 대검",      minDmg: 28,   maxDmg: 56,  speed: 1.0  },
  { id: 8,  name: "맹세의 검",      minDmg: 34,   maxDmg: 68,  speed: 0.7  },
  { id: 9,  name: "미라 학살자",    minDmg: 29,   maxDmg: 58,  speed: 0.5  },
  { id: 10, name: "데저트의 전설",  minDmg: 46,   maxDmg: 92,  speed: 0.8  },
  { id: 11, name: "골렘 파괴자",    minDmg: 39,   maxDmg: 78,  speed: 0.4  },
  { id: 12, name: "마그마 대검",    minDmg: 57,   maxDmg: 114, speed: 0.7  },
  { id: 13, name: "카타나",         minDmg: 62,   maxDmg: 124, speed: 0.6  },
  { id: 14, name: "냉기의 검",      minDmg: 69,   maxDmg: 138, speed: 0.5  },
  { id: 15, name: "툰드라의 기회",  minDmg: 74,   maxDmg: 148, speed: 0.7  },
  { id: 16, name: "일렉트릭 아이서",minDmg: 90,   maxDmg: 180, speed: 0.9  },
  { id: 17, name: "선혈도",         minDmg: 85,   maxDmg: 170, speed: 0.6  },
  { id: 18, name: "여명의 손길",    minDmg: 95,   maxDmg: 190, speed: 0.7  },
  { id: 19, name: "저주받은 눈",    minDmg: 100,  maxDmg: 200, speed: 0.6  },
  { id: 20, name: "겨울성의 재보",  minDmg: 135,  maxDmg: 270, speed: 0.8  },
  { id: 21, name: "저주혈검",       minDmg: 165,  maxDmg: 330, speed: 0.65 },
  { id: 22, name: "벚꽃도",         minDmg: 190,  maxDmg: 380, speed: 0.7  },
  { id: 23, name: "급사의 파훼",    minDmg: 220,  maxDmg: 440, speed: 0.7  },
  { id: 24, name: "프로스트론",     minDmg: 260,  maxDmg: 520, speed: 0.8  },
  { id: 25, name: "고대 낚싯대",    minDmg: 315,  maxDmg: 630, speed: 0.7  },
  { id: 26, name: "심연의 파동",    minDmg: 345,  maxDmg: 690, speed: 0.65 }
];

// =========================
// 🔥 DOM
// =========================
const weaponSelect = document.getElementById("weapon");
const qualityInput = document.getElementById("quality");
const enhanceInput = document.getElementById("enhance");
const resultBox = document.getElementById("result");
const dpsBox = document.getElementById("dps");

// =========================
// 🔥 무기 선택 채우기
// =========================
WEAPONS.forEach(w => {
  const opt = document.createElement("option");
  opt.value = w.id;
  opt.textContent = w.name;
  weaponSelect.appendChild(opt);
});

// =========================
// 🔥 기본 데미지 계산 (품질 반영)
// =========================
function getBaseDamage(min, max, quality) {
  return min + (max - min) * (quality / 100);
}

// =========================
// 🔥 최종 데미지 공식
// (base ÷ 2) × ((quality+100)/100) × 1.07^강화
// =========================
function calculateDamage(base, quality, enhance) {
  return (base / 2) * ((quality + 100) / 100) * Math.pow(1.07, enhance);
}

// =========================
// 🔥 DPS
// =========================
function calculateDPS(dmg, speed) {
  return dmg / speed;
}

// =========================
// 🔥 애니메이션 (숫자 올라가는 효과)
// =========================
function animateValue(element, start, end, duration = 300) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = start + (end - start) * progress;

    element.textContent = value.toFixed(2);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// =========================
// 🔥 메인 계산 함수
// =========================
function update() {
  const weaponId = Number(weaponSelect.value);
  const quality = Number(qualityInput.value);
  const enhance = Number(enhanceInput.value);

  const weapon = WEAPONS.find(w => w.id === weaponId);
  if (!weapon) return;

  const base = getBaseDamage(weapon.minDmg, weapon.maxDmg, quality);
  const finalDmg = calculateDamage(base, quality, enhance);
  const dps = calculateDPS(finalDmg, weapon.speed);

  // 애니메이션 적용
  animateValue(resultBox, Number(resultBox.textContent) || 0, finalDmg);
  animateValue(dpsBox, Number(dpsBox.textContent) || 0, dps);
}

// =========================
// 🔥 이벤트
// =========================
weaponSelect.addEventListener("change", update);
qualityInput.addEventListener("input", update);
enhanceInput.addEventListener("input", update);

// 초기 실행
update();