# Users Management App

This project is a user management system built using React that allows fetching, editing, and deleting users. Since the ReqRes API does not persist updates, a local storage mechanism is used to retain user modifications.

🚀 **Live Demo:** [Click here to view the website](https://your-github-username.github.io/reqres-app/)  

## Features
- Fetch user list from API
- Edit user details (stored in local storage)
- Delete users (also reflected in local storage)
- Pagination for user list

## Issue Faced
### API Limitation:
The ReqRes API does not allow actual updates (`PUT` requests do not persist changes).

### Solution:
- Fetch user data once and store it in `localStorage`.
- Apply updates and deletions within the frontend.
- Update local storage after any modification.

## 💾 Implementation of Local Storage
### Fetching Users:
```javascript
useEffect(() => {
  const loadUsers = async () => {
    try {
      const localUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (localUsers.length > 0) {
        setUsers(localUsers);
        return;
      }
      const response = await fetchUsers(page);
      const fetchedUsers = response.data.data;
      setUsers(fetchedUsers);
      localStorage.setItem("users", JSON.stringify(fetchedUsers));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  loadUsers();
}, [page]);
```

### Updating User:
```javascript
const handleUpdate = async (e) => {
  e.preventDefault();
  if (!isChanged) {
    alert("No changes detected. Please update the details before submitting.");
    return;
  }
  try {
    await updateUser(id, user); // Fake API call
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
```

### Deleting User:
```javascript
const handleDelete = async (id) => {
  try {
    await deleteUser(id); // Fake API call
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("🗑️ User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
```

## 🚀 How to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm start
```

### 4️⃣ Open in Browser
Go to `http://localhost:3000`

---




