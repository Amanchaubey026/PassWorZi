function maskPassword(pass) {
  str = "";
  for (let index = 0; index < pass.length; index++) {
    str +=  "*";
  }
  return str;
}
function copyText(txt) {
  navigator.clipboard
    .writeText(txt)
    .then(() => {
      // alert(`Copied the text: ${txt}`);
      document.getElementById("alert").style.display = "inline";
      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 600);
    })
    .catch((error) => {
      console.error("Unable to copy text: ", error);
    });
}

const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let array = JSON.parse(data);
  arrUpdated = array.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  showPassword();
};

//Logic to fill tde table
const showPassword = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No data show";
  } else {
    tb.innerHTML = `<tr>
    <th>website</th>
    <th>username</th>
    <th>password</th>
    <th>delete</th>
    </tr>`;
    let array = JSON.parse(data);
    str = "";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];

      str = `<tr>
      <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy Button"></td>
        <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Button"></td>
        <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Button"></td>
        <td><button class="btnsm" onclick="deletePassword('${element.website}')">delete</button></td>
        </tr>`;
      tb.innerHTML = tb.innerHTML + str;
    }
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

console.log("working");
showPassword();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("password saved!!");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("password saved!!");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPassword();
});
