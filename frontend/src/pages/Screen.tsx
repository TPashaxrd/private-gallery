import { useEffect } from "react";

const Screen = () => {
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.log("Fullscreen reddedildi:", err);
        });
      }
      document.removeEventListener("click", handler);
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
     <title>Windows</title>
      <div title="Click for Fullscreen" style={{ width: "100vw", height: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
       <img
        src="https://updf.com/wp-content/uploads/2023/09/windows-desktop-organzier-stardock-fences-scaled.webp"
        alt="Windows desktop organizer Stardock Fences"
        className=""
        />
      </div>
    </>
  );
};

export default Screen;