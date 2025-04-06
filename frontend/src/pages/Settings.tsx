import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IOSSwitch } from "../components/IOSSwitch";
import toast, { Toaster } from "react-hot-toast";
import PassSec from "../components/Security/LocalPIN";
import { BiMinus, BiPlus } from "react-icons/bi";
import { config } from "../data/config";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Settings = () => {
    const [settings, setSettings] = useState({
        showPinOnEntry: false,
        changePinActive: false,
    });
    const [pin, setPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [checkSwitch, setCheckSwitch] = useState(false);
    const [askClear, setAskClear] = useState(false);
    const [isPrivate, setIsPrivate] = useState(() => {
      return localStorage.getItem("privated") === "true";
  });
  
  function handleAllClear() {
      localStorage.clear();
      toast.success("All data has been cleared!", {
          style: {
              backgroundColor: "#282828",
              color: "#D4BE98",
          }
      });
      localStorage.setItem("privated", "true");
      setIsPrivate(true);
  }
  
  function privateAll() {
      localStorage.setItem("privated", "true");
      window.location.reload();
      setIsPrivate(true);
  }
  
  function removeHide() {
      localStorage.setItem("privated", "false");
      setIsPrivate(false);
      window.location.reload();
  }
  
  useEffect(() => {
      const checkPrivate = localStorage.getItem("privated");
      if (checkPrivate !== null) {
          setIsPrivate(checkPrivate === "true");
      }
  }, []);

  useEffect(() => {
    const checkPrivate = localStorage.getItem("privated");
    if (checkPrivate === "true") {
        setIsPrivate(true);
          } else if (!checkPrivate) {
        setIsPrivate(false);
    }
}, []);

 useEffect(() => {
    const storedShowPIN = localStorage.getItem("pinset");
    if (storedShowPIN === "true") {
      setCheckSwitch(true); 
      setSettings((prev) => ({ ...prev, showPinOnEntry: true }));
    } else {
      setCheckSwitch(false);
      setSettings((prev) => ({ ...prev, showPinOnEntry: false }));
    }
  }, []);
  
  const toggleSwitch = () => {
    const newValue = !checkSwitch;
    setCheckSwitch(newValue);
    setSettings((prev) => ({ ...prev, showPinOnEntry: newValue }));
    localStorage.setItem("pinset", newValue.toString())
    toast.success(
      `Show PIN on entry is now ${newValue ? "enabled" : "disabled"}.`,
      {
        style: {
          backgroundColor: "#282828",
          color: "#D4BE98",
        },
      }
    );
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem("password");

    if (!storedPin) {
      toast.error("No PIN is set currently!", {
        style: {
          backgroundColor: "#282828",
          color: "#D4BE98",
        },
      });
      return;
    }

    if (storedPin !== pin) {
      toast.error("Current PIN is incorrect!", {
        style: {
          backgroundColor: "#282828",
          color: "#D4BE98",
        },
      });
      return;
    }

    if (newPin !== confirmPin) {
      toast.error("New PINs do not match!", {
        style: {
          backgroundColor: "#282828",
          color: "#D4BE98",
        },
      });
      return;
    }

    localStorage.setItem("password", newPin);
    toast.success("PIN updated successfully!", {
      style: {
        backgroundColor: "#282828",
        color: "#D4BE98",
      },
    });

    setSettings((prev) => ({ ...prev, changePinActive: false }));
    setPin("");
    setNewPin("");
    setConfirmPin("");
  };

  return (
    <>
     <title>{config.name}</title>
      <Header />
      <div className="flex flex-col items-center justify-center mt-24 mb-10">
        <h1 className="flex gap-2 text-3xl text-[#D4BE98] border-b border-[#D4BE98] pb-2 mb-4">
          <span className="mt-1">Settings</span>
        </h1>

        {/* 1- Clear ALL
            2- Set Private ALL
            3- Set Private Favorites
            4- Clear All Files */}

        <div className="bg-[#1D2021] w-full px-4 py-6 rounded-lg max-w-3xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#3C3836] pb-4">
            <div>
              <h3 className="text-[#D4BE98] text-lg">Ask PIN when entering site</h3>
              <p className="text-[#A89984] text-sm">
                (Guard+) Automatically display your PIN on login
              </p>
            </div>
            <IOSSwitch defaultChecked={checkSwitch} onChange={toggleSwitch} />
            </div>

            <div className="bg-[#1D2021] flex flex-col w-full rounded-lg max-w-3xl space-y-6">
            <div className="flex flex-col border-b border-[#3C3836] pb-4">
                <p className="text-base font-medium">Clear All Data</p>
                <p className="text-sm text-[#A89984]">
                Will clear all your data including favorites, pin and settings.
                </p>
                <div className="text-end -mt-12">
                 <button
                  className="font-roboto bg-[#D4BE98] text-[#1D2021] py-2 px-4 rounded hover:bg-[#A89984] transition"
                  onClick={() => {
                     setAskClear(true);
                 }}
               >
                 Clear All Data
               </button>
              </div>
            </div>
            </div>

            <div className="bg-[#1D2021] flex flex-col w-full rounded-lg max-w-3xl space-y-6">
            <div className="flex flex-col border-b border-[#3C3836] pb-4">
              <p className="text-base font-medium">Set Private All</p>
              <p className="text-sm text-[#A89984]">
                Will close all functions. (example: Favorites, Gallery)
              </p>
              <div className="text-end -mt-12">
              <button className="font-space-grotesk bg-[#D4BE98] text-[#1D2021] py-2 px-4 rounded hover:bg-[#A89984] transition">
                  {isPrivate ? (
                      <div className="flex gap-2" onClick={removeHide}>
                          <BsEyeSlash size={22} /> unHide All
                      </div>
                  ) : (
                      <div className="flex gap-2" onClick={privateAll}>
                        <BsEye size={22} /> Hide All
                      </div>
                  )}
              </button>
          </div>
            </div>
            </div>

            {askClear && (
                <div className="text-[#D4BE98] fixed flex flex-col px-5 inset-0 backdrop-blur-xl items-center justify-center z-50">
                    <div className='bg-[#282828] w-2/1 rounded-lg p-4 shadow-lg'> 
                    <h3 className='text-center'>
                        Are you sure you want to clear all data?
                    </h3>
                    <div className="flex w-full gap-1">
                    <button 
                        className='font-space-grotesk mt-2 items-center justify-center bg-[#D4BE98] text-[#282828] rounded w-full px-4 p-2 mt-2 hover:bg-[#A89984]'
                        title='Clear All Data'
                        onClick={handleAllClear}>
                        Clear All Data
                    </button>
                    <button 
                     onClick={() => setAskClear(!askClear)}
                     title="Close"
                     className="text-[#282828] font-space-grotesk hover:bg-[#A89984] bg-[#D4BE98] mt-2 w-1/2 rounded">Exit</button>
                    </div>
                    </div>
                </div>
            )}
                
          <div className="border-b border-[#3C3836] pb-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  changePinActive: !prev.changePinActive,
                }))
              }
            >
              <div>
                <h3 className="text-[#D4BE98] text-lg">Change PIN</h3>
                <p className="text-[#A89984] text-sm">Update your security PIN</p>
              </div>
              <span className="text-[#D4BE98] text-xl">
                {settings.changePinActive ? <BiMinus /> : <BiPlus /> }
              </span>
            </div>

            {settings.changePinActive && (
              <form onSubmit={handleChangePin} className="mt-3 space-y-3 pl-2">
                <div>
                  <label className="block text-[#A89984] text-sm mb-1">
                    Current PIN
                  </label>
                  <input
                    type="password"
                    className="w-full bg-[#282828] text-[#D4BE98] p-2 rounded"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    pattern="\d{4}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#A89984] text-sm mb-1">
                    New PIN (4 digits)
                  </label>
                  <input
                    type="password"
                    className="w-full bg-[#282828] text-[#D4BE98] p-2 rounded"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    maxLength={4}
                    pattern="\d{4}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#A89984] text-sm mb-1">
                    Confirm New PIN
                  </label>
                  <input
                    type="password"
                    className="w-full bg-[#282828] text-[#D4BE98] p-2 rounded"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    maxLength={4}
                    pattern="\d{4}"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="font-roboto mt-2 bg-[#D4BE98] text-[#1D2021] py-2 px-4 rounded hover:bg-[#A89984] transition"
                >
                  Update PIN
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
        <PassSec />
       <Toaster />
      <Footer />
    </>
  );
};

export default Settings;