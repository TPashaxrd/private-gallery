import { config } from "../data/config";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { BsSave, BsShare } from "react-icons/bs";
import { BiDownload, BiHome, BiShare, BiTrash, BiUpload } from "react-icons/bi";
import toast from "react-hot-toast";
import { GiZipper } from "react-icons/gi";
import { GrFavorite } from "react-icons/gr";

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  type?: 'image' | 'video';
}

const Header = () => {
  const [savedFavorites, setSavedFavorites] = useState(false);
  const [favorites, setFavorites] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFavorites = () => {
      const saved = localStorage.getItem('savedGalleryItems');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const favoritesArray = Object.values(parsed);
          setFavorites(favoritesArray as GalleryItem[]);
        } catch (err) {
          console.error("Error parsing favorites:", err);
        }
      }
    };
  
    if (savedFavorites) {
      loadFavorites();
    }
  }, [savedFavorites]);

  function showFavorites() {
    setSavedFavorites(!savedFavorites);
  }

  const handleDownload = async () => {
    setLoading(true);
    try {
      window.location.href = "http://localhost:5000/api/gallery/download";
      toast.success("Download started! Please check your browser's download folder.", {
        style: {
          backgroundColor: '#282828',
          color: '#D4BE98',
        },
        duration: 4000,
        iconTheme: {
          primary: '#D4BE98',
          secondary: '#282828',
        },
      });
    } catch (error) {
      console.error("Error downloading files:", error);
    }
    setLoading(false);
  };

  function removeFavorite(id: string) {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('savedGalleryItems', JSON.stringify(updatedFavorites));
  }

  return (
    <header className="bg-[#1D2021] font-montserrat text-[#D4BE98] py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">{config.name} </h1>
        <nav>
          <ul className="flex space-x-2">
            <li>
              <button onClick={() => window.location.href = "/" } className="px-2 py-2 rounded-1xl hover:text-gray-200 transition">
                {/* Home */}
                <BiHome size={27} className="-mt-1" />
              </button>
            </li>
            <li>
             <button title="Favorite Pictures and Videos" onClick={showFavorites} className="px-2 py-2 rounded-1xl hover:text-gray-200 cursor-pointer transition">
                {/* Favorites */}
                <GrFavorite size={25} />
              </button>
            </li>
            <li>
              <button title="Upload" onClick={() => window.location.href = "/upload"} className="px-2 py-2 rounded-1xl hover:text-gray-200 cursor-pointer transition">
                {/* Upload */}
                <BiUpload size={30} className="-mt-1" />
              </button>
            </li>
            <li>
              <button title="Share" className="px-2 py-2 rounded-1xl hover:text-gray-200 cursor-pointer transition">
                {/* Share */}
                <BsShare size={24} />
              </button>
            </li>
            <li>
              <button title="Download All" onClick={handleDownload} className="bg-[#504944] px-2 py-2 cursor-pointer hover:underline rounded-2xl">
                {/* Download All */}
                <BiDownload size={24} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {savedFavorites && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#1D2021] text-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
            <h1 className="flex gap-2 text-2xl text-[#D4BE98] border-b border-[#D4BE98] pb-2 mb-4">
              <BsSave className="mt-1" /> Your Saved Pictures and Videos
            </h1>
            <IoMdCloseCircle
              onClick={showFavorites}
              size={23}
              className="absolute cursor-pointer top-4 right-4 bg-black/50 text-white rounded-full hover:bg-gray-700 z-50"
            />
            
            {favorites.length === 0 ? (
              <p className="text-center py-8 text-gray-400">No favorites saved yet</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favorites.map((item) => (
                  <div key={item.id} className="bg-[#282828] rounded-lg overflow-hidden relative group">
                    {item.type === 'video' ? (
                      <video 
                        src={item.url} 
                        className="w-full h-40 object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-3">
                      <h3 className="text-white font-medium truncate">{item.title}</h3>
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="mt-2 flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                      >
                        <BiTrash size={16} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;