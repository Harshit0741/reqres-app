import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateUser } from "../services/api";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [originalUser, setOriginalUser] = useState(null);
  const [user, setUser] = useState(location.state?.user || { first_name: "", last_name: "", email: "" });

  useEffect(() => {
    const loadUser = async () => {
      try {
        
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];
        const localUser = localUsers.find((u) => u.id === parseInt(id));

        if (localUser) {
          setUser(localUser);
          setOriginalUser(localUser);
        } else {
          const response = await fetchUsers();
          const userData = response.data.data.find((u) => u.id === parseInt(id));

          if (userData) {
            setUser(userData);
            setOriginalUser(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (!location.state?.user) {
      loadUser();
    } else {
      setOriginalUser(location.state.user);
    }
  }, [id, location.state]);

  const isChanged = JSON.stringify(user) !== JSON.stringify(originalUser);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!isChanged) {
      alert("No changes detected. Please update the details before submitting.");
      return;
    }

    try {
      await updateUser(id, user); 
      alert("User details updated successfully! (Saved locally)");

 
      const localUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = localUsers.map((u) => (u.id === user.id ? user : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      navigate("/users", { state: { updatedUser: user } });
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update user. (Note: ReqRes does not allow actual updates)");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-6">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Edit User</h2>
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label htmlFor="first_name" className="block text-gray-700 font-semibold mb-2">First Name</label>
            <input 
              id="first_name"
              type="text" 
              value={user.first_name} 
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              required
              className="text-gray-500 w-full p-3 border border-gray-300 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input 
              id="last_name"
              type="text" 
              value={user.last_name} 
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              required
              className="text-gray-500 w-full p-3 border border-gray-300 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              id="email"
              type="email" 
              value={user.email} 
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="text-gray-500 w-full p-3 border border-gray-300 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>
          <button 
            type="submit"
            disabled={!isChanged}
            className={`w-full p-2 sm:p-3 rounded-lg font-bold shadow-md transition duration-300 ${
              !isChanged ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
