
// Initialize button with user's preferred color
let getAuthBtn = document.getElementById("getAuth");
let openAnthraxBtn = document.getElementById("openAnthrax");
var linksSelect = document.getElementById("linksSelect");




document.addEventListener("DOMContentLoaded", function(){ onLoad(); }, false);

function onLoad() {
  const { version } = require('./package.json');
  var versionSpan = document.getElementById("version");
  versionSpan.innerText = version
}

chrome.storage.sync.get("color", ({ color }) => {
  // changeColor.style.backgroundColor = color;
});

// populate select
// const options = res.data.laliga.map(option => {
//   return `<option value='${option}'>${option}</option>`
// })

console.log("QQ select: ", onLinksSelect())

getAuthBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getAuthToken
    });
  });

  openAnthraxBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openAnthraxPage
    });
  });
  
  linksSelect.addEventListener("click", async (e) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: onLinksSelect(e)
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  async function getPageRaw() {
    const location = window.location.href.includes('?') ? `${window.location.href}&raw` : `${window.location.href}?raw`
    const rawResponse = await fetch(location)
    const rawText = await rawResponse.text()
    
    return JSON.parse(rawText)
  }
  
  
  async function getAuthToken() {
    // chrome.storage.sync.get("color", ({ color }) => {
    //   document.body.style.backgroundColor = color;
    // });

    const location = window.location.href.includes('?') ? `${window.location.href}&raw` : `${window.location.href}?raw`
    const rawResponse = await fetch(location)
    const rawText = await rawResponse.text()
    
    const parsedResponse = JSON.parse(rawText)
    const authToken = parsedResponse.data.params.headers.authorization
    
    window.prompt("Copy token and close!", authToken.replace("Bearer ", ""))
  }

  async function openAnthraxPage() {
    const location = window.location.href.includes('?') ? `${window.location.href}&raw` : `${window.location.href}?raw`
    const rawResponse = await fetch(location)
    const rawText = await rawResponse.text()
    
    const parsedResponse = JSON.parse(rawText)
    const partnerKey = parsedResponse.data.params.partnerKey
    const clientTemplateKey = parsedResponse.data.params.clientTemplateKey
    const pageId = parsedResponse.id
    const pageVersion = parsedResponse.data.version

    const anthraxUrl = 
    `https://staging-anthrax.mondiamedia.com/ecoSystem/${partnerKey}/client/${clientTemplateKey}/structure/${pageId}/version/${pageVersion}`
    
    window.open(anthraxUrl, "_blank")
    
    console.log("URL: ", anthraxUrl)
  }

  async function onLinksSelect() {
    const rawResponse = await fetch('https://api.npoint.io/fb0ba17696ad23df931a')
    const rawText = await rawResponse.text()
    const res = JSON.parse(rawText)
    // console.log(res.data)

    return res
    // console.log(e)
    // linksSelect.innerHTML = options
  }