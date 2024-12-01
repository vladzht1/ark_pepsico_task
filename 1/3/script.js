const RESPONSE = [
  {
    SuppId: "100",
    supp: "Ромашка",
    INN: "7739000012",
  },
  {
    SuppId: "101",
    supp: "Компания поставщик",
    INN: "7790000033",
  },
];

const API_URL = "http://localhost/api/ticketdata/getsuppliers";

const SUPPLIER_LIST_ID = "SupplierList";
const SUPPLIER_LIST_ERROR_ID = "SupplierListError";

const K_SUPP_ID = "SuppId";
const K_SUPP = "supp";
const K_INN = "INN";

const fillTable = async () => {
  try {
    const response = await fetchData(API_URL);

    tryCreateTable(SUPPLIER_LIST_ID);
    const tableBody = $(`#${SUPPLIER_LIST_ID}`);

    for (const rowData of response) {
      const suppId = rowData[K_SUPP_ID];
      const supp = rowData[K_SUPP];
      const INN = rowData[K_INN];

      if (!suppId || !supp || !INN) {
        throw new Error("Ошибка: неверный формат данных", rowData);
      }

      $(tableBody).append(
        `
          <tr>
            <th scope="row">${suppId}</th>
            <td>${supp}</td>
            <td>${INN}</td>
          </tr>
        `
      );
    }
  } catch (error) {
    showSupplierListError(error.message ?? error);
  }
};

const tryCreateTable = (id) => {
  // Element already exists, skipping recreation
  if ($(`#${id}`).length !== 0) {
    console.log("Not creating table");
    return;
  }

  $("body").append(
    `
    <table>
      <thead>
        <tr>
          <th scope="col">suppId</th>
          <th scope="col">supp</th>
          <th scope="col">INN</th>
        </tr>
      </thead>
      <tbody id="${id}">
      </tbody>
    </table>
    `
  );
};

const showSupplierListError = (message) => {
  if ($(`#${SUPPLIER_LIST_ERROR_ID}`).length === 0) {
    $("body").append(`<div id="${SUPPLIER_LIST_ERROR_ID}"></div>`);
  }

  $(`#${SUPPLIER_LIST_ERROR_ID}`).text(message);
};

const fetchData = (url) => {
  console.log("Fetching data from " + url);

  // Сделать настоящий запрос
  // return fetch(url, {
  //   method: "get",
  // });

  // Заглушка
  const SERVER_DELAY = 200;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Вернуть результат без ошибки
      console.log("Successfully fetched data");
      resolve(RESPONSE);

      // Вернуть ошибку
      // console.log("Error while fetching data occurred");
      // reject("Error text");
    }, SERVER_DELAY);
  });
};

$(document).ready(fillTable);
