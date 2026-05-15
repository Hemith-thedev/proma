import { useEffect, useState } from "react";
import ToggleButton from "../../../components/common/ToggleButton";
import { Settings, User } from "../../../data/types";
import axios from "axios";
import Dropdown from "../../../components/common/Dropdown";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings["admin"]>({
    contact_no: "",
    recovery_email: "",
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    created_at: "",
    notifications: false,
    notification_sound: false,
    date_format: "",
    time_format: "",
  });
  const [user, setUser] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact_no: "",
    gender: "",
    role: "",
    account_status: "",
    created_at: new Date(),
  });
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/get/user/${localStorage.getItem("proma-id")}`);
      setUser(res.data);
    }
    fetchUser();
  }, []);
  return (
    <>
      <div className="flex h-fit w-full">
        <div className="relative gradient-bg w-full p-6 rounded-3xl">
          <div className="flex flex-col justify-between align-center h-fit w-full">
            <div className="flex flex-col">
              <h3 className="mb-0">Settings</h3>
            </div>
          </div>
          <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
          <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-6 h-fit w-full px-6">
        <div className="flex flex-col justify-start items-start h-fit w-full">
          <h6>Account</h6>
          <div className="relative flex flex-col justify-start items-start gap-6 h-fit w-full rounded-2xl p-6 bg-white/10">
            <div className="flex justify-between items-center h-fit w-full">
              <p>Firstname - <span className="text-gray-500">{user.first_name}</span></p>
            </div>
            <div className="flex justify-between items-center h-fit w-full">
              <p>Lastname - <span className="text-gray-500">{user.last_name}</span></p>
            </div>
            <div className="flex justify-between items-center h-fit w-full">
              <p>Fullname - <span className="text-gray-500">{user.first_name} {user.last_name}</span></p>
            </div>
            <div className="flex justify-between items-center h-fit w-full">
              <p>Gender - <span className="text-gray-500">{user.gender}</span></p>
            </div>
            <button className="absolute top-4 right-4 proma-primary-button green-button">Edit</button>
          </div>
        </div>
        {[
          {
            heading: "Notifications",
            sub_settings: [
              {
                label: "You want Notifications?",
                actionElement: <ToggleButton
                  onToggle={() => {
                    setSettings((prev) => ({
                      ...prev,
                      notifications: !prev.notifications
                    }));
                  }}
                  checked={settings.notifications}
                />
              },
              settings.notifications === true && {
                label: "Then, what about the Notification sound?",
                condition: settings.notifications,
                actionElement: <ToggleButton
                  onToggle={() => {
                    setSettings((prev) => ({
                      ...prev,
                      notification_sound: !prev.notification_sound
                    }))
                  }}
                  checked={settings.notification_sound}
                />
              }
            ]
          }
        ].map((setting, i) => {
          return (
            <div className="flex flex-col justify-start items-start h-fit w-full" key={i}>
              <h6>{setting.heading}</h6>
              <div className="flex flex-col justify-start items-start gap-6 h-fit w-full rounded-2xl p-6 bg-white/10">
                {
                  setting.sub_settings.map((sub_setting, j) => {
                    if (sub_setting) {
                      return (
                        <div className="flex justify-between items-center h-fit w-full" key={j}>
                          <p>{sub_setting.label}</p>
                          {sub_setting.actionElement}
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
          )
        })}
        <div className="flex flex-col justify-start items-start h-fit w-full">
          <h6 className="text-red-500">Danger Zone</h6>
          <div className="flex flex-col justify-start items-start gap-6 h-fit w-full rounded-2xl p-6 bg-white/10">
            <button>Delete Account</button>
          </div>
        </div>
      </div>
    </>
  )
}