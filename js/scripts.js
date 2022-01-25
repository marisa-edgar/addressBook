// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};


AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = {};
}
function Address (address, workAddress, email, workEmail) {
  this.address = address;
  this.workAddress = workAddress;
  this.email = email;
  this.workEmail = workEmail;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.addAddress = function(address) {
  return this.address = address;
};
// User Interface Logic ---------
let addressBook = new AddressBook();
let contact = new Contact();
let address =new Address();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  console.log(contact.address)
  $("#show-address").show();
  $(".address").html(contact.address.address);
  $(".work-address").html(contact.address.workAddress);
  $(".email").html(contact.address.email);
  $(".work-email").html(contact.address.workEmail);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    let inputtedAddress = $('input#new-address').val();
    let inputtedWorkAddress = $('input#new-work-address').val();
    let inputtedEmail = $('input#new-email').val();
    let inputtedWorkEmail = $('input#new-work-email').val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");
    $("input#new-work-address").val("");
    $("input#new-email").val("");
    $("input#new-work-email").val("");
    let newAddress = new Address(inputtedAddress, inputtedWorkAddress, inputtedEmail, inputtedWorkEmail);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress);
    addressBook.addContact(newContact);
    newContact.addAddress(newAddress);
    displayContactDetails(addressBook);
  });
});