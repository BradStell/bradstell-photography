type Maybe<T> = T | null | undefined

const navigateTo = (path: string) => window.location.href = path

const findElemBy = (id: string): Maybe<HTMLElement> => document.getElementById(id)

const showHideMenu = (event: MouseEvent) => {
  document.body.classList.add('no-scroll')
  const menuHandle = findElemBy('menu-content-handle')
  menuHandle?.classList.add('viewing')
}

const onMenuClose = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const menuHandle = findElemBy('menu-content-handle')
  menuHandle?.classList.remove('viewing')
  document.body.classList.remove('no-scroll')
}
