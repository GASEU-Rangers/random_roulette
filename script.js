// 선택지 추가
function addOption() {
  const options = document.getElementById("options");

  const div = document.createElement("div");
  div.className = "option";

  div.innerHTML = `
    이름: <input type="text" placeholder="이름">
    확률: <input type="number" value="0" min="0">
  `;

  options.appendChild(div);
}

// 룰렛 돌리기
function spin() {
  const optionDivs = document.querySelectorAll(".option");
  let pool = [];
  let totalPercent = 0;

  optionDivs.forEach(div => {
    const inputs = div.querySelectorAll("input");
    const name = inputs[0].value;
    const chance = Number(inputs[1].value);

    if (name && chance > 0) {
      totalPercent += chance;

      for (let i = 0; i < chance; i++) {
        pool.push(name);
      }
    }
  });

  // 확률이 100% 초과
  if (totalPercent > 100) {
    document.getElementById("result").innerText =
      "정상적이지 않는 퍼센트 값입니다. (사유: 퍼센트 100 초과)";
    return;
  }

    // 확률이 100% 미만
  if (totalPercent < 100) {
    document.getElementById("result").innerText =
      "정상적이지 않는 퍼센트 값입니다. (사유: 퍼센트 100 미만)";
    return;
  }

  // 선택지가 없음
  if (pool.length === 0) {
    document.getElementById("result").innerText =
      "결과: 선택지가 없습니다";
    return;
  }

  // 결과
  const result = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById("result").innerText =
    "결과: " + result;
}
