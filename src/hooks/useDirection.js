import {useState, useEffect} from 'react';
import {getDirection} from '../utils';

const useDirection = () => {
  const [direction, setDirection] = useState('ltr');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const initDirection = async () => {
      const dir = await getDirection();
      setDirection(dir);
      setIsRTL(dir === 'rtl');
    };
    initDirection();
  }, []);

  return {
    direction,
    isRTL,
    isLTR: !isRTL,
  };
};

export default useDirection;
