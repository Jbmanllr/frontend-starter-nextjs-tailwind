import React, { useState, useMemo, createContext, useContext } from 'react'
import { unmountComponentAtNode, render } from "react-dom";
import clsx from 'clsx'
import { findByType } from '@utils'

interface LabelContextProps {
    isMounted: boolean; 
    handleMounted: () => void;
    isVisible: boolean; 
    handleVisibility: () => void;
}
interface LabelProps {
    children? : React.ReactNode;
    closable? : Boolean;
    className? : String;
    as? : React.ElementType | 'div' |'span' | 'li';
    //Prefix?: PrefixProps;
    //Title?: TitleProps;
    //Suffix?: SuffixProps;
    //Close?: CloseProps;
}
interface PrefixProps {
    children?: React.ReactNode;
    className?: string;
    as? : React.ElementType | 'div' |'span' | 'li';
}
interface TitleProps {
    children?: React.ReactNode;
    className?: string;
    as? : React.ElementType | 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
interface SuffixProps {
    children?: React.ReactNode;
    className?: string;
    as? : React.ElementType | 'div' |'span' | 'li';
}
interface CloseProps {
    children?: React.ReactNode;
    className?: string;
    as? : React.ElementType | 'div' |'span' | 'li';
}

const defaultState = {
    isMounted: true, isVisible: true,
    handleMounted: () => {}, handleVisibility: () => {},
};

const closeErrorMessage = 'There is more than one "Close" children, only the first one will be displayed.'

const LabelContext = createContext<LabelContextProps>(defaultState);

function useContainerContext() {
    const context = React.useContext(LabelContext)
    if (!context) {
        throw new Error(
            `Toggle compound components cannot be rendered outside the Toggle component`,
        )
    }
    return context
}

const itemCN = 'first:ml-2 last:mr-2 only:mx-2 p-1';

const Label : React.FC<LabelProps> = ({ 
    children, 
    closable = true,
    className,
    as = 'div'
}) => {

    const [isMounted, setIsMounted] = useState(defaultState.isMounted);
    const [isVisible, setIsVisible] = useState(defaultState.isVisible);

    console.log('Label States', isMounted, isVisible)

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

    const prefix = findByType(children, Prefix)[0];
    const title = findByType(children, Title)[0];
    const suffix = findByType(children, Suffix)[0];
    const close = findByType(children, Close)[0];

    console.log('Prefix', prefix, 'Suffix', prefix, 'Title', title, 'close', close)

    console.log('Children Count', childrenCount)

    if (React.Children.count(close) > 1) { 
        console.error(closeErrorMessage);
    }

    const containerCN = clsx(
        'label h-10 inline-flex gap-2 box-border items-center cursor-default select-none transition bg-primary',
        {
            [`hidden`] : !isVisible
        },
        className,
    );

    const As = as

    return (
        isMounted &&
        <LabelContext.Provider value={value}>
            <As id='label-root' className={containerCN}>
                {prefix && prefix}
                {title && title}
                {suffix && suffix}
                {closable && close && close}
            </As>
        </LabelContext.Provider>
    )
}

const Prefix: React.FC<PrefixProps> = ({ children, className, as = 'span' }) => 
{
    const As = as;
    const prefixCN = clsx('label-prefix', itemCN, {}, className);
    return (<As className={prefixCN}>{children}</As>)
}

const Title: React.FC<TitleProps> = ({children, className, as = 'p'}) => 
{
    const As = as;
    const titleCN = clsx('label-title', itemCN, {}, className);
    return (<As className={titleCN} title={children}>{children}</As>)
}

const Suffix: React.FC<SuffixProps> = ({children, className, as = 'span'}) => 
{
    const As = as;
    const suffixCN = clsx('label-suffix', itemCN, {}, className);
    return (<As className={suffixCN}>{children}</As>);
}

const Close: React.FC<CloseProps> = ({children, className}) => 
{
    const { handleMounted } = useContainerContext();
    const closeCN = clsx('label-close', itemCN, {}, className);
    return (      
        <button 
            className={closeCN} 
            onClick={() => handleMounted()}
        >
            {children}
        </button>
    )
}

//LabelContext.displayName = 'LabelContext'
//Label.displayName = 'Label';

Label.Title = Title
Title.displayName = 'Title';

Label.Prefix = Prefix
Prefix.displayName = 'Prefix';

Label.Suffix = Suffix
Suffix.displayName = 'Suffix';

Label.Close = Close
Close.displayName = 'Close';

export default Label

//WDYR
//Label.whyDidYouRender = true