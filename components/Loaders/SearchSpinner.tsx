import { motion } from 'framer-motion';
import { BounceLoader } from 'react-spinners';

export default function SearchSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=' mx-2 my-2 flex items-center justify-center '
    >
      <div className='mx-2 my-2 items-center justify-center'>
        <BounceLoader color='#E49E2F' size={50} />
      </div>
    </motion.div>
  );
}
