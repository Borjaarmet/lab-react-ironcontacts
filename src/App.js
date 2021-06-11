import React, { Component, Fragment } from "react";
import contactsJSON from "./contacts.json";

import "./App.css";

class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: contactsJSON.splice(0, 15),
    };
  }

  handleRandomContact = () => {
    console.log(this.state.contacts.length);
    const newCopy = [...this.state.contacts];
    let randomIndex = Math.floor(Math.random() * contactsJSON.length);
    console.log(randomIndex);

    let randomContact = contactsJSON.splice(randomIndex, 1);
    console.log(randomContact);
    let newCopyWithRandom = [...randomContact, ...newCopy];

    this.setState({
      contacts: newCopyWithRandom,
    });
  };

  handleSortByName = () => {
    const { contacts } = this.state;
    const newCopy = [...contacts];
    console.log("newCopy", newCopy);
    newCopy.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.setState({
      contacts: newCopy,
    });
  };

  handleSortByPop = () => {
    console.log("click");
    const { contacts } = this.state;

    const newCopy = [...contacts];
    newCopy.sort(function (a, b) {
      if (a.popularity < b.popularity) {
        return 1;
      } else if (a.popularity > b.popularity) {
        return -1;
      }
      return 0;
    });

    this.setState({
      contacts: newCopy,
    });
  };

  handleDelete = (id) => {
    const newCopy = this.state.contacts.filter((contact) => {
      return contact.id !== id;
    });

    this.setState({
      contacts: newCopy,
    });
  };

  render() {
    return (
      <Fragment>
        <div className="flex justify-between border-2 p-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 sticky top-0">
          <button
            onClick={this.handleRandomContact}
            className="float-right border-1 p-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500  text-white shadow-md rounded-md"
          >
            <span>Add Random contact</span>
          </button>
          <button
            onClick={this.handleSortByName}
            className="float-right border-1 p-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500  text-white shadow-md rounded-md"
          >
            <span>Sort by name</span>
          </button>
          <button
            onClick={this.handleSortByPop}
            className="float-right border-1 p-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500  text-white shadow-md rounded-md"
          >
            <span>Sort by popularity</span>
          </button>
        </div>
        <h1 className="center-text text-4xl m-6">IronContacts</h1>
        <div className="flex flex-wrap justify-center ">
          {this.state.contacts.map((contact, index) => {
            return (
              <div
                key={index}
                className="box-content flex justify-arround w-1/4 m-6 border-2 rounded-md p-2  shadow-2xl bg-gradient-to-r from-transparent via-gray-100 to-gray-300"
              >
                <div>
                  <img
                    className="w-38 h-44 mr-4  rounded-md box-content "
                    src={contact.pictureUrl}
                    alt="profile"
                  />
                </div>
                <div className="flex justify-right w-1/2 flex-col ">
                  <h3 className="text-xl text-center mt-4 mb-2">
                    {contact.name}
                  </h3>
                  <h4 className="text-center font-bold">
                    Popularity:
                    <br />
                    <span className="font-light ">
                      {" "}
                      {contact.popularity.toFixed(2)}{" "}
                    </span>
                  </h4>
                  <div className=" mt-4 border-2 mr-4 ml-4 bg-gradient-to-r from-transparent via-gray-100 to-gray-300 shadow-2xl">
                    <button
                      onClick={() => this.handleDelete(contact.id)}
                      className="text-2xl"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ContactList />
    </div>
  );
}

export default App;
