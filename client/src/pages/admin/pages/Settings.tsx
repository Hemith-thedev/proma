import { useState } from "react"
import ToggleButton from "../../../components/common/ToggleButton"

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
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
      <div className="flex flex-col justify-start items-start h-fit w-full px-6">
        <div className="flex flex-col justify-start items-start h-fit w-full">
          <h6>Interface</h6>
          <div className="flex flex-col justify-start items-start gap-6 h-fit w-full rounded-2xl p-6 bg-primary-100">
            <div className="flex justify-between items-center h-fit w-full">
              <p>Dark Mode</p>
              <ToggleButton onToggle={() => {}} height={6} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}