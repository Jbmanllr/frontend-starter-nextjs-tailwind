import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  memo
} from 'react'
import type { UseUIProps, UIProviderProps } from './types'

const colorSchemes = ['light', 'dark']
const MEDIA = '(prefers-color-scheme: dark)'
const isServer = typeof window === 'undefined'
const UIContext = createContext<UseUIProps | undefined>(undefined)
const defaultContext: UseUIProps = {
  setTheme: _ => {}, themes: [],
  setThemeScheme: _ => {}, themeSchemes: [],
  setCbScheme: _ => {}, CbSchemes: [],
  setListingLayout: _ => {}, listingLayouts: [],
}

export const useUIContext = () => useContext(UIContext) ?? defaultContext
  
export const UIProvider: React.FC<UIProviderProps> = props => {
  const context = useContext(UIContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <Fragment>{props.children}</Fragment>
  return <UI {...props} />
}

const defaultThemes = ['theme-default', 'theme-1', 'theme-2'];
const defaultThemeSchemes = ['light', 'dark'];
const defaultCbSchemes = ['cbs-default', 'cbs-tritanopia', 'cbs-protanopia', 'cbs-deuteranopia'];
const defaultListingLayouts = ['vertical', 'horizontal', 'table'];

const UI: React.FC<UIProviderProps> = ({
  disableTransitionOnChange = false,
  forcedTheme,
  forcedThemeScheme,
  enableSystem = true,
  enableColorScheme = true,

  themeStorageKey  = 'theme',
  themeSchemeStorageKey = 'theme-scheme',
  CbSchemeStorageKey = 'cb-scheme',
  listingLayoutStorageKey  = 'listing',

  themes = defaultThemes,
  themeSchemes = defaultThemeSchemes,
  CbSchemes = defaultCbSchemes,
  listingLayouts = defaultListingLayouts,

  defaultTheme = 'theme-default',
  defaultThemeScheme = enableSystem ? 'system' : 'light',
  defaultCbScheme = 'cbs-default',
  defaultListingLayout = 'vertical',

  attribute = 'data-theme-scheme',
  value,
  children,
  nonce
}) => {
  
  const [theme, setThemeState] = useState(() => getTheme(themeStorageKey, defaultTheme))
  const attrsTheme = !value ? themes : Object.values(value)

  const [themeScheme, setThemeSchemeState] = useState(() => getThemeScheme(themeSchemeStorageKey, defaultThemeScheme))
  const [resolvedThemeScheme, setResolvedThemeScheme] = useState(() => getThemeScheme(themeSchemeStorageKey))
  const attrsThemeScheme = !value ? themeSchemes : Object.values(value)

  const [cbScheme, setCbSchemeState] = useState(() => getTheme(CbSchemeStorageKey, defaultCbScheme))
  const attrsCbScheme = !value ? CbSchemes : Object.values(value)

  // Listing Layout
  const [globalListingLayout, setGlobalListingLayoutState] = useState(() => getGlobalListingLayout(listingLayoutStorageKey, defaultListingLayout))
  
  const setGlobalListingLayout = useCallback(
    listingLayout => {
      setGlobalListingLayoutState(listingLayout)

      // Save to storage
      try {
        localStorage.setItem(listingLayoutStorageKey, listingLayout)
      } catch (e) {
        // Unsupported
      }
    },
    []
  )



  const applyThemeScheme = useCallback(themeScheme => {
    let resolved = themeScheme
    if (!resolved) return

    // If themeScheme is system, resolve it before setting themeScheme
    if (themeScheme === 'system' && enableSystem) {
      resolved = getSystemThemeScheme()
    }

    const name = value ? value[resolved] : resolved
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    if (attribute === 'class') {
      d.classList.remove(...attrsThemeScheme)

      if (name) d.classList.add(name)
    } else {
      if (name) {
        d.setAttribute(attribute, name)
      } else {
        d.removeAttribute(attribute)
      }
    }

    if (enableColorScheme) {
      const fallback = colorSchemes.includes(defaultThemeScheme) ? defaultThemeScheme : null
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback
      // @ts-ignore
      d.style.colorScheme = colorScheme
    }

    enable?.()
  }, [])

  const setThemeScheme = useCallback(
    themeScheme => {
      setThemeSchemeState(themeScheme)

      // Save to storage
      try {
        localStorage.setItem(themeSchemeStorageKey, themeScheme)
      } catch (e) {
        // Unsupported
      }
    },
    [forcedThemeScheme]
  )




  const applyTheme = useCallback(theme => {
    let resolved = theme
    if (!resolved) return

    const name = value ? value[resolved] : resolved
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    if (attribute === 'class') {
      d.classList.remove(...attrsTheme)

      if (name) d.classList.add(name)
    } else {
      if (name) {
        d.setAttribute(attribute, name)
      } else {
        d.removeAttribute(attribute)
      }
    }
    enable?.()
  }, [])



  const applyCbScheme = useCallback(cbScheme => {
    let resolved = cbScheme
    if (!resolved) return

    const name = value ? value[resolved] : resolved
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    if (attribute === 'class') {
      d.classList.remove(...attrsCbScheme)

      if (name) d.classList.add(name)
    } else {
      if (name) {
        d.setAttribute(attribute, name)
      } else {
        d.removeAttribute(attribute)
      }
    }
    enable?.()
  }, [])


  const setTheme = useCallback(
    theme => {
      setThemeState(theme)

      // Save to storage
      try {
        localStorage.setItem(themeStorageKey, theme)
      } catch (e) {
        // Unsupported
      }
    },
    [forcedTheme]
  )



  const setCbScheme = useCallback(
    cbScheme => {
      setCbSchemeState(cbScheme)

      // Save to storage
      try {
        localStorage.setItem(CbSchemeStorageKey, cbScheme)
      } catch (e) {
        // Unsupported
      }
    },
    []
  )


  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemThemeScheme(e)
      setResolvedThemeScheme(resolved)

      if (themeScheme === 'system' && enableSystem && !forcedThemeScheme) {
        applyThemeScheme('system')
      }
    },
    [themeScheme, forcedThemeScheme]
  )

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA)

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeListener(handleMediaQuery)
  }, [handleMediaQuery])

  // localStorage THEME SCHEME event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== themeSchemeStorageKey) {
        return
      }

      // If default themeScheme set, use it if localstorage === null (happens on local storage manual deletion)
      const themeScheme = e.newValue || defaultThemeScheme
      setThemeScheme(themeScheme)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setThemeScheme])

  // Whenever themeScheme or forcedThemeScheme changes, apply it
  useEffect(() => {
    applyThemeScheme(forcedThemeScheme ?? themeScheme)
  }, [forcedThemeScheme, themeScheme])




    // localStorage THEME event handling
    useEffect(() => {
      const handleStorage = (e: StorageEvent) => {
        if (e.key !== themeStorageKey) {
          return
        }
  
        // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
        const theme = e.newValue || defaultTheme
        setTheme(theme)
      }
  
      window.addEventListener('storage', handleStorage)
      return () => window.removeEventListener('storage', handleStorage)
    }, [setTheme])
    
  // Whenever themeor forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme])





      // localStorage THEME event handling
      useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
          if (e.key !== CbSchemeStorageKey) {
            return
          }
    
          // If default cbScheme set, use it if localstorage === null (happens on local storage manual deletion)
          const cbScheme = e.newValue || defaultCbScheme
          setCbScheme(cbScheme)
        }
    
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
      }, [setCbScheme])
      
    // Whenever cb scheme changes, apply it
    useEffect(() => {
      applyCbScheme(cbScheme)
    }, [cbScheme])



  const providerValue = useMemo(() => ({
    theme,
    setTheme,

    themeScheme,
    setThemeScheme,

    cbScheme,
    setCbScheme,

    globalListingLayout,
    setGlobalListingLayout,

    themes: themes,
    themeSchemes: enableSystem ? [...themeSchemes, 'system'] : themeSchemes,
    CbSchemes: CbSchemes,

    forcedTheme,
    forcedThemeScheme,

    resolvedThemeScheme: themeScheme === 'system' ? resolvedThemeScheme : themeScheme,
    systemThemeScheme: (enableSystem ? resolvedThemeScheme : undefined) as 'light' | 'dark' | undefined
  }), 
  [ 
    theme,
    setTheme,

    themeScheme, 
    setThemeScheme,
    enableSystem,

    cbScheme,
    setCbScheme,

    globalListingLayout,
    setGlobalListingLayout,

    themes,
    themeSchemes,
    CbSchemes,

    forcedTheme,
    forcedThemeScheme, 

    resolvedThemeScheme
  ]);

  return (
    <UIContext.Provider
      value={providerValue}
    >
      <ThemeScript
        {...{
          disableTransitionOnChange,

          themes,
          themeSchemes,
          enableSystem,
          enableColorScheme,

          forcedTheme,
          forcedThemeScheme,

          themeStorageKey,
          themeSchemeStorageKey,

          defaultTheme,
          defaultThemeScheme,

          attrsTheme,
          attrsThemeScheme,

          attribute,
          value,
          children,
          nonce
        }}
      />
      {children}
    </UIContext.Provider>
  )
}

const ThemeScript = memo(
  ({
    forcedTheme,
    forcedThemeScheme,

    themeStorageKey,
    themeSchemeStorageKey,

    attribute,
    enableSystem,
    enableColorScheme,

    defaultTheme,
    defaultThemeScheme,

    value,
    attrsTheme,
    attrsThemeScheme,
    nonce
  }: UIProviderProps & { 
        attrsThemeScheme: string[]; 
        defaultThemeScheme: string;
        attrsTheme: string[]; 
        defaultTheme: string
      }) => {
    const defaultSystem = defaultThemeScheme === 'system'

    console.log('VOIR SKE CA FAIT LOL', attrsTheme, attribute)
    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      if (attribute === 'class') {
        const removeClasses = `c.remove(${attrsThemeScheme.map((t: string) => `'${t}'`).join(',')})`

        return `var d=document.documentElement,c=d.classList;${removeClasses};`
      } else {
        return `var d=document.documentElement,n='${attribute}',s='setAttribute';`
      }
    })()

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return ''
      }

      const fallback = colorSchemes.includes(defaultThemeScheme) ? defaultThemeScheme : null

      if (fallback) {
        return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultThemeScheme}'`
      } else {
        return `if(e==='light'||e==='dark')d.style.colorScheme=e`
      }
    })()

    const updateDOM = (name: string, literal: boolean = false, setColorScheme = true) => {
      const resolvedName = value ? value[name] : name
      const val = literal ? name + `|| ''` : `'${resolvedName}'`
      let text = ''

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (enableColorScheme && setColorScheme && !literal && colorSchemes.includes(name)) {
        text += `d.style.colorScheme = '${name}';`
      }

      if (attribute === 'class') {
        if (literal || resolvedName) {
          text += `c.add(${val})`
        } else {
          text += `null`
        }
      } else {
        if (resolvedName) {
          text += `d[s](n,${val})`
        }
      }

      return text
    }

    const scriptSrc = (() => {
      if (forcedThemeScheme) {
        return `!function(){${optimization}${updateDOM(forcedThemeScheme)}}()`
      }

      if (enableSystem) {
        return `!function(){try{${optimization}var e=localStorage.getItem('${themeSchemeStorageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
          'dark'
        )}}else{${updateDOM('light')}}}else if(e){${
          value ? `var x=${JSON.stringify(value)};` : ''
        }${updateDOM(value ? `x[e]` : 'e', true)}}${
          !defaultSystem ? `else{` + updateDOM(defaultThemeScheme, false, false) + '}' : ''
        }${fallbackColorScheme}}catch(e){}}()`
      }

      return `!function(){try{${optimization}var e=localStorage.getItem('${themeSchemeStorageKey}');if(e){${
        value ? `var x=${JSON.stringify(value)};` : ''
      }${updateDOM(value ? `x[e]` : 'e', true)}}else{${updateDOM(
        defaultThemeScheme,
        false,
        false
      )};}${fallbackColorScheme}}catch(t){}}();`
    })()

    return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: scriptSrc }} />
  },
  // Never re-render this component
  () => true
)

// Helpers
const getThemeScheme = (key: string, fallback?: string) => {
  if (isServer) return undefined
  let themeScheme
  try {
    themeScheme = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return themeScheme || fallback
}


const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined
  let theme
  try {
    theme = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return theme || fallback
}

const getGlobalListingLayout = (key: string, fallback?: string) => {
  if (isServer) return fallback
  let listingLayout
  try {
    listingLayout = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return listingLayout || fallback
}


const disableAnimation = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

const getSystemThemeScheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  const systemThemeScheme = isDark ? 'dark' : 'light'
  return systemThemeScheme
}