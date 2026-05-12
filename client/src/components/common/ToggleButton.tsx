import { useState } from "react";

export default function ToggleButton(
  {
    checked,
    height = 6,
    onToggle
  }: {
    checked?: boolean,
    height: number,
    onToggle: () => void
  }
) {
  const [isOn, setIsOn] = useState(false);
  return (
    <div
      className={`relative h-${height} w-${height * 2} bg-primary-200 rounded-full`}
      onClick={() => onToggle()}>
      <div className="absolute gradient-bg h-full w-full"></div>
      <div className=""></div>
    </div>
  )
}