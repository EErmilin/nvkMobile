import React, {useState} from 'react';
import {View} from 'react-native';

import {BoldText, Button, InputText, MediumText} from '../../../components';
import {useTheme} from '../../../Styles/Styles';
import {useApolloClient} from '@apollo/client';
import {CHECK_EMAIL} from '../../../gql/query/user/Email';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  email: string | null;
  setEmail: (value: string) => void;
  shouldClose: () => void;
}

export const MailEdit: React.FC<IProps> = ({email, setEmail, shouldClose}) => {
  const [mail, setMail] = useState(email ?? '');
  const {colors, theme} = useTheme();
  const insets = useSafeAreaInsets();
  const client = useApolloClient();
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15 + insets.bottom,
        paddingTop: 24,
        backgroundColor: colors.fillPrimary,
      }}>
      <View style={{flex: 1}}>
        <BoldText
          fontSize={16}
          style={{fontWeight: '700', alignSelf: 'center'}}>
          Новая почта
        </BoldText>
        <InputText
          autoFocus={false}
          style={{marginTop: 30}}
          value={mail}
          label={'Эл. Почта'}
          onChangeText={formatted => {
            setMail(formatted);
            setErrorEmail(false);
            setErrorText('');
          }}
          errorState={errorEmail}
        />
        {errorText !== '' ? (
          <MediumText
            fontSize={12}
            style={{marginTop: 10, color: colors.danger}}>
            {errorText}
          </MediumText>
        ) : (
          <></>
        )}
      </View>
      <Button
        title={'Сохранить'}
        onPress={async () => {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          if (reg.test(mail) === true) {
            setLoading(true);
            let response = await client.query({
              query: CHECK_EMAIL,
              variables: {
                email: mail,
              },
            });
            setLoading(false);
            console.log('response', response);
            if (response.data.checkEmail === false) {
              setEmail(mail);
              shouldClose();
            } else {
              setErrorText('Электронная почта уже используется');
              setErrorEmail(true);
            }
            // setEmail(mail);
            // shouldClose();
          } else {
            setErrorText('Электронная почта введена неправильно');
            setErrorEmail(true);
          }
        }}
        loading={loading}
        loadingColor={theme === 'dark' ? colors.black : colors.white}
        loadingSize={'small'}
      />
    </View>
  );
};
