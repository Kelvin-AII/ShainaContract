(function () {
  "use strict";

  const FIELD_IDS = [
    "address",
    "checkin",
    "checkout",
    "signDate",
    "rent",
    "name",
    "idNumber",
    "period",
    "deposit",
    "depositDeadline",
    "p1Date",
    "p2Date",
    "p3Date",
    "p4Date",
    "p1Rent",
    "p2Rent",
    "p3Rent",
    "p4Rent"
  ];

  function $(id) {
    return document.getElementById(id);
  }

  function getValue(id) {
    const el = $(id);
    return el ? String(el.value || "").trim() : "";
  }

  function setValue(id, value) {
    const el = $(id);
    if (el) el.value = value == null ? "" : String(value);
  }

  function normalizeNumber(value) {
    if (value == null) return 0;
    const text = String(value).replace(/[^\d.-]/g, "");
    const num = Number(text);
    return Number.isFinite(num) ? num : 0;
  }

  function money(value) {
    const num = normalizeNumber(value);
    if (!num) return "";
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  function normalizeDateInput(value) {
    if (!value) return "";

    let text = String(value).trim();

    text = text
      .replace(/[年月]/g, "-")
      .replace(/[日号]/g, "")
      .replace(/[./]/g, "-")
      .replace(/\s+/g, "");

    const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return value;

    const year = match[1];
    const month = match[2].padStart(2, "0");
    const day = match[3].padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function parseDate(value) {
    const normalized = normalizeDateInput(value);
    const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);

    const date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }

  function formatDate(value) {
    const date = value instanceof Date ? value : parseDate(value);
    if (!date) return value || "";

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  }

  function formatChineseDate(value) {
    const date = value instanceof Date ? value : parseDate(value);
    if (!date) return value || "";

    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function addMonths(date, months) {
    const d = new Date(date.getTime());
    const targetMonth = d.getMonth() + months;
    const originalDate = d.getDate();

    d.setDate(1);
    d.setMonth(targetMonth);

    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(originalDate, lastDay));

    return d;
  }

  function addDays(date, days) {
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }

  function getMonthDiff(startValue, endValue) {
    const start = parseDate(startValue);
    const end = parseDate(endValue);

    if (!start || !end || end <= start) return 0;

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (end.getDate() > start.getDate()) {
      months += 1;
    }

    return Math.max(months, 0);
  }

  function extractField(raw, labels) {
    if (!raw) return "";

    for (const label of labels) {
      const reg = new RegExp(
        `${label}\\s*[:：]?\\s*([^\\n\\r]+)`,
        "i"
      );
      const match = raw.match(reg);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return "";
  }

  function parseInput() {
    const raw = getValue("rawInput");
    if (!raw) {
      alert("请先输入资料。");
      return;
    }

    const mapping = [
      {
        id: "address",
        labels: ["居住地址", "地址", "房屋地址", "物业地址", "單位地址", "单位地址"]
      },
      {
        id: "checkin",
        labels: ["入住日期", "开始日期", "起租日期", "入住", "開始日期"]
      },
      {
        id: "checkout",
        labels: ["退房日期", "结束日期", "完结日期", "到期日期", "退租日期", "結束日期"]
      },
      {
        id: "signDate",
        labels: ["签约日期", "簽約日期", "合同日期", "签署日期", "簽署日期"]
      },
      {
        id: "rent",
        labels: ["每月租金", "月租", "租金", "许可每月费用", "許可每月費用"]
      },
      {
        id: "name",
        labels: ["姓名", "租客姓名", "许可人姓名", "許可人姓名", "名字"]
      },
      {
        id: "idNumber",
        labels: ["证件号码", "證件號碼", "身份证", "身份證", "护照", "護照", "ID", "Passport"]
      }
    ];

    mapping.forEach(item => {
      const value = extractField(raw, item.labels);
      if (value) {
        if (["checkin", "checkout", "signDate"].includes(item.id)) {
          setValue(item.id, normalizeDateInput(value));
        } else if (item.id === "rent") {
          setValue(item.id, normalizeNumber(value) || value);
        } else {
          setValue(item.id, value);
        }
      }
    });

    calculate();
  }

  function calculate() {
    const checkin = parseDate(getValue("checkin"));
    const checkout = parseDate(getValue("checkout"));
    const rent = normalizeNumber(getValue("rent"));

    if (getValue("checkin")) setValue("checkin", formatDate(getValue("checkin")));
    if (getValue("checkout")) setValue("checkout", formatDate(getValue("checkout")));
    if (getValue("signDate")) setValue("signDate", formatDate(getValue("signDate")));

    if (!checkin || !checkout || !rent) {
      return;
    }

    const months = getMonthDiff(getValue("checkin"), getValue("checkout"));
    const total = months * rent;

    setValue("period", `${formatChineseDate(checkin)} 至 ${formatChineseDate(checkout)}`);

    // 默认保证金为两个月租金
    setValue("deposit", rent * 2);

    // 默认保证金截止日期：入住日前 2 天
    setValue("depositDeadline", formatDate(addDays(checkin, -2)));

    // 默认分四期，按实际居住月数平均分配
    const installmentCount = 4;
    const baseMonths = Math.floor(months / installmentCount);
    const remainder = months % installmentCount;

    const rents = [];
    for (let i = 0; i < installmentCount; i++) {
      const monthsForThisPeriod = baseMonths + (i < remainder ? 1 : 0);
      rents.push(monthsForThisPeriod * rent);
    }

    setValue("p1Date", formatDate(checkin));
    setValue("p2Date", formatDate(addMonths(checkin, Math.ceil(months / 4))));
    setValue("p3Date", formatDate(addMonths(checkin, Math.ceil(months / 2))));
    setValue("p4Date", formatDate(addMonths(checkin, Math.ceil((months * 3) / 4))));

    setValue("p1Rent", rents[0] || "");
    setValue("p2Rent", rents[1] || "");
    setValue("p3Rent", rents[2] || "");
    setValue("p4Rent", rents[3] || "");

    return total;
  }

  async function loadTemplate() {
    const response = await fetch("lease-template-2.html", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("无法加载合同模板 lease-template-2.html");
    }

    return await response.text();
  }

  function getTemplateBody(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const contract = doc.querySelector(".contract");

    if (!contract) {
      throw new Error("合同模板中找不到 .contract 容器");
    }

    return contract.outerHTML;
  }

  function getTemplateStyles(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const styles = Array.from(doc.querySelectorAll("style"))
      .map(style => style.textContent || "")
      .join("\n");

    return styles;
  }

  function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function renderTemplate(templateHtml, data) {
    let html = templateHtml;

    Object.keys(data).forEach(key => {
      const value = data[key] == null ? "" : String(data[key]);
      const reg = new RegExp(`#${escapeRegExp(key)}#`, "g");
      html = html.replace(reg, value);
    });

    // 清理未填字段，避免 PDF 出现 #xxx#
    html = html.replace(/#[^#]+#/g, "");

    return html;
  }

  function collectFormData() {
    calculate();

    const form = {};
    FIELD_IDS.forEach(id => {
      form[id] = getValue(id);
    });

    const totalMonths = getMonthDiff(form.checkin, form.checkout);
    const rent = normalizeNumber(form.rent);
    const totalFee = totalMonths * rent;

    return {
      "居住地址": form.address,
      "入住日期": formatChineseDate(form.checkin),
      "退房日期": formatChineseDate(form.checkout),
      "签约日期": formatChineseDate(form.signDate),
      "每月租金": money(form.rent),
      "姓名": form.name,
      "证件号码": form.idNumber,
      "居住时期": form.period,
      "保证金": money(form.deposit),
      "保证金支付截止日期": formatChineseDate(form.depositDeadline),
      "第一期截止": formatChineseDate(form.p1Date),
      "第二期截止": formatChineseDate(form.p2Date),
      "第三期截止": formatChineseDate(form.p3Date),
      "第四期截止": formatChineseDate(form.p4Date),
      "第一期租金": money(form.p1Rent),
      "第二期租金": money(form.p2Rent),
      "第三期租金": money(form.p3Rent),
      "第四期租金": money(form.p4Rent),
      "总居住月份": totalMonths,
      "总许可费用": money(totalFee)
    };
  }

  function validateBeforeGenerate() {
    const required = [
      ["address", "居住地址"],
      ["checkin", "入住日期"],
      ["checkout", "退房日期"],
      ["signDate", "签约日期"],
      ["rent", "每月租金"],
      ["name", "姓名"],
      ["idNumber", "证件号码"]
    ];

    const missing = [];

    required.forEach(([id, label]) => {
      if (!getValue(id)) missing.push(label);
    });

    if (missing.length) {
      alert("请先填写以下字段：\n" + missing.join("、"));
      return false;
    }

    return true;
  }

  async function buildContractHTML() {
    if (!validateBeforeGenerate()) return null;

    const template = await loadTemplate();
    const styles = getTemplateStyles(template);
    const body = getTemplateBody(template);
    const data = collectFormData();
    const renderedBody = renderTemplate(body, data);

    return `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>许可协议</title>
<style>
${styles}
</style>
</head>
<body>
${renderedBody}
</body>
</html>`;
  }

  function createHiddenFrame() {
    const old = document.getElementById("contract-pdf-frame");
    if (old) old.remove();

    const iframe = document.createElement("iframe");
    iframe.id = "contract-pdf-frame";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.setAttribute("aria-hidden", "true");

    document.body.appendChild(iframe);

    return iframe;
  }

  async function renderIntoFrame(html) {
    const iframe = createHiddenFrame();
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(html);
    doc.close();

    await new Promise(resolve => {
      iframe.onload = resolve;
      setTimeout(resolve, 350);
    });

    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 250));

    return iframe;
  }

  async function generatePDF() {
    try {
      const fullHtml = await buildContractHTML();
      if (!fullHtml) return;

      const iframe = await renderIntoFrame(fullHtml);
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const contract = doc.querySelector(".contract");

      if (!contract) {
        throw new Error("PDF 生成失败：找不到合同内容。");
      }

      await html2pdf()
        .set({
          margin: 0,
          filename: "许可协议.pdf",
          image: {
            type: "jpeg",
            quality: 0.98
          },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
            windowWidth: 794,
            windowHeight: Math.max(contract.scrollHeight, 1123)
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            compress: true
          },
          pagebreak: {
            mode: ["css", "legacy"],
            avoid: [
              ".meta-row",
              ".bank-info",
              ".receipt",
              ".signature-table",
              "tr",
              "td"
            ]
          }
        })
        .from(contract)
        .save();

      setTimeout(() => {
        const frame = document.getElementById("contract-pdf-frame");
        if (frame) frame.remove();
      }, 1200);
    } catch (err) {
      console.error(err);
      alert(
        "自动下载 PDF 失败：\n" +
          err.message +
          "\n\n如果你正在使用 Safari 或手机浏览器，请点击“稳定打印 / 保存 PDF”。"
      );
    }
  }

  async function printContractPDF() {
    try {
      const fullHtml = await buildContractHTML();
      if (!fullHtml) return;

      const iframe = await renderIntoFrame(fullHtml);

      iframe.style.position = "fixed";
      iframe.style.left = "0";
      iframe.style.top = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.opacity = "0";

      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }, 300);
    } catch (err) {
      console.error(err);
      alert("打开打印失败：" + err.message);
    }
  }

  window.parseInput = parseInput;
  window.calculate = calculate;
  window.generatePDF = generatePDF;
  window.printContractPDF = printContractPDF;
})();
