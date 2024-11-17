console.log("running")
chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
    // console.log(details.statuCode, details.error, details.type)
    // Resolve gateway.zscalertwo.net
    chrome.dns.resolve('gateway.zscalertwo.net', function(result) {
      if (result && result.addresses.length > 0) { // Check if DNS resolution was successful
        if (details.type === "main_frame" && details.error === 'net::ERR_CONNECTION_RESET') {
          chrome.storage.sync.get(['customUrl'], function(data) {
            let redirectUrl = data.customUrl || chrome.runtime.getURL("oops.html");
            chrome.tabs.update(details.tabId, {url: redirectUrl});
          });
        }
      } else {
        console.log("gateway.zscalertwo.net not resolvable. Extension disabled.");
      }
    });
  },
  
  {urls: ["<all_urls>"]},
);
