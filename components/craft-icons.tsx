import type { SVGProps } from "react";

type CraftIconName = "butterfly" | "studio" | "kit" | "embossing" | "beads" | "family" | "cafe" | "guide" | "gift" | "wellbeing" | "painting";
type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & { size?: number; tone?: "color" | "current" };

/** Ilustraciones vectoriales propias: trazo redondo, rellenos cálidos y motivos del taller. */
function CraftIcon({ name, size = 32, tone = "color", className = "", ...props }: IconProps & { name: CraftIconName }) {
  const mono = tone === "current";
  const color = {
    ink: mono ? "currentColor" : "#634454",
    coral: mono ? "none" : "#f28798",
    mint: mono ? "none" : "#91c6a9",
    sun: mono ? "none" : "#efbd59",
    cream: mono ? "none" : "#fff9ed",
    lilac: mono ? "none" : "#b293cb",
    copper: mono ? "none" : "#d99a76",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color.ink} strokeWidth={1.55} strokeLinecap="round" strokeLinejoin="round" className={`craft-icon ${className}`} aria-hidden={props["aria-label"] ? undefined : true} focusable="false" data-craft-icon={name} {...props}>
      {name === "butterfly" && <>
        <path d="M15 16C12 6 4 2 3 7c-2 7 3 13 12 11" fill={color.lilac} />
        <path d="M17 16C20 6 28 2 29 7c2 7-3 13-12 11" fill={color.coral} />
        <path d="M15 18C8 17 6 25 10 27c5 2 7-5 6-9" fill={color.sun} />
        <path d="M17 18c7-1 9 7 5 9-5 2-7-5-6-9" fill={color.mint} />
        <path d="M5 10c4 0 7 3 10 6m12-6c-4 0-7 3-10 6M16 13v12m-1-13c0-3-2-5-4-6m6 6c0-3 2-5 4-6" />
        <circle cx="16" cy="13" r="1.5" fill={color.ink} strokeWidth="1" />
      </>}
      {name === "studio" && <>
        <path d="m10 23-4 7m16-7 4 7M16 3v4" />
        <rect x="6" y="6" width="20" height="19" rx="2" fill={color.cream} />
        <path d="M9 20c2-6 4-9 6-8s1 9 4 7 3-7 5-6" stroke={mono ? color.ink : "#d95777"} strokeWidth="2.6" />
        <path d="M9 22h14" stroke={mono ? color.ink : "#86bba0"} strokeWidth="2" />
        <path d="m26 2-4 11 2 1 5-10Z" fill={color.sun} />
        <path d="m22 13-1 5 3-4" fill={color.coral} />
      </>}
      {name === "kit" && <>
        <path d="m22 3-3 11 3 1 3-11Z" fill={color.sun} />
        <path d="m19 14-1 4 4-3" fill={color.coral} />
        <circle cx="8" cy="6" r="2.6" fill={color.mint} />
        <circle cx="13" cy="5" r="2.6" fill={color.mint} />
        <path d="m10 8 5 8m-3-8-3 8" />
        <path d="m4 15 12-4 12 4v11l-12 4-12-4Z" fill={color.cream} />
        <path d="m4 15-3-4 10-4 5 4 5-4 10 4-3 4M4 15l12 5 12-5M16 20v10" />
        <path d="m4 15 12-4 12 4-12 5Z" fill={color.sun} fillOpacity={.65} />
        <path d="m21 20 1.5 2 2.5-.5-1 2 1 2-2.5-.5-1.5 2-1-2.5-2-.5 2-1Z" fill={color.coral} strokeWidth=".9" />
      </>}
      {name === "embossing" && <>
        <path d="M5 4h19l3 3v21H5Z" fill={color.copper} />
        <path d="M24 4v4h3M8 7h4M8 25h5" strokeWidth="1" />
        <path d="M16 12c-5-7-10 0-5 3-7 1-3 8 2 5-1 6 7 6 7 0 5 3 9-4 2-5 5-3 0-10-5-3Z" fill={color.cream} />
        <circle cx="16.5" cy="16.5" r="2.7" fill={color.sun} />
        <path d="m28 17-8 12m9-14 2 1-2 3-2-1Z" fill={color.mint} />
      </>}
      {name === "beads" && <>
        <g transform="rotate(-12 16 16)">
          <path d="M4 11H1m3 4H1m3 4H1m27-8h3m-3 4h3m-3 4h3" strokeWidth="1.1" />
          {[0, 1, 2].flatMap((row) => [0, 1, 2, 3, 4, 5].map((column) => <rect key={`${row}-${column}`} x={4.6 + column * 3.85} y={9.5 + row * 3.85} width="3.3" height="3.3" rx=".8" fill={[color.mint, color.coral, color.sun][(column + row) % 3]} strokeWidth=".7" />))}
          <path d="M3 24c6 5 18 5 23-1" stroke={mono ? color.ink : "#c37581"} strokeWidth="1.2" />
        </g>
        <path d="m20 3 9 3m-3-3 4 1-1 2-4-1" strokeWidth="1.15" />
      </>}
      {name === "family" && <>
        <path d="M16 14c-5-8-13 0 0 8 13-8 5-16 0-8Z" fill={color.coral} />
        <path d="M3 15h3l5 7 4 1c2 1 1 4-1 3l-6-2-5-5Z" fill={color.mint} />
        <path d="M29 15h-3l-5 7-4 1c-2 1-1 4 1 3l6-2 5-5Z" fill={color.sun} />
        <path d="M16 3v3M7 6l2 2m16-2-2 2" stroke={mono ? color.ink : "#b68bc0"} />
      </>}
      {name === "cafe" && <>
        <path d="M6 12h18v9c0 5-18 5-18 0Z" fill={color.mint} />
        <path d="M24 14h3c5 0 4 7-3 7M3 28h24" />
        <path d="m7 3 6 10 2-1-5-10Z" fill={color.sun} />
        <path d="m12 12 3 5 1-6" fill={color.coral} />
        <path d="M21 9c-4-3 3-4 0-7" stroke={mono ? color.ink : "#ab7eac"} />
        <path d="M17 17c-2-3-6 0 0 4 6-4 2-7 0-4Z" fill={color.cream} strokeWidth="1" />
      </>}
      {name === "guide" && <>
        <path d="M5 3h14l6 6v20H5Z" fill={color.cream} />
        <path d="M19 3v7h6" fill={color.lilac} />
        <path d="M9 15c2-5 5-5 6-1 4-2 6 1 1 4-5 3-8 0-7-3Z" fill={color.coral} />
        <path d="M9 22h7m-7 3h5" strokeWidth="1.2" />
        <path d="M25 18v10m-4-4 4 4 4-4" stroke={mono ? color.ink : "#398467"} strokeWidth="2.2" />
      </>}
      {name === "gift" && <>
        <path d="M5 14h22v15H5Z" fill={color.cream} />
        <rect x="3" y="11" width="26" height="6" rx="1.5" fill={color.mint} />
        <path d="M14 17h4v12h-4Z" fill={color.coral} />
        <path d="M16 10C6 10 6 3 10 3c4 0 6 7 6 7Zm0 0c10 0 10-7 6-7-4 0-6 7-6 7Z" fill={color.sun} />
        <path d="m22 20 1 2 2 .5-1.5 1.5.3 2-1.8-1-1.8 1 .3-2L19 22.5l2-.5Z" fill={color.coral} strokeWidth=".8" />
      </>}
      {name === "wellbeing" && <>
        <circle cx="24" cy="7" r="4" fill={color.sun} strokeWidth="1.1" />
        <path d="M7 29C19 22 17 14 20 6" />
        <path d="M14 22C5 24 2 18 3 14c7-2 13 2 11 8Z" fill={color.mint} />
        <path d="M17 17c-6-1-9-6-7-11 7 0 10 5 7 11Z" fill={color.coral} />
        <path d="M15 25c1-8 7-10 13-8-1 7-7 11-13 8Z" fill={color.mint} />
        <path d="m7 18 7 4m4 2 6-4" strokeWidth="1" />
      </>}
      {name === "painting" && <>
        <path d="M15 10c-7-5-14 2-11 10 2 8 8 10 12 7 5 3 11 0 12-7 2-8-5-15-12-10Z" fill={color.coral} />
        <path d="M16 10c7-5 14 2 12 10-1 7-7 10-12 7Z" fill={color.mint} />
        <path d="M15 10c-4 5-5 11 1 17m1-17c4 5 5 11-1 17M15 10c-2-4 0-7 3-8l2 3c-3 0-3 2-3 5" />
        <path d="m2 28 8-11 2 2-8 11Z" fill={color.sun} />
        <path d="m10 17 3-3-1 5" fill={color.cream} />
      </>}
    </svg>
  );
}

export const ButterflyIcon = (props: IconProps) => <CraftIcon name="butterfly" {...props} />;
export const WorkshopIcon = (props: IconProps) => <CraftIcon name="studio" {...props} />;
export const KitIcon = (props: IconProps) => <CraftIcon name="kit" {...props} />;
export const EmbossingIcon = (props: IconProps) => <CraftIcon name="embossing" {...props} />;
export const MiyukiIcon = (props: IconProps) => <CraftIcon name="beads" {...props} />;
export const FamilyIcon = (props: IconProps) => <CraftIcon name="family" {...props} />;
export const CreativeCafeIcon = (props: IconProps) => <CraftIcon name="cafe" {...props} />;
export const GuideIcon = (props: IconProps) => <CraftIcon name="guide" {...props} />;
export const GiftWrapIcon = (props: IconProps) => <CraftIcon name="gift" {...props} />;
export const WellbeingIcon = (props: IconProps) => <CraftIcon name="wellbeing" {...props} />;
export const PaintingIcon = (props: IconProps) => <CraftIcon name="painting" {...props} />;

export function CategoryCraftIcon({ category, ...props }: IconProps & { category: "inicio" | "talleres" | "kits" | "obras" | "guias" }) {
  const names = { inicio: "butterfly", talleres: "studio", kits: "kit", obras: "embossing", guias: "guide" } as const;
  return <CraftIcon name={names[category]} {...props} />;
}
