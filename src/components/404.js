import React from "react";
import { useNavigate } from "react-router-dom";

const FourOFour = () => {
  const navigate = useNavigate();

  return (
    <div>
      FourOFour
      <button onClick={() => navigate("/login")}>hi</button>
    </div>
  );
};

export default FourOFour;
