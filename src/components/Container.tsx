import * as React from 'react';
import {View, ViewProps} from 'react-native';

export const Containter: React.FC<
  {
    ref?: React.LegacyRef<View>;
  } & ViewProps
> = props => {
  const {children, style, ref, ...rest} = props;

  return (
    <View
      style={[{paddingHorizontal: 15, paddingVertical: 20}, style]}
      ref={ref}
      {...rest}>
      {children}
    </View>
  );
};
