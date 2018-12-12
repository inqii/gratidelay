const loadEntrys = () => {

  chrome.storage.sync.get(["blockList"], function(result) {
    console.log(result.blockList);
    addEntry(result.blockList);
  });

  for (let i = 0; i < getElements("remove-button").length; i++) {
    addClickEvent(getElements("remove-button")[i], "remove");
  }

};

const getElements = el => {
  return document.getElementsByClassName(el);
};

const addClickEvent = (el, action) => {
  switch (action) {
    case "add":
      el.addEventListener("click", function () {
        console.log("Button add clicked")
        const domain = "facebook.com"
        addEntry(domain);
      });
      break;
    case "remove":
      el.addEventListener("click", function () {
        console.log("Button remove clicked")
        entry = event.target.parentNode.parentNode;

        removeEntry(entry);
      });
      break;
  }
};

const parseDomain = domain => {
 // Has to be build
}

const writeToStorage = domain => {
  let currentBlockList = []

  chrome.storage.sync.get(["blockList"], function(result) {
    currentBlockList = result.blockList;
  });

  currentBlockList += domain;

  chrome.storage.sync.set({"blockList": currentBlockList}, function() {
    console.log({currentBlockList: currentBlockList});
  });
}

const eraseFromStorage = domain => {
  let currentBlockList = []

  chrome.storage.sync.get(["blockList"], function(result) {
    currentBlockList = result.blockList;
  });

  currentBlockList -= domain;
  chrome.storage.sync.set({"blockList": currentBlockList}, function() {
    console.log({currentBlockList: currentBlockList});
  });

}

const addEntry = domain => {
  const entryList = document.getElementsByTagName("tbody")[0];

  const html = `<tr class="block-list__entry">
    <td>
      <p>${domain}</p>
    </td>
    <td>
      <button class=" remove-button button-danger button-small">Remove</button>
    </td>
  </tr>`;
  entryList.innerHTML += html;

  writeToStorage(domain)

  for (let i = 0; i < getElements("remove-button").length; i++) {
    addClickEvent(getElements("remove-button")[i], "remove");
  }

};

const removeEntry = entry => {

  // Remove domain from Chrome sync
  console.log(entry)
  domain = entry.children[0].children[0].innerHTML;
  console.log(domain);
  eraseFromStorage(domain);

  // Remove entry from document
  entry.parentNode.removeChild(entry);
};


window.onload = function () {
  loadEntrys();

  formButton = getElements("form__button")[0];
  addClickEvent(formButton, "add");

  addClickEvent();
};