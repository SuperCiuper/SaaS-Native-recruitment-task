import React, { useState } from "react";
import { API_URL } from "../../constants";
import "./AddApiaryModal.css";

const AddApiaryModal = ({ apiariesRefresh, visibilityToggle, visible }) => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  return (
    <div
      className="AddApiaryModal"
      style={{ visibility: visible ? "visible" : "hidden" }}
      onClick={() => {
        visibilityToggle();
      }}
    >
      <div className="Textbox" onClick={(event) => event.stopPropagation()}>
        <h1>Adding new apiary</h1>
        <label>
          Apiary name: &nbsp;
          <input
            value={selectedName}
            type="text"
            name="name"
            placeholder="Your apiary name"
            onChange={(event) => {
              setSelectedName(event.target.value);
            }}
          />
        </label>
        <br />
        <button
          className="AddApiaryBtn"
          onClick={() => {
            if (selectedName !== "") {
              let request = {
                method: "POST",
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: selectedName,
                  number: selectedNumber,
                }),
              };
              fetch(API_URL, request)
                .then(async (response) => {
                  if (response.ok) {
                    alert("Apiary added successfully");
                    apiariesRefresh();
                  } else {
                    console.log(response);
                    response = await response.json();
                    alert(response);
                  }
                })
                .then(visibilityToggle());

              setSelectedName("");
              setSelectedNumber("");
            } else {
              alert("Provide valid name");
            }
          }}
        >
          Add Apiary
        </button>
        <label>
          Apiary number: &nbsp;
          <input
            value={selectedNumber}
            type="number"
            name="number"
            placeholder="Your apiary number"
            onChange={(event) => {
              setSelectedNumber(event.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default AddApiaryModal;
