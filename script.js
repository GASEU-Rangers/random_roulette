function addOption() {
  const options = document.getElementById("options");

  const div = document.createElement("div");
  div.className = "option";
  div.innerHTML = `
    이름: <input type="text">
    확률: <input type="number" value="0">
  `;

  options.appendChild(div);
}

function update() {
  alert("확률이 업데이트되었습니다 (실제 계산은 spin에서)");
}

function spin() {
  const optionDivs = document.querySelectorAll(".option");

  let pool = [];

  optionDivs.forEach(div => {
    const name = div.children[0].value;
    const chance = Number(div.children[1].value);

    for (let i = 0; i < chance; i++) {
      pool.push(name);
    }
  });

  const result = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById("result").innerText = "결과: " + result;
}
