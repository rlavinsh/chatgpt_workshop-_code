let prompt = document.querySelector(".prompt");
let container = document.querySelector(".container");
let btn = document.querySelector(".btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;
let apiUrl =
  "Paste your API key here";
// creating tht chatbox function 3
function createChatBox(html, className) {
  let div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}
async function getApiResponse(aiChatBox) {
  let textElement = aiChatBox.querySelector(".text");
  try {
    let response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] }),
    });
    let data = await response.json();
    let apiResponse = data?.candidates[0].content.parts[0].text;
    textElement.innerText = apiResponse;
    console.log(apiResponse);
  } catch (e) {
    console.log(e);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}
function showLoading() {
  let html = ` <div id="img">
        <img src="./images/ai.png" >
    </div>
    <div class="text">
    </div>
     <img class="loading" src="./images/loading.gif"  alt="loading" height="50px">`;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  getApiResponse(aiChatBox);
}

// getting the text by click on the user -- 2
btn.addEventListener("click", function () {
  userMessage = prompt.value;
  //   console.log(userMessage);
  if ((prompt.value = "")) {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
  if (!userMessage) return;
  // create the chat box
  let html = ` <div id="img">
        <img src="./images/user.png" >
    </div>
    <div class="text">
    </div>`;

  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 500);
});
