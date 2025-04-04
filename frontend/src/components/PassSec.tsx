import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const PassSec = () => {
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        const storedPassword = localStorage.getItem('password');
        if (!storedPassword) {
            toast.success('Set your password:');
            const newPassword = prompt('Set your password:');
            if (newPassword) {
                localStorage.setItem('password', newPassword);
                setPassword(newPassword);
                toast.success('Password set successfully!');
            } else {
                console.error('No password set');
                toast.error('No password set');
            }
        } else {
            const enteredPassword = prompt('Enter your password:');
            if (enteredPassword === storedPassword) {
                setPassword(enteredPassword);
                toast.success('Password verified', {
                    style: {
                        backgroundColor: '#1D2021',
                        color: '#D4BE98',
                        fontFamily: 'Ubuntu Mono, monospace'
                    }
                });
            } else {
                console.error('Incorrect password');
                toast.error('Incorrect password');
                window.history.back();
                window.location.reload();
            }
        }
        console.log(password);
        console.clear();
        console.warn("Has Logined");
    }, []);
    return (
        <>
         {/* :) */}
        </>
    )
};

export default PassSec;