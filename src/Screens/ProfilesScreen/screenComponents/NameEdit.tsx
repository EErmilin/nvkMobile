import React, {useState} from 'react';
import {View} from 'react-native';

import {BoldText, Button, InputText, RegularText} from '../../../components';
import {useTheme} from '../../../Styles/Styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  firstname: string;
  setFirstname: (value: string) => void;
  shoudClose: () => void;
}

export const NameEdit: React.FC<IProps> = ({
  firstname,
  setFirstname,
  shoudClose,
}) => {
  const [name, setName] = useState(firstname);
  const {colors} = useTheme();
  const [nameError, setNameError] = React.useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.fillPrimary,
        marginHorizontal: 15,
        paddingTop: 24,
      }}>
      <View style={{flex: 1}}>
        <BoldText
          fontSize={16}
          style={{fontWeight: '700', alignSelf: 'center'}}>
          Ваши данные
        </BoldText>
        <InputText
          autoFocus={false}
          required
          errorState={nameError}
          style={{marginTop: 30}}
          value={name}
          label={'Имя'}
          onChangeText={formatted => {
            setName(formatted);
            setNameError(false);
          }}
        />
        {nameError ? (
          <RegularText
            fontSize={12}
            style={{marginTop: 10, color: colors.danger}}>
            Имя содержать минимум 2 символа
          </RegularText>
        ) : (
          <></>
        )}
      </View>
      <View>
        <Button
          title={'Сохранить'}
          style={{marginBottom: 15 + insets.bottom}}
          onPress={() => {
            if (name.length >= 2) {
              setFirstname(name);
              shoudClose();
            } else {
              setNameError(true);
            }
          }}
        />
      </View>
    </View>
  );
};
