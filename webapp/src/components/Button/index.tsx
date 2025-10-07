import cn from 'classnames'
import { Link } from 'react-router-dom'
import css from './index.module.scss'

export const Button = ({
  children,
  loading = false,
  onClick,
}: {
  children: React.ReactNode
  loading?: boolean
  onClick: () => void
}) => {
  return (
    <button type="submit" onClick={onClick} className={cn({ [css.button]: true, [css.disabled]: loading })}>
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export const LinkButton = ({ children, to }: { children: React.ReactNode; to: string }) => {
  return (
    <Link className={cn({ [css.button]: true })} to={to}>
      {children}
    </Link>
  )
}
