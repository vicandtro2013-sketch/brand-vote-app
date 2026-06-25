// 保存データ取得（数値化）
let goodCount = Number(localStorage.getItem('goodCount')) || 0;
let ummCount = Number(localStorage.getItem('ummCount')) || 0;
let badCount = Number(localStorage.getItem('badCount')) || 0;

// 連打防止フラグ
let locked = false;

// 初期表示更新（※カウンター表示ない場合でも安全）
updateDisplay();

// =====================
// 投票処理（完全統合版）
// =====================

function vote(type) {

  if (locked) return;

  locked = true;
  setTimeout(() => {
    locked = false;
  }, 3000);

  showEffect(type);

  if (type === 'good') {
    goodCount++;
    localStorage.setItem('goodCount', goodCount);

  } else if (type === 'bad') {
    badCount++;
    localStorage.setItem('badCount', badCount);

  } else if (type === 'umm') {
    ummCount++;
    localStorage.setItem('ummCount', ummCount);
  }
}

// =====================
// 表示更新（無くてもエラー出ないように）
// =====================
function updateDisplay() {
  const goodEl = document.getElementById('goodCount');
  const badEl = document.getElementById('badCount');

  if (goodEl) goodEl.innerText = goodCount;
  if (badEl) badEl.innerText = badCount;
}

// =====================
// CSV出力
// =====================
function downloadCSV() {

  const today = new Date().toISOString().split('T')[0];

  let csv =
`Date,Good,Umm,Bad
${today},${goodCount},${ummCount},${badCount}`;

  const blob = new Blob([csv], { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `vote-${today}.csv`;

  link.click();
}

// =====================
// リセット
// =====================

function resetData() {
  if (confirm("本当にリセットしますか？")) {
    goodCount = 0;
    badCount = 0;
    ummCount = 0;

    localStorage.setItem('goodCount', 0);
    localStorage.setItem('badCount', 0);
    localStorage.setItem('ummCount', 0);

    alert("リセットしました");
  }
}

// =====================
// メニュー開閉
// =====================
function toggleMenu() {
  const menu = document.getElementById("menu");

  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

// =====================
// アニメーション
// =====================
function showEffect(type) {

  const effect = document.getElementById("effect");

  if (!effect) return;

  const icon = document.createElement("div");
  icon.className = "effect-icon";


icon.innerText =
  type === "good" ? "👍" :
  type === "bad" ? "👎" :
  "😐";


  icon.style.left = Math.random() * 80 + "%";
  icon.style.top = Math.random() * 80 + "%";

  effect.appendChild(icon);

  setTimeout(() => {
    icon.remove();
  }, 800);
}