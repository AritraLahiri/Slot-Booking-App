const form = document.getElementById("form");
const Slot = document.getElementById("showSlot");
const timeSlot = document.getElementById("timeSlot");
const slotRemaining = document.getElementById("slotRem");
const showSlot = document.getElementById("showSlot");
const bookSlotDiv = document.getElementById("bookSlotDiv");
const bookSlotForm = document.getElementById("bookSlotForm");
// const itemList = document.getElementById("list-expense");
fetchDataFromAPI();
bookSlotForm.addEventListener("submit", addBooking);

function addBooking(e) {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const slotID = document.getElementById("slotID").value;
  let userName = name;
  let userEmail = email;
  const userObj = { userName, userEmail, slotID };
  axios
    .post("http://localhost:3000/book-slot", userObj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
}

// function allStorage() {
//   var values = [],
//     keys = Object.keys(localStorage),
//     i = keys.length;

//   while (i--) {
//     values.push(JSON.parse(localStorage.getItem(keys[i])));
//   }
//   return values;
// }

function fetchDataFromAPI() {
  //const allExpenses = allStorage();
  axios.get("http://localhost:3000/get-slot").then((response) => {
    console.log(response.data);
    for (const slot of response.data) {
      let slotTime = slot.Time;
      let slotRem = slot.Remaining;
      let slotLink = slot.Link;

      let div = document.createElement("div");
      let innerDiv = document.createElement("div");
      let innerH5 = document.createElement("h5");
      let innerh6 = document.createElement("h6");
      //   // Add class
      div.className = "card col";
      innerDiv.className = "card-body";
      innerH5.className = "card-title";
      innerH5.innerText = slotTime;
      innerh6.className = "card-subtitle mb-2 text-body-secondary";
      innerh6.innerText = slotRem + " Slots Left";
      div.style = "width: 2rem;";
      var bookBtn = document.createElement("button");
      bookBtn.className = "btn btn-primary btn-sm";
      bookBtn.appendChild(document.createTextNode("Book"));
      bookBtn.addEventListener("click", function () {
        bookSlotDiv.hidden = false;
        document.getElementById("slotID").innerText = slot.id;
      });
      innerDiv.appendChild(innerH5);
      innerDiv.appendChild(innerh6);
      div.appendChild(innerDiv);
      innerDiv.appendChild(bookBtn);
      showSlot.appendChild(div);
    }
  });
}
