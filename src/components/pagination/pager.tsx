/* eslint react/prop-types: 0 */
import React from 'react';
import cn from 'clsx';
import Link from 'next/link'

const Pager = (props) => {

    //console.log('PAGER PROPS', props)

    const isActivePage = props.active

  const prefixCls = `${props.rootPrefixCls}-item`;
  const cls = cn(prefixCls, isActivePage ? 'text-primary-500 bg-primary-200/70 dark:bg-primary-200 ring-2 rounded ring-primary-500/50 dark:ring-primary-500/80 z-50 font-semibold' : 'border-light-palette-300 bg-white dark:bg-dark-palette-800 dark:border-dark-palette-600 hover:bg-light-palette-50', `${prefixCls}-${props.page} h-10 shadow border text-sm relative z-10 inline-flex items-center px-4 overflow-hidden first:rounded-l cursor-pointer focus:z-20`, {
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