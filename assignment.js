var people = [];
function addPerson() {
  var name = document.getElementById("name").value;
  var contact = document.getElementById("contact").value;

  
  for (var i = 0; i < people.length; i++) {
    if (people[i].contact === contact) {
      alert("Error: Contact already exists");
      return;
    }
  }

  var isTenDigits = contact.match(/^\d{10}$/);
  if (!isTenDigits) {
    alert("Error: Contact must be exactly 10 digits");
    return;
  }

  var newPerson = { name: name, contact: contact };
  people.push(newPerson);
  people.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  updateList();

  document.getElementById("name").value = "";
  document.getElementById("contact").value = "";
}

function updateList(filteredPeople = people) {
  var list = document.getElementById("person-list");
  list.innerHTML = "";
  for (var i = 0; i < filteredPeople.length; i++) {
    var person = filteredPeople[i];
    var item = document.createElement("div");
    item.innerHTML = `
      <div>Name: ${person.name}</div>
      <div>Contact: ${person.contact}</div>
      <div>
        <button onclick="deletePerson(${i})">Delete</button>
      </div>
    `;
    list.appendChild(item);
  }
}

function search() {
  var searchQuery = document.getElementById("search-bar").value.toLowerCase();
  var filteredPeople = people.filter(function (person) {
    return person.name.toLowerCase().includes(searchQuery);
  });
  updateList(filteredPeople);
}

function deletePerson(index) {
  if (confirm("Are you sure you want to delete this person?")) {
    people.splice(index, 1);
    updateList();
  }
}
