import * as React from 'react';
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';
import {BoldText} from '../../../components';
import {useTheme} from '../../../Styles/Styles';
import {Lenta, ProfileIcon, Search} from '../../../components/SVGcomponents';
import {useAppSelector} from '../../../redux/hooks';
import {Home} from '../../../components/SVGcomponents/Home';
import {HeartTab} from '../../../components/SVGcomponents/HeartTab';

const icons_non_auth = [
  {icon: (color: string) => <Home color={color} />},
  {
    icon: (color: string) => <Lenta color={color} />,
  },
  {
    icon: (color: string) => <Search color={color} />,
  },
  {
    icon: (color: string) => <ProfileIcon color={color} />,
  },
];

const icons = [
  {
    icon: (color: string) => <Home color={color} />,
  },
  {
    icon: (color: string) => <Lenta color={color} />,
  },
  {
    icon: (color: string) => <Search color={color} />,
  },
  {
    icon: (color: string) => <HeartTab color={color} size={24} />,
  },
  {
    icon: (color: string) => <ProfileIcon color={color} />,
  },
];

type IProps = {
  route: any;
  index: number;
  descriptors: any;
  state: any;
  navigation: any;
};

export const RenderCustomBar = (props: IProps) => {
  const {descriptors, route, state, index, navigation} = props;
  const {colors} = useTheme();
  const {options} = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;
  const isFocused = state.index === index;
  const screenWidth = useWindowDimensions().width;
  const token = useAppSelector(state1 => state1.auth.token);

  return (
    <TouchableOpacity
      key={index.toString()}
      style={[
        styles.touch,
        {
          width: screenWidth / state.routes.length,
        },
      ]}
      onPress={() => {
        navigation.navigate(route.name);
      }}>
      {token
        ? icons[index].icon(isFocused ? colors.colorMain : colors.textSecondary)
        : icons_non_auth[index].icon(
            isFocused ? colors.colorMain : colors.textSecondary,
          )}
      <BoldText
        fontSize={10}
        style={{
          color: isFocused ? colors.colorMain : colors.textSecondary,
          marginTop: 4,
        }}>
        {label}
      </BoldText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
