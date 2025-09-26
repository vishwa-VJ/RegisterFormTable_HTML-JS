
function renderTable() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";

  let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

  storedUsers.forEach((user, index) => {
    let row = `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-200 rounded-full">
              <span class="font-medium text-xl text-ingdgo-600">${user.name[0].toUpperCase()}</span>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">
                ${user.name}
              </div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${user.contactNo}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${user.email}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${user.city}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <a onclick="editData(${index})" class="text-indigo-600 hover:text-indigo-900">Edit</a>
          <a id:"del" onclick="delet(${index})" class="ml-2 cursor-pointer text-red-600 hover:text-red-900">Delete</a>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

renderTable();

let delet = (index) => {
  let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

  if (confirm(`Do you want to delete "${storedUsers[index].name}" ?`)) {
    storedUsers.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(storedUsers));
    renderTable();
  }
};

function toForm() {
  window.location.href = "src/page/form.html";
}

const dialog = document.getElementById("customDialog");
const btnCancel = document.getElementById("dialogCancel");

const usernameInput = document.getElementById('full_name');
const emailInput = document.getElementById('email');
const phoneNoInput = document.getElementById('phoneNo');
const cityInput = document.getElementById('city');

let editData = (index) => {

  dialog.classList.remove("hidden");
  dialog.classList.add("flex");

  let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

  usernameInput.value = storedUsers[index].name
  emailInput.value = storedUsers[index].email
  phoneNoInput.value = storedUsers[index].contactNo
  cityInput.value = storedUsers[index].city

  document.getElementById("dialogOk").setAttribute("data-index", index);



}


btnCancel.addEventListener("click", () => {
  dialog.classList.add("hidden");
  dialog.classList.remove("flex");
});




let btnOk = () => {

  let index = document.getElementById("dialogOk").getAttribute("data-index");


  if (validation()) {

    let dataObj = {
      name: usernameInput.value,
      email: emailInput.value,
      contactNo: phoneNoInput.value,
      city: cityInput.value
    };

    let existData = localStorage.getItem("userData")
    let userData = existData ? JSON.parse(existData) : [];
    userData[index] = dataObj
    console.log(userData[index]);

    localStorage.setItem("userData", JSON.stringify(userData))

  } else {
    result.textContent = "Please fill out all the fields"
  }

  dialog.classList.add("hidden");
  dialog.classList.remove("flex");
}



function validation() {
  const nameIsValid = usernameInput.value.length > 3 && /^[a-zA-Z][a-zA-Z0-9]*$/.test(usernameInput.value);
  usernameInput.classList.toggle('border-green-500', nameIsValid);
  usernameInput.classList.toggle('border-red-500', !nameIsValid);
  document.getElementById('full_name_result').textContent = nameIsValid ? "" : "Username is invalid";
  console.log(usernameInput.value);

  const emailIsValid = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)
  emailInput.classList.toggle('border-green-500', emailIsValid)
  emailInput.classList.toggle('border-red-500', !emailIsValid)
  document.getElementById('email_result').textContent = emailIsValid ? "" : "Email Id is invalid";
  console.log(emailInput.value);

  const phoneNoIsValid = /^(\+91)?\d{10}$/.test(phoneNoInput.value)
  phoneNoInput.classList.toggle('border-green-500', phoneNoIsValid)
  phoneNoInput.classList.toggle('border-red-500', !phoneNoIsValid)
  document.getElementById("phoneNo_result").textContent = phoneNoIsValid ? "" : "Mobile Number is Invalid"
  console.log(phoneNoInput.value);

  const cityIsValid = cityInput.value.length >= 3 && /^[a-zA-Z0-9]*$/.test(cityInput.value);
  cityInput.classList.toggle('border-green-500', cityIsValid),
    cityInput.classList.toggle('border-red-500', !cityIsValid)
  document.getElementById('city').textContent = cityIsValid ? "" : "city is Invalid"
  console.log(cityInput.value);

  return nameIsValid && emailIsValid && phoneNoIsValid && cityIsValid;
}
