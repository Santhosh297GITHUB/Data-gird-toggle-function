// Toggle functionality
const toggleButton= document.getElementById('toggleButton');
const containers = document.querySelectorAll('.container');

toggleButton.addEventListener('click', () => {
  containers.forEach(container => {
    container.classList.toggle('active');
  });
});

// Fetch and display data for the grid
const apiUrl = "http://run.mocky.io/v3/07316365-b8d2-4574-9bc1-22b17b054e3b";
const dataContainer = document.getElementById("data-container");

async function fetchApiData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function generateHTML(data) {
  if (!data || data.length === 0) {
    return "Failed to fetch data. Please try again later.";
  }

  return data.map(item => `
    <div class="item" data-id="${item.id}">
      <img src="${item.image}" alt="Random Image">
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-description">${item.description}</div>
      </div>
    </div>`).join('');
}

async function updateDataContainer() {
  const data = await fetchApiData(apiUrl);
  const html = generateHTML(data);
  dataContainer.innerHTML = html;
}

// Call the updateDataContainer function to get data and display it on page load
updateDataContainer();

// Fetch and display data for the table
const dataBody1 = document.getElementById("data-body1");
const ascendingButton = document.getElementById("ascendingButton");
const descendingButton = document.getElementById("descendingButton");

ascendingButton.addEventListener("click", sortAscending);
descendingButton.addEventListener("click", sortDescending);

async function updateDataTable() {
  const data = await fetchApiData(apiUrl);
  if (data) {
    updateTable(data);
  }
}

function updateTable(data) {
  const html = data.map(generateTableRow).join('');
  dataBody1.innerHTML = html;
}

function generateTableRow(item) {
  return `
    <tr>
      <td><img src="${item.image}" alt="Random Image"></td>
      <td>${item.name}</td>
      <td>${item.description}</td>
    </tr>`;
}

async function sortAscending() {
  const data = await fetchApiData(apiUrl);
  if (data) {
    data.sort((a, b) => a.name.localeCompare(b.name));
    updateTable(data);
  }
}

async function sortDescending() {
  const data = await fetchApiData(apiUrl);
  if (data) {
    data.sort((a, b) => b.name.localeCompare(a.name));
    updateTable(data);
  }
}

// Call the updateDataTable function to get data and display it on page load
updateDataTable();