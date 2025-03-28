import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await loginUser(email, password);
        
        if (response.status === 200) {
          const token = response.data.token; 
          if (token) {
            localStorage.setItem("authToken", token);
            alert("Login successful!");
            navigate("/users"); 
          } else {
            alert("Login failed. No token received.");
          }
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert("Invalid email or password.");
      }
    
      setLoading(false);
    };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-6">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-gray-500 w-full p-3 border border-gray-300 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-gray-500 w-full p-3 border border-gray-300 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold shadow-md transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
