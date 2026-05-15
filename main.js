async function generatePDF() {
  let wrapper = null;

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

    // 关键：不要直接把合同 div append 到当前页面底部
    // 要放进一个固定在页面左上角的独立 wrapper，避免 Safari 计算 offsetTop
    wrapper = document.createElement("div");
    wrapper.id = "pdf-generate-root";

    wrapper.style.position = "fixed";
    wrapper.style.left = "0";
    wrapper.style.top = "0";
    wrapper.style.width = "794px";
    wrapper.style.height = "auto";
    wrapper.style.minHeight = "0";
    wrapper.style.margin = "0";
    wrapper.style.padding = "0";
    wrapper.style.background = "#ffffff";
    wrapper.style.zIndex = "999999";
    wrapper.style.overflow = "visible";
    wrapper.style.transform = "none";
    wrapper.style.boxSizing = "border-box";

    const div = document.createElement("div");
    div.id = "contract-print-root";
    div.innerHTML = html;

    // 关键：不要在 JS 里强行设置 minHeight:1123px
    // 让合同内容自然高度，分页交给 html2pdf
    div.style.display = "block";
    div.style.position = "relative";
    div.style.left = "0";
    div.style.top = "0";
    div.style.width = "794px";
    div.style.height = "auto";
    div.style.minHeight = "0";
    div.style.margin = "0";
    div.style.padding = "0";
    div.style.background = "#ffffff";
    div.style.color = "#000000";
    div.style.fontFamily = "Arial, 'PingFang TC', 'PingFang SC', 'Noto Sans TC', 'Noto Sans SC', sans-serif";
    div.style.fontSize = "14px";
    div.style.lineHeight = "1.65";
    div.style.boxSizing = "border-box";
    div.style.overflow = "visible";
    div.style.transform = "none";

    wrapper.appendChild(div);
    document.body.appendChild(wrapper);

    // 等待 Safari 完成布局
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 100));

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
          backgroundColor: "#ffffff",

          // 关键：强制从左上角开始截图
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,

          // 关键：让 html2canvas 用合同本身的高度，而不是当前页面高度
          windowWidth: 794,
          windowHeight: div.scrollHeight,

          onclone: function (clonedDoc) {
            const clonedHtml = clonedDoc.documentElement;
            const clonedBody = clonedDoc.body;
            const clonedWrapper = clonedDoc.getElementById("pdf-generate-root");
            const clonedContract = clonedDoc.getElementById("contract-print-root");

            clonedHtml.style.margin = "0";
            clonedHtml.style.padding = "0";
            clonedHtml.style.width = "794px";
            clonedHtml.style.height = "auto";
            clonedHtml.style.minHeight = "0";
            clonedHtml.style.overflow = "visible";
            clonedHtml.style.display = "block";

            clonedBody.style.margin = "0";
            clonedBody.style.padding = "0";
            clonedBody.style.width = "794px";
            clonedBody.style.height = "auto";
            clonedBody.style.minHeight = "0";
            clonedBody.style.overflow = "visible";
            clonedBody.style.display = "block";
            clonedBody.style.background = "#ffffff";

            if (clonedWrapper) {
              clonedWrapper.style.position = "absolute";
              clonedWrapper.style.left = "0";
              clonedWrapper.style.top = "0";
              clonedWrapper.style.width = "794px";
              clonedWrapper.style.height = "auto";
              clonedWrapper.style.minHeight = "0";
              clonedWrapper.style.margin = "0";
              clonedWrapper.style.padding = "0";
              clonedWrapper.style.overflow = "visible";
              clonedWrapper.style.transform = "none";
              clonedWrapper.style.background = "#ffffff";
            }

            if (clonedContract) {
              clonedContract.style.position = "relative";
              clonedContract.style.left = "0";
              clonedContract.style.top = "0";
              clonedContract.style.width = "794px";
              clonedContract.style.height = "auto";
              clonedContract.style.minHeight = "0";
              clonedContract.style.margin = "0";
              clonedContract.style.padding = "0";
              clonedContract.style.overflow = "visible";
              clonedContract.style.transform = "none";
              clonedContract.style.background = "#ffffff";
            }
          }
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        },
        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
          avoid: [
            "p",
            "tr",
            "td",
            ".clause",
            ".signature-table",
            ".signature-cell"
          ]
        }
      })
      .from(div)
      .save();

  } catch (err) {
    console.error(err);
    alert("PDF 生成失败：" + err.message);
  } finally {
    if (wrapper && wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }
  }
}
