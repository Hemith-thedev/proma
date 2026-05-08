import React, { useEffect, useState } from "react";
import { User } from "../../../data/types";
import axios from "axios";

export default function AdminUsers() {
  const [role, setRole] = useState(() => {
    const stored = localStorage.getItem("proma-role");
    return stored ? stored : "";
  });
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/get/users");
        setUsers(res.data.filter((user: User) => user.role === "teammate"));
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);
  return (
    <main
      className="proma-page min-w-full light no-scrollbar transition-all"
      // ref={container}
    >
      <h1 className="gradient-text mb-0">Users</h1>
      {[
        <>
          <div className="proma-table no-scrollbar">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Fullname</th>
                  <th>Email ID</th>
                  <th>Gender</th>
                  <th>Account Status</th>
                  <th>Registration Date-time</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={Number(user.id)}>
                    <td>{Number(user.id)}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.account_status}</td>
                    <td>{String(user.created_at)}</td>
                  </tr>
                ))}
                {users.map((user) => (
                  <tr key={Number(user.id)}>
                    <td>{Number(user.id)}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.account_status}</td>
                    <td>{String(user.created_at)}</td>
                  </tr>
                ))}
                {users.map((user) => (
                  <tr key={Number(user.id)}>
                    <td>{Number(user.id)}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.account_status}</td>
                    <td>{String(user.created_at)}</td>
                  </tr>
                ))}
                {users.map((user) => (
                  <tr key={Number(user.id)}>
                    <td>{Number(user.id)}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.account_status}</td>
                    <td>{String(user.created_at)}</td>
                  </tr>
                ))}
                {users.map((user) => (
                  <tr key={Number(user.id)}>
                    <td>{Number(user.id)}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.account_status}</td>
                    <td>{String(user.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>,
      ].map((section, index) => (
        <section key={index} className="flex">
          {section}
        </section>
      ))}
    </main>
  );
}
