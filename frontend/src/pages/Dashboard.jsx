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
    

    
      try {
        axios
          .get( "/api/v1/account/balance", 
            
          )
          .then((response) => {
            setBal(response.data.data);
          })
      } catch (error) {
        console.error("fetching in dashboard usereffect", error);
      alert("fetching in dashboard usereffect failed");
        
      }
        
    
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