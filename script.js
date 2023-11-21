const form = document.getElementById("form");
const Slot = document.getElementById("showSlot");
const timeSlot = document.getElementById("timeSlot");
const slotRemaining = document.getElementById("slotRem");
const showSlot = document.getElementById("showSlot");
const bookSlotDiv = document.getElementById("bookSlotDiv");
const bookSlotForm = document.getElementById("bookSlotForm");
const showBooking = document.getElementById("ShowBooking");
// const itemList = document.getElementById("list-expense");
fetchDataFromAPI();
fetchAllBookingData();
bookSlotForm.addEventListener("submit", addBooking);

function addBooking(e) {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const slotID = document.getElementById("slotID").innerText;
  console.log(slotID);
  let userName = name;
  let userEmail = email;
  const userObj = { userName, userEmail, slotID };
  axios
    .post("http://localhost:3000/book-slot", userObj)
    .then((response) => {
      bookSlotDiv.hidden = true;
      fetchAllBookingData();
      console.log(response);
    })
    .catch((err) => console.log(err));
}

function fetchAllBookingData() {
  axios
    .get("http://localhost:3000/show-booking")
    .then((response) => {
      console.log(response.data);
      for (const user of response.data) {
        if (user.Users.length > 0) {
          for (const details of user.Users) {
            let name = details.Name;
            let email = details.Email;
            let time = user.Time;
            let link = user.Link;

            let div = document.createElement("div");
            let innerDiv = document.createElement("div");
            let a = document.createElement("a");
            let innerH5 = document.createElement("h5");
            let innerh6 = document.createElement("h6");
            //   // Add class
            div.className = "card";
            innerDiv.className = "card-body";
            innerH5.className = "card-title";
            innerH5.innerText = name;
            a.href = link;
            a.innerText = "JOIN";
            a.className = "btn btn-primary btn-sm";
            innerh6.className = "card-subtitle mb-2 text-body-secondary";
            innerh6.innerText = time;
            div.style = "width: 15rem;";
            var bookBtn = document.createElement("button");
            bookBtn.className = "btn btn-danger btn-sm";
            bookBtn.appendChild(document.createTextNode("Cancel"));
            bookBtn.addEventListener("click", function () {
              console.log(details.id);
              axios
                .delete(`http://localhost:3000/delete/${details.id}`)
                .then((response) => {
                  div.remove();
                  console.log(showBooking);
                  fetchAllBookingData();
                  console.log(response);
                })
                .catch((err) => console.log(err));
            });
            innerDiv.appendChild(innerH5);
            innerDiv.appendChild(innerh6);
            div.appendChild(innerDiv);
            innerDiv.appendChild(bookBtn);
            innerDiv.appendChild(a);
            showBooking.appendChild(div);
          }
        }
      }
    })
    .catch((err) => console.log(err));
}

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
