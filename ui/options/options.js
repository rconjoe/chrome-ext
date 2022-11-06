function restore_options() {
  chrome.storage.local.get(
    {
      endpoints: [],
    },
    function ({ endpoints }) {
      endpoints.map(({ name, url }, i) => {
        const ul = document.getElementById("endpoints");
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.setAttribute("id", i);
        button.appendChild(document.createTextNode("Delete"));
        li.appendChild(document.createTextNode(`${name} - ${url}`));
        li.appendChild(button);
        ul.appendChild(li);
      });
    }
  );
}

function save_options() {
  chrome.storage.sync.get(
    {
      endpoints: [],
    },
    function ({ endpoints }) {
      const name = document.getElementById("nameinput").value;
      const url = document.getElementById("urlinput").value;
      chrome.storage.local.set(
        {
          endpoints: [...endpoints, { name, url }],
        },
        function () {
          restore_options();
          document.getElementById("status").textContent = "cool";
        }
      );
    }
  );
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("savebtn").addEventListener("click", save_options);
