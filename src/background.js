
// List of available fact-checking sources
const searchengines = [
  { id: 'wikipedia', title: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Special:Search?search=', logo: 'res/logos/wikipedia-32.png', enabled: true },
  { id: 'britannica', title: 'Encyclopedia Britannica', url: 'https://www.britannica.com/search?query=', logo: 'res/logos/britannica-32.png', enabled: true },
  { id: 'snopes', title: 'Snopes', url: 'https://www.snopes.com/search/?q=', logo: 'res/logos/snopes-32.png', enabled: true },
  { id: 'politifact', title: 'Politifact', url: 'https://www.politifact.com/search/?q=', logo: 'res/logos/politifact-32.png', enabled: true }
]

// Add new option to the context menu
browser.contextMenus.create(
  {
    id: "getcontext",
    title: "Get Context: %s",
    contexts: ["selection"],
  },
  onCreated,
);

// Add sub-options for each fact-checking source
for (let i = 0; i < searchengines.length; i++) {
  browser.contextMenus.create(
    {
      id: searchengines[i].id,
      parentId: "getcontext",
      title: searchengines[i].title,
      contexts: ["selection"],
      icons: {
        "32": searchengines[i].logo
      }
    }
  )
}

// Listen for click events
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case searchengines[0].id:
      browser.tabs.create({ url: searchengines[0].url + processText(info.selectionText) });
      break;
    case searchengines[1].id:
      browser.tabs.create({ url: searchengines[1].url + processText(info.selectionText) });
      break;
    case searchengines[2].id:
      browser.tabs.create({ url: searchengines[2].url + processText(info.selectionText) });
      break;
    case searchengines[3].id:
      browser.tabs.create({ url: searchengines[3].url + processText(info.selectionText) });
      break;
  }
});


function onCreated() {  if (browser.runtime.lastError) {
    console.error(`Error creating context menu item: ${browser.runtime.lastError}`);
  } else {
    console.log("Context menu item created successfully.");
  }
}

function processText(text) {
  // Strip punctuation
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'\"]/g, "");
}