const form = document.getElementById('myForm');
const usernameInput = document.getElementById('full_name');
const emailInput = document.getElementById('email');
const phoneNoInput = document.getElementById('phoneNo');
const cityInput = document.getElementById('city');
const result = document.getElementById('result');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    dataStorage();
});

function dataStorage() {

    if (validation()) {

        let dataObj = {
            name: usernameInput.value,
            email: emailInput.value,
            contactNo: phoneNoInput.value,
            city: cityInput.value
        };

        let existData = localStorage.getItem("userData")
        let userData = existData ? JSON.parse(existData) : [];
        userData.push(dataObj)
        localStorage.setItem("userData", JSON.stringify(userData))

        location.reload()
        window.location.href = "/index.html";

    }else{
        result.textContent = "Please fill out all the fields"
    }
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