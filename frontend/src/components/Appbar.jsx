import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/v1/users/current-user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);
  

  

const logoutUser = async () => {
    try {
        // Call the logout API
        const response = await axios.get("/api/v1/users/logout", {
            withCredentials: true, // Ensure cookies are included in the request
        });

        console.log(response.data.message); // "User logged Out"

        // Redirect the user to the login page or homepage
       navigate("/login");// Redirect after logout
    } catch (error) {
        console.error("Error logging out:", error.response?.data || error.message);
        alert("Failed to log out. Please try again.");
    }
};


  return (
    <div className="shadow h-14 flex justify-between items-center md:px-10">
      <Link to={"/dashboard"}>
        <div className="flex flex-col justify-center h-full ml-4 font-bold">
          PayTM App
        </div>
      </Link>
      <div className="flex items-center justify-center gap-2">
        <Button label={"Sign Out"} onClick={logoutUser} />
        <div className="flex flex-col justify-center h-full mr-4">
          {user?.fullName}
        </div>
        <div className="rounded-full h-10 w-10 p-4 bg-slate-200 flex justify-center mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user?.fullName}
          </div>
        </div>
      </div>
    </div>
  );
};