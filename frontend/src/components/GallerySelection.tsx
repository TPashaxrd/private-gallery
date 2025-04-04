import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BiSearch, BiTrash, BiVolume } from 'react-icons/bi';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { config } from '../data/config';
import toast, { Toaster } from 'react-hot-toast';
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from 'react-icons/md';
import { debounce } from 'lodash';
import { FaPause, FaPlay } from 'react-icons/fa';
import PassSec from './PassSec';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
  type?: 'image' | 'video';
}

const GallerySelection = () => {
  const [selectGallery, setSelectGallery] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [fullscreenItem, setFullscreenItem] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [videoStates, setVideoStates] = useState<{ [key: string]: { isPlaying: boolean; volume: number; currentTime: number; duration: number } }>({});

  const filteredGallery = useMemo(() => {
    if (!searchTerm.trim()) return galleryItems;
    
    const term = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return galleryItems.filter(item => {
      const title  = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return title.includes(term);
    });
  }, [galleryItems, searchTerm]);

  const fetchGallery = async (type: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.api}/api/gallery?type=${type}`);
      if (!response.ok) throw new Error(`HTTP hatası! Durum: ${response.status}`);
      const result = await response.json();
      
      const itemsArray = Array.isArray(result) 
        ? result 
        : result.data 
          ? result.data 
          : result.items || [];
  
      if (itemsArray.length > 0) {
        const itemsWithType: GalleryItem[] = itemsArray.map((item: any) => ({
          ...item,
          type: type === 'videos' ? 'video' : 'image'
        }));
  
        setGalleryItems(itemsWithType);
        
        const initialStates = itemsWithType.reduce((acc, item) => {
          if (item.type === 'video') {
            acc[item.id] = { isPlaying: false, volume: 1, currentTime: 0, duration: 0 };
          }
          return acc;
        }, {} as { [key: string]: any });
        setVideoStates(initialStates);
  
        const savedItems = JSON.parse(localStorage.getItem('savedGalleryItems') || '{}');
        const savedStatus = itemsWithType.reduce((acc, item) => {
          acc[item.id] = !!savedItems[item.id];
          return acc;
        }, {} as { [key: string]: boolean });
        setIsSaved(savedStatus);
      } else {
        throw new Error("API boş veri döndü veya beklenen formatta değil");
      }
    } catch (err) {
      console.error("Galeri yüklenirken hata:", err);
      setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
      setGalleryItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGallery = () => {
    const newGalleryState = !selectGallery;
    setSelectGallery(newGalleryState);
    fetchGallery(newGalleryState ? 'videos' : 'pictures');
  };

  const togglePlay = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (video.paused) {
        Object.keys(videoRefs.current).forEach(id => {
          if (id !== videoId && videoRefs.current[id]) {
            videoRefs.current[id]?.pause();
            setVideoStates(prev => ({
              ...prev,
              [id]: { ...prev[id], isPlaying: false }
            }));
          }
        });
        video.play().catch(err => {
          console.error("Video play failed:", err);
          setError('Video oynatma başarısız. Lütfen tekrar deneyin.');
        });
        setVideoStates(prev => ({
          ...prev,
          [videoId]: { ...prev[videoId], isPlaying: true }
        }));
      } else {
        video.pause();
        setVideoStates(prev => ({
          ...prev,
          [videoId]: { ...prev[videoId], isPlaying: false }
        }));
      }
    }
  };

  const handleVolumeChange = (videoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    const video = videoRefs.current[videoId];
    if (video) {
      video.volume = volume;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], volume }
      }));
    }
  };

  const seekVideo = (videoId: string, e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRefs.current[videoId];
    if (video) {
      const rect = e.currentTarget.getBoundingClientRect();
      const seekTime = ((e.clientX - rect.left) / rect.width) * video.duration;
      video.currentTime = seekTime;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], currentTime: seekTime }
      }));
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFullscreen = (itemId: string) => {
    if (fullscreenItem === itemId) {
      setFullscreenItem(null);
    } else {
      setFullscreenItem(itemId);
    }
  };

  const trashToFile = (itemId: string) => {
    toast.success(`Successfully Deleted!`, {
      style: {
        backgroundColor: '#1D2021',
        color: '#D4BE98',
      }
    });
    toggleFullscreen(itemId);
  };

  const saveToFile = (item: GalleryItem) => {
    const savedItems = JSON.parse(localStorage.getItem('savedGalleryItems') || '{}');
    
    if (savedItems[item.id]) {
      const updated = {...savedItems};
      delete updated[item.id];
      localStorage.setItem('savedGalleryItems', JSON.stringify(updated));
      setIsSaved(prev => ({...prev, [item.id]: false}));
      toast.success(`UnSaved!`, {
        style: {
          backgroundColor: '#1D2021',
          color: '#D4BE98',
        }
      });
    } else {
      const updated = {
        ...savedItems,
        [item.id]: item
      };
      localStorage.setItem('savedGalleryItems', JSON.stringify(updated));
      setIsSaved(prev => ({...prev, [item.id]: true}));
      toast.success(`Successfully Saved!`, {
        style: {
          backgroundColor: '#1D2021',
          color: '#D4BE98',
        }
      });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    if (e.key === 'Escape') {
      toggleFullscreen(itemId);
    }
  };

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 0),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updates: { [key: string]: any } = {};
      Object.keys(videoRefs.current).forEach(id => {
        const video = videoRefs.current[id];
        if (video && !video.paused) {
          updates[id] = {
            currentTime: video.currentTime,
            duration: video.duration
          };
        }
      });
      
      if (Object.keys(updates).length > 0) {
        setVideoStates(prev => {
          const newStates = { ...prev };
          Object.keys(updates).forEach(id => {
            if (newStates[id]) {
              newStates[id] = { ...newStates[id], ...updates[id] };
            }
          });
          return newStates;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchGallery('pictures');
  }, []);

  return (
    <div className="font-montserrat p-4">
      <div className="flex justify-center mb-8">
        <div className="flex gap-4 bg-[#1D2021] p-2 rounded-full">
          <button
            onClick={toggleGallery}
            className={`px-6 py-2 rounded-full transition-colors ${
              !selectGallery ? 'bg-[#282828] text-white' : 'bg-transparent text-gray-300'
            }`}
            disabled={!selectGallery && isLoading}
          >
            Pictures
          </button>
          <button
            onClick={toggleGallery}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectGallery ? 'bg-[#282828] text-white' : 'bg-transparent text-gray-300'
            }`}
            disabled={selectGallery && isLoading}
          >
            Videos
          </button>
        </div>
      </div>
      
      {/* Search */}
      <div className='-mt-5 flex justify-center'>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder='Search in titles...'
            value={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            className='px-4 py-2 rounded-xl font-space-grotesk w-full bg-[#1D2021] placeholder-gray-400 focus:outline-none'
          />
          <BiSearch title="Search in Google" className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p>Loading...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-10 text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={() => fetchGallery(selectGallery ? 'videos' : 'pictures')}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      )}
      {/* Here Footer */}
      {/* <div className="grid grid-cols-1 mt-2 max-h-25px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-2">        
        {filteredGallery.map((item) => (
          <div 
            key={item.id} 
            className={`bg-[#282828] rounded-b-1xl justify-between overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
              fullscreenItem === item.id ? 
                'fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4' : 
                'relative'
            }`}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            tabIndex={0}
          >
            {item.type === 'video' ? (
              <div className={`relative ${fullscreenItem === item.id ? 'w-full h-full  max-h-[90vh]' : ''}`}>
                <video
                  ref={el => { videoRefs.current[item.id] = el; }}
                  className={`w-full cursor-pointer ${fullscreenItem === item.id ? 'h-full object-contain' : 'h-48 object-cover'}`}
                  onClick={() => togglePlay(item.id)}
                  onLoadedMetadata={() => {
                    const video = videoRefs.current[item.id];
                    if (video) {
                      setVideoStates(prev => ({
                        ...prev,
                        [item.id]: { 
                          ...prev[item.id], 
                          duration: video.duration,
                          volume: video.volume
                        }
                      }));
                    }
                  }}
                  onEnded={() => {
                    setVideoStates(prev => ({
                      ...prev,
                      [item.id]: { ...prev[item.id], isPlaying: false }
                    }));
                  }}
                >
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 ${
                  fullscreenItem === item.id ? 'px-8 pb-4' : ''
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(item.id);
                      }} 
                      className="text-white hover:text-blue-300 text-sm"
                    >
                      {videoStates[item.id]?.isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    
                    <div 
                      className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        seekVideo(item.id, e);
                      }}
                    >
                      <div 
                        className="h-full bg-blue-500 rounded-full absolute top-0 left-0"
                        style={{ 
                          width: `${(videoStates[item.id]?.currentTime / (videoStates[item.id]?.duration || 1)) * 100 || 0}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-white text-xs">
                    <span>
                      {formatTime(videoStates[item.id]?.currentTime)} / {formatTime(videoStates[item.id]?.duration)}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <span className="text-xs"><BiVolume size={15} />  </span>
                      <input
                        type="range"
                        min="0" max="1" step="0.01"
                        value={videoStates[item.id]?.volume || 1}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleVolumeChange(item.id, e);
                        }}
                        className="w-16 cursor-pointer accent-blue-500"
                        title="Volume"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${fullscreenItem === item.id ? 'h-full w-full flex items-center justify-center' : ''}`}>
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className={`${fullscreenItem === item.id ? 'object-contain h-full max-h-[90vh]' : 'w-full h-48 object-cover'}`}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              </div>
            )}
            
            <div className={`${fullscreenItem === item.id ? 'absolute w-full bottom-4 left-0 right-0 text-center' : 'p-4'}`}>
              <div className='flex justify-between items-center -mt-6'>
                <h3 className="flex mt-2 justify-between text-lg font-semibold text-white truncate text-center">
                  <BiSearch
                    title="Search in Google"
                    onClick={() => window.open(`https://google.com/search?q=${encodeURIComponent(item.title)}`, '_blank')} 
                    size={23} 
                    className="mt-2 cursor-pointer hover:text-blue-300" 
                  /> 
                  <span className="mx-2 mt-1 text-[#D4BE98] font-roboto">{item.title}</span>
                </h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen(item.id);
                  }}
                  className="text-white mt-4 hover:text-blue-300 ml-4 flex-shrink-0"
                >
                  {fullscreenItem === item.id ? (
                    <BsFullscreenExit size={24} />
                  ) : (
                    <BsArrowsFullscreen size={20} />
                  )}
                </button>
              </div>
              {!fullscreenItem && (
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
              )}
            </div>
            
            {fullscreenItem === item.id && (
              <>
                <button 
                  onClick={() => saveToFile(item)}
                  className="absolute top-4 left-14 text-white hover:text-yellow-400"
                >
                  {isSaved[item.id] ? (
                    <MdFavorite size={30} className='cursor-pointer' />
                  ) : (
                    <GrFavorite size={30} className='cursor-pointer' />
                  )}
                </button>
                <BiTrash 
                  onClick={() => trashToFile(item.id)} 
                  size={32}
                  title='Delete this item'
                  className='absolute cursor-pointer hover:text-red-500 top-4 left-5 text-white' 
                />
                <button
                  onClick={() => setFullscreenItem(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-gray-700"
                  title="Close fullscreen"
                  aria-label="Close fullscreen"
                >
                  <CgClose />
                </button>
                {fullscreenItem === item.id && (
                  <p className="text-gray-300 mt-2 px-4 text-center">{item.description}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {!isLoading && !error && filteredGallery.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p>No items found matching your search.</p>
        </div>
      )}
      <PassSec />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default GallerySelection;