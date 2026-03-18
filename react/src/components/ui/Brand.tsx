import type { FC } from 'react';

interface BrandProps {
  siteName?: string;
  versionBadge?: string;
}

export const Brand: FC<BrandProps> = ({
  siteName,
  versionBadge,
}) => {
  return (
    <div className="flex items-center gap-s">
      {versionBadge && (
        <span className="badge badge--mono text-xs text-accent border border-line px-xs py-3xs rounded-full leading-[100%] uppercase tracking-2">
          {versionBadge}
        </span>
      )}

      <div className="font-bold tracking-1 text-text whitespace-nowrap">
        {siteName ?? 'Site'}
      </div>
    </div>
  );
};
