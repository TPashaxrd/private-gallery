import { useEffect, useState } from "react";

type IOSSwitchProps = {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

export const IOSSwitch = ({ defaultChecked = false, onChange }: IOSSwitchProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
    localStorage.setItem("pinset", newChecked.toString());
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleToggle}
      />
      <div
        className={`
          w-11 h-6 bg-gray-500 peer-focus:outline-none
          rounded-full peer peer-checked:after:translate-x-full
          peer-checked:after:border-white after:content-['']
          after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:border-gray-300 after:border
          after:rounded-full after:h-5 after:w-5 after:transition-all
          ${checked ? "bg-blue-500" : "bg-gray-300"}
        `}
      />
    </label>
  );
};