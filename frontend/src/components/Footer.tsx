import { FaDiscord } from "react-icons/fa";
import { config } from "../data/config";
import { SiGithub } from "react-icons/si";
import { CgMail } from "react-icons/cg";

const Footer = () => {
    function GMail() {
        window.location.href = `mailto:${config.mail}`;
    }
    function GoGithub() {
        window.location.href = `${config.ownGit}`;
    }
    function GoDiscord() {
        window.location.href = "https://discord.gg/astharia";
    }

    return (
        <footer className="bg-[#1D2021] text-[#A89984] text-center py-4">
            <div className="container font-space-grotesk mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm">
                    &copy; HOST BY {config.name.toUpperCase()} | CREATED BY{" "}
                    {config.ownName.toUpperCase()}
                </div>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <CgMail onClick={GMail} size={24} className="cursor-pointer hover:text-yellow-400" />
                    <SiGithub onClick={GoGithub} size={24} className="cursor-pointer hover:text-yellow-400" />
                    <FaDiscord onClick={GoDiscord} size={24} className="cursor-pointer hover:text-yellow-400" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;