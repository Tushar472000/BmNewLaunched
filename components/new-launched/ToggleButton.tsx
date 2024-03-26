import { IoGridSharp } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
const ToggleButton = ({ view, setView }: any) => {
    return (
      <div>
        <div className='mb-4 hidden justify-end gap-8 md:flex'>
          {/* ******************** DETAIL VIEW ******************** */}
          <button
            onClick={() => setView('detailed')}
            className={`flex items-center gap-2 px-4 py-2 ${
              view === 'detailed'
                ? 'rounded-md bg-primary text-white'
                : 'bg-white'
            }`}
          >
            <GiHamburgerMenu size={25} />
            <span>Detailed View</span>
          </button>
          {/* ******************** GRID VIEW ******************** */}
          <button
            onClick={() => setView('grid')}
            className={`flex items-center gap-2 px-4 py-2 ${
              view === 'grid' ? 'rounded-md bg-primary text-white' : 'bg-white'
            }`}
          >
            <IoGridSharp size={25} />
            <span>Grid View</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default ToggleButton;