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
        <footer className="bg-[#1D2021] rounded-t-xl text-[#A89984] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-sm md:text-base font-space-grotesk">
                &copy; {new Date().getFullYear()} CREATED BY OPENMEDIA.COM.TR
                </p>
                <p className="text-xs md:text-sm text-[#928374] mt-1">
                {config.ownName.toUpperCase()} | INFO@OPENMEDIA.COM.TR
                </p>
            </div>
            
            {/* Social icons */}
            <div className="flex space-x-6">
                <button 
                onClick={GMail} 
                className="text-[#A89984] hover:text-yellow-400 transition-colors duration-200"
                aria-label="Email"
                >
                <CgMail size={24} />
                </button>
                <button 
                onClick={GoGithub} 
                className="text-[#A89984] hover:text-yellow-400 transition-colors duration-200"
                aria-label="GitHub"
                >
                <SiGithub size={24} />
                </button>
                <button 
                onClick={GoDiscord} 
                className="text-[#A89984] hover:text-yellow-400 transition-colors duration-200"
                aria-label="Discord"
                >
                <FaDiscord size={24} />
                </button>
            </div>
            </div>
            
            {/* Optional additional links */}
            <div className="mt-6 pt-6 border-t border-[#3C3836] text-center">
            <div className="flex flex-wrap justify-center space-x-4">
                <a href="#" className="text-xs text-[#928374] hover:text-yellow-400 transition-colors">
                Privacy Policy
                </a>
                <a href="#" className="text-xs text-[#928374] hover:text-yellow-400 transition-colors">
                Terms of Service
                </a>
                <a href="#" className="text-xs text-[#928374] hover:text-yellow-400 transition-colors">
                Contact Us
                </a>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;