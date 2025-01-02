import {useColorScheme} from 'react-native';

import useTypedSelector from '../hooks/useTypedSelector';
import {selectTheme} from '../redux/theme/themeSlice';

export const useCustomTheme = () => {
  const currentTheme = useTypedSelector(selectTheme);
  const scheme = useColorScheme();

  if (currentTheme) {
    //return current user theme mode
    return currentTheme === 'dark' ? 'dark' : 'light';
  } else {
    //return os user theme mode
    return scheme;
  }
};
