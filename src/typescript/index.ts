type Maybe<T> = T | null | undefined

// compose funcs together in function composition
const compose = (...funcs: any) => (startingValue: any) => {
  let result = startingValue
  for (let i = funcs.length-1; i >= 0; i--) {
    result = funcs[i](result)
  }
  return result
}

// compose funcs together in function composition
const pipe = (...funcs: any) => (startingValue: any) => {
  let result = startingValue
  for (let i = 0; i < funcs.length; i++) {
    result = funcs[i](result)
  }
  return result
}

const cssVisibilityClassName = 'viewing'

const navigateTo = (path: string) => window.location.href = path

const findElemBy = (id: string): Maybe<HTMLElement> => document.getElementById(id)

const showHideMenu = (event: MouseEvent) => {
  document.body.classList.add('no-scroll')
  const menuHandle = findElemBy('menu-content-handle')
  menuHandle?.classList.add(cssVisibilityClassName)
}

const onMenuClose = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const menuHandle = findElemBy('menu-content-handle')
  menuHandle?.classList.remove(cssVisibilityClassName)
  document.body.classList.remove('no-scroll')

  // add rotate-out class to the close icon (will add rotate animation)
  const closeSVG = findElemBy('close-icon')
  closeSVG?.classList.add('rotate-out')

  // after a second remove the rotate class
  setTimeout(() => closeSVG?.classList.remove('rotate-out'), 2000)
}

const onImageLoad = (path: string) => {
  console.log(`Loaded image ${path}`)
}

const getElementsByClassNames = (className: string, parentElement?: Maybe<HTMLElement>): HTMLCollectionOf<Element> => (
  (parentElement ?? document).getElementsByClassName(className)
)

const firstElement = (elements: HTMLCollectionOf<Element>): Maybe<HTMLElement> => {
  if (elements.length === 0) {
    return null
  }

  return elements.item(0) as Maybe<HTMLElement>
}

const getFirstElementByClassNames: (classNames: string, parentElement?: Maybe<HTMLElement>) => Maybe<HTMLElement> = compose(firstElement, getElementsByClassNames)

const changeFeaturePageSet = (event: MouseEvent, parentDivID: string, setWrapperDivID: string) => {
  // Remove class 'viewing' from 
  const visibleFeatureSet = getFirstElementByClassNames(`feature-container ${cssVisibilityClassName}`)
  visibleFeatureSet?.classList.remove(cssVisibilityClassName)

  // set viewing on currently selected element group
  const selectedFeatureSet = document.getElementById(setWrapperDivID)
  selectedFeatureSet?.classList.add(cssVisibilityClassName)

  // unset viewing on all other nav items
  Array
    .from(getElementsByClassNames(`nav-item ${cssVisibilityClassName}`))
    .forEach(item => item?.classList.remove(cssVisibilityClassName))

  // set nav item to viewing
  Array
    .from(document.getElementsByName(`${setWrapperDivID}-nav-item`))
    .forEach(item => item?.classList.add(cssVisibilityClassName))

  // find element to scroll to based on screen width
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const featureImagesContainer = getFeatureImagesContainerBasedOnDeviceWidth(width)
  featureImagesContainer?.scrollIntoView({ behavior: 'smooth' })
}

const getFeatureImagesContainerBasedOnDeviceWidth = (width: number): Maybe<HTMLElement> => {
  if (width <= Breakpoints.Tablet) {
    // return getFirstElementByClassNames('set-navigation-container-tablet')
    // position sticky makes it not scroll back up -  need to address that
    return getFirstElementByClassNames('feature-content')
  } 
  return getFirstElementByClassNames('feature-content')
}

const onFeatureMenuItemClicked = () => {
  const menuFeatureContainer = document.getElementById("menu-feature-container")
  const possibleCloseIcons = document.getElementsByClassName('chevron')
  const closeIcon: Maybe<HTMLElement> = possibleCloseIcons.length === 1
    ? possibleCloseIcons.item(0) as HTMLElement
    : null

  if (menuFeatureContainer?.classList.contains("expanded")) {
    // collapse it
    menuFeatureContainer?.classList.remove("expanded")
    if (closeIcon) {
      closeIcon.style.transform       = 'rotate(0deg)'; 
      closeIcon.style.opacity = '0.2'
    }
  } else {
    // expand it
    menuFeatureContainer?.classList.add("expanded")
    
    if (closeIcon) {
      closeIcon.style.transform       = 'rotate(+180deg)'; 
      closeIcon.style.opacity = '1'
    }
  }
}

type FeaturePage = string
const featurePages: FeaturePage[] = [
  'duality'
]

document.addEventListener('DOMContentLoaded', function() {
  const extractPageFrom = pipe(
    split('/'),
    last,
    replace('.html', ''),
  )

  if (featurePages.includes(extractPageFrom(window.location.href))) {
    onFeatureMenuItemClicked()
  }
}, false);

// partially applied split func
const split = (token: string) => (val: string): string[] => val.split(token)

// returns the last item in a list
const last = <T>(list: T[]): T => list[list.length-1]

// partially applied replace func
const replace = (from: string, to: string) => (val: string): string => (
  val.replace(from, to)
)

enum Breakpoints {
  Tablet = 1280
}
