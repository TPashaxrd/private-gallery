import { config } from '../data/config';
import banner from '../IMG/ingodwetrustbanner.png';

const Center = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full overflow-hidden">
        <img 
          src={banner} 
          alt={`${config.name} Banner`} 
          className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-b-xl"
        />
      </div>
      
      <div className="w-full max-w-4xl -mt-6 px-4">
        <div className="bg-[#1D2021] rounded-full text-center py-3 px-6 shadow-lg">
          <h1 className="text-white font-source-code text-lg md:text-xl lg:text-2xl font-semibold tracking-wider">
            GALLERY OF {config.name.toUpperCase()}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Center;