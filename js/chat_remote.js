
document.addEventListener("DOMContentLoaded", () => {
  const logArea = document.getElementById("chat-log");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const sender = document.getElementById("chat-sender");
  const channel = document.body.getAttribute("data-chat-id") || "default";

  const api_url = "http://localhost:5000"; // 生产环境部署后需更换

  // 加载历史记录
  fetch(`${api_url}/chat_logs/${channel}`)
    .then(r => r.json())
    .then(data => {
      data.forEach(msg => appendMessage(msg));
    });

  // 监听提交
  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = {
      channel_id: channel,
      from: sender.value || "🌀 匿名灵体",
      text: input.value,
      time: new Date().toLocaleTimeString()
    };
    fetch(`${api_url}/submit_message`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(msg)
    }).then(() => {
      appendMessage(msg);
      input.value = "";
    });
  });

  function appendMessage(msg) {
    const div = document.createElement("div");
    div.className = "chat-bubble";
    div.innerHTML = `<strong>${msg.from}</strong> (${msg.time}): <br>${msg.text}`;
    logArea.appendChild(div);
  }
});
