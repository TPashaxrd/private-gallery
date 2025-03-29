import toast from "react-hot-toast";
import { config } from "../data/config";

const Header = () => {

//   function downloadRepo() {
//     const zipUrl = `https://github.com/${config.githubRepo}/archive/refs/heads/master.zip`;
//     window.location.href = zipUrl
//   }
//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           text: `${config.prodName.toUpperCase()}\nGithub Repo: ${config.githubUrl}\n${window.location.href}`
//         });
//         toast.success("Successfully shared!");
//       } catch (error) {
//         console.error("Sharing failed:", error);
//         toast.error("Error while sharing!");
//       }
//     } else {
//       toast.error("Sharing is not supported on this device/browser.");
//     }
//   };

  return (
    <header className="bg-[#1D2021] font-montserrat text-[#D4BE98] py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">{config.name} </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button onClick={() => window.location.href = "/" } className="px-2 py-2 rounded-1xl hover:text-gray-200 transition">
                Home
              </button>
            </li>
            <li>
              <button className="px-2 py-2 rounded-1xl hover:text-gray-200 cursor-pointer transition">
                Share
              </button>
            </li>
            <li>
              <button className="bg-[#504944] px-2 py-2 cursor-pointer hover:underline rounded-2xl">
                BuildZIP
              </button>
            </li>
          </ul>
        </nav>
      </div>
     </header>
  );
};

export default Header;