import QRCodeSVG from 'qrcode-svg';
import { useMemo } from 'react';

type Props = {
  url: string;
  className?: string;
};

export default function QRCode({ url, className = '' }: Props) {
  const qr = useMemo(
    () =>
      new QRCodeSVG({
        content: url,
        ecl: 'H',
        padding: 0,
        background: 'transparent',
        color: 'currentColor',
        container: 'svg-viewbox',
      }),
    [url],
  );
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: qr.svg() }} />
  );
}
