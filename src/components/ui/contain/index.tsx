import React, { useState, useMemo, useContext, Context, createContext } from 'react'
import { Transition } from '@headlessui/react'
import cn from 'clsx'
import {  XMarkIcon } from '@heroicons/react/24/outline'


const findByType = (children : React.ReactNode | any, component : React.ReactNode | any) => {
    let result = [];
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
    return result;
  };


interface ContainerProps {
    visible?: boolean;
    mounted?: boolean;
    className?: string;
    unstyled?: boolean;
    closable?: boolean;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode | any;
    as: React.ElementType | 'div' |'span' | 'li';
    Item?: ItemProps;
    Close?: CloseProps;
}

interface ItemProps {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    as? : React.ElementType | 'div' |'span' | 'li'
}

interface CloseProps {
    className?: string;
    unstyled?: boolean;
    children?: React.ReactNode;
}

enum ContainerStates {
    isMounted,
    isVisible,
}
interface StateDefinition {
    containerState: ContainerStates
}

enum ActionTypes {
    setIsMounted,
    setIsVisible
}
type Actions =
  | { type: ActionTypes.setIsMounted }
  | { type: ActionTypes.setIsVisible }

  //const ContainerContext = createContext<[StateDefinition, React.Dispatch<Actions>] | null>(null);

const ContainerContext: Context<{ 
    isMounted: string; 
    setIsMounted: null;
    isVisible: string; 
    setIsVisible: null;
}> = createContext({
    isMounted:"", 
    setIsMounted: null,
    isVisible: "", 
    setIsVisible: null
})

//ContainerContext.displayName = 'ContainerContext'

const Container = ({ 
    children, 
    closable = true,
    className,
    as = 'div'
} : { 
    children? : React.ReactNode,
    closable? : Boolean,
    //visible? : Boolean,
    //mounted? : Boolean,
    className? : String,
    as? : React.ElementType | 'div' |'span' | 'li',
}) => {

    const [isMounted, setIsMounted] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    console.log('Container States', isMounted, isVisible)

    const handleClose = () => {
        setIsMounted(!isMounted);
    };

    const handleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const value = useMemo(() => ({ 
        isMounted, 
        setIsMounted,
        handleClose,
        isVisible, 
        setIsVisible,
        handleVisibility
    }), [isMounted, isVisible]);
    
    const childrenCount = React.Children.count(children)
    //const isCloseOnly = React.Children.only(children)

    console.log('Children Count', childrenCount)

    // Return an array of sub components name (eg. ["Foo", "Bar"])
    let subComponentList = Object.keys(Container);
    let childrens = React.Children.map(
        children, (child) =>
        child.type?.name
    );

    console.log('SUB COMPONENTS LIST CONTAIN:', childrens, children, subComponentList)

    // Return sub components grouped by name as objects
    let subComponents = subComponentList.map((key) => {
        return React.Children.map(children, (child : React.ReactNode | any) =>
            child.type?.name === key ? child : null
        );
    });

    console.log('SUB COMPONENTS CONTAIN:', subComponents)
    console.log('CHIDLREN MAPPING in CONTAIN', React.Children.count(children))

    const items = findByType(children, Item);
    const close = findByType(children, Close)[0];
    if (close.count > 1) {console.error('There is more than one "Close" children, only the first one will be displayed.');}
    console.log('CLOSE', close)

    const containerCN = cn(
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
            <As className={containerCN}>
              {children}
            </As>
        </ContainerContext.Provider>       
    )
}

const Item: React.FC<ItemProps> = ({
    children,
    id,
    className,
    as = 'span'
}) => {

    const As = as;
    const itemCN = cn('first:ml-2 last:mr-2 only:mx-2', {}, className );

        const itemcont = React.Children.map(children, (child: any) => React.cloneElement(
            <As className={itemCN}>{child}</As>
            , { id }))
        
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

    const { setIsMounted } = useContext(ContainerContext);

    const As = as
    const closeCN = cn(
        'first:ml-2 last:mr-2 only:py-0',
        {},
        className,
    );

    return (
       
        <As 
            className={closeCN} 
            onClick={() => setIsMounted(false)}
        >
            {children}
        </As>
    )
}

Container.displayName = 'Container';

Container.Item = Item
Item.displayName = 'Item';

Container.Close = Close
Close.displayName = 'Close';


export default Container

 //WDYR
Container.whyDidYouRender = true