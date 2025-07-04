interface RawImgProps {
  image: string;
  alt: string;
  className?: string;
}

export function RawImg({ image, alt, className }: RawImgProps) {
  return <img src={image} alt={alt} className={className} />;
}
