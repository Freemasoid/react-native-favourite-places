import { GOOGLE_API_KEY } from "@env";

interface GetMapPreviewProps {
  lat: number;
  lng: number;
}

export default function getMapPreview({
  lat,
  lng,
}: GetMapPreviewProps): string {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}
