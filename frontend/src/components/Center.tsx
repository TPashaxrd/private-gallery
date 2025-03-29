import { config } from '../data/config';
import banner from '../IMG/cat.png';

const Center = () => {
  return (
    <>
      <img src={banner} alt="BANNER" className='w-full h-64 rounded-b- xl object-cover' />
      <div className='items-center bg-[#1D2021] rounded-b-full text-center font-source-code justify-center flex'>
        GALLERY OF {config.name.toUpperCase()}
      </div>
      <div className="bg-gray-800 px-12 justify-between">
        {/* <div>
         
        </div>
        <div>

        </div> */}
     </div>
    </>
  )
}

export default Center;