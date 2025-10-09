import cn from 'classnames'
import type { UseInfiniteScrollHookResult } from 'react-infinite-scroll-hook'
import css from './index.module.scss'

export const Loader = ({ type, ref }: { type: 'page' | 'section'; ref?: UseInfiniteScrollHookResult[0] }) => {
  return (
    <span
      ref={ref}
      className={cn({
        [css.loader]: true,
        [css[`type-${type}`]]: true,
      })}
    />
  )
}
