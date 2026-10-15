import { useSiteData } from 'dumi';
import type { ReactNode } from 'react';
import type environments from '../../../../config/environments.json';

type ExternalDocName = keyof typeof environments.public.externalLinks;

interface ExternalDocLinkProps {
  name: ExternalDocName;
  children?: ReactNode;
}

export default function ExternalDocLink({ name, children }: ExternalDocLinkProps) {
  const { themeConfig } = useSiteData();
  const href: unknown = themeConfig.externalLinks?.[name];

  if (typeof href !== 'string') {
    throw new Error(`未配置文档链接：${name}`);
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children ?? href}
    </a>
  );
}
