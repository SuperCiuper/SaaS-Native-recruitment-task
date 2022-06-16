import React, { useEffect, useState } from "react";
import { AddApiaryModal } from "../../components";
import { API_URL } from "../../constants";
import "./ApiaryView.css";

const ApiaryView = () => {
  const [apiaries, setApiaries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const visibilityToggle = () => {
    setModalVisible(!modalVisible);
  };

  const fetchApiaries = () => {
    fetch(API_URL)
      .then((response) =>
        response.ok ? response.json() : Promise.reject("Response not ok")
      )
      .then((response) => {
        console.log(response);
        setApiaries(response);
      });
  };
  useEffect(() => {
    fetchApiaries();
  }, []);

  return (
    <div className="ApiaryView">
      <h1>Apiary view</h1>
      <p>Lots to see here</p>
      <button
        className="AddApiaryBtn"
        onClick={() => {
          visibilityToggle();
          console.log(modalVisible);
        }}
      >
        Add Apiary
      </button>
      <AddApiaryModal
        apiariesRefresh={fetchApiaries}
        visibilityToggle={visibilityToggle}
        visible={modalVisible}
      />
    </div>
  );
};

export default ApiaryView;
