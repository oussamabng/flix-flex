import { Image } from 'react-native';

export function PosterImage({
  uri,
  width = 160,
  height = 224,
}: {
  uri?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      source={{
        uri: uri ?? 'https://placehold.co/300x450?text=No+Image',
      }}
      style={{ width, height, borderRadius: 12 }}
      resizeMode="cover"
    />
  );
}
