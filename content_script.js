async function getPageRaw() {
    const location = window.location.href.includes('?') ? `${window.location.href}&raw` : `${window.location.href}?raw`
    const rawResponse = await fetch(location)
    const rawText = await rawResponse.text()
    
    return JSON.parse(rawText)
  }