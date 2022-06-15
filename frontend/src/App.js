import { Routes, Route } from "react-router-dom";
import { ApiaryView } from "./views";

const App = () => {
  return (
    <>
      <p>XD</p>
      <Routes>
        <Route path="/" element={<ApiaryView />} />
        <Route path="/apiaryList" element={<ApiaryView />} />
      </Routes>
      <p>adas</p>
    </>
  );
};

export default App;
