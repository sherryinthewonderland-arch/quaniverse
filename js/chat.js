
document.addEventListener("DOMContentLoaded", () => {
  const logArea = document.getElementById("chat-log");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const sender = document.getElementById("chat-sender");

  const pageID = document.body.getAttribute("data-chat-id") || "default";
  const logKey = "log_" + pageID;

  const logs = JSON.parse(localStorage.getItem(logKey) || "[]");
  logs.forEach(msg => appendMessage(msg));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = {
      from: sender.value || "🌀 匿名灵体",
      text: input.value,
      time: new Date().toLocaleTimeString()
    };
    appendMessage(msg);
    logs.push(msg);
    localStorage.setItem(logKey, JSON.stringify(logs));
    input.value = "";
  });

  function appendMessage(msg) {
    const div = document.createElement("div");
    div.className = "chat-bubble";
    div.innerHTML = `<strong>${msg.from}</strong> (${msg.time}): <br>${msg.text}`;
    logArea.appendChild(div);
  }

  // 导出按钮
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "📤 导出记录";
  exportBtn.onclick = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], {type: 'application/json'});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${pageID}_chatlog.json`;
    a.click();
  };
  form.parentNode.insertBefore(exportBtn, form);
});
