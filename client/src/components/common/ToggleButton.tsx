import { useState } from "react";

export default function ToggleButton(
  {
    checked,
    onToggle
  }: {
    checked?: boolean,
    onToggle: () => void
  }
) {
  return (
    <button
      type="button"
      className={`relative min-h-6 min-w-12 bg-white/20 rounded-full cursor-pointer`}
      onClick={onToggle}>
      {/* <div className="absolute gradient-bg h-full w-full opacity-30"></div> */}
      <div className={`absolute top-0 ${checked ? "left-1/2 opacity-100" : "left-0 opacity-0"} bg-purple-700 h-full w-1/2 rounded-full mix-blend-plus-lighter brightness-200 blur-3xl pointer-events-none`}></div>
      <div className={`absolute top-0 ${checked ? "left-1/2 opacity-100" : "left-0 opacity-0"} bg-purple-700 h-full w-1/2 rounded-full mix-blend-plus-lighter brightness-200 blur-2xl pointer-events-none`}></div>
      <div className={`absolute top-0 ${checked ? "left-1/2 opacity-100" : "left-0 opacity-0"} bg-purple-700 h-full w-1/2 rounded-full mix-blend-plus-lighter brightness-200 blur-xl pointer-events-none`}></div>
      <div className={`absolute top-0 ${checked ? "left-1/2" : "left-0"} gradient-bg h-full w-1/2 rounded-full`}></div>
    </button>
  )
}