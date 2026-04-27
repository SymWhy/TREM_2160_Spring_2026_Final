console.log("Attempting to run bg script...");

// List of available fact-checking sources
const factcheckers = [
  { id: 'wikipedia', title: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Special:Search?search=', logo: 'res/logos/wikipedia-32.png', enabled: true },
  { id: 'snopes', title: 'Snopes', url: 'https://www.snopes.com/search/?q=', logo: 'res/logos/snopes-32.png', enabled: true },
  { id: 'politifact', title: 'Politifact', url: 'https://www.politifact.com/search/?q=', logo: 'res/logos/politifact-32.png', enabled: true },
  { id: 'factcheck', title: 'FactCheck.org', url: 'https://www.factcheck.org/search/#gsc.tab=0&gsc.q=', logo: 'res/logos/factcheck-32.png', enabled: true },
]

// Add new option to the context menu
browser.contextMenus.create(
  {
    id: "contextify",
    title: "Fact-check '%s'",
    contexts: ["selection"],
  },
  onCreated,
);

// Add sub-options for each fact-checking source
for (let i = 0; i < factcheckers.length; i++) {
  browser.contextMenus.create(
    {
      id: factcheckers[i].id,
      parentId: "contextify",
      title: factcheckers[i].title,
      contexts: ["selection"],
      icons: {
        "32": factcheckers[i].logo
      }
    }
  )
}


// Listen for click events
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case factcheckers[0].id:
      browser.tabs.create({ url: factcheckers[0].url + info.selectionText });
      break;
    case factcheckers[1].id:
      browser.tabs.create({ url: factcheckers[1].url + info.selectionText });
      break;
    case factcheckers[2].id:
      browser.tabs.create({ url: factcheckers[2].url + info.selectionText });
      break;
    case factcheckers[3].id:
      browser.tabs.create({ url: factcheckers[3].url + info.selectionText });
      break;
  }
});

// Listen for messages from the background script

// Open in new tab




function onCreated() {  if (browser.runtime.lastError) {
    console.error(`Error creating context menu item: ${browser.runtime.lastError}`);
  } else {
    console.log("Context menu item created successfully.");
  }
}