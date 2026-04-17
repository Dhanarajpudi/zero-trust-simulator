const BASE = "http://13.126.191.148:3001";

let token = "";

// LOGIN
async function login() {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();
  token = data.token;

  document.getElementById("token").innerText = "Token: " + token;
  log("✅ Logged in");
}

// ACCESS API
async function accessResource(ip="127.0.0.1") {
  const res = await fetch(`${BASE}/api/admin`, {
    headers: {
      Authorization: "Bearer " + token,
      "x-forwarded-for": ip
    }
  });

  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data);

  log("🔐 Access attempt from " + ip + " → " + data.message);
}

// SIMULATIONS
function simulateGood() {
  accessResource("127.0.0.1");
}

function simulateBad() {
  accessResource("192.168.1.10");
}

// LOG SYSTEM
function log(msg) {
  const li = document.createElement("li");
  li.innerText = msg;
  document.getElementById("logs").appendChild(li);
}
