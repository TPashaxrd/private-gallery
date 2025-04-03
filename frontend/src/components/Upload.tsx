import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import toast, { Toaster } from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { BiEdit, BiSend } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [showInfo, setShowInfo] = useState(false);
  const [uploadScreen, setUploadScreen] = useState(false);
  const [selectVideo, setSelectVideo] = useState(false);
  const [selectPicture, setSelectPicture] = useState(false);
  const [changeDesc, setChangeDesc] = useState(false);

  const API_KEY = "your-secret-key-here"
  const API_URL = "http://localhost:5000/api";

  function editDescription(){
    setChangeDesc(!changeDesc);
  }

  function SelectVideo() {
    setSelectVideo(true);
    setSelectPicture(false);
    setSelectedFormat("videos");
    console.warn(`New Format: ${selectedFormat?.toUpperCase()}`)
  }
  function SelectPicture() {
    setSelectVideo(false);
    setSelectPicture(true);
    setSelectedFormat("pictures");
    console.warn(`New Format: ${selectedFormat?.toUpperCase()}`)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    console.log(`New Description: ${description}`)
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  function toggleScreen() {
    setUploadScreen(!uploadScreen);
  }
  function clearTable(){
    setDescription("");
    setSelectedFile(null);
    setSelectVideo(false);
    setSelectPicture(false);
    setChangeDesc(false);
    console.warn("Cleared all data.", {selectedFile, description});
    toast.success("Cleared all data.", {
      style: {
        backgroundColor: '#282828',
        color: '#D4BE98',
      },
      duration: 4000,
      iconTheme: {
        primary: '#D4BE98',
        secondary: '#282828',
      },
    })
  }

  const submitFile = async () => {
    if (!selectedFile || !description || !selectedFormat) {
      toast.error("No File or Description Selected.", {
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
      return;
    }
  
    const formData = new FormData();
    const headers = {
      "x-api-key": API_KEY,
    };
  
    if (selectedFormat === "pictures") {
      formData.append("picture", selectedFile);
      formData.append("title", description);
  
      try {
        const response = await fetch(`${API_URL}/upload/picture`, {
          method: "POST",
          headers,
          body: formData,
        });
  
        if (response.ok) {
          toast.success("Picture uploaded successfully!", {
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
        } else {
          toast.error("Failed to upload picture.", {
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
        }
      } catch (error) {
        console.error("Error uploading picture:", error);
      }
    } else if (selectedFormat === "videos") {
      formData.append("video", selectedFile);
      formData.append("title", description);
  
      try {
        const response = await fetch(`${API_URL}/upload/video`, {
          method: "POST",
          headers,
          body: formData,
        });
  
        if (response.ok) {
          toast.success("Video uploaded successfully!", {
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
        } else {
          toast.error("Failed to upload video.", {
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
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      toast.error("Unsupported format selected.", {
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
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#282828] p-4">
        <h1 className="text-3xl font-bold text-[#D4BE98]">Upload Your Files</h1>
        <p className="mt-2 text-[#A89984]">Drag and drop your files here or click to select.</p>
        
        <div className="flex flex-col items-center justify-center mt-4 w-full max-w-md">
          <div className="relative w-full mt-4">
            <label 
              htmlFor="file-upload"
              className="block w-full p-3 border-2 border-dashed border-[#A89984] rounded-lg bg-[#1D2021] text-[#D4BE98] text-center cursor-pointer hover:bg-[#3C3836] transition"
            >
              {selectedFile ? selectedFile.name : "Choose a file to upload"}
            </label>
            <input 
              id="file-upload" 
              type="file"
              accept=".mp4, .mov, .jpg, .png,"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
          </div>

          {selectedFile && (
            <div className="w-full mt-3 text-[#A89984] text-sm">
              <p>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              <p>Type: {selectedFile.type || "Unknown"}</p>
              <p>Last modified: {new Date(selectedFile.lastModified).toLocaleDateString()}</p>
            </div>
          )}

          <input
            id="file-description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-4 w-full p-3 border border-[#A89984] rounded bg-[#1D2021] text-[#D4BE98]"
            placeholder="Enter a description for your file"
          />

          {selectedFile && (
            <div className="mt-4">
              {selectedFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded Preview"
                className="max-w-full h-auto rounded-lg"
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(selectedFile))}
              />
              ) : selectedFile.type.startsWith("video/") ? (
              <video
                controls
                className="max-w-full h-auto rounded-lg"
                onLoadedData={() => URL.revokeObjectURL(URL.createObjectURL(selectedFile))}
              >
                <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                Your browser does not support the video tag.
              </video>
              ) : (
              <p className="text-[#A89984]">Unsupported file type</p>
              )}
            </div>
            )}

          <button 
            onClick={toggleScreen} 
            className="w-full mt-4 bg-[#D4BE98] text-[#1D2021] px-4 py-3 rounded-lg hover:bg-[#A89984] transition font-medium"
          >
            Upload your Video & Picture
          </button>

          <button 
            onClick={toggleInfo} 
            className="w-full mt-2 text-[#D4BE98] hover:underline text-sm"
          >
            {showInfo ? "Hide Info" : "Show Info"}
          </button>
        </div>

        {showInfo && (
          <div className="mt-6 p-4 bg-[#1D2021] rounded-lg text-[#A89984] max-w-md w-full">
            <h3 className="text-lg font-medium text-[#D4BE98] mb-2">Upload Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Maximum file size: 1GB</li>
              <li>Accepted formats: JPG, PNG, MP4, MOV</li>
              <li>Files will be reviewed before publishing</li>
              <li>Please provide accurate descriptions</li>
            </ul>
          </div>
        )}

        {uploadScreen && (
            <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
              <div className="bg-[#1D2021] text-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
                <CgClose onClick={toggleScreen} className="hover:bg-gray-700 rounded cursor-pointer absolute right-5 -mt-3" size={25} />
                <TbTrash className="cursor-pointer hover:bg-[#A89984] hover:text-[#D4BE98] -mt-2" onClick={clearTable} title="Clear" size={23} />
                <h1 className="text-center text-2xl text-[#D4BE98] font-roboto">Verified & Approve</h1>
                <div className="flex flex-col items-center mt-4">
                <div className="flex gap-4">
                  <button 
                    onClick={SelectVideo}
                    disabled={selectVideo}
                    className={`px-6 py-3 rounded-lg transition font-medium ${
                      selectVideo
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-[#D4BE98] hover:bg-[#A89984] text-[#1D2021]"
                    }`}
                  >
                    {selectVideo ? "Video Selected" : "Select Video"}
                  </button>
                  <button
                    onClick={SelectPicture}
                    disabled={selectPicture}
                    className={`px-6 py-3 rounded-lg transition font-medium ${
                      selectPicture
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-[#D4BE98] hover:bg-[#A89984] text-[#1D2021]"
                    }`}
                  >
                    {selectPicture ? "Picture Selected" : "Select Picture"}
                  </button>
                </div>
                
                {selectVideo && (
                  <p className="mt-2 text-[#D4BE98] text-sm">Video format selected (MP4, MOV)</p>
                )}
                
                {selectPicture && (
                  <p className="mt-2 text-[#D4BE98] text-sm">Picture format selected (JPG, PNG)</p>
                )}
              </div>

                {selectedFile ? (
                  <div className="mt-2 relative w-full">
                   <div className="relative w-full mt-4">
                    <label 
                     htmlFor="file-upload"
                     className="block w-full p-3 border-2 border-dashed border-[#A89984] rounded-lg bg-[#1D2021] text-[#D4BE98] text-center cursor-pointer hover:bg-[#3C3836] transition"
                   >
                     {selectedFile ? selectedFile.name : "Choose a file to upload"}
                   </label>
                   <input 
                     id="file-upload" 
                     type="file"
                     accept=".mp4, .mov, .jpg, .png,"
                     onChange={handleFileChange}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                   />
                  </div>
                   </div>
                ) : 
                <>
                <label 
                  htmlFor="file-upload"
                  className="block mt-2 p-3 border-2 border-dashed border-[#A89984] rounded-lg bg-[#1D2021] text-[#D4BE98] text-center cursor-pointer hover:bg-[#3C3836] transition"
                >
                  {selectedFile ? selectedFile.name : "Choose a file to upload" }
                </label>
                <input 
                  id="file-upload" 
                  accept=".mp4, .mov, .jpg, .png,"
                  type="file" 
                  onChange={handleFileChange}
                  className="opacity-0 cursor-pointer" 
                />
                </>}
                
                <div className="flex gap-2">
                  {changeDesc ? (
                    <input
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter a new title for your file"
                    className="mt-4 w-full p-3 font-roboto border border-[#A89984] rounded bg-[#1D2021] text-[#D4BE98]"
                    />
                  ) : (
                    <input
                    type="text"
                    value={description}
                    placeholder={description ? `${description}` : "No any title. Enter a title for your file"}
                    onChange={handleDescriptionChange}
                    disabled
                    className="mt-4 w-full p-3 font-space-grotesk border border-[#A89984] rounded bg-[#1D2021] text-[#D4BE98]"
                    />
                  )}
                 <button
                   className="bg-[#D4BE98] text-[#1D2021] px-3 py-4 p-2 mt-3 rounded-lg hover:bg-[#A89984] font-medium"
                   onClick={editDescription}
                 >
                  {changeDesc ? <BiSend title="Save your Title" size={25} /> : <BiEdit title="Edit your Title" size={25} /> }
                 </button>
                 </div>
                    {selectedFile && (
                    <div className="mt-4">
                      {selectedFile.type.startsWith("image/") ? (
                      <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Uploaded Preview"
                      className="max-w-full h-auto rounded-lg"
                      onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                      />
                      ) : selectedFile.type.startsWith("video/") ? (
                      <video
                      controls
                      className="max-w-full h-auto rounded-lg"
                      onLoadedData={(e) => URL.revokeObjectURL((e.target as HTMLVideoElement).currentSrc)}
                      >
                      <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                      Your browser does not support the video tag.
                      </video>
                      ) : (
                      <p className="text-[#A89984]">Unsupported file type</p>
                      )}
                    </div>
                    )}
                  <div className="flex flex-col items-center justify-center mt-4">
                    <button title="Upload a file" className="px-2 py-3 w-full hover:underline bg-[#D4BE98] text-center text-[#1D2021] rounded-lg hover:bg-[#A89984] transition font-medium" onClick={submitFile}>
                      Sumbit
                    </button>
                  </div>

                  {/* Change Description  */}
                <div className="flex items-center gap-4 justify-center">
                <div className="mt-6 w-1/2 p-4 bg-[#282828] rounded-lg text-[#A89984]">
                <h3 className="text-lg font-medium text-[#D4BE98] mb-2">Upload Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>File Name: {selectedFile && selectedFile.name}</li>
                  <li>File Size: {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) + "MB" : ""}</li>
                  <li>File Type: {selectedFile?.type.toUpperCase()}</li>
                  <li>File Last M:{selectedFile ? new Date(selectedFile.lastModified).toLocaleDateString() : ""}</li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-[#282828] rounded-lg text-[#A89984]">
                <h3 className="text-lg font-medium text-[#D4BE98] mb-2">Upload Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Maximum file size: 1GB</li>
                  <li>Accepted formats: JPG, PNG, MP4, MOV</li>
                  <li>Files will be reviewed before publishing</li>
                  <li>Please provide accurate descriptions</li>
                </ul>
              </div>
              </div>
              </div>
            </div>
        )}
      </div>

      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
};

export default Upload;