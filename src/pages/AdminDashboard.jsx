// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [users, setUsers] = useState([]); // Store all users
//   const [editUserId, setEditUserId] = useState(null); // Track which user is being edited
//   const [editUserData, setEditUserData] = useState({ name: "", email: "", role: "", status: "" });

//   useEffect(() => {
//     // Get user from sessionStorage
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (user) {
//       fetchUsers();
//     }
//   }, [user]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         withCredentials: true, // Ensures session authentication
//       });

//       setUsers(response.data); // Store users in state
//     } catch (error) {
//       console.error("Error fetching users:", error.response?.data || error.message);
//     }
//   };

//   // 🛑 Delete User Functionality
//   const handleDeleteUser = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/users/${userId}`, {
//         withCredentials: true, // Ensures session authentication
//       });

//       // Update state after deletion
//       setUsers(users.filter((u) => u.id !== userId));

//       alert("User deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting user:", error.response?.data || error.message);
//       alert("Failed to delete user.");
//     }
//   };

//   // ✏️ Handle Edit Click
//   const handleEditClick = (user) => {
//     setEditUserId(user.id);
//     setEditUserData({ name: user.name, email: user.email, role: user.role, status: user.status });
//   };

//   // 🔄 Handle Input Change
//   const handleInputChange = (e) => {
//     setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
//   };

//   // 💾 Handle Auto-Save on Blur
//   const handleUpdateUser = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/users/${editUserId}`, editUserData, { withCredentials: true });

//       // Update user list immediately
//       setUsers(users.map(user => (user.id === editUserId ? { ...user, ...editUserData } : user)));
//       setEditUserId(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error updating user:", error.response?.data || error.message);
//       alert("Failed to update user.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//       {user ? (
//         <div>
//           <p>Welcome, {user.name}!</p>
//           <p>Role: {user.role}</p>
//           <p>Email: {user.email}</p>

//           {/* 🚀 Register New User Button (Only Admin) */}
//           {user.role === "admin" && (
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//               onClick={() => navigate("/register")}
//             >
//               Register New User
//             </button>
//           )}

//           <h3 className="mt-4 text-xl font-semibold">All Users</h3>
//           <table className="w-full mt-2 border-collapse border border-gray-400">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Name</th>
//                 <th className="border p-2">Email</th>
//                 <th className="border p-2">Role</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id} className="border">
//                   <td className="border p-2">{user.id}</td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <input
//                         type="text"
//                         name="name"
//                         value={editUserData.name}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       />
//                     ) : (
//                       user.name
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <input
//                         type="email"
//                         name="email"
//                         value={editUserData.email}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       />
//                     ) : (
//                       user.email
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <select
//                         name="role"
//                         value={editUserData.role}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       >
//                         <option value="admin">Admin</option>
//                         <option value="manager">Manager</option>
//                         <option value="member">Member</option>
//                       </select>
//                     ) : (
//                       user.role
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <select
//                         name="status"
//                         value={editUserData.status}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       >
//                         <option value="active">Active</option>
//                         {/* <option value="inactive">Inactive</option> */}
//                       </select>
//                     ) : (
//                       user.status
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={handleUpdateUser}>
//                         ✅ Save
//                       </button>
//                     ) : (
//                       <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEditClick(user)}>
//                         ✏️ Edit
//                       </button>
//                     )}
//                     <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>
//                       ❌ Delete
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

// AdminDashBoard right functionality

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Info } from "lucide-react";

// const AdminDashboard = () => {

//   const [members, setMembers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     project_name: "",
//     deadline: "",
//     status: "active",
//     company_name: "",
//     assigned_members: [],
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMembers();
//     fetchProjects();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         withCredentials: true,
//       });
//       const filteredMembers = response.data.filter(user => user.role === "member");
//       setMembers(filteredMembers);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/projects/all", {
//         withCredentials: true,
//       });
//       setProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleMemberSelect = (memberId) => {
//     setFormData(prevState => {
//       const updatedMembers = prevState.assigned_members.includes(memberId)
//         ? prevState.assigned_members.filter(id => id !== memberId)
//         : [...prevState.assigned_members, memberId];
//       return { ...prevState, assigned_members: updatedMembers };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/projects/", formData, {
//         withCredentials: true,
//       });
//        // Reset the form fields after successful submission
//     setFormData({
//       project_name: "",
//       deadline: "",
//       status: "active",
//       company_name: "",
//       assigned_members: [],
//     });
//       setShowForm(false);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error creating project:", error);
//     }
//   };

//   const handleDelete = async (projectId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this project?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
//         withCredentials: true,
//       });
//       fetchProjects();
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

//       <div className="flex flex-col items-center p-10">
//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
//         >
//           Create Project
//         </button>
//       )}

//       {showForm && (
//         <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">New Project</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Project Name */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
//               <input
//                 type="text"
//                 name="project_name"
//                 value={formData.project_name}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Deadline */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Deadline</label>
//               <input
//                 type="date"
//                 name="deadline"
//                 value={formData.deadline}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Company Name */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
//               <input
//                 type="text"
//                 name="company_name"
//                 value={formData.company_name}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Assign Members */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Assign Members</label>
//               <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-auto bg-gray-50">
//                 {members.length > 0 ? (
//                   members.map((member) => (
//                     <label key={member.id} className="flex items-center justify-between space-x-2 py-1">
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.assigned_members.includes(member.id)}
//                           onChange={() => handleMemberSelect(member.id)}
//                           className="w-4 h-4"
//                         />
//                         <span>{member.name}</span>
//                       </div>

//                       {/* Tooltip */}
//                       <div className="relative group">
//                         <button className="text-gray-500 hover:text-blue-500">
//                           <Info size={16} />
//                         </button>
//                         <div className="absolute right-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex flex-col bg-white shadow-lg border border-gray-400 rounded-md p-2 text-sm w-40">
//                           <p className="text-gray-700"><strong>ID:</strong> {member.id}</p>
//                           <p className="text-gray-700"><strong>Role:</strong> {member.role}</p>
//                         </div>
//                       </div>
//                     </label>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm">No members available</p>
//                 )}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>

//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Projects</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Project ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Project Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Created By</th>
//                 <th className="border border-gray-300 px-4 py-2">Company</th>
//                 <th className="border border-gray-300 px-4 py-2">Deadline</th>
//                 {/*
//                 Right now we are hiding this  details
//                 <th className="border border-gray-300 px-4 py-2">Assigned Members</th>
//                  */}
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map(project => (
//                 <tr key={project.id} className="text-center">
//                   <td className="border border-gray-300 px-4 py-2">{project.id}</td>

//                   {/* <td className="border border-gray-300 px-4 py-2">{project.project_name}</td> */}
//                   <td className="border border-gray-300 px-4 py-2">
//   <button
//     onClick={() => navigate(`/project/${project.id}`)}
//     className="text-blue-600 hover:underline"
//   >
//     {project.project_name}
//   </button>
// </td>

//                   <td className="border border-gray-300 px-4 py-2">{project.created_by_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{project.company_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{project.deadline.split("T")[0]}</td>

//                   {/* this is hide the assigned memberes details */}
//                   {/* <td className="border border-gray-300 px-4 py-2">
//                     {project.assignedUsers?.length > 0
//                       ? project.assignedUsers.map(user => `${user.name} (${user.id})`).join(", ")
//                       : "No members assigned"}
//                   </td> */}
//                   <td className="border border-gray-300 px-4 py-2">
//                     <button
//                       onClick={() => handleDelete(project.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => navigate(`/kanban/${project.id}`)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 transition"
//                     >
//                       View Kanban Board
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Info } from "lucide-react";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [users, setUsers] = useState([]); // Store all users
//   const [editUserId, setEditUserId] = useState(null); // Track which user is being edited
//   const [editUserData, setEditUserData] = useState({ name: "", email: "", role: "", status: "" });

//   useEffect(() => {
//     // Get user from sessionStorage
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (user) {
//       fetchUsers();
//     }
//   }, [user]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         withCredentials: true, // Ensures session authentication
//       });

//       setUsers(response.data); // Store users in state
//     } catch (error) {
//       console.error("Error fetching users:", error.response?.data || error.message);
//     }
//   };

//   // 🛑 Delete User Functionality
//   const handleDeleteUser = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/users/${userId}`, {
//         withCredentials: true, // Ensures session authentication
//       });

//       // Update state after deletion
//       setUsers(users.filter((u) => u.id !== userId));

//       alert("User deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting user:", error.response?.data || error.message);
//       alert("Failed to delete user.");
//     }
//   };

//   // ✏️ Handle Edit Click
//   const handleEditClick = (user) => {
//     setEditUserId(user.id);
//     setEditUserData({ name: user.name, email: user.email, role: user.role, status: user.status });
//   };

//   // 🔄 Handle Input Change
//   const handleInputChange = (e) => {
//     setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
//   };

//   // 💾 Handle Auto-Save on Blur
//   const handleUpdateUser = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/users/${editUserId}`, editUserData, { withCredentials: true });

//       // Update user list immediately
//       setUsers(users.map(user => (user.id === editUserId ? { ...user, ...editUserData } : user)));
//       setEditUserId(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error updating user:", error.response?.data || error.message);
//       alert("Failed to update user.");
//     }
//   };

//   // Project functionality of the admin dashboard
//   const [members, setMembers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     project_name: "",
//     deadline: "",
//     status: "active",
//     company_name: "",
//     assigned_members: [],
//   });

//   useEffect(() => {
//     fetchMembers();
//     fetchProjects();
//   }, []);

//   const fetchMembers = async () => {
//     // const token = sessionStorage.getItem("token");
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         withCredentials: true,
//       });
//       const filteredMembers = response.data.filter(user => user.role === "member");
//       setMembers(filteredMembers);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/projects/all", {
//         withCredentials: true,
//       });
//       setProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleMemberSelect = (memberId) => {
//     setFormData(prevState => {
//       const updatedMembers = prevState.assigned_members.includes(memberId)
//         ? prevState.assigned_members.filter(id => id !== memberId)
//         : [...prevState.assigned_members, memberId];
//       return { ...prevState, assigned_members: updatedMembers };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/projects/", formData, {
//         withCredentials: true,
//       });
//        // Reset the form fields after successful submission
//     setFormData({
//       project_name: "",
//       deadline: "",
//       status: "active",
//       company_name: "",
//       assigned_members: [],
//     });
//       setShowForm(false);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error creating project:", error);
//     }
//   };

//   const handleDelete = async (projectId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this project?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
//         withCredentials: true,
//       });
//       fetchProjects();
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   // Profile picture upload functionality

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       console.error("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("profile_picture", selectedFile);

//     try {
//       const response = await fetch("http://localhost:5000/api/users/upload-profile", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const data = await response.json();
//       console.log("Upload successful:", data);

//       // ✅ Store FULL URL to make sure it works
//       const newProfilePicture = `http://localhost:5000${data.profile_picture}`;

//       const updatedUser = {
//         ...user,
//         profile_picture: newProfilePicture,
//       };

//       // ✅ Update session storage
//       sessionStorage.setItem("user", JSON.stringify(updatedUser));

//       // ✅ Force React to update UI
//       setUser(updatedUser);

//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//     }
//   };

//   return (

//     <>
//  <div className="p-6">
//       <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//       {user ? (
//         <div>

// <img
//   className="w-24 h-auto rounded-full object-fill border-2 border-gray-200 cursor-pointer"
//   src={user?.profile_picture ? `${user.profile_picture}?t=${new Date().getTime()}` : "http://localhost:5000/uploads/default-profile.png"}
//   alt="Profile"
// />

//         {/* ✅ Only one file input */}
//         <input  type="file" onChange={handleFileChange} className="p-1 border text-bold bg-gray-300 rounded-lg cursor-pointer" />
//         <p className=" cursor-pointer mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

//         {/* ✅ Upload button that works properly */}
//         <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 cursor-pointer" onClick={handleFileUpload}>
//           Upload
//         </button>

//           <p>Welcome, {user.name}!</p>
//           <p>Role: {user.role}</p>
//           <p>Email: {user.email}</p>

//           {/* 🚀 Register New User Button (Only Admin) */}
//           {user.role === "admin" && (
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//               onClick={() => navigate("/register")}
//             >
//               Register New User
//             </button>
//           )}

//           <h3 className="mt-4 text-xl font-semibold">All Users</h3>
//           <table className="w-full mt-2 border-collapse border border-gray-400">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Name</th>
//                 <th className="border p-2">Email</th>
//                 <th className="border p-2">Role</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id} className="border">
//                   <td className="border p-2">{user.id}</td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <input
//                         type="text"
//                         name="name"
//                         value={editUserData.name}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       />
//                     ) : (
//                       user.name
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <input
//                         type="email"
//                         name="email"
//                         value={editUserData.email}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       />
//                     ) : (
//                       user.email
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <select
//                         name="role"
//                         value={editUserData.role}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       >
//                         <option value="admin">Admin</option>
//                         <option value="manager">Manager</option>
//                         <option value="member">Member</option>
//                       </select>
//                     ) : (
//                       user.role
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <select
//                         name="status"
//                         value={editUserData.status}
//                         onChange={handleInputChange}
//                         onBlur={handleUpdateUser}
//                         className="border p-1 rounded w-full"
//                       >
//                         <option value="active">Active</option>
//                         {/* <option value="inactive">Inactive</option> */}
//                       </select>
//                     ) : (
//                       user.status
//                     )}
//                   </td>

//                   <td className="border p-2">
//                     {editUserId === user.id ? (
//                       <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={handleUpdateUser}>
//                         ✅ Save
//                       </button>
//                     ) : (
//                       <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEditClick(user)}>
//                         ✏️ Edit
//                       </button>
//                     )}
//                     <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>
//                       ❌ Delete
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>

//     {/* This is the project futionality of the admin dashboard */}
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

//       <div className="flex flex-col items-center p-10">
//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
//         >
//           Create Project
//         </button>
//       )}

//       {showForm && (
//         <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">New Project</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Project Name */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
//               <input
//                 type="text"
//                 name="project_name"
//                 value={formData.project_name}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Deadline */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Deadline</label>
//               <input
//                 type="date"
//                 name="deadline"
//                 value={formData.deadline}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Company Name */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
//               <input
//                 type="text"
//                 name="company_name"
//                 value={formData.company_name}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Assign Members */}
//             <div>
//               <label className="block text-gray-700 font-semibold mb-1">Assign Members</label>
//               <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-auto bg-gray-50">
//                 {members.length > 0 ? (
//                   members.map((member) => (
//                     <label key={member.id} className="flex items-center justify-between space-x-2 py-1">
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.assigned_members.includes(member.id)}
//                           onChange={() => handleMemberSelect(member.id)}
//                           className="w-4 h-4"
//                         />
//                         <span>{member.name}</span>
//                       </div>

//                       {/* Tooltip */}
//                       <div className="relative group">
//                         <button className="text-gray-500 hover:text-blue-500">
//                           <Info size={16} />
//                         </button>
//                         <div className="absolute right-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex flex-col bg-white shadow-lg border border-gray-400 rounded-md p-2 text-sm w-40">
//                           <p className="text-gray-700"><strong>ID:</strong> {member.id}</p>
//                           <p className="text-gray-700"><strong>Role:</strong> {member.role}</p>
//                         </div>
//                       </div>
//                     </label>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm">No members available</p>
//                 )}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>

//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Projects</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Project ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Project Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Created By</th>
//                 <th className="border border-gray-300 px-4 py-2">Company</th>
//                 <th className="border border-gray-300 px-4 py-2">Deadline</th>
//                 {/*
//                 Right now we are hiding this  details
//                 <th className="border border-gray-300 px-4 py-2">Assigned Members</th>
//                  */}
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map(project => (
//                 <tr key={project.id} className="text-center">
//                   <td className="border border-gray-300 px-4 py-2">{project.id}</td>

//                   {/* <td className="border border-gray-300 px-4 py-2">{project.project_name}</td> */}
//                   <td className="border border-gray-300 px-4 py-2">
//   <button
//     onClick={() => navigate(`/project/${project.id}`)}
//     className="text-blue-600 hover:underline"
//   >
//     {project.project_name}
//   </button>
// </td>

//                   <td className="border border-gray-300 px-4 py-2">{project.created_by_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{project.company_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{project.deadline.split("T")[0]}</td>

//                   {/* this is hide the assigned memberes details */}
//                   {/* <td className="border border-gray-300 px-4 py-2">
//                     {project.assignedUsers?.length > 0
//                       ? project.assignedUsers.map(user => `${user.name} (${user.id})`).join(", ")
//                       : "No members assigned"}
//                   </td> */}
//                   <td className="border border-gray-300 px-4 py-2">
//                     <button
//                       onClick={() => handleDelete(project.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => navigate(`/kanban/${project.id}`)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 transition"
//                     >
//                       View Kanban Board
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import {
  FaEdit,
  FaTrash,
  FaClipboardList,
  FaUsers,
  FaBriefcase,
  FaUserFriends,
  FaUserTie,
  FaTrashRestore,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // Store all users
  const [editUserId, setEditUserId] = useState(null); // Track which user is being edited
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });
  const [managerCount, setManagerCount] = useState(0);
  // This for the show the pie chart
  const [taskData, setTaskData] = useState([]);
  const COLORS = ["#0047AB", "#40E0D0", "#8A2BE2"];

  // THis is for to delete user completely from db
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [deletedProjects, setDeletedProjects] = useState([]);
   //THis is the log activity 
   const [activityLogs, setActivityLogs] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [searchTerm, setSearchTerm] = useState("");


  // Now this is the  fuctionality of the Pie chart

  // Function to fetch tasks
  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/api/task/tasks/all", {
        withCredentials: true, // Sends cookies (session token)
      })
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.error("Unexpected API response format", response.data);
          return;
        }

        const tasks = response.data;
        const statusCount = { todo: 0, "in-progress": 0, done: 0 };

        tasks.forEach((task) => {
          if (statusCount.hasOwnProperty(task.status)) {
            statusCount[task.status]++;
          } else {
            console.warn("Unexpected status:", task.status);
          }
        });

        setTaskData([
          { name: "To-Do", value: statusCount.todo },
          { name: "In Progress", value: statusCount["in-progress"] },
          { name: "Done", value: statusCount.done },
        ]);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    // Get user from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true, // Ensures session authentication
      });

      setUsers(response.data); // Store users in state
      // Count the number of managers
      const managers = response.data.filter((user) => user.role === "manager");
      setManagerCount(managers.length);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  // 🛑 Soft delete User

  const handleDeleteUser = async (userId, userRole) => {
    // Prevent deletion of another admin
    if (userRole === "admin") {
      alert("Action not allowed: Admins cannot delete other admins.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        withCredentials: true, // Ensures session authentication
      });
      fetchUsers();
      fetchDeletedUsers();

      // Update state after deletion
      setUsers(users.filter((u) => u.id !== userId));

      alert("User deleted successfully!");
    } catch (error) {
      // Show the actual error message from the backend
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      alert(errorMessage);
    }
  };

  //these are the functionality for the deleted ,restore users
  const fetchDeletedUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/trash",
        {
          withCredentials: true, // Ensures session token is sent
        }
      );
      setDeletedUsers(response.data.deletedUsers);
    } catch (error) {
      console.error("Error fetching deleted users:", error);
    }
  };

  const handleRestoreUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/restore/${userId}`,
        {}, // Empty body (if needed)
        {
          withCredentials: true, // ✅ Ensure credentials are sent in the config object
        }
      );
      fetchUsers();

      fetchDeletedUsers();
    } catch (error) {
      console.error("Error restoring user:", error);
    }
  };

  const handlePermanentDelete = async (userId) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this user?")
    ) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/users/trash/${userId}`, {
        withCredentials: true, // Ensures session token is sent
      });

      fetchDeletedUsers();
    } catch (error) {
      console.error("Error permanently deleting user:", error);
    }
  };

  // useEffect(() => {
  //   fetchUsers();
  //   fetchDeletedUsers(); // Load deleted users (trash)
  // }, []);

  // ✏️ Handle Edit Click
  // const handleEditClick = (user) => {
  //   setEditUserId(user.id);
  //   setEditUserData({ name: user.name, email: user.email, role: user.role, status: user.status });
  // };
  const handleEditClick = (user) => {
    if (!user) return; // Prevent error if user is undefined

    // Assuming "loggedInUser" stores the currently logged-in user
    if (user.role === "admin" && user.role === "admin") {
      alert("You cannot edit admin details.");
      return;
    }

    setEditUserId(user.id);
    setEditUserData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  // 🔄 Handle Input Change
  const handleInputChange = (e) => {
    setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
  };

  // 💾 Handle Auto-Save on Blur
  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${editUserId}`,
        editUserData,
        { withCredentials: true }
      );
      // Update user list immediately
      setUsers(
        users.map((user) =>
          user.id === editUserId ? { ...user, ...editUserData } : user
        )
      );
      setEditUserId(null); // Exit edit mode
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      alert("Failed to update user.");
    }
  };



// Log Activity in the admin Dashboard
const fetchActivityLogs = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || !user.id || !user.role) return;

  try {
    const response = await fetch(
      `http://localhost:5000/api/activity-log?user_id=${user.id}&role=${user.role}&page=${currentPage}&pageSize=10&search=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch logs");
    }

    const data = await response.json();
    setActivityLogs(data.logs || []);
    setTotalPages(data.totalPages || 1);
  } catch (error) {
    console.error("❌ Error fetching logs:", error.message);
  }
};






  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchUsers(); // Re-fetch users when the dashboard tab is active
      fetchMembers(); // Re-fetch members when the dashboard tab is active
      fetchProjects(); // Re-fetch projects when the dashboard tab is active
      fetchTasks();
      fetchActivityLogs(); // Re-fetch tasks when the dashboard tab is active
    }
  }, [activeTab, currentPage, searchTerm]);


 // ✅ Define filteredLogs safely
 const filteredLogs = Array.isArray(activityLogs)
 ? activityLogs.filter((log) =>
     log.User?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     new Date(log.createdAt).toLocaleDateString().includes(searchTerm)
   )
 : [];


  // Project functionality of the admin dashboard
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "",
    deadline: "",
    status: "active",
    company_name: "",
    assigned_members: [],
  });

  useEffect(() => {
    fetchMembers();
    fetchProjects();
    fetchUsers();
    fetchDeletedUsers();
  }, []);

  const fetchMembers = async () => {
    // const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      const filteredMembers = response.data.filter(
        (user) => user.role === "member"
      );
      setMembers(filteredMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/projects/all",
        {
          withCredentials: true,
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberSelect = (memberId) => {
    setFormData((prevState) => {
      const updatedMembers = prevState.assigned_members.includes(memberId)
        ? prevState.assigned_members.filter((id) => id !== memberId)
        : [...prevState.assigned_members, memberId];
      return { ...prevState, assigned_members: updatedMembers };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/projects/", formData, {
        withCredentials: true,
      });
      // Reset the form fields after successful submission
      setFormData({
        project_name: "",
        deadline: "",
        status: "active",
        company_name: "",
        assigned_members: [],
      });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Delete Project functionality
  // ✅ Fetch all active projects
  // ✅ Fetch deleted projects
  const fetchDeletedProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/projects/trash",
        {
          withCredentials: true,
        }
      );
      setDeletedProjects(response.data.deletedProjects);
    } catch (error) {
      console.error("Error fetching deleted projects:", error);
    }
  };

  // ✅ Handle deleting a project (soft delete)
  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        withCredentials: true,
      });
      fetchProjects();
      fetchDeletedProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // ✅ Handle restoring a deleted project
  const handleRestoreProject = async (projectId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/restore/${projectId}`,
        {}, // 🔹 PUT requests need a body, even if empty
        { withCredentials: true } // ✅ Ensure credentials are included
      );
      fetchProjects();
      fetchDeletedProjects();
    } catch (error) {
      console.error("Error restoring project:", error);
    }
  };

  // ✅ Handle permanent deletion of a project
  const handlePermanentDeleteProject = async (projectId) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this project?"
      )
    )
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/projects/trash/${projectId}`,
        {
          withCredentials: true,
        }
      );
      fetchDeletedProjects();
    } catch (error) {
      console.error("Error permanently deleting project:", error);
    }
  };

  // ✅ Fetch both active and deleted projects when component loads
  useEffect(() => {
    fetchProjects();
    fetchDeletedProjects();
  }, []);

  // Profile picture upload functionality

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/upload-profile",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload successful:", data);

      // ✅ Store FULL URL to make sure it works
      const newProfilePicture = `http://localhost:5000${data.profile_picture}`;

      const updatedUser = {
        ...user,
        profile_picture: newProfilePicture,
      };

      // ✅ Update session storage
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ Force React to update UI
      setUser(updatedUser);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="h-screen w-64 bg-black text-white p-6 flex flex-col items-center shadow-lg fixed left-0 top-0">
          <nav className="w-full flex flex-col items-center">
            {/* Profile Picture */}
            <img
              className="w-24 h-24 rounded-full border-2 border-gray-200 object-cover"
              src={
                user?.profile_picture
                  ? `${user.profile_picture}?t=${new Date().getTime()}`
                  : "http://localhost:5000/uploads/default-profile.png"
              }
              alt="Profile"
            />

            {/* Profile Upload Section */}
            <div className="w-full bg-gray-800 shadow-lg rounded-lg p-4 border mt-4 text-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="p-1 border bg-gray-700 text-white rounded-lg cursor-pointer w-full"
              />
              <p className="text-sm text-gray-400 mt-1">
                SVG, PNG, JPG, or GIF (MAX. 800x400px).
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-500 cursor-pointer"
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>

            {/* User Info */}
            <h3 className="mt-4 text-lg font-semibold">
              {user?.name || "Guest"}
            </h3>
            <p className="text-gray-400 text-sm">
              {user?.email || "No email provided"}
            </p>

            {/* Navigation Links */}
            <ul className="w-full mt-6 space-y-2 flex-1">
              {[
                { name: "Dashboard", key: "dashboard" },
                { name: "All Users", key: "users" },
                { name: "All Projects", key: "projects" },
                { name: "Trash", key: "trash" },
              ].map((item) => (
                <li
                  key={item.key}
                  className={`py-2 px-4 cursor-pointer text-center rounded-lg transition-all duration-200 ${
                    activeTab === item.key ? "bg-gray-600" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.name}
                </li>
              ))}

              {/* Logout Button */}
              <li
                className="py-2 px-4 cursor-pointer text-center bg-red-600 text-white rounded-lg hover:bg-red-500 mt-4"
                onClick={() => navigate("/logout")}
              >
                Logout
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 ml-60">
          {activeTab === "dashboard" && (
            <h2 className="text-5xl mb-4 font-bold text-center ">Dashboard</h2>
          )}
          <div>
            <div className="flow-root w-full">
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="float-left bg-blue-600 hover:bg-blue-700 pointer-events-auto text-white font-bold py-2 px-4 rounded-full ml-12 cursor-pointer"
                >
                  Create Project
                </button>
              )}
              <button
                onClick={() => navigate("/register")}
                className="float-right bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-12 cursor-pointer"
              >
                Register New User
              </button>
            </div>

            {activeTab === "dashboard" && (
              <>
              <div className="text-4xl font-bold text-gray-800 mb-4 text-center">
                <div className="text-4xl font-bold text-gray-800 mb-4 text-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                    {/* Total Users Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-200 hover:shadow-xl transition-all">
                      <div className="bg-purple-100 p-4 rounded-full flex items-center justify-center shadow-md">
                        <FaUsers className="text-purple-700 text-2xl " />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mt-2">
                        Total Users
                      </h3>
                      <p className="text-4xl font-bold text-gray-900 mt-3">
                        {users.length}
                      </p>
                    </div>

                    {/* Total Projects Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-200 hover:shadow-xl transition-all">
                      <div className="bg-purple-100 p-4 rounded-full flex items-center justify-center shadow-md">
                        <FaBriefcase className="text-orange-700 text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mt-2">
                        Total Projects
                      </h3>
                      <p className="text-4xl font-bold text-gray-900 mt-3">
                        {projects.length}
                      </p>
                    </div>

                    {/* All Members */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-200 hover:shadow-xl transition-all">
                      <div className="bg-purple-100 p-4 rounded-full flex items-center justify-center shadow-md">
                        <FaUserFriends className="text-blue-700 text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mt-2">
                        All Members
                      </h3>
                      <p className="text-4xl font-bold text-gray-900 mt-3">
                        {members.length}
                      </p>
                    </div>

                    {/* All Managers */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-gray-200 hover:shadow-xl transition-all">
                      <div className="bg-purple-100 p-4 rounded-full flex items-center justify-center shadow-md">
                        <FaUserTie className="text-teal-700 text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mt-2">
                        All Managers
                      </h3>
                      <p className="text-4xl font-bold text-gray-900 mt-3">
                        {managerCount}
                      </p>
                    </div>
                  </div>

                  {/* Pie Chart Section note that the Ui is creting issue for the mobile view so that is why we have multiple solution to choose
  right now we have chose one of them until the we resolve the mobile issue ok got it */}

                  {/* <div className="flex justify-center items-start p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
    <PieChart width={680} height={580}>
      <Pie
        data={taskData}
        cx="50%"
        cy="50%"
        outerRadius={120}
        innerRadius={60}
        paddingAngle={3}
        dataKey="value"
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
        labelLine={false} // Removes the unnecessary label line
      >
        {taskData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div> */}
                  <div className="mt-12 flex flex-col justify-center items-center ms-6 p-3 bg-white rounded-2xl shadow-lg border border-gray-200 h-1/2">
                    <h1 className="text-center text-2xl font-bold">
                      Task Status Overiew
                    </h1>

                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={taskData}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={50}
                          paddingAngle={3}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                          labelLine={true}
                        >
                          {taskData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                          wrapperStyle={{
                            fontSize: "12px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          layout="horizontal"
                          align="center"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* <div className="flex justify-center items-center ms-6 p-4 bg-white rounded-2xl shadow-lg border border-gray-200 w-[400px] h-[400px]">
  <PieChart width={350} height={350}>
    <Pie
      data={taskData}
      cx="50%"
      cy="50%"
      outerRadius={100}
      innerRadius={50}
      paddingAngle={3}
      dataKey="value"
      label={({ name, percent }) => (
        <text fontSize={1}>{`${name}: ${(percent * 100).toFixed(1)}%`}</text>
      )}
      labelLine={false}
    >
      {taskData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend wrapperStyle={{ fontSize: "12px" }} />
  </PieChart>
</div> */}
                </div>
              </div>
              

            <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Activity Logs</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by user or date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      {/* Activity Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Action</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No activity logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{log.User?.name || "Unknown"}</td>
                  <td className="py-2 px-4 capitalize">{log.User?.role || "N/A"}</td>
                  <td className="py-2 px-4 capitalize">{log.action_type}</td>
                  <td className="py-2 px-4">{log.description}</td>
                  <td className="py-2 px-4">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
             </div>


              </>

            )}

            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    New Project
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Project Name */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 ">
                        Project Name
                      </label>
                      <input
                        type="text"
                        name="project_name"
                        value={formData.project_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Deadline
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 "
                        required
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Assign Members */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Assign Members
                      </label>
                      <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-auto bg-gray-50">
                        {members.length > 0 ? (
                          members.map((member) => (
                            <label
                              key={member.id}
                              className="flex items-center justify-between space-x-2 py-1"
                            >
                              <div className="flex items-center space-x-2 cursor-pointer ">
                                <input
                                  type="checkbox"
                                  checked={formData.assigned_members.includes(
                                    member.id
                                  )}
                                  onChange={() => handleMemberSelect(member.id)}
                                  className="w-4 h-4 cursor-pointer"
                                />
                                <span>{member.name}</span>
                              </div>

                              {/* Tooltip */}
                              <div className="relative group ">
                                <button className="text-gray-500 hover:text-blue-500 cursor-pointer">
                                  <Info size={16} />
                                </button>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex flex-col bg-white shadow-lg border border-gray-400 rounded-md p-2 text-sm w-40">
                                  <p className="text-gray-700">
                                    <strong>ID:</strong> {member.id}
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Role:</strong> {member.role}
                                  </p>
                                </div>
                              </div>
                            </label>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No members available
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setShowForm(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {activeTab === "users" && (
            <div>
              <h3 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
                All Users
              </h3>
              <table className="w-full  border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="border p-3 text-left">Profile</th>
                    <th className="border p-3 text-left">Name</th>
                    <th className="border p-3 text-left">Email</th>
                    <th className="border p-3 text-left">Role</th>
                    <th className="border p-3 text-left">Status</th>
                    <th className="border p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-100">
                      {/* <td className="border p-3">{user.id}</td> */}
                      <td className="border p-3">
                        {user?.profile_picture ? (
                          <>
                            <img
                              className="w-15 h-15 rounded-full border-2 border-gray-200 object-cover"
                              src={`http://localhost:5000/uploads/${user.profile_picture}`}
                              alt="Profile"
                              onError={(e) => {
                                if (
                                  e.target.src !==
                                  "http://localhost:5000/uploads/default-profile.png"
                                ) {
                                  //  console.error("Image load error:", e.target.src);
                                  e.target.src =
                                    "http://localhost:5000/uploads/default-profile.png";
                                }
                              }}
                            />
                          </>
                        ) : (
                          <img
                            className="w-15 h-15 rounded-full border-2 border-gray-200 object-cover"
                            src="http://localhost:5000/uploads/default-profile.png"
                            alt="Default Profile"
                          />
                        )}
                      </td>

                      <td className="border p-3">
                        {editUserId === user.id ? (
                          <input
                            type="text"
                            name="name"
                            value={editUserData.name}
                            onChange={handleInputChange}
                            onBlur={handleUpdateUser}
                            className="border p-2 rounded w-full"
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="border p-3">
                        {editUserId === user.id ? (
                          <input
                            type="email"
                            name="email"
                            value={editUserData.email}
                            onChange={handleInputChange}
                            onBlur={handleUpdateUser}
                            className="border p-2 rounded w-full"
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="border p-3">
                        {editUserId === user.id ? (
                          <select
                            name="role"
                            value={editUserData.role}
                            onChange={handleInputChange}
                            onBlur={handleUpdateUser}
                            className="border p-2 rounded w-full"
                          >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="member">Member</option>
                          </select>
                        ) : (
                          user.role
                        )}
                      </td>
                      <td className="border p-3">
                        {editUserId === user.id ? (
                          <select
                            name="status"
                            value={editUserData.status}
                            onChange={handleInputChange}
                            onBlur={handleUpdateUser}
                            className="border p-2 rounded w-full"
                          >
                            <option value="active">Active</option>
                          </select>
                        ) : (
                          user.status
                        )}
                      </td>
                      <td className=" p-6 flex items-center gap-2">
                        {editUserId === user.id ? (
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            onClick={handleUpdateUser}
                          >
                            ✅ Save
                          </button>
                        ) : (
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 cursor-pointer"
                            onClick={() => handleEditClick(user)}
                          >
                            <FaEdit className="inline-block mr-1" /> Edit
                          </button>
                        )}
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <FaTrash className="inline-block mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              <h3 className="text-4xl font-semibold mb-4 text-center">
                All Projects
              </h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Project ID</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2">Created By</th>
                    <th className="border px-4 py-2">Company</th>
                    <th className="border px-4 py-2">Deadline</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="text-center border-b">
                      <td className="border px-4 py-2">{project.id}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="text-blue-600 hover:underline cursor-pointer"
                        >
                          {project.project_name}
                        </button>
                      </td>
                      <td className="border px-4 py-2">
                        {project.created_by_name}
                      </td>
                      <td className="border px-4 py-2">
                        {project.company_name}
                      </td>
                      <td className="border px-4 py-2">
                        {project.deadline.split("T")[0]}
                      </td>
                      <td className="border px-4 py-2 flex justify-center gap-2">
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                        >
                          <FaTrash className="inline-block mr-1" /> Delete
                        </button>
                        <button
                          onClick={() => navigate(`/kanban/${project.id}`)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                        >
                          <FaClipboardList className="inline-block mr-1" /> View
                          Board
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "trash" && (
           <>
           <div className="p-6">
             {/* Title */}
             <h3 className="text-4xl font-semibold text-center text-gray-800 mb-6">Trash</h3>
         
             {/* Deleted Users Section */}
             <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
               <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deleted Users</h3>
               <div className="overflow-x-auto">
                 <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                   <thead>
                     <tr className="bg-gray-200 text-gray-700">
                       <th className="border p-3 text-left">Profile</th>
                       <th className="border p-3 text-left">Name</th>
                       <th className="border p-3 text-left">Email</th>
                       <th className="border p-3 text-left">Role</th>
                       <th className="border p-3 text-center">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {deletedUsers.map((user) => (
                       <tr key={user.id} className="border-b hover:bg-gray-100 transition duration-200">
                         <td className="border p-3 text-center">
                           <img
                             className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                             src={user?.profile_picture ? `http://localhost:5000/uploads/${user.profile_picture}` : "http://localhost:5000/uploads/default-profile.png"}
                             alt="Profile"
                             onError={(e) => (e.target.src = "http://localhost:5000/uploads/default-profile.png")}
                           />
                         </td>
                         <td className="border p-3">{user.name}</td>
                         <td className="border p-3">{user.email}</td>
                         <td className="border p-3">{user.role}</td>
                         <td className="p-4 flex items-center justify-center gap-3">
                           <button
                             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center gap-2"
                             onClick={() => handleRestoreUser(user.id)}
                           >
                             <FaTrashRestore /> Restore
                           </button>
                           <button
                             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 flex items-center gap-2"
                             onClick={() => handlePermanentDelete(user.id)}
                           >
                             <FaTrash /> Delete
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
         
             {/* Deleted Projects Section */}
             <div className="bg-white shadow-lg rounded-lg p-6">
               <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deleted Projects</h3>
               <div className="overflow-x-auto">
                 <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                   <thead>
                     <tr className="bg-gray-200">
                       <th className="border px-4 py-2">Project ID</th>
                       <th className="border px-4 py-2">Project Name</th>
                       <th className="border px-4 py-2">Created By</th>
                       <th className="border px-4 py-2">Company</th>
                       <th className="border px-4 py-2">Deadline</th>
                       <th className="border px-4 py-2 text-center">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {deletedProjects.map((project) => (
                       <tr key={project.id} className="border-b hover:bg-gray-100 transition duration-200">
                         <td className="border px-4 py-2 text-center">{project.id}</td>
                         <td className="border px-4 py-2">{project.project_name}</td>
                         <td className="border px-4 py-2">{project.created_by_name}</td>
                         <td className="border px-4 py-2">{project.company_name}</td>
                         <td className="border px-4 py-2 text-center">{project.deadline.split("T")[0]}</td>
                         <td className="border px-4 py-2 flex items-center justify-center gap-3">
                           <button
                             onClick={() => handleRestoreProject(project.id)}
                             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center gap-2"
                           >
                             <FaTrashRestore /> Restore
                           </button>
                           <button
                             onClick={() => handlePermanentDeleteProject(project.id)}
                             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 flex items-center gap-2"
                           >
                             <FaTrash /> Delete
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         </>
         
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
