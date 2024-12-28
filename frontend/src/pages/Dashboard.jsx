import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [bal, setBal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    

    
      axios
        .get( "/api/v1/account/balance", 
          
        )
        .then((response) => {
          setBal(response.data.balance);
        })
        .catch((error) => {
          navigate("/login");
        });
    
  }, [navigate]);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={bal} />
        <Users />
      </div>
    </div>
  );
};