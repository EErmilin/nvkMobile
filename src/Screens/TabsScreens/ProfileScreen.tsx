import * as React from 'react';
import {AuthProfile} from '../ProfilesScreen/AuthProfile';
import {NonAuthProfile} from '../ProfilesScreen/NonAuthProfile';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {TabNavigationProps} from '../../navigation/types/TabTypes';
import {setLogged} from '../../redux/slices/authSlice';
import {useIsFocused} from '@react-navigation/native';
import {getProfile} from '../../redux/thunks/user/GetProfile';

export const ProfileScreen: React.FC<TabNavigationProps<'Profile'>> = ({
  navigation,
}) => {
  const user = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = React.useState(false);
  const token = useAppSelector(state => state.auth.token);

  React.useEffect(() => {
    if (token) {
      (async function () {
        setLoading(true);
        await dispatch(getProfile());
        setLoading(false);
      })();
    }
  }, [dispatch, isFocused, token]);

  return (
    <>
      {user ? (
        <AuthProfile
          profilePress={() => navigation.navigate('EditProfile')}
          hashtagPress={() => navigation.navigate('HashtagScreen')}
          createBloderPress={() => navigation.navigate('CreateBloger')}
          editBloderPress={() => navigation.navigate('EditBloger')}
          showBloderPress={() => navigation.navigate('BlogerProfile')}          
          navigation={navigation}
          loading={loading}
        />
      ) : (
        <NonAuthProfile
          authPress={() => {
            dispatch(setLogged(false));
          }}
          navigation={navigation}
        />
      )}
    </>
  );
};
