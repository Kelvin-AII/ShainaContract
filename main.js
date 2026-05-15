async function loadTemplate() {
  const res = await fetch("./lease-template.html");

  if (!res.ok) {
    throw new Error("模板加载失败，请确认 lease-template.html 和 index.html 在同一目录");
  }

  return await res.text();
}

async function generatePDF() {
  try {
    calculate();

    const ids = [
      "address","checkin","checkout","signDate","rent","name","idNumber",
      "period","deposit","depositDeadline",
      "p1Date","p2Date","p3Date","p4Date",
      "p1Rent","p2Rent","p3Rent","p4Rent"
    ];

    const data = {};
    ids.forEach(id => {
      data[id] = document.getElementById(id).value || "";
    });

    const template = await loadTemplate();
    const html = renderTemplate(template, data);

    const div = document.createElement("div");
    div.innerHTML = html;

    div.style.width = "794px";
    div.style.minHeight = "1123px";
    div.style.padding = "40px";
    div.style.background = "#ffffff";
    div.style.color = "#000000";
    div.style.fontFamily = "Arial, sans-serif";
    div.style.boxSizing = "border-box";

    document.body.appendChild(div);

    await html2pdf()
      .set({
        margin: 10,
        filename: "租赁合同.pdf",
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
        }
      })
      .from(div)
      .save();

    document.body.removeChild(div);

  } catch (err) {
    console.error(err);
    alert("PDF 生成失败：" + err.message);
  }
}
