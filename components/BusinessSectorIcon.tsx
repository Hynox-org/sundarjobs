import Ionicons from '@expo/vector-icons/Ionicons';
import { type StyleProp, type TextStyle } from 'react-native';

export function BusinessSectorIcon({
  name,
  size = 24,
  color = 'black',
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return <Ionicons name={name as any} size={size} color={color} style={style} />;
}
