import React, { useState, useMemo, createContext, useContext } from 'react'
import { unmountComponentAtNode, render } from "react-dom";
import clsx from 'clsx'
import { findByType } from '@utils'

interface ContextProps {
    isMounted: boolean; 
    handleMounted: () => void;
    isVisible: boolean; 
    handleVisibility: () => void;
}
interface ContainerProps {
    children? : React.ReactNode,
    closable? : Boolean,
    className? : String,
    as? : React.ElementType | 'div' |'span' | 'li',
    Item?: ItemProps;
    Close?: CloseProps;
    Title?: TitleProps
}
interface TitleProps {
    children?: React.ReactNode;
    className?: string;
    as? : React.ElementType | 'div' |'span' | 'li'
}
interface ItemProps {
    children?: React.ReactNode;
    className?: string;
    as? : React.ElementType | 'div' |'span' | 'li'
}
interface CloseProps {
    children?: React.ReactNode;
    className?: string;
    as? : React.ElementType | 'div' |'span' | 'li'
}


const defaultState = {
    isMounted: true,
    isVisible: true,
    handleMounted: () => {},
    handleVisibility: () => {},
};

const closeErrorMessage = 'There is more than one "Close" children, only the first one will be displayed.'

const ContainerContext = createContext<ContextProps>(defaultState);

const Container : React.FC<ContainerProps> = ({ 
    children, 
    closable = true,
    className,
    as = 'div'
}) => {

    const [isMounted, setIsMounted] = useState(defaultState.isMounted);
    const [isVisible, setIsVisible] = useState(defaultState.isVisible);

    console.log('Container States', isMounted, isVisible)

    const handleMounted = () => {
        //unmountComponentAtNode(document.getElementById('label-root'));
        setIsMounted(!isMounted);
    };

    const handleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const value = useMemo(() => ({ 
        isMounted, 
        handleMounted,
        isVisible, 
        handleVisibility
    }), [isMounted, isVisible]);
    
    const childrenCount = React.Children.count(children)
    //const isCloseOnly = React.Children.only(children)

    const items = findByType(children, Item);
    const close = findByType(children, Close);

    console.log('Items', items, 'close', close)

    console.log('Children Count', childrenCount)

    if (React.Children.count(close) > 1) { 
        console.error(closeErrorMessage);
    }

    const containerCN = clsx(
        'h-10 inline-flex gap-2 box-border items-center cursor-default select-none transition bg-primary',
        {
            [`hidden`] : !isVisible
        },
        className,
    );

    const As = as

    return (
        isMounted &&
        <ContainerContext.Provider value={value}>
            <As id='label-root' className={containerCN}>
              {items}{closable && close[0]}
            </As>
        </ContainerContext.Provider>
    )
}

const Item: React.FC<ItemProps> = ({
    children,
    className,
    as = 'span'
}) => {

    const As = as;
    const itemCN = clsx('first:ml-2 last:mr-2 only:mx-2', {}, className );

        const itemcont = React.Children.map(children, (child: any) => React.cloneElement(
            <As>{child}</As>
            , { className:itemCN }))
        
            console.log('itemcont', itemcont)
            
    return (
        itemcont
       
    )
}

const Close: React.FC<CloseProps> = ({
    children,
    className,
    as = 'button'
}) => {

    const { handleMounted } = useContext(ContainerContext);

    const As = as
    const closeCN = clsx('first:ml-2 last:mr-2 only:py-0', {},
        className,
    );

    return (      
        <As 
            className={closeCN} 
            onClick={() => handleMounted()}
        >
            {children}
        </As>
    )
}

//ContainerContext.displayName = 'ContainerContext'
//Container.displayName = 'Container';

Container.Item = Item
Item.displayName = 'Item';

Container.Close = Close
Close.displayName = 'Close';


export default Container

//WDYR
//Container.whyDidYouRender = true