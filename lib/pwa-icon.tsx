type PwaIconProps = {
  size: number;
  maskable?: boolean;
};

export function PwaIconMarkup({ size, maskable = false }: PwaIconProps) {
  const fontSize = Math.round(size * (maskable ? 0.32 : 0.42));
  const borderRadius = maskable ? 0 : Math.round(size * 0.12);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        borderRadius,
        color: '#ffffff',
        fontSize,
        fontWeight: 700,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      T
    </div>
  );
}
