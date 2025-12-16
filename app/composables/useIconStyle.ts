export const useIconStyle = () => {
  const iconStyle = useState<'line' | 'solid'>('icon-style', () => 'line')

  // Simple mapping for common icons used in the app
  // Can be expanded as needed
  const iconMap: Record<string, { line: string; solid: string }> = {
    'home': { line: 'i-lucide-home', solid: 'i-heroicons-home-solid' },
    'shield-check': { line: 'i-lucide-shield-check', solid: 'i-heroicons-shield-check-solid' },
    'book-open': { line: 'i-lucide-book-open', solid: 'i-heroicons-book-open-solid' },
    'box': { line: 'i-lucide-box', solid: 'i-heroicons-archive-box-solid' },
    'ellipsis': { line: 'i-lucide-ellipsis', solid: 'i-heroicons-ellipsis-horizontal-20-solid' },
    'user': { line: 'i-lucide-user', solid: 'i-heroicons-user-solid' },
    'users': { line: 'i-lucide-users', solid: 'i-heroicons-users-solid' },
    'bell': { line: 'i-lucide-bell', solid: 'i-heroicons-bell-solid' },
    'help-circle': { line: 'i-lucide-help-circle', solid: 'i-heroicons-question-mark-circle-solid' },
    'square': { line: 'i-lucide-square', solid: 'i-heroicons-stop-solid' },
    'circle': { line: 'i-lucide-circle', solid: 'i-heroicons-stop-circle-solid' },
    'smile': { line: 'i-lucide-smile', solid: 'i-heroicons-face-smile-solid' },
    'stop': { line: 'i-lucide-square', solid: 'i-heroicons-stop-solid' },
    'clock': { line: 'i-lucide-clock', solid: 'i-heroicons-clock-solid' },
    'map-pin': { line: 'i-lucide-map-pin', solid: 'i-heroicons-map-pin-solid' },
    'qr-code': { line: 'i-lucide-qr-code', solid: 'i-heroicons-qr-code-solid' },
    'scan-qrcode': { line: 'i-lucide-scan-qr-code', solid: 'i-lucide-scan-qr-code' },
    'calendar-x': { line: 'i-lucide-calendar-x', solid: 'i-bxs-calendar-x' },
    'search': { line: 'i-lucide-search', solid: 'i-material-symbols-search-check-2' },
  }

  const getIcon = (name: string) => {
    const key = name.toLowerCase()
    if (iconMap[key]) {
      return iconMap[key][iconStyle.value]
    }
    // Fallback logic if needed, or return original if not mapped
    return `i-lucide-${name}` 
  }

  const toggleIconStyle = () => {
    iconStyle.value = iconStyle.value === 'line' ? 'solid' : 'line'
  }

  return {
    iconStyle,
    getIcon,
    toggleIconStyle
  }
}

