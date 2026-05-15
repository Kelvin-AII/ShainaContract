async function loadTemplate() {
  const res = await fetch("./lease-template.html");
  if (!res.ok) {
    throw new Error("模板加载失败，请确认 lease-template.html 和 index.html 在同一目录");
  }
  return await res.text();
}

function renderTemplate(template, data) {
  return template.replace(/#(.*?)#/g, (_, key) => data[key.trim()] || "");
}

function formatDate(str) {
  const m = String(str || "").match(/(\d{4})\D*(\d{1,2})\D*(\d{1,2})/);
  if (!m) return "";
  return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
}

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
  document.getElementById("idNumber").value = get("证件号码");

  calculate();
}

function addMonths(date, m) {
  if (!date) return "";
  const d = new Date(date);
  d.setMonth(d.getMonth() + m);
  return d.toISOString().slice(0, 10);
}

function addDays(date, d) {
  if (!date) return "";
  const t = new Date(date);
  t.setDate(t.getDate() + d);
  return t.toISOString().slice(0, 10);
}

function getMonthDiff(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s) || isNaN(e) || e <= s) return 0;

  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (e.getDate() > s.getDate()) months += 1;
  return months;
}

function money(value) {
  const n = Number(value || 0);
  if (!n) return "";
  return `HKD ${n.toLocaleString()}`;
}

function calculate() {
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const sign = document.getElementById("signDate").value;
  const rent = Number(document.getElementById("rent").value || 0);

  if (checkin && checkout) {
    document.getElementById("period").value = `${checkin} 至 ${checkout}`;
  }

  if (rent) {
    document.getElementById("deposit").value = rent * 2;
    document.getElementById("p1Rent").value = rent * 3;
    document.getElementById("p2Rent").value = rent * 3;
    document.getElementById("p3Rent").value = rent * 3;
    document.getElementById("p4Rent").value = rent * 3;
  }

  if (sign) {
    document.getElementById("depositDeadline").value = sign;

    let p1 = addDays(sign, -14);
    if (p1 < sign) {
      p1 = addDays(sign, -3);
    }

    document.getElementById("p1Date").value = p1;
    document.getElementById("p2Date").value = addMonths(p1, 3);
    document.getElementById("p3Date").value = addMonths(p1, 6);
    document.getElementById("p4Date").value = addMonths(p1, 9);
  }
}

function setupAutoCalc() {
  ["checkin", "checkout", "signDate", "rent"].forEach(id => {
    document.getElementById(id).addEventListener("input", calculate);
  });

  calculate();
}

window.addEventListener("DOMContentLoaded", setupAutoCalc);

async function generatePDF() {
  try {
    calculate();

    const ids = [
      "address", "checkin", "checkout", "signDate", "rent", "name", "idNumber",
      "period", "deposit", "depositDeadline",
      "p1Date", "p2Date", "p3Date", "p4Date",
      "p1Rent", "p2Rent", "p3Rent", "p4Rent"
    ];

    const form = {};
    ids.forEach(id => {
      form[id] = document.getElementById(id).value || "";
    });

    const totalMonths = getMonthDiff(form.checkin, form.checkout);
    const totalFee = totalMonths * Number(form.rent || 0);

    const data = {
      "居住地址": form.address,
      "入住日期": form.checkin,
      "退房日期": form.checkout,
      "签约日期": form.signDate,
      "每月租金": money(form.rent),
      "姓名": form.name,
      "证件号码": form.idNumber,
      "居住时期": form.period,
      "保证金": money(form.deposit),
      "保证金支付截止日期": form.depositDeadline,
      "第一期截止": form.p1Date,
      "第二期截止": form.p2Date,
      "第三期截止": form.p3Date,
      "第四期截止": form.p4Date,
      "第一期租金": money(form.p1Rent),
      "第二期租金": money(form.p2Rent),
      "第三期租金": money(form.p3Rent),
      "第四期租金": money(form.p4Rent),
      "总居住月份": totalMonths,
      "总许可费用": money(totalFee)
    };

    const template = await loadTemplate();
    const html = renderTemplate(template, data);

    const div = document.createElement("div");
    div.innerHTML = html;
    div.style.width = "794px";
    div.style.minHeight = "1123px";
    div.style.padding = "40px";
    div.style.background = "#ffffff";
    div.style.color = "#000000";
    div.style.fontFamily = "Arial, 'Noto Sans TC', 'Noto Sans SC', sans-serif";
    div.style.fontSize = "14px";
    div.style.lineHeight = "1.65";
    div.style.boxSizing = "border-box";

    document.body.appendChild(div);

    await html2pdf()
      .set({
        margin: 8,
        filename: "许可协议.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff"
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        },
        pagebreak: { mode: ["css", "legacy"] }
      })
      .from(div)
      .save();

    document.body.removeChild(div);
  } catch (err) {
    console.error(err);
    alert("PDF 生成失败：" + err.message);
  }
}
