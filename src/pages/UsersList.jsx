import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import { Link, useLocation } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers(page);
      const fetchedUsers = response.data.data;
  
      setUsers(fetchedUsers);
      setHasMore(fetchedUsers.length > 0); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (location.state?.updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === location.state.updatedUser.id ? location.state.updatedUser : user
        )
      );
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted sucessfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-7xl min-h-[80vh] flex flex-col justify-between">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Users List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 flex-grow">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-100 p-5 sm:p-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
              <img 
                src={user.avatar} 
                alt="avatar" 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto border-4 border-blue-400 shadow-md" 
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">{user.first_name} {user.last_name}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
              
              <div className="flex justify-center gap-3 sm:gap-4 mt-4">
                <Link 
                  to={`/edit/${user.id}`} 
                  state={{ user }}  
                  className="bg-green-500 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                >
                  Edit
                </Link>
                <button 
                  className="bg-red-500 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setPage(page - 1)} 
            disabled={page === 1} 
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition ${
              page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>
          <span className="px-6 py-3 text-lg font-semibold text-gray-700 mx-4">Page {page}</span>
          <button 
            onClick={() => {if (hasMore && page < 2) setPage(page + 1);}} 
            disabled={!hasMore}  
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition ${
                !hasMore || page==2 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
    >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
