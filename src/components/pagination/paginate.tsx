/* eslint react/prop-types: 0 */
import React, { cloneElement, isValidElement } from 'react';
import cn from 'clsx';
import Pager from './pager';
import Options from './options';
import LOCALE from './locale/en_US';
import Link from 'next/link'
import { Button } from "@components";

const KEYCODE ={
  ZERO: 48,
  NINE: 57,

  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,

  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,

  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

function noop() {}

function isInteger(v) {
  const value = Number(v);
  return (
    // eslint-disable-next-line no-restricted-globals
    typeof value === 'number' &&
    !isNaN(value) &&
    isFinite(value) &&
    Math.floor(value) === value
  );
}

function defaultItemRender(page, type, element) {
  return element;
}

function calculatePage(p, state, props) {
  const pageSize = typeof p === 'undefined' ? state.pageSize : p;
  return Math.floor((props.total - 1) / pageSize) + 1;
}

class Paginate extends React.Component {
  static defaultProps = {
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 10,
    onChange: noop,
    className: '',
    selectPrefixCls: 'my-select',
    prefixCls: 'my-pagination',
    selectComponentClass: null,
    hideOnSinglePage: false,
    showPrevNextJumpers: true,
    showQuickJumper: true,
    showLessItems: false,
    showTitle: true,
    onShowSizeChange: noop,
    locale: LOCALE,
    style: {},
    itemRender: defaultItemRender,
    totalBoundaryShowSizeChanger: 50,
  };

  constructor(props) {
    super(props);

    const hasOnChange = props.onChange !== noop;
    const hasCurrent = 'current' in props;
    if (hasCurrent && !hasOnChange) {
      // eslint-disable-next-line no-console
      console.warn(
        'Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.',
      );
    }

    let current = props.defaultCurrent;
    if ('current' in props) {
      // eslint-disable-next-line prefer-destructuring
      current = props.current;
    }

    let pageSize = props.defaultPageSize;
    if ('pageSize' in props) {
      // eslint-disable-next-line prefer-destructuring
      pageSize = props.pageSize;
    }

    current = Math.min(current, calculatePage(pageSize, undefined, props));

    this.state = {
      current,
      currentInputValue: current,
      pageSize,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // When current page change, fix focused style of prev item
    // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
    const { prefixCls } = this.props;
    if (prevState.current !== this.state.current && this.paginationNode) {
      const lastCurrentNode = this.paginationNode.querySelector(
        `.${prefixCls}-item-${prevState.current}`,
      );
      if (lastCurrentNode && document.activeElement === lastCurrentNode) {
        lastCurrentNode.blur();
      }
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    const newState = {};

    if ('current' in props) {
      newState.current = props.current;

      if (props.current !== prevState.current) {
        newState.currentInputValue = newState.current;
      }
    }

    if ('pageSize' in props && props.pageSize !== prevState.pageSize) {
      let { current } = prevState;
      const newCurrent = calculatePage(props.pageSize, prevState, props);
      current = current > newCurrent ? newCurrent : current;

      if (!('current' in props)) {
        newState.current = current;
        newState.currentInputValue = current;
      }
      newState.pageSize = props.pageSize;
    }

    return newState;
  }

  getJumpPrevPage = () =>
    Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));

  getJumpNextPage = () =>
    Math.min(
      calculatePage(undefined, this.state, this.props),
      this.state.current + (this.props.showLessItems ? 3 : 5),
    );

  /**
   * computed icon node that need to be rendered.
   * @param {React.ReactNode | React.ComponentType<PaginationProps>} icon received icon.
   * @returns {React.ReactNode}
   */
  getItemIcon = (icon, label) => {
    const { prefixCls } = this.props;
    let iconNode = icon || (
      <button
        type="button"
        aria-label={label}
        className={`${prefixCls}-item-link`}
      />
    );
    if (typeof icon === 'function') {
      iconNode = React.createElement(icon, { ...this.props });
    }
    return iconNode;
  };

  getValidValue(e) {
    const inputValue = e.target.value;
    const allPages = calculatePage(undefined, this.state, this.props);
    const { currentInputValue } = this.state;
    let value;
    if (inputValue === '') {
      value = inputValue;
      // eslint-disable-next-line no-restricted-globals
    } else if (isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else if (inputValue >= allPages) {
      value = allPages;
    } else {
      value = Number(inputValue);
    }
    return value;
  }

  savePaginationNode = (node) => {
    this.paginationNode = node;
  };

  isValid = (page) => {
    const { total } = this.props;
    return (
      isInteger(page) &&
      page !== this.state.current &&
      isInteger(total) &&
      total > 0
    );
  };

  shouldDisplayQuickJumper = () => {
    const { showQuickJumper, total } = this.props;
    const { pageSize } = this.state;
    if (total <= pageSize) {
      return false;
    }
    return showQuickJumper;
  };

  handleKeyDown = (e) => {
    if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
      e.preventDefault();
    }
  };

  handleKeyUp = (e) => {
    const value = this.getValidValue(e);
    const { currentInputValue } = this.state;
    if (value !== currentInputValue) {
      this.setState({
        currentInputValue: value,
      });
    }
    if (e.keyCode === KEYCODE.ENTER) {
      this.handleChange(value);
    } else if (e.keyCode === KEYCODE.ARROW_UP) {
      this.handleChange(value - 1);
    } else if (e.keyCode === KEYCODE.ARROW_DOWN) {
      this.handleChange(value + 1);
    }
  };

  handleBlur = (e) => {
    const value = this.getValidValue(e);
    this.handleChange(value);
  };

  changePageSize = (size) => {
    let { current } = this.state;
    const newCurrent = calculatePage(size, this.state, this.props);
    current = current > newCurrent ? newCurrent : current;
    // fix the issue:
    // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.
    if (newCurrent === 0) {
      // eslint-disable-next-line prefer-destructuring
      current = this.state.current;
    }

    if (typeof size === 'number') {
      if (!('pageSize' in this.props)) {
        this.setState({
          pageSize: size,
        });
      }
      if (!('current' in this.props)) {
        this.setState({
          current,
          currentInputValue: current,
        });
      }
    }

    this.props.onShowSizeChange(current, size);

    if ('onChange' in this.props && this.props.onChange) {
      this.props.onChange(current, size);
    }
  };

  handleChange = (page) => {
    const { disabled, onChange } = this.props;
    const { pageSize, current, currentInputValue } = this.state;
    if (this.isValid(page) && !disabled) {
      const currentPage = calculatePage(undefined, this.state, this.props);
      let newPage = page;
      if (page > currentPage) {
        newPage = currentPage;
      } else if (page < 1) {
        newPage = 1;
      }
      if (!('current' in this.props)) {
        this.setState({
          current: newPage,
        });
      }
      if (newPage !== currentInputValue) {
        this.setState({
          currentInputValue: newPage,
        });
      }
      onChange(newPage, pageSize);
      return newPage;
    }
    return current;
  };

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  };

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  };

  jumpPrev = () => {
    this.handleChange(this.getJumpPrevPage());
  };

  jumpNext = () => {
    this.handleChange(this.getJumpNextPage());
  };

  hasPrev = () => this.state.current > 1;

  hasNext = () =>
    this.state.current < calculatePage(undefined, this.state, this.props);

  getShowSizeChanger() {
    const { showSizeChanger, total, totalBoundaryShowSizeChanger } = this.props;
    if (typeof showSizeChanger !== 'undefined') {
      return showSizeChanger;
    }
    return total > totalBoundaryShowSizeChanger;
  }

  runIfEnter = (event, callback, ...restParams) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  };

  runIfEnterPrev = (e) => {
    this.runIfEnter(e, this.prev);
  };

  runIfEnterNext = (e) => {
    this.runIfEnter(e, this.next);
  };

  runIfEnterJumpPrev = (e) => {
    this.runIfEnter(e, this.jumpPrev);
  };

  runIfEnterJumpNext = (e) => {
    this.runIfEnter(e, this.jumpNext);
  };

  handleGoTO = (e) => {
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.handleChange(this.state.currentInputValue);
    }
  };

  renderPrev(prevPage) {
    const { prevIcon, itemRender } = this.props;
    const prevButton = itemRender(
      prevPage,
      'prev',
      this.getItemIcon(prevIcon, 'prev page'),
    );
    const disabled = !this.hasPrev();
    return isValidElement(prevButton)
      ? cloneElement(prevButton, { disabled })
      : prevButton;
  }

  renderNext(nextPage) {
    const { nextIcon, itemRender } = this.props;
    const nextButton = itemRender(
      nextPage,
      'next',
      this.getItemIcon(nextIcon, 'next page'),
    );
    const disabled = !this.hasNext();
    return isValidElement(nextButton)
      ? cloneElement(nextButton, { disabled })
      : nextButton;
  }

  render() {
    const {
      prefixCls,
      className,
      style,
      disabled,
      hideOnSinglePage,
      total,
      locale,
      showQuickJumper,
      showLessItems,
      showTitle,
      showTotal,
      simple,
      itemRender,
      showPrevNextJumpers,
      jumpPrevIcon,
      jumpNextIcon,
      selectComponentClass,
      selectPrefixCls,
      pageSizeOptions,
    } = this.props;

    const { current, pageSize, currentInputValue } = this.state;

    // When hideOnSinglePage is true and there is only 1 page, hide the pager
    if (hideOnSinglePage === true && total <= pageSize) {
      return null;
    }

    const allPages = calculatePage(undefined, this.state, this.props);
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;
    let gotoButton = null;

    const goButton = showQuickJumper && showQuickJumper.goButton;
    const pageBufferSize = showLessItems ? 1 : 2;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < allPages ? current + 1 : allPages;

    const dataOrAriaAttributeProps = Object.keys(this.props).reduce(
      (prev, key) => {
        if (
          key.substr(0, 5) === 'data-' ||
          key.substr(0, 5) === 'aria-' ||
          key === 'role'
        ) {
          // eslint-disable-next-line no-param-reassign
          prev[key] = this.props[key];
        }
        return prev;
      },
      {},
    );

    if (simple) {
      if (goButton) {
        if (typeof goButton === 'boolean') {
          gotoButton = (
            <Button
              type="button"
              onClick={this.handleGoTO}
              onKeyUp={this.handleGoTO}
            >
              {locale.jump_to_confirm}
            </Button>
          );
        } else {
          gotoButton = (
            <span onClick={this.handleGoTO} onKeyUp={this.handleGoTO}>
              {goButton}
            </span>
          );
        }
        gotoButton = (
          <li
            title={showTitle ? `${locale.jump_to}${current}/${allPages}` : null}
            className={`${prefixCls}-simple-pager`}
          >
            {gotoButton}
          </li>
        );
      }

      return (
        <ul
          className={cn(
            prefixCls,
            `${prefixCls}-simple`,
            { [`${prefixCls}-disabled`]: disabled },
            className,
          )}
          style={style}
          ref={this.savePaginationNode}
          {...dataOrAriaAttributeProps}
        >
          <div
            title={showTitle ? locale.prev_page : null}
            onClick={this.prev}
            tabIndex={this.hasPrev() ? 0 : null}
            onKeyUp={this.runIfEnterPrev}
            className={cn(`${prefixCls}-prev`, {
              [`${prefixCls}-disabled`]: !this.hasPrev(),
            })}
            aria-disabled={!this.hasPrev()}
          >
            {this.renderPrev(prevPage)}
          </div>
          <div
            title={showTitle ? `${current}/${allPages}` : null}
            className={`${prefixCls}-simple-pager`}
          >
            <input
              type="text"
              value={currentInputValue}
              disabled={disabled}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onChange={this.handleKeyUp}
              onBlur={this.handleBlur}
              size={3}
            />
            <span className={`${prefixCls}-slash`}>/</span>
            {allPages}
          </div>
          <div
            title={showTitle ? locale.next_page : null}
            onClick={this.next}
            tabIndex={this.hasPrev() ? 0 : null}
            onKeyUp={this.runIfEnterNext}
            className={cn(`${prefixCls}-next `, {
              [`${prefixCls}-disabled`]: !this.hasNext(),
            })}
            aria-disabled={!this.hasNext()}
          >
            {this.renderNext(nextPage)}
          </div>
          {gotoButton}
        </ul>
      );
    }

    if (allPages <= 3 + pageBufferSize * 2) {
      const pagerProps = {
        locale,
        rootPrefixCls: prefixCls,
        onClick: this.handleChange,
        onKeyPress: this.runIfEnter,
        showTitle,
        itemRender,
      };
      if (!allPages) {
        pagerList.push(
          <Pager
            {...pagerProps}
            key="noPager"
            page={1}
            className={`${prefixCls}-item-disabled`}
          />,
        );
      }
      for (let i = 1; i <= allPages; i += 1) {
        const active = current === i;
        pagerList.push(
          <Pager {...pagerProps} key={i} page={i} active={active} />,
        );
      }
    } else {
      const prevItemTitle = showLessItems ? locale.prev_3 : locale.prev_5;
      const nextItemTitle = showLessItems ? locale.next_3 : locale.next_5;
      if (showPrevNextJumpers) {
        jumpPrev = (
          <li
            title={showTitle ? prevItemTitle : null}
            key="prev"
            onClick={this.jumpPrev}
            tabIndex={0}
            onKeyUp={this.runIfEnterJumpPrev}
            className={cn(`${prefixCls}-jump-prev relative z-10 inline-flex items-center h-10 w-10 overflow-hidden cursor-pointer focus:z-20`, {
              [`${prefixCls}-jump-prev-custom-icon`]: !!jumpPrevIcon,
            })}
          >
            {itemRender(
              this.getJumpPrevPage(),
              'jump-prev',
              this.getItemIcon(jumpPrevIcon, 'prev page'),
            )}
          </li>
        );
        jumpNext = (
          <li
            title={showTitle ? nextItemTitle : null}
            key="next"
            tabIndex={0}
            onClick={this.jumpNext}
            onKeyUp={this.runIfEnterJumpNext}
            className={cn(`${prefixCls}-jump-next h-10 w-10 relative z-10 inline-flex items-center overflow-hidden cursor-pointer focus:z-20`, {
              [`${prefixCls}-jump-next-custom-icon`]: !!jumpNextIcon,
            })}
          >
            {itemRender(
              this.getJumpNextPage(),
              'jump-next',
              this.getItemIcon(jumpNextIcon, 'next page'),
            )}
          </li>
        );
      }
      lastPager = (
        <Pager
          locale={locale}
          last
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={showTitle}
          itemRender={itemRender}
        />
      );
      firstPager = (
        <Pager
          locale={locale}
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={1}
          page={1}
          active={false}
          showTitle={showTitle}
          itemRender={itemRender}
        />
      );

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(current + pageBufferSize, allPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i += 1) {
        const active = current === i;
        pagerList.push(
          <Pager
            locale={locale}
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={showTitle}
            itemRender={itemRender}
          />,
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = cloneElement(pagerList[0], {
          className: `${prefixCls}-item-after-jump-prev`,
        });
        pagerList.unshift(jumpPrev);
      }
      if (
        allPages - current >= pageBufferSize * 2 &&
        current !== allPages - 2
      ) {
        pagerList[pagerList.length - 1] = cloneElement(
          pagerList[pagerList.length - 1],
          {
            className: `${prefixCls}-item-before-jump-next`,
          },
        );
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    let totalText = null;

    if (showTotal) {
      totalText = (
        <div className={`${prefixCls}-total-text text-sm`}>
          Page {current} of {total/pageSize}
         {/* {showTotal(total, [
            total === 0 ? 0 : (current - 1) * pageSize + 1,
            current * pageSize > total ? total : current * pageSize,
          ])}*/}
        </div>
      );
    }
    const prevDisabled = !this.hasPrev() || !allPages;
    const nextDisabled = !this.hasNext() || !allPages;
    return (
      <div
        className={cn(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
        })}
        style={style}
        unselectable="unselectable"
        ref={this.savePaginationNode}
        {...dataOrAriaAttributeProps}
      >
        {totalText}
        <nav id={'pagination'} role="navigation" aria-label="pagination">
          <ul className='isolate inline-flex -space-x-px'>
            <li
              title={showTitle ? locale.prev_page : null}
              onClick={this.prev}
              tabIndex={prevDisabled ? null : 0}
              onKeyUp={this.runIfEnterPrev}
              className={cn(`${prefixCls}-prev shadow h-10 w-10 relative rounded-l z-10 inline-flex items-center border border-light-palette-300 overflow-hidden cursor-pointer bg-white dark:bg-dark-palette-800 dark:border-dark-palette-600 hover:bg-light-palette-50 focus:z-20`, {
                [`${prefixCls}-disabled`]: prevDisabled,
              })}
              aria-disabled={prevDisabled}
            >
              {this.renderPrev(prevPage)}
            </li>
          
              {pagerList}
            {/*next button style*/}
            <div
              title={showTitle ? locale.next_page : null}
              onClick={this.next}
              tabIndex={nextDisabled ? null : 0}
              onKeyUp={this.runIfEnterNext}
              className={cn(`${prefixCls}-next shadow relative rounded-r z-10 inline-flex items-center w-10 h-10 border border-light-palette-300 overflow-hidden cursor-pointer bg-white dark:bg-dark-palette-800 dark:border-dark-palette-600 hover:bg-light-palette-50 focus:z-20`, {
                [`${prefixCls}-disabled`]: nextDisabled,
              })}
              aria-disabled={nextDisabled}
            >
              {this.renderNext(nextPage)}
            </div>
          </ul>
        </nav>
        <Options
          disabled={disabled}
          locale={locale}
          rootPrefixCls={prefixCls}
          selectComponentClass={selectComponentClass}
          selectPrefixCls={selectPrefixCls}
          changeSize={this.getShowSizeChanger() ? this.changePageSize : null}
          current={current}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          quickGo={this.shouldDisplayQuickJumper() ? this.handleChange : null}
          goButton={goButton}
        />
      </div>
    );
  }
}

export default Paginate;