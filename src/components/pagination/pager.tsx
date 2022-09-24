/* eslint react/prop-types: 0 */
import React from 'react';
import cn from 'clsx';
import Link from 'next/link'

const Pager = (props) => {

  const prefixCls = `${props.rootPrefixCls}-item`;
  const cls = cn(prefixCls, `${prefixCls}-${props.page} h-10 text-sm relative z-10 inline-flex items-center px-4 border border-light-palette-300 overflow-hidden first:rounded-l cursor-pointer bg-white dark:bg-dark-palette-800 dark:border-dark-palette-600 hover:bg-light-palette-50 focus:z-20`, {
    [`${prefixCls}-active`]: props.active,
    [`${prefixCls}-disabled`]: !props.page,
    [props.className]: !!props.className,
  });

  const handleClick = () => {
    props.onClick(props.page);
  };

  const handleKeyPress = (e) => {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return (
    <li
      title={props.showTitle ? props.page : null}
      className={cls}
      onClick={handleClick}
      onKeyUp={handleKeyPress}
      tabIndex={0}
    >
      {props.itemRender(props.page, 'page', props.page)}
    </li>
  );
};

export default Pager;

//<Link href="/p" rel="follow">{props.page}</Link>