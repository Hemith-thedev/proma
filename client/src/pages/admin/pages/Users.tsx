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
    <>
      <div className="flex h-fit w-full">
        <div className="relative gradient-bg w-full p-6 rounded-3xl">
          <div className="flex flex-col justify-between align-center h-fit w-full">
            <div className="flex flex-col">
              <h3 className="mb-0">Users</h3>
            </div>
          </div>
          <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
          <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
        </div>
      </div>
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
            {users.map((user) => {
              const createdDateTime = user.created_at ? new Date(user.created_at) : null;
              const date: string | null = createdDateTime ? `${createdDateTime.getDate()}-${createdDateTime.getMonth() + 1}-${createdDateTime.getFullYear()}` : null;
              const isAfterNoon: boolean | null = createdDateTime ? ((createdDateTime.getHours() < 12) ? false : true) : null;
              const time: string | null = createdDateTime ? `${(!isAfterNoon) ? createdDateTime.getHours() : createdDateTime.getHours() - 12}:${createdDateTime.getMinutes()}:${createdDateTime.getSeconds()}` : null;
              const meridian: string | null = (isAfterNoon && createdDateTime) ? ((isAfterNoon) ? "PM" : "AM") : null;
              return <tr key={Number(user.id)}>
                <td>{Number(user.id)}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.account_status}</td>
                <td>{`${date}, ${time} ${meridian}`}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
