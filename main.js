async function loadTemplate() {
  const res = await fetch('lease-template.html');
  return await res.text();
}

function renderTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
}

function formatDate(str) {
  const m = str.match(/(\d{4})\D*(\d{1,2})\D*(\d{1,2})/);
  if (!m) return "";
  return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
}

// 🔥 修复后的解析
function parseInput() {
  const text = document.getElementById("rawInput").value;

  const get = (label) => {
    const r = new RegExp(label + "[:：]?\\s*([^\\n]+)");
    const m = text.match(r);
    return m ? m[1].trim() : "";
  };

  document.getElementById("address").value = get("居住地址");
  document.getElementById("checkin").value = formatDate(get("入住日期"));
  document.getElementById("checkout").value = formatDate(get("退房日期"));
  document.getElementById("signDate").value = formatDate(get("签约日期"));
  document.getElementById("rent").value = get("每月租金");
  document.getElementById("name").value = get("姓名");

  // ✅ 修复点
  document.getElementById("idNumber").value =
    get("(证件号|证件号码|證件號碼)");
}

// 日期工具
function addMonths(date, m) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + m);
  return d.toISOString().slice(0,10);
}

function addDays(date, d) {
  const t = new Date(date);
  t.setDate(t.getDate() + d);
  return t.toISOString().slice(0,10);
}

// 🔥 核心计算
function calculate() {

  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const sign = document.getElementById("signDate").value;
  const rent = Number(document.getElementById("rent").value || 0);

  // 居住时期
  document.getElementById("period").value = `${checkin} 至 ${checkout}`;

  // 保证金
  document.getElementById("deposit").value = rent * 2;

  // 保证金截止
  document.getElementById("depositDeadline").value = sign;

  // 第一期截止（提前14天，如果早于签约，则-3天）
  let p1 = addDays(sign, -14);
  if (p1 < sign) {
    p1 = addDays(sign, -3);
  }

  document.getElementById("p1Date").value = p1;
  document.getElementById("p2Date").value = addMonths(p1, 3);
  document.getElementById("p3Date").value = addMonths(p1, 6);
  document.getElementById("p4Date").value = addMonths(p1, 9);

  // 租金
  document.getElementById("p1Rent").value = rent * 3;
  document.getElementById("p2Rent").value = rent * 3;
  document.getElementById("p3Rent").value = rent * 3;
  document.getElementById("p4Rent").value = rent * 3;
}

async function generatePDF() {

  const ids = [
    "address","checkin","checkout","signDate","rent","name","idNumber",
    "period","deposit","depositDeadline",
    "p1Date","p2Date","p3Date","p4Date",
    "p1Rent","p2Rent","p3Rent","p4Rent"
  ];

  const data = {};
  ids.forEach(id => data[id] = document.getElementById(id).value);

  const template = await loadTemplate();
  const html = renderTemplate(template, data);

  const div = document.createElement("div");
  div.innerHTML = html;
  document.body.appendChild(div);

  html2pdf().from(div).save().then(()=>{
    document.body.removeChild(div);
  });
}
