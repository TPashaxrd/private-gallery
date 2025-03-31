import { FaDiscord } from "react-icons/fa";
import { config } from "../data/config";
import { SiGithub } from "react-icons/si";
import { CgMail } from "react-icons/cg";

const Footer = () => {

    function GMail() {
        window.location.href = `mailto:${config.mail}`
    }
    function GoGithub() {
        window.location.href = `${config.ownGit}`
    }
    function GoDiscord() {
        window.location.href = "https://discord.gg/astharia"
    }

  return (
    <>
     <div className="px-16 py-4 text-2xl font-winky-sans bg-[#1D2021] flex justify-between">
        <div>
        &copy; HOST BY {config.name.toUpperCase()} | CREATED BY {config.ownName.toUpperCase()}
        </div>
        <div className="flex gap-2 cursor-pointer">
            {/* Social Media Icons */}
            <CgMail onClick={GMail} size={27} />
            <SiGithub onClick={GoGithub} size={24}/>
            <FaDiscord onClick={GoDiscord} size={24}/>
        </div>
     </div>
    </>
  )
}

export default Footer;