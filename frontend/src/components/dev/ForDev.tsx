import { useEffect } from "react";

const ForDeveloper = () => {

    useEffect(() => {
        const clickToEnter = (e: KeyboardEvent) => {
            if (e.key === 'F12') {
                e.preventDefault();
             }
        };
        const localClear = (e: KeyboardEvent) => {
            if ((e.key === 'A' && e.ctrlKey) || (e.key === '+' && e.ctrlKey)) {
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
            }
        };
        const privateScreen = (e: KeyboardEvent) => {
            if (e.key === '1' && e.ctrlKey) {
                window.location.href = "/screen";
            }
        }
        const privateGallery = (e: KeyboardEvent) => {
            if (e.key === 'g' && e.ctrlKey) {
                const checkPrivate = localStorage.getItem("privated");
                if (checkPrivate === "true") {
                    localStorage.setItem("privated", "false");
                } else if (checkPrivate === "false") {
                    localStorage.setItem("privated", "true");
                }
                window.location.reload();
            }
        }

        window.addEventListener('keydown', privateGallery);
        window.addEventListener('keydown', privateScreen);
        window.addEventListener('keydown', clickToEnter);
        window.addEventListener('keydown', localClear);

        return () => {
            window.removeEventListener('keydown', privateGallery);
            window.removeEventListener('keydown', privateScreen)
            window.removeEventListener('keydown', clickToEnter);
            window.removeEventListener('keydown', localClear);
        };
    }, []);
    return (
        <>
         
        </>
    )
}

export default ForDeveloper;