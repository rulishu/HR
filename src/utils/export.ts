export const downloadExcelFile = (data: any, fileName: string) => {
  const blob = new Blob([data], {
    type: "application/msword;charset=UTF-8",
  });

  // For other browsers
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
export const handleExport = (data: any, fileName: string) => {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // For other browsers
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const downloadPdfFile = (data: any) => {
  const blob = new Blob([data], { type: "application/pdf;charset-UTF-8" })
  const linkNode = document.createElement('a');
  linkNode.style.display = 'none';
  linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
  linkNode.setAttribute('target', '_blank');
  document.body.appendChild(linkNode);
  linkNode.click();  //模拟在按钮上的一次鼠标单击
  URL.revokeObjectURL(linkNode.href); // 释放URL 对象
  document.body.removeChild(linkNode);
}