/* eslint react/prop-types: 0 */
import React, { Fragment } from 'react';
import { Button } from "@components";
import { Listbox, Transition } from '@headlessui/react'
import { 
    CheckIcon,
    ChevronUpDownIcon
} from '@heroicons/react/20/solid'

const KEYCODE = {
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

class Options extends React.Component {
  static defaultProps = {
    pageSizeOptions: ['10', '20', '50', '100'],
  };

  state = {
    goInputText: '',
  };

  getValidValue() {
    const { goInputText } = this.state;
    // eslint-disable-next-line no-restricted-globals
    return !goInputText || isNaN(goInputText) ? undefined : Number(goInputText);
  }

  buildOptionText = (value) => `${value} ${this.props.locale.items_per_page}`;

  changeSize = (value) => {
    this.props.changeSize(Number(value));
  };

  handleChange = (e) => {
    this.setState({
      goInputText: e.target.value,
    });
  };

  handleBlur = (e) => {
    const { goButton, quickGo, rootPrefixCls } = this.props;
    const { goInputText } = this.state;
    if (goButton || goInputText === '') {
      return;
    }
    this.setState({
      goInputText: '',
    });
    if (
      e.relatedTarget &&
      (e.relatedTarget.className.indexOf(`${rootPrefixCls}-item-link`) >= 0 ||
        e.relatedTarget.className.indexOf(`${rootPrefixCls}-item`) >= 0)
    ) {
      return;
    }
    quickGo(this.getValidValue());
  };

  go = (e) => {
    const { goInputText } = this.state;
    if (goInputText === '') {
      return;
    }
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.setState({
        goInputText: '',
      });
      this.props.quickGo(this.getValidValue());
    }
  };

  getPageSizeOptions() {
    const { pageSize, pageSizeOptions } = this.props;
    if (
      pageSizeOptions.some(
        (option) => option.toString() === pageSize.toString(),
      )
    ) {
      return pageSizeOptions;
    }
    return pageSizeOptions.concat([pageSize.toString()]).sort((a, b) => {
      // eslint-disable-next-line no-restricted-globals
      const numberA = isNaN(Number(a)) ? 0 : Number(a);
      // eslint-disable-next-line no-restricted-globals
      const numberB = isNaN(Number(b)) ? 0 : Number(b);
      return numberA - numberB;
    });
  }

  render() {
    const {
      pageSize,
      locale,
      rootPrefixCls,
      changeSize,
      quickGo,
      goButton,
      selectComponentClass,
      buildOptionText,
      selectPrefixCls,
      disabled,
    } = this.props;
    const { goInputText } = this.state;
    const prefixCls = `${rootPrefixCls}-options`;
    const Select = selectComponentClass;
    let changeSelect = null;
    let goInput = null;
    let gotoButton = null;

    if (!changeSize && !quickGo) {
      return null;
    }

    const pageSizeOptions = this.getPageSizeOptions();

    if (changeSize) {
     {/* const options = pageSizeOptions.map((opt, i) => (
        <Select.Option key={i} value={opt.toString()}>
          {(buildOptionText || this.buildOptionText)(opt)}
        </Select.Option>
      ));
     */}
        const options = pageSizeOptions.map((size : number, i : number) => (
    
            <Listbox.Option
                key={i}
                className={({ active }) =>
                    `relative cursor-default select-none py-2 w-20 px-6 ${
                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                    }`
                }
                value={size.toString()}
            >
                {({ selected }) => (
                    <>
                        <span
                            className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                            {size}
                        </span>
                        {selected && false? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                        ) : null}
                    </>
                )}
            </Listbox.Option>

        ))

        changeSelect = (

            <Listbox 
                value={(pageSize || pageSizeOptions[0]).toString()} 
                onChange={this.changeSize} 
                className={`${prefixCls}-size-changer`}
                aria-label={locale.page_size}
            >
                <div className="relative mt-1 border-light-palette-300 border rounded-md">
                    <Listbox.Button className="relative w-20 max-w-20 cursor-default border border-light-palette-200 dark:border-dark-palette-600 rounded bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{pageSize}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        );
    }

    if (quickGo) {
      if (goButton) {
        gotoButton =
          typeof goButton === 'boolean' ? (
            <Button
              type="button"
              onClick={this.go}
              onKeyUp={this.go}
              disabled={disabled}
              className={`${prefixCls}-quick-jumper-button ff`}
            >
              {locale.jump_to_confirm}
            </Button>
          ) : (
            <span onClick={this.go} onKeyUp={this.go}>
                <Button
                    ripple
                    type="button"
                    color={'light'}
                    shadow={'sm'}
                    variant='contained'
                    size={'xs'}
                    onClick={this.go}
                    onKeyUp={this.go}
                    disabled={disabled}
                    className={`${prefixCls}-quick-jumper-button rounded-r`}
                >
                    Go
                </Button>
            </span>
          );
      }
      goInput = (
        <div className={`${prefixCls}-quick-jumper`}>
          
          <input
            disabled={disabled}
            type="text"
            value={goInputText}
            onChange={this.handleChange}
            onKeyUp={this.go}
            onBlur={this.handleBlur}
            aria-label={locale.page}
            placeholder={'Go to page'}
            className={'w-24 text-xs text-light-palette-600 shadow-sm border border-light-palette-200 rounded-l'}
          />
          {gotoButton}
          
        </div>
      );
    }

    return (
      <div className={`${prefixCls} flex gap-4`}>
        {changeSelect}
        {goInput}
      </div>
    );
  }
}

export default Options;