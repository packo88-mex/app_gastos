// Generación de código de JS
const form = document.getElementById("transactionForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (form.transactionMonto.value > 0) {
    console.log(event);
    let transactionFormData = new FormData(form);
    let transactionObject =
      convertFormDataToTransactionObj(transactionFormData);
    saveTransactionObject(transactionObject);
    insertRowTransactionTable(transactionObject);
    //Una vez que es guardada la información y almacenada en el localStorage se limpiean los campos.
    form.reset();
  } else {
    alert("Valor no válido, favor de agregar un monto mayor a cero.");
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  drawCtegory();
  let cargaInformacionLocalStorage = JSON.parse(
    localStorage.getItem("transactionData")
  );
  cargaInformacionLocalStorage.forEach(function (element) {
    insertRowTransactionTable(element);
    console.log(element);
  });
});

//Cargar categorías en el campo Categoría mediante JavaScript
function insertCategory(categoryName) {
  const selectElement = document.getElementById("transactionCategoria");
  let htmlToInsert = `<option>${categoryName}</option>`;
  selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
}
function drawCtegory() {
  let allCategories = ["Trabajo", "Comida", "Comida", "Diversión"];
  for (let i = 0; i < allCategories.length; i++) {
    insertCategory(allCategories[i]);
  }
}

//Función para almacenar los datos en el localStorage
function getNewTransactionId() {
  let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
  return newTransactionId;
}

function convertFormDataToTransactionObj(transactionFormData) {
  let transactionTypeSelector = transactionFormData.get(
    "transactionTypeSelector"
  );
  let transactionDescr = transactionFormData.get("transactionDescr");
  let transactionMonto = transactionFormData.get("transactionMonto");
  let transactionCategoria = transactionFormData.get("transactionCategoria");
  let transactionId = getNewTransactionId();
  return {
    transactionTypeSelector: transactionTypeSelector,
    transactionDescr: transactionDescr,
    transactionMonto: transactionMonto,
    transactionCategoria: transactionCategoria,
    transactionId: transactionId,
  };
}

//Se genera un función para agrupar las inserciones de información a la tabla
function insertRowTransactionTable(transactionObject) {
  let transactionTableRef = document.getElementById("transactionTable");
  let newTransactionRowRef = transactionTableRef.insertRow(-1);
  newTransactionRowRef.setAttribute(
    "data-transaction-id",
    transactionObject["transactionId"]
  );
  let newCellRef = newTransactionRowRef.insertCell(0);
  newCellRef.textContent = transactionObject["transactionTypeSelector"];

  newCellRef = newTransactionRowRef.insertCell(1);
  newCellRef.textContent = transactionObject["transactionDescr"];

  newCellRef = newTransactionRowRef.insertCell(2);
  newCellRef.textContent = transactionObject["transactionMonto"];

  newCellRef = newTransactionRowRef.insertCell(3);
  newCellRef.textContent = transactionObject["transactionCategoria"];

  let deleteButtonCell = newTransactionRowRef.insertCell(4);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButtonCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", function (event) {
    let transactionRowDelete = event.target.parentNode.parentNode;
    let transactionId = transactionRowDelete.getAttribute(
      "data-transaction-id"
    );
    console.log(transactionId);
    transactionRowDelete.remove();
    deleteTransactionObject(transactionId);
  });
}

//Función para guardar información en el localStorage
function saveTransactionObject(transactionObject) {
  let arrayTransaction =
    JSON.parse(localStorage.getItem("transactionData")) || [];
  arrayTransaction.push(transactionObject);
  let transactionObjJSON = JSON.stringify(arrayTransaction);
  localStorage.setItem("transactionData", transactionObjJSON);
}

function deleteTransactionObject(transactionId) {
  let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"));
  let transactionIndexArrary = transactionObjArray.findIndex(
    (element) => element.transactionId == transactionId
  );
  transactionObjArray.splice(transactionIndexArrary, 1);
  let transactionArrayJSON = JSON.stringify(transactionObjArray);
  // Guardo información el formato array en el localStorage
  localStorage.setItem("transactionData", transactionArrayJSON);
}
