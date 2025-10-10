import cn from 'classnames'
import { Link } from 'react-router-dom'
import css from './index.module.scss'

type ButtonColor = 'red' | 'green'
export type ButtonProps = { children: React.ReactNode; loading?: boolean; onClick?: () => void; color?: ButtonColor }
export const Button = ({ children, loading = false, onClick, color = 'green' }: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={cn({
        [css.button]: true,
        [css.disabled]: loading,
        [css.loading]: loading,
        [css[`color-${color}`]]: true,
      })}
    >
      <span className={css.text}>{children}</span>
    </button>
  )
}

export const LinkButton = ({
  children,
  to,
  color = 'green',
}: {
  children: React.ReactNode
  to: string
  color?: ButtonColor
}) => {
  return (
    <Link className={cn({ [css.button]: true, [css[`color-${color}`]]: true })} to={to}>
      {children}
    </Link>
  )
}
