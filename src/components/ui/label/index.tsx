import React, { FC, useState } from 'react'
import { Transition } from '@headlessui/react'
import cn from 'clsx'
import {  XMarkIcon } from '@heroicons/react/24/outline'

const findByType = (children : any, component : any) => {
    const result = [];
    /* This is the array of result since Article can have multiple times the same sub-component */
    const type = [component.displayName] || [component.name];
    /* We can store the actual name of the component through the displayName or name property of our sub-component */
    React.Children.forEach(children, (child) => {

        const childType = child && child.type && (child.type.displayName || child.type.name);

        if (type.includes(childType)) {
            result.push(child);
        }
    });

    /* Then we go through each React children, if one of matches the name of the sub-component we’re looking for we put it in the result array */
    return result[0];
  };

  const Title = () => null;
  
interface LabelProps {
    className?: string;
    children?: React.ReactNode;
    unstyled?: boolean;
    closable?: boolean;
    Prefix?: any;
    Content?: any;
    Suffix?: any;
}

const Label : FC<LabelProps> = ({
    className,
    children,
    unstyled,
    closable = true
}) => {

    //const prefix = React.Children.map(children, child => child.type?.displayName === 'Prefix' ? child : null);
    //const content = React.Children.map(children, child => child.type?.displayName === 'Content' ? child : null);
    //const suffix = React.Children.map(children, child => child.type?.displayName === 'Suffix' ? child : null);
    
    //const type = [component.displayName] || [component.name];


    let subComponentList = Object.keys(Label);

    let subComponents = subComponentList.map((key) => {
        return React.Children.map(children, (child) =>
            child.type?.name === key ? child : null
        );
    });

    console.log('SUB COMPONENTS LIST:', subComponentList)

    console.log('SUB COMPONENTS:', subComponents)


    let childrens = [];
    React.Children.forEach(children, (child) => {
        
        console.log('CHIDLRENz', children, child.type)
        //console.log('CHIDLRENz', findByType(children, child.type))

      });

      const prefix = findByType(children, Prefix);
      const content = findByType(children, Content);
      const suffix = findByType(children, Suffix);
      const close = findByType(children, Close);
      const item = findByType(children, Item);

    console.log('CHIDLREN MAPPING', React.Children, React.Children.count.length, content )

    console.log('ITEMMM', item)

    return (
      <div className="h-10 inline-flex gap-2 box-border items-center cursor-default select-none transition bg-primary rounded-md">
        <div className="first:ml-2 last:mr-2 text-white bg-primary-300 p-1 rounded-md only:mx-2">
        {prefix}
        </div>
        <div className="first:ml-2 last:mr-2 text-primary-100 only:py-0">
          {content}
        </div>
        <div className="first:ml-2 last:mr-2 p-1 rounded-md only:py-0">
          {suffix}
        </div>
        {closable && close && <div className="first:ml-2 last:mr-2 bg-white p-1 rounded-md only:py-0">
          {close}
        </div>}
        <div>
            {item}
        </div>
      </div>
    );
}
  
  const Prefix = ({ children }) => children;
  Prefix.displayName = 'Prefix';
  Label.Prefix = Prefix;
  
  const Content = ({ children }) => children;
  Content.displayName = 'Content';
  Label.Content = Content;
  
  const Suffix = ({ children }) => children;
  Suffix.displayName = 'Suffix';
  Label.Suffix = Suffix;

  const Close = ({ children }) => children;
  Close.displayName = 'Close';
  Label.Close = Close;

  const Item = ({ children }) => children;
  Item.displayName = 'Item';
  Label.Item = Item;

  export default Label;