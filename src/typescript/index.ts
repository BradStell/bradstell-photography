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
}

const onFeatureMenuItemClicked = (event: MouseEvent) => {
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
