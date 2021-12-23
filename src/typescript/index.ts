type Maybe<T> = T | null | undefined

const navigateTo = (path: string) => window.location.href = path

const findElemBy = (id: string): Maybe<HTMLElement> => document.getElementById(id)

const showHideMenu = (event: MouseEvent) => {
  document.body.classList.add('no-scroll')
  const menuHandle = findElemBy('menu-content-handle')
  menuHandle?.classList.add('viewing')
}

const onMenuClose = (event: MouseEvent) => {
  console.log('closing menu')
  event.preventDefault()
  event.stopPropagation()

  const menuHandle = findElemBy('menu-content-handle')
  menuHandle?.classList.remove('viewing')
  document.body.classList.remove('no-scroll')
}

const onImageLoad = (path: string) => {
  console.log(`Loaded image ${path}`)
}

const getFirstElementByClassName = (className: string): Maybe<HTMLElement> => {
  const elms = document.getElementsByClassName(className)
  if (elms.length === 0) {
    return null
  }

  return elms.item(0) as Maybe<HTMLElement>
}

const changeFeaturePageSet = (event: MouseEvent, parentDivID: string, setWrapperDivID: string) => {
  const viewingClass = 'viewing'

  // unset viewing on all that have it
  const featureCs = document.getElementsByClassName('feature-container')
  for (let i = 0; i < featureCs.length; i++) {
    const item = featureCs.item(i)
    if (item !== null) {
      item.classList.remove(viewingClass)
    }
  }

  // set viewing on currently selected element group
  const currentEl = document.getElementById(setWrapperDivID)
  currentEl?.classList.add(viewingClass)

  // unset viewing on all other nav items
  const navItemWrapper = document.getElementById('feature-nav-wrapper')
  const navItems = navItemWrapper?.getElementsByClassName('nav-item')
  if (navItems) {
    for (let i = 0; i < navItems.length; i++) {
      const navItem = navItems.item(i)
      navItem?.classList.remove('viewing')
    }
  }

  // set nav item to viewing
  const navItem = document.getElementById(`${setWrapperDivID}-nav-item`)
  navItem?.classList.add('viewing')

  // find element to scroll to based on screen width
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  console.log(`width ${width}`)
  let element: Maybe<HTMLElement>
  if (width <= Breakpoints.Tablet) {
    element = getFirstElementByClassName('tablet-feature-nav')
  } else {
    element = getFirstElementByClassName('feature-content')
  }

  // scroll to top of feature set
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
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
  'water'
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

enum Breakpoints {
  Tablet = 1280
}
