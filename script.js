// 선택지 추가
function addOption() {
  const options = document.getElementById("options");

  const div = document.createElement("div");
  div.className = "option";

  div.innerHTML = `
    이름: <input type="text" placeholder="이름">
    확률: <input type="number" value="0" min="0" step="0.01" required>
  `;

  options.appendChild(div);
}

// 룰렛 돌리기
function spin() {
  const optionDivs = document.querySelectorAll(".option");
  let items = [];
  let total = 0;

  for (let div of optionDivs) {
    const inputs = div.querySelectorAll("input");
    const name = inputs[0].value.trim();
    const raw = inputs[1].value;

    // 공백 / 문자 차단
    if (raw === "") {
      showError("확률에 공백 또는 문자는 사용할 수 없습니다.");
      return;
    }

    const chance = Number(raw);

    // NaN, Infinity, -Infinity 차단
    if (!Number.isFinite(chance)) {
      showError("정상적이지 않은 퍼센트 값입니다.");
      return;
    }

    // 음수 차단
    if (chance < 0) {
      showError("확률은 0 이상이어야 합니다.");
      return;
    }

    // 무명 차단
    if (!name) continue;

    total += chance;
    items.push({ name, chance });
  }

  // 확률 ≠ 100
  if (Math.abs(total - 100) > 0.000001) {
    showError("잘못된 입력값; 확률의 합은 반드시 100이어야 합니다.");
    return;
  }

  // 실수 확률 기반 추첨
  let r = Math.random() * 100;
  let acc = 0;

  for (let item of items) {
    acc += item.chance;
    if (r <= acc) {
      document.getElementById("result").innerText =
        "결과: " + item.name;
      return;
    }
  }
}

// 에러 출력 함수
function showError(message) {
  document.getElementById("result").innerText = message;
}

