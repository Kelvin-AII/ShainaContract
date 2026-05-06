async function loadTemplate() {
  const res = await fetch('lease-template.html');
  return await res.text();
}

function renderTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    return data[key.trim()] || "";
  });
}

// 🔥 中文日期 → yyyy-mm-dd
function formatDate(str) {
  if (!str) return "";

  const match = str.match(/(\d{4})\D*(\d{1,2})\D*(\d{1,2})/);
  if (!match) return "";

  const y = match[1];
  const m = match[2].padStart(2, '0');
  const d = match[3].padStart(2, '0');

  return `${y}-${m}-${d}`;
}

// 🔥 核心解析函数
function parseInput() {
  const text = document.getElementById("rawInput").value;

  const getValue = (label) => {
    const regex = new RegExp(label + "[:：]?\\s*([^\\n]+)");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

  document.getElementById("address").value = getValue("居住地址");

  document.getElementById("checkin").value =
    formatDate(getValue("入住日期"));

  document.getElementById("checkout").value =
    formatDate(getValue("退房日期"));

  document.getElementById("signDate").value =
    formatDate(getValue("签约日期"));

  document.getElementById("rent").value =
    getValue("每月租金");

  document.getElementById("name").value =
    getValue("姓名");

  document.getElementById("idNumber").value =
    getValue("证件号|证件号码");
}

// PDF 生成
async function generatePDF() {

  const data = {
    address: document.getElementById("address").value,
    checkin: document.getElementById("checkin").value,
    checkout: document.getElementById("checkout").value,
    signDate: document.getElementById("signDate").value,
    rent: document.getElementById("rent").value,
    name: document.getElementById("name").value,
    idNumber: document.getElementById("idNumber").value
  };

  const template = await loadTemplate();
  const html = renderTemplate(template, data);

  const container = document.createElement("div");
  container.innerHTML = html;

  document.body.appendChild(container);

  html2pdf()
    .from(container)
    .set({
      margin: 15,
      filename: "lease_contract.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4" }
    })
    .save()
    .then(() => {
      document.body.removeChild(container);
    });
}
