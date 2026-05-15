const TEMPLATE_FALLBACK = `
<section class="contract-document">
  <style>
    .contract-document {
      width: 720px;
      margin: 0 auto;
      background: #ffffff;
      color: #111827;
      font-family: Arial, "Noto Sans TC", "Noto Sans SC", "Microsoft YaHei", sans-serif;
      font-size: 13px;
      line-height: 1.62;
      word-break: break-word;
    }

    .contract-document h1 {
      margin: 0 0 22px;
      text-align: center;
      font-size: 24px;
      letter-spacing: 0;
    }

    .contract-document p {
      margin: 0 0 10px;
    }

    .contract-summary {
      width: 100%;
      margin: 16px 0 18px;
      border-collapse: collapse;
    }

    .contract-summary th,
    .contract-summary td {
      border: 1px solid #d1d5db;
      padding: 7px 9px;
      text-align: left;
      vertical-align: top;
    }

    .contract-summary th {
      width: 150px;
      background: #f3f4f6;
      font-weight: 700;
    }

    .contract-terms {
      margin: 0;
      padding-left: 24px;
    }

    .contract-terms li {
      margin: 0 0 12px;
      padding-left: 4px;
    }

    .bank-info {
      margin-top: 18px;
      padding-top: 12px;
      border-top: 1px solid #d1d5db;
    }

    .signature-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 38px;
      margin-top: 28px;
      page-break-inside: avoid;
    }

    .signature-line {
      margin: 34px 0 6px;
      border-top: 1px solid #111827;
      height: 1px;
    }

    @media print {
      .contract-document {
        width: auto;
      }
    }
  </style>

  <h1>许可协议</h1>

  <p>此合約由 A1 Plus Global Limited 及许可人 #姓名#（护照/身份证 ID no. #证件号码#）於#签约日期#訂立。</p>

  <table class="contract-summary">
    <tbody>
      <tr>
        <th>许可居住地址</th>
        <td>#居住地址#</td>
      </tr>
      <tr>
        <th>许可使用期間</th>
        <td>#居住时期#</td>
      </tr>
      <tr>
        <th>许可每月费用</th>
        <td>HKD #每月租金#</td>
      </tr>
      <tr>
        <th>许可保證金</th>
        <td>HKD #保证金#</td>
      </tr>
      <tr>
        <th>總许可费用</th>
        <td>HKD #(总居住月份 乘以 每月租金)#</td>
      </tr>
    </tbody>
  </table>

  <p>A1 Plus Global Limited 及许可人同意遵守及履行下列條款：</p>

  <ol class="contract-terms">
    <li>许可人不得轉讓、轉租或分租該许可居住地的物業或其任何部分，或將該许可居住地的物業或其任何部分的佔用權讓予任何其他人等，此许可协议權益將為许可人擁有。</li>

    <li>许可人須遵守香港一切法律條例和規則及該许可居住地的物業所屬的大廈有關的公契內的條款，许可人亦不可違反屬該许可居住地的物業地段內的官批地契上的任何制約性條款。</li>

    <li>许可人除將該许可居住地的物業作其個人使用於作息用途外，不可將該许可居住地的物業或其任何部分作商業或其他用途。</li>

    <li>许可人須在#保证金支付截止日期#之前提前向 A1 Plus Global Limited 支付许可保證金 HKD #保证金#（銀行轉帳或電子支付港幣），及许可人須於#第一期截止#前向 A1 Plus Global Limited 支付房子租金 HKD #第一期租金#（銀行轉帳或電子支付港幣）。倘许可人於應繳總许可费用之日的 2 天內仍未清付該總许可费用，則 A1 Plus Global Limited 有權採取適當行動追討许可人所欠的總许可费用，而由此引起的一切合理的直接費用及開支將構成许可人所欠 A1 Plus Global Limited 的債項，A1 Plus Global Limited 將有權向许可人一併追討所欠款項全數，且無須退還许可人已支付的押金和總许可费用。此合同為死約，如许可人提早結束许可使用期，所繳交的總许可费用或餘下的许可费用將不會退還。</li>

    <li>许可人須在许可协议期內保持许可居住地的物業內部的維修狀態良好（自然損耗及因固有的缺陷所產生的損壞除外），並須於此许可协议終止時將许可居住地的物業在同樣的維修狀態下交吉交回，否則 A1 Plus Global Limited 可在许可人保證金裡扣除相應的費用。在许可使用期间完结当日即#退房日期#，许可人需于中午十二点前迁出，以便安排清洁。在当日十二点后许可人遗留在许可居住地址物业的所有物件和财产，視作许可人遗弃的垃圾，A1 Plus Global Limited 可以安排处置或丢掉，而不需要另行通知或赔偿许可人。如许可人遗留的垃圾过多，A1 Plus Global Limited 有权收取许可人费用或在许可保证金中扣除。</li>

    <li>许可人須交予 A1 Plus Global Limited 许可保證金（相等於兩個月許可費用）作為保證许可人遵守及履行此许可协议上许可人所需遵守及履行的條款的保證金。若许可人在許可時期內並無干犯此合約內任何條款，則 A1 Plus Global Limited 須於许可使用期間完結後及收回交吉的许可居住地的物業或收回一切许可人欠款後（以較遲者作準）21 个工作天內無息退還該保證金予许可人。但若许可人拖欠根據此協議需要支付的許可費用及/或其他款項超過 2 天（無論有否以法律行動追討），或若许可人違反此協議內任何條款，A1 Plus Global Limited 可合法收回該许可居住地的物業，而此许可协议將立刻被終止；A1 Plus Global Limited 可從许可保證金內扣除因许可人違約而令 A1 Plus Global Limited 所受的損失，而此項權利將不會影響 A1 Plus Global Limited 因许可人違約而可採取的其他合法行動的權利。A1 Plus Global Limited 可以無條件地立即收回许可居住地的物業，也無須退還該许可保證金及许可费用予许可人。</li>

    <li>A1 Plus Global Limited 須保養及適當維修該许可居住地的物業內各主要結構部分（包括主要的排污渠、喉管和電線）。房子裡的電器，如非许可人人為損壞的話，維修費用由 A1 Plus Global Limited 負責，唯 A1 Plus Global Limited 須在收到许可人的書面要求或 WeChat 通知後才會有責任在合理時限內將有關損壞維修妥當。如緊急事情須修理，A1 Plus Global Limited 會盡力聯絡專業維修員，而維修員會根據經驗及緊急狀況安排最適當的時間上門維修；如遇非緊急事情，會排期處理及盡力盡快解決。如房間內的傢俬電器等能正常使用，许可人不會以東西折舊而要求 A1 Plus Global Limited 更換新的。</li>

    <li>许可人不得收藏違禁香港法例之物品，舉凡軍械、火藥、硝磺、汽油及揮發性之化工原料，或有爆炸性之危險品，均不許存放該樓之內外任何地方。许可人不能將該许可居住地的物業作任何非法用途。</li>

    <li>许可人須在许可协议期內自行投買風災、水、火、盜竊、意外保險，或其他保障许可人或第三者的保險等，A1 Plus Global Limited 對许可人或第三者等的生命或財產等損失不負任何賠償責任。</li>

    <li>许可人容許 A1 Plus Global Limited 或其授權代理人在適當時間入屋檢視該物業或進行任何修理工程。A1 Plus Global Limited 保留进入和管理的权利（包括但不限於为清洁、维修、检查、带潜在新用户看房等）。许可人在许可居住地的物業房间不享有独立、排他的占有权，空间可能与其他被许可人共享（如公共区域等）。</li>

    <li>如有必要，A1 Plus Global Limited 可以提前 1 个月通知租户终止此许可协议，包括但不限于政府或其他人士征收、房屋拆除等而导致许可人无法继续使用物业的情况。如非许可人问题而 A1 Plus Global Limited 单方面终止此协议的（不可抗力如天灾人祸战乱等除外），A1 Plus Global Limited 需要按比例退还剩余还未居住的许可费用，及在房子没有被许可人损毁和如入住当日卫生清洁状况下退回全额保证金。</li>

    <li>此合約內的英文文本與中文文本存有差異時，將以中文為準。</li>

    <li>如果对本协议有任何争议，案件将在 A1 Plus Global Limited 董事居住地法院解决。</li>

    <li>许可人遷出時，應搬走自己的物品。如许可人遺留的物件須由 A1 Plus Global Limited 代為清理，產生的相應費用 A1 Plus Global Limited 將在许可人的许可保證金內扣除。此协议一经签署，便会取代以往所有合同及口头承诺，以此许可协议为准。</li>

    <li>电、水、城市煤气和无线网絡，A1 Plus Global Limited 會每月津貼租客港幣 334 元，超出用量租客需要按租住人數比例平攤水電煤網費用。多餘的津貼費用不會累積至下個月，多余的津贴也不能换成实质费用金额返还许可人。津贴方式会由租客每月根据水电煤网相关部门的账单先缴账，每三个月许可人可透过清楚公式向 A1 Plus Global Limited 收回津贴费用，A1 Plus Global Limited 可在三十天内返还相应金额，A1 Plus Global Limited 保留最终决定权。</li>

    <li>许可人不能对任何室友或邻居造成骚扰，或令屋內發出異味惡臭，或室內外隨處丟垃圾，或高空擲物，或昆蟲蟑螂等從屋內走出。如许可人因個人衛生習慣導致蟑螂或昆蟲源頭在房間內產生，许可人可自行聘請專業除蟲公司處理。如以上問題一直未被许可人正視處理，導致收到室友或鄰居或香港警方或香港食環署的投诉，A1 Plus Global Limited 将通过 WhatsApp 或微信向许可人发出警告信。如果许可人 3 天内没有改善，A1 Plus Global Limited 有权驱逐许可人，在此情况下许可人支付的许可費用和许可保證金将不予退还。许可人如疏忽、蓄意或惡意毁壞房子需賠償，许可人需為自身的疏忽和對房子的毀壞負上法律責任。</li>

    <li>为保障许可人，A1 Plus Global Limited 会替许可人打整租釐印，釐印费用由许可人承担，即许可人需在入住前与 A1 Plus Global Limited 再签订一份整租许可协议，即许可人为主要许可人。如许可人拒绝签订整租协议，此协议会作废，A1 Plus Global Limited 有权不退还已收取的所有金额。</li>

    <li>许可人不用负担大厦管理费。</li>

    <li>许可人容许其他下屆潛在许可人进入单位及其房间作参观；A1 Plus Global Limited 会通过 WhatsApp/SMS/WeChat 提前通知租户。</li>
  </ol>

  <div class="bank-info">
    <p><strong>公司帳戶</strong></p>
    <p>銀行名稱：華僑銀行<br>
    帳戶名稱：A1 Plus Global Limited<br>
    帳戶號碼：035802826852831<br>
    SWIFT: WIHBHKHH<br>
    銀行地址：161 Queen's Road Central Hong Kong<br>
    收款人地址：Room 1505, 15/F, Yu Sung Boon Building, 107-111 Des Voeux Road Central, Hong Kong</p>
  </div>

  <p>A1 Plus Global Limited 收到许可人所交的许可保證金 HKD #保证金#；</p>
  <p>A1 Plus Global Limited 收到许可人所交的许可費用 HKD #第一期租金#；</p>

  <div class="signature-row">
    <div>
      <p>A1 Plus Global Limited<br>確認及接受這合約內所有條款的約束：</p>
      <div class="signature-line"></div>
      <p>Name: A1 Plus Global Limited<br>BR: 78053188</p>
    </div>

    <div>
      <p>许可人確認及接受協議內所有條款的約束：</p>
      <div class="signature-line"></div>
      <p>Name: #姓名#<br>Passport / China ID: #证件号码#</p>
    </div>
  </div>
</section>
`;

const FIELD_IDS = [
  "address",
  "checkin",
  "checkout",
  "signDate",
  "rent",
  "name",
  "idNumber",
  "period",
  "totalMonths",
  "deposit",
  "totalFee",
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

const REQUIRED_FIELDS = [
  ["address", "居住地址"],
  ["checkin", "入住日期"],
  ["checkout", "退房日期"],
  ["signDate", "签约日期"],
  ["rent", "每月租金"],
  ["name", "姓名"],
  ["idNumber", "证件号码"]
];

let totalMonthsEdited = false;

function el(id) {
  return document.getElementById(id);
}

function setStatus(message, isError = false) {
  const status = el("status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", isError);
}

async function loadTemplate() {
  try {
    const res = await fetch("lease-template.html", { cache: "no-store" });
    const text = await res.text();
    if (res.ok && text.trim()) {
      return text;
    }
  } catch (error) {
    console.warn("Using built-in contract template because lease-template.html could not be loaded.", error);
  }

  return TEMPLATE_FALLBACK;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTemplate(template, data) {
  return template
    .replace(/#([^#]+)#/g, (_, key) => escapeHtml(data[key.trim()] ?? ""))
    .replace(/{{(.*?)}}/g, (_, key) => escapeHtml(data[key.trim()] ?? ""));
}

function normalizeNumber(value) {
  const cleaned = String(value ?? "").replace(/,/g, "").replace(/[^\d.-]/g, "");
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value) {
  const number = normalizeNumber(value);
  if (!number) return "";
  return number.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(number) ? 0 : 2,
    maximumFractionDigits: 2
  });
}

function formatMonthCount(value) {
  const number = normalizeNumber(value);
  if (!number) return "";
  const rounded = Math.round(number * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function normalizeDate(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";

  const match = text.match(/(\d{4})\D*(\d{1,2})\D*(\d{1,2})/);
  if (!match) return "";

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return "";

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDate(value) {
  const iso = normalizeDate(value);
  if (!iso) return null;
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

function toIsoDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatChineseDate(value) {
  const date = parseDate(value);
  if (!date) return "";
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function addDays(value, days) {
  const date = parseDate(value);
  if (!date) return "";
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

function addMonths(value, months) {
  const date = parseDate(value);
  if (!date) return "";

  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), lastDay));
  return toIsoDate(target);
}

function compareIsoDates(a, b) {
  const first = parseDate(a);
  const second = parseDate(b);
  if (!first || !second) return 0;
  return first.getTime() - second.getTime();
}

function monthDifference(startValue, endValue) {
  const start = parseDate(startValue);
  const end = parseDate(endValue);
  if (!start || !end || end <= start) return 0;

  let wholeMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  let anchor = parseDate(addMonths(toIsoDate(start), wholeMonths));

  if (anchor && anchor > end) {
    wholeMonths -= 1;
    anchor = parseDate(addMonths(toIsoDate(start), wholeMonths));
  }

  if (!anchor || anchor.getTime() === end.getTime()) {
    return wholeMonths;
  }

  const nextAnchor = parseDate(addMonths(toIsoDate(start), wholeMonths + 1));
  if (!nextAnchor || nextAnchor <= anchor) {
    return wholeMonths;
  }

  const remainingDays = (end - anchor) / 86400000;
  const segmentDays = (nextAnchor - anchor) / 86400000;
  return Math.round((wholeMonths + remainingDays / segmentDays) * 100) / 100;
}

function getRawData() {
  const data = {};
  FIELD_IDS.forEach((id) => {
    data[id] = el(id)?.value.trim() ?? "";
  });
  return data;
}

function buildTemplateData() {
  const raw = getRawData();
  const signDate = formatChineseDate(raw.signDate);
  const checkin = formatChineseDate(raw.checkin);
  const checkout = formatChineseDate(raw.checkout);
  const period = raw.period || (checkin && checkout ? `${checkin} 至 ${checkout}` : "");
  const totalFee = raw.totalFee || normalizeNumber(raw.totalMonths) * normalizeNumber(raw.rent);

  return {
    姓名: raw.name,
    证件号码: raw.idNumber,
    居住地址: raw.address,
    入住日期: checkin,
    退房日期: checkout,
    签约日期: signDate,
    签约年月日: signDate,
    居住时期: period,
    总居住月份: formatMonthCount(raw.totalMonths),
    每月租金: formatMoney(raw.rent),
    保证金: formatMoney(raw.deposit),
    总许可费用: formatMoney(totalFee),
    "(总居住月份 乘以 每月租金)": formatMoney(totalFee),
    保证金支付截止日期: formatChineseDate(raw.depositDeadline),
    第一期截止: formatChineseDate(raw.p1Date),
    第二期截止: formatChineseDate(raw.p2Date),
    第三期截止: formatChineseDate(raw.p3Date),
    第四期截止: formatChineseDate(raw.p4Date),
    第一期租金: formatMoney(raw.p1Rent),
    第二期租金: formatMoney(raw.p2Rent),
    第三期租金: formatMoney(raw.p3Rent),
    第四期租金: formatMoney(raw.p4Rent),

    address: raw.address,
    checkin,
    checkout,
    signDate,
    rent: formatMoney(raw.rent),
    name: raw.name,
    idNumber: raw.idNumber,
    period,
    totalMonths: formatMonthCount(raw.totalMonths),
    deposit: formatMoney(raw.deposit),
    totalFee: formatMoney(totalFee),
    depositDeadline: formatChineseDate(raw.depositDeadline),
    p1Date: formatChineseDate(raw.p1Date),
    p2Date: formatChineseDate(raw.p2Date),
    p3Date: formatChineseDate(raw.p3Date),
    p4Date: formatChineseDate(raw.p4Date),
    p1Rent: formatMoney(raw.p1Rent),
    p2Rent: formatMoney(raw.p2Rent),
    p3Rent: formatMoney(raw.p3Rent),
    p4Rent: formatMoney(raw.p4Rent)
  };
}

function calculate(options = {}) {
  const { updateMonths = true } = options;
  const checkin = el("checkin").value;
  const checkout = el("checkout").value;
  const signDate = el("signDate").value;
  const rent = normalizeNumber(el("rent").value);

  if (checkin && checkout) {
    el("period").value = `${formatChineseDate(checkin)} 至 ${formatChineseDate(checkout)}`;
    if (updateMonths && !totalMonthsEdited) {
      el("totalMonths").value = formatMonthCount(monthDifference(checkin, checkout));
    }
  }

  const totalMonths = normalizeNumber(el("totalMonths").value);

  if (rent) {
    el("deposit").value = rent * 2;
    el("totalFee").value = totalMonths ? Math.round(totalMonths * rent * 100) / 100 : "";

    const firstMonths = Math.min(3, totalMonths || 3);
    const secondMonths = Math.min(3, Math.max((totalMonths || 0) - 3, 0));
    const thirdMonths = Math.min(3, Math.max((totalMonths || 0) - 6, 0));
    const fourthMonths = Math.min(3, Math.max((totalMonths || 0) - 9, 0));

    el("p1Rent").value = Math.round(firstMonths * rent * 100) / 100 || "";
    el("p2Rent").value = Math.round(secondMonths * rent * 100) / 100 || "";
    el("p3Rent").value = Math.round(thirdMonths * rent * 100) / 100 || "";
    el("p4Rent").value = Math.round(fourthMonths * rent * 100) / 100 || "";
  }

  if (signDate) {
    el("depositDeadline").value = signDate;
  }

  if (checkin || signDate) {
    let firstDeadline = checkin ? addDays(checkin, -14) : signDate;
    if (signDate && firstDeadline && compareIsoDates(firstDeadline, signDate) < 0) {
      firstDeadline = signDate;
    }

    el("p1Date").value = firstDeadline || "";
    el("p2Date").value = firstDeadline && totalMonths > 3 ? addMonths(firstDeadline, 3) : "";
    el("p3Date").value = firstDeadline && totalMonths > 6 ? addMonths(firstDeadline, 6) : "";
    el("p4Date").value = firstDeadline && totalMonths > 9 ? addMonths(firstDeadline, 9) : "";
  }
}

function getInputValue(labels) {
  const text = el("rawInput").value;
  for (const label of labels) {
    const pattern = new RegExp(`${label}\\s*[:：]?\\s*([^\\n]+)`, "i");
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  return "";
}

function setValueFromText(id, labels, formatter = (value) => value) {
  const value = getInputValue(labels);
  if (value) {
    el(id).value = formatter(value);
  }
}

function parseInput() {
  totalMonthsEdited = false;

  setValueFromText("address", ["居住地址", "地址", "房屋地址"]);
  setValueFromText("checkin", ["入住日期", "开始日期", "開始日期", "起租日期"], normalizeDate);
  setValueFromText("checkout", ["退房日期", "结束日期", "結束日期", "退租日期"], normalizeDate);
  setValueFromText("signDate", ["签约日期", "簽約日期", "合同日期"], normalizeDate);
  setValueFromText("rent", ["每月租金", "月租", "许可每月费用", "許可每月費用"], (value) => normalizeNumber(value) || value);
  setValueFromText("name", ["姓名", "许可人", "許可人", "租客姓名"]);
  setValueFromText("idNumber", ["证件号码", "證件號碼", "身份证号码", "身份證號碼", "护照号码", "護照號碼", "Passport"]);

  calculate();
  setStatus("已填充并重新计算。");
}

function validateRequiredFields() {
  const missing = REQUIRED_FIELDS
    .filter(([id]) => !el(id).value.trim())
    .map(([, label]) => label);

  if (missing.length) {
    setStatus(`请先补全：${missing.join("、")}。`, true);
    return false;
  }

  return true;
}

async function getRenderedContractHtml() {
  calculate({ updateMonths: false });
  const template = await loadTemplate();
  return renderTemplate(template, buildTemplateData());
}

async function previewContract() {
  try {
    const html = await getRenderedContractHtml();
    el("previewPane").innerHTML = html;
    setStatus("合同预览已更新。");
  } catch (error) {
    console.error(error);
    setStatus("合同预览失败，请检查模板文件。", true);
  }
}

function safeFilePart(value) {
  return String(value || "合同").replace(/[\\/:*?"<>|]/g, "").trim() || "合同";
}

async function generatePDF() {
  if (!validateRequiredFields()) return;

  try {
    const html = await getRenderedContractHtml();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    wrapper.style.position = "fixed";
    wrapper.style.left = "-10000px";
    wrapper.style.top = "0";
    wrapper.style.width = "794px";
    wrapper.style.padding = "0";
    wrapper.style.background = "#ffffff";
    wrapper.style.zIndex = "-1";
    document.body.appendChild(wrapper);

    if (!window.html2pdf) {
      el("previewPane").innerHTML = html;
      wrapper.remove();
      setStatus("PDF 组件未加载；已更新预览。请联网后刷新页面再生成 PDF。", true);
      return;
    }

    const data = buildTemplateData();
    const filename = `许可协议-${safeFilePart(data.姓名)}.pdf`;

    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          letterRendering: true
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] }
      })
      .from(wrapper)
      .save();

    wrapper.remove();
    setStatus("PDF 已生成。");
  } catch (error) {
    console.error(error);
    setStatus("PDF 生成失败，请检查浏览器控制台或刷新后再试。", true);
  }
}

function setupAutoCalc() {
  ["checkin", "checkout"].forEach((id) => {
    el(id).addEventListener("input", () => {
      totalMonthsEdited = false;
      calculate();
    });
  });

  el("signDate").addEventListener("input", () => calculate({ updateMonths: false }));
  el("rent").addEventListener("input", () => calculate({ updateMonths: false }));
  el("totalMonths").addEventListener("input", () => {
    totalMonthsEdited = true;
    calculate({ updateMonths: false });
  });

  el("parseBtn").addEventListener("click", parseInput);
  el("calculateBtn").addEventListener("click", () => {
    totalMonthsEdited = false;
    calculate();
    setStatus("已重新计算。");
  });
  el("previewBtn").addEventListener("click", previewContract);
  el("pdfBtn").addEventListener("click", generatePDF);

  calculate();
}

window.parseInput = parseInput;
window.generatePDF = generatePDF;
window.addEventListener("DOMContentLoaded", setupAutoCalc);
