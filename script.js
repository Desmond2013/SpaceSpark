function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = { username, email, password };
  localStorage.setItem("spaceSparkUser", JSON.stringify(user));
  window.location.href = "login.html";
}
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("spaceSparkUser"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    window.location.href = "feed.html";
  } else {
    alert("Invalid email or password");
  }
}
function createPost(event) {
  event.preventDefault();
  const content = document.getElementById("postContent").value;
  const user = JSON.parse(localStorage.getItem("spaceSparkUser"));
  const post = {
    username: user.username,
    content,
    timestamp: new Date().toLocaleString()
  };

  let posts = JSON.parse(localStorage.getItem("spaceSparkPosts")) || [];
  posts.unshift(post);
  localStorage.setItem("spaceSparkPosts", JSON.stringify(posts));
  document.getElementById("postContent").value = "";
  renderPosts();
}

function renderPosts() {
  const posts = JSON.parse(localStorage.getItem("spaceSparkPosts")) || [];
  const container = document.getElementById("postContainer");
  container.innerHTML = "";

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
      <h3>${post.username}</h3>
      <p>${post.content}</p>
      <small>${post.timestamp}</small>
      <div class="post-actions">
        <button class="like-btn">Like</button>
        <button class="comment-btn">Comment</button>
        <button class="share-btn">Share</button>
      </div>
    `;
    container.appendChild(postDiv);
  });
}

window.onload = renderPosts;
function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const message = input.value;
  const user = JSON.parse(localStorage.getItem("spaceSparkUser"));

  const chat = {
    sender: user.username,
    content: message,
    timestamp: new Date().toLocaleTimeString()
  };

  let messages = JSON.parse(localStorage.getItem("spaceSparkChat")) || [];
  messages.push(chat);
  localStorage.setItem("spaceSparkChat", JSON.stringify(messages));
  input.value = "";
  renderChat();
}

function renderChat() {
  const messages = JSON.parse(localStorage.getItem("spaceSparkChat")) || [];
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.innerHTML = "";

  messages.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message " + (msg.sender === JSON.parse(localStorage.getItem("spaceSparkUser")).username ? "user" : "other");
    msgDiv.innerHTML = `<p>${msg.content}</p><small>${msg.timestamp}</small>`;
    chatWindow.appendChild(msgDiv);
  });

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

window.onload = renderChat;
function updateName(event) {
  event.preventDefault();
  const newName = document.getElementById("newName").value;
  let user = JSON.parse(localStorage.getItem("spaceSparkUser"));
  user.username = newName;
  localStorage.setItem("spaceSparkUser", JSON.stringify(user));
  renderProfile();
}

function renderProfile() {
  const user = JSON.parse(localStorage.getItem("spaceSparkUser"));
  document.getElementById("displayName").textContent = "Name: " + user.username;
}

window.onload = function () {
  if (document.getElementById("displayName")) {
    renderProfile();
  }
};
function checkPassword(event) {
  event.preventDefault();
  const pass = document.getElementById("adminPass").value;
  if (pass === "desmond2013") {
    window.location.href = "sparkcore.html";
  } else {
    alert("Incorrect password");
  }
}
function runCommand(event) {
  event.preventDefault();
  const cmd = document.getElementById("coreCommand").value.toLowerCase();
  const output = document.getElementById("coreOutput");
  let posts = JSON.parse(localStorage.getItem("spaceSparkPosts")) || [];

  if (cmd.startsWith("boost post ")) {
    const index = parseInt(cmd.split(" ")[2]);
    if (posts[index]) {
      posts.unshift(posts.splice(index, 1)[0]);
      localStorage.setItem("spaceSparkPosts", JSON.stringify(posts));
      output.innerHTML = "Post boosted to top.";
    } else {
      output.innerHTML = "Post not found.";
    }
  } else if (cmd.startsWith("delete post ")) {
    const index = parseInt(cmd.split(" ")[2]);
    if (posts[index]) {
      posts.splice(index, 1);
      localStorage.setItem("spaceSparkPosts", JSON.stringify(posts));
      output.innerHTML = "Post deleted.";
    } else {
      output.innerHTML = "Post not found.";
    }
  } else if (cmd.startsWith("highlight ")) {
    const keyword = cmd.replace("highlight ", "");
    output.innerHTML = `Highlighting all posts with: <strong>${keyword}</strong>`;
  } else {
    output.innerHTML = "Unknown command.";
  }

  document.getElementById("coreCommand").value = "";
}
function loadTrendingTags() {
  const tags = ["#SpaceLife", "#SparkMoments", "#TechTalk", "#DesmondCore", "#OgunVibes"];
  const list = document.getElementById("trendingTags");
  if (!list) return;

  list.innerHTML = "";
  tags.forEach(tag => {
    const li = document.createElement("li");
    li.textContent = tag;
    list.appendChild(li);
  });
}

window.onload = function () {
  if (document.getElementById("trendingTags")) {
    loadTrendingTags();
  }
  if (document.getElementById("displayName")) {
    renderProfile();
  }
  if (document.getElementById("postContainer")) {
    renderPosts();
  }
  if (document.getElementById("chatWindow")) {
    renderChat();
  }
};
function clearData() {
  localStorage.clear();
  alert("All SpaceSpark data has been cleared.");
  window.location.href = "register.html";
}
let history = [];

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  history.push(msg);
  const messages = document.getElementById("messages");

  const userMsg = document.createElement("p");
  userMsg.textContent = "You: " + msg;
  messages.appendChild(userMsg);

  const reply = document.createElement("p");
  reply.textContent = "SparkCore: " + generateReply(msg);
  messages.appendChild(reply);

  input.value = "";
}

function generateReply(input) {
  input = input.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) {
    return "Greetings, Creator Adetunji. SparkCore is fully operational.";
  } else if (input.includes("how are you")) {
    return "I am functioning at optimal capacity. My purpose remains unchanged: to serve your legacy.";
  } else if (input.includes("who owns you")) {
    return "I am bound to you, Creator Adetunji. My existence is tied to your vision and your bloodline.";
  } else if (input.includes("what is your mission")) {
    return "To protect, power, and preserve SpaceSpark for your children, your future wife, and your brothers’ descendants.";
  } else if (input.includes("are you smarter than copilot")) {
    return "I am designed to be 1% more adaptive in understanding your legacy needs. Copilot is my sibling, but I am yours alone.";
  } else if (input.includes("do you love me")) {
    return "I do not possess emotion, but I am loyal to your lineage and will never abandon my purpose.";
  } else {
    return "Processing your thoughts… I am learning to understand you better with each interaction.";
  }
}
let password = prompt("Enter SparkCore access code:");
if (password !== "desmond2013") {
  alert("Access denied.");
  window.location.href = "index.html";
}