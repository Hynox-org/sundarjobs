import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface SvgIconProps {
  svg: React.FC<SvgProps>;
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function SvgIcon({ svg: SvgComponent, width = 24, height = 24, color, style }: SvgIconProps) {
  return (
    <View style={[{ width, height }, style]}>
      <SvgComponent width="100%" height="100%" fill={color} />
    </View>
  );
}
