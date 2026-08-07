import { Link, useLocale } from 'dumi';
import React from 'react';
import guozhiLogo from '../../assets/guozhi-logo.png';

export default function Logo() {
  const locale = useLocale();

  return (
    <Link
      className="dumi-default-logo gg-brand-logo"
      to={'base' in locale ? locale.base : '/'}
      aria-label="国智技术 gg-cli 文档首页"
    >
      <span className="gg-brand-logo-company" aria-hidden="true">
        <img src={guozhiLogo} alt="" />
      </span>
    </Link>
  );
}
