import { useMapEvents } from 'react-leaflet';

type ClickHandlerProps = {
  onClick: (lat: number, lng: number) => void;
};

export default function MapClickHandler({ onClick }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}
