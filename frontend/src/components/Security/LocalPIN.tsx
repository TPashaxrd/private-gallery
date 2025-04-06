import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import MyFile from '../dev/ForDev';
import { MdCheckBox } from 'react-icons/md';
const PassSec = () => {
    const [password, setPassword] = useState<string>('');
    const [checkSwitch, setCheckSwitch] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [ifTemp, setIFTemp] = useState(false);
    const [newPIN, setNewPIN] = useState<string>('');

    
    useEffect(() => {
        const checkPIN = localStorage.getItem('pinset');
        if (checkPIN === 'true') {
            setCheckSwitch(true);
            askPassword();
        }
    }, []);

    useEffect(() => {
        const checkPIN = localStorage.getItem('pinset');
        const storedPassword = localStorage.getItem('password');
    
        if (!storedPassword) {
            setIFTemp(true);
            console.log('No password set, please set a password to continue.');
            return;
        }
    
        if (checkPIN === 'true') {
            setCheckSwitch(true);
            setShowToggle(true);
        }
    }, []);
    
    // function checkPIN() {
    //     const storedPIN = localStorage.getItem('pin');
    //     if (storedPIN && pin === storedPIN) {
    //         toast.success('PIN is correct!');
    //         console.log('Access granted');
    //     } else {
    //         toast.error('Incorrect PIN', {
    //             style: {
    //                 backgroundColor: '#1D2021',
    //                 color: '#D4BE98',
    //                 fontFamily: 'Roboto, sans-serif',
    //             }
    //         });
    //         console.error('Access denied');
    //     }
    // }

    function askPassword() {
        const storedPassword = localStorage.getItem('password');
        if (!storedPassword) {
            toast.success('Set Password!', {
                style: {
                    backgroundColor: '#1D2021',
                    color: '#D4BE98',
                    fontFamily: 'Roboto, sans-serif',
                }
            });
        } else {
            setShowToggle(true);
        }
    }

    function handlePasswordSubmit() {
        const storedPassword = localStorage.getItem('password');
        if (!storedPassword) {
            localStorage.setItem('password', enteredPassword);
            setPassword(enteredPassword);
            toast.success('Password set successfully!', {
                style: {
                    backgroundColor: '#1D2021',
                    color: '#D4BE98',
                    fontFamily: 'Roboto, sans-serif',
                }
            });
        } else if (enteredPassword === storedPassword) {
            setPassword(enteredPassword);
            toast.success('Password verified', {
                style: {
                    backgroundColor: '#1D2021',
                    color: '#D4BE98',
                    fontFamily: 'Roboto, sans-serif',
                },
            });
            console.log('Access granted');
            console.log('Password:', enteredPassword);
            setShowToggle(false);
        } else {
            toast.error('Incorrect password', {
                style: {
                    backgroundColor: '#1D2021',
                    color: '#D4BE98',
                    fontFamily: 'Roboto, sans-serif',
                }
            });
            window.history.back();
            window.location.reload();
        }
    }

    return (
        <>
        {ifTemp && (
            <div className="text-[#D4BE98] fixed flex flex-col px-5 inset-0 backdrop-blur-xl items-center justify-center z-50">
                <div className='bg-[#282828] w-2/1 rounded-lg p-4 shadow-lg'> 
                 <h3 className='text-center font-source-code'>
                        {/* You have not set a password yet. Please set a password to continue. */}
                        YOU HAVE'NT SET A PASSWORD YET.
                    </h3>
                    <input
                        type="password"
                        value={newPIN}
                        maxLength={4}
                        minLength={4}
                        required
                        pattern="\d{4}"
                        autoComplete='off'
                        className='w-full mt-2 bg-[#1D2021] buttom-3 focus:outline-none rounded px-4 p-2'
                        onChange={(e) => setNewPIN(e.target.value)}
                        placeholder="****"
                    />
                    <div className='flex justify-between'>
                    <MdCheckBox size={20} className='mt-1' />
                    <h2 className='text-red-500 text-end'>All responsibility rests with you.</h2>
                    </div>
                    <button 
                        className='font-space-grotesk mt-3 items-center justify-center bg-[#D4BE98] text-[#282828] rounded w-full px-4 p-2 mt-2 hover:bg-[#D4BE98]'
                        title='Set PIN'
                        onClick={() => {
                            localStorage.setItem('password', newPIN);
                            localStorage.setItem('pinset', 'true');
                            toast.success('PIN set successfully!', {
                                style: {
                                    backgroundColor: '#1D2021',
                                    color: '#D4BE98',
                                    fontFamily: 'Roboto, sans-serif',
                                }
                            });
                            setIFTemp(false);
                            setShowToggle(true);
                        }}>
                        PIN
                    </button>
                </div>
            </div>
        )}
    
        {showToggle && (
            <div className="text-[#D4BE98] w-full fixed flex flex-col px-5 inset-0 backdrop-blur-xl items-center justify-center z-50">
                <div className='bg-[#282828] rounded-lg p-4 shadow-lg'> 
                    <input
                        type="password"
                        value={enteredPassword}
                        maxLength={4}
                        className='bg-[#1D2021] focus:outline-none rounded px-4 p-2'
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        placeholder="****"
                    />
                    <h3 className='h3-format text-yellow-700 hover:text-yellow-500 text-center hover:underline'>
                        <a href='/settings'>Turn off PIN?</a>
                    </h3>
                    <button 
                        className='font-space-grotesk items-center justify-center bg-[#D4BE98] text-[#282828] rounded w-full px-4 p-2 mt-2 hover:bg-[#D4BE98]'
                        title='Submit PIN'
                        onClick={handlePasswordSubmit}>
                        PIN
                    </button>
                </div>
            </div>
        )}
        <MyFile />
        {/* <forDev */}
        </>
    );
    
};

export default PassSec;