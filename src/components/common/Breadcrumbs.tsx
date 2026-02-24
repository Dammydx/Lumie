import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  href?: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-purple-600 hover:underline">
              {item.label}
            </Link>
          ) : item.href ? (
            <a href={item.href} className="hover:text-purple-600 hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
