import Footer from "../components/Footer";
import Header from "../components/Header";

const NoPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-[#1D2021] p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-8xl font-bold text-orange-500 mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-6">
            Oops! The page you're looking for is not here.
          </p>
          <a 
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded transition-colors duration-300"
          >
            Go Back to Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NoPage;