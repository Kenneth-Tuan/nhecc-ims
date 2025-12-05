import { ref, computed, watch } from "vue";

// 預定義顏色方案
export const colorSchemes = {
    primary: {
      blue: {
        name: 'blue',
        variable: '--color-blue-500',
        shades: [
          '--color-blue-50',
          '--color-blue-100',
          '--color-blue-200',
          '--color-blue-300',
          '--color-blue-400',
          '--color-blue-500',
          '--color-blue-600',
          '--color-blue-700',
          '--color-blue-800',
          '--color-blue-900',
          '--color-blue-950',
        ],
      },
      red: {
        name: 'red',
        variable: '--color-red-500',
        shades: [
          '--color-red-50',
          '--color-red-100',
          '--color-red-200',
          '--color-red-300',
          '--color-red-400',
          '--color-red-500',
          '--color-red-600',
          '--color-red-700',
          '--color-red-800',
          '--color-red-900',
          '--color-red-950',
        ],
      },
      green: {
        name: 'green',
        variable: '--color-green-500',
        shades: [
          '--color-green-50',
          '--color-green-100',
          '--color-green-200',
          '--color-green-300',
          '--color-green-400',
          '--color-green-500',
          '--color-green-600',
          '--color-green-700',
          '--color-green-800',
          '--color-green-900',
          '--color-green-950',
        ],
      },
      purple: {
        name: 'purple',
        variable: '--color-purple-500',
        shades: [
          '--color-purple-50',
          '--color-purple-100',
          '--color-purple-200',
          '--color-purple-300',
          '--color-purple-400',
          '--color-purple-500',
          '--color-purple-600',
          '--color-purple-700',
          '--color-purple-800',
          '--color-purple-900',
          '--color-purple-950',
        ],
      },
      orange: {
        name: 'orange',
        variable: '--color-orange-500',
        shades: [
          '--color-orange-50',
          '--color-orange-100',
          '--color-orange-200',
          '--color-orange-300',
          '--color-orange-400',
          '--color-orange-500',
          '--color-orange-600',
          '--color-orange-700',
          '--color-orange-800',
          '--color-orange-900',
          '--color-orange-950',
        ],
      },
      // 添加莫蘭迪顏色選項
      morandi: {
        name: 'morandi',
        variable: '--color-morandi-taupe',
        shades: [
          '--color-morandi-taupe',     // 50
          '--color-morandi-clay',      // 100
          '--color-morandi-terracotta', // 200
          '--color-morandi-brick',     // 300
          '--color-morandi-copper',    // 400
          '--color-morandi-taupe',     // 500 (重複使用)
          '--color-morandi-earth',     // 600
          '--color-morandi-chocolate', // 700
          '--color-morandi-charcoal',  // 800
          '--color-morandi-evergreen', // 900
          '--color-morandi-black',     // 950
        ],
      },
    },
    neutral: {
      stone: {
        name: 'stone',
        variable: '--color-stone-500',
        lightShades: [
          '--color-stone-50',
          '--color-stone-100',
          '--color-stone-200',
          '--color-stone-300',
          '--color-stone-400',
          '--color-stone-500',
          '--color-stone-600',
          '--color-stone-700',
          '--color-stone-800',
          '--color-stone-900',
          '--color-stone-950',
        ],
        darkShades: [
          '--color-stone-950',
          '--color-stone-900',
          '--color-stone-800',
          '--color-stone-700',
          '--color-stone-600',
          '--color-stone-500',
          '--color-stone-400',
          '--color-stone-300',
          '--color-stone-200',
          '--color-stone-100',
          '--color-stone-50',
        ],
      },
      gray: {
        name: 'gray',
        variable: '--color-gray-500',
        lightShades: [
          '--color-gray-50',
          '--color-gray-100',
          '--color-gray-200',
          '--color-gray-300',
          '--color-gray-400',
          '--color-gray-500',
          '--color-gray-600',
          '--color-gray-700',
          '--color-gray-800',
          '--color-gray-900',
          '--color-gray-950',
        ],
        darkShades: [
          '--color-gray-950',
          '--color-gray-900',
          '--color-gray-800',
          '--color-gray-700',
          '--color-gray-600',
          '--color-gray-500',
          '--color-gray-400',
          '--color-gray-300',
          '--color-gray-200',
          '--color-gray-100',
          '--color-gray-50',
        ],
      },
      zinc: {
        name: 'zinc',
        variable: '--color-zinc-500',
        lightShades: [
          '--color-zinc-50',
          '--color-zinc-100',
          '--color-zinc-200',
          '--color-zinc-300',
          '--color-zinc-400',
          '--color-zinc-500',
          '--color-zinc-600',
          '--color-zinc-700',
          '--color-zinc-800',
          '--color-zinc-900',
          '--color-zinc-950',
        ],
        darkShades: [
          '--color-zinc-950',
          '--color-zinc-900',
          '--color-zinc-800',
          '--color-zinc-700',
          '--color-zinc-600',
          '--color-zinc-500',
          '--color-zinc-400',
          '--color-zinc-300',
          '--color-zinc-200',
          '--color-zinc-100',
          '--color-zinc-50',
        ],
      },
      // 添加莫蘭迪中性色選項
      morandi: {
        name: 'morandi',
        variable: '--color-morandi-stone',
        lightShades: [
          '--color-morandi-ash',
          '--color-morandi-mist',
          '--color-morandi-pebble',
          '--color-morandi-slate',
          '--color-morandi-stone',
          '--color-morandi-iron',
          '--color-morandi-steel',
          '--color-morandi-charcoal',
          '--color-morandi-evergreen',
          '--color-morandi-black',
          '--color-morandi-black',
        ],
        darkShades: [
          '--color-morandi-black',
          '--color-morandi-evergreen',
          '--color-morandi-charcoal',
          '--color-morandi-steel',
          '--color-morandi-iron',
          '--color-morandi-stone',
          '--color-morandi-slate',
          '--color-morandi-pebble',
          '--color-morandi-mist',
          '--color-morandi-ash',
          '--color-morandi-ash',
        ],
      },
    },
  }
  
  export const useTheme = () => {
    // 從 localStorage 讀取用戶設定，如果沒有則使用預設值
    const selectedPrimary = ref(localStorage.getItem('theme-primary') || 'blue')
    const selectedNeutral = ref(localStorage.getItem('theme-neutral') || 'stone')
  
    // 監聽顏色變化並應用
    const applyPrimaryColor = (colorName: string) => {
      if (!colorSchemes.primary[colorName as keyof typeof colorSchemes.primary]) return
  
      const colorScheme = colorSchemes.primary[colorName as keyof typeof colorSchemes.primary]
  
      // 更新 CSS 變數 - 設置為引用其他 CSS 變數
      const root = document.documentElement
  
      // 設置主要顏色
      root.style.setProperty('--ui-primary', `var(${colorScheme.variable})`)
  
      // 設置所有色階
      colorScheme.shades.forEach((shadeVar, index) => {
        const uiVar = index === 0 ? '--ui-primary-50' :
                     index === 1 ? '--ui-primary-100' :
                     index === 2 ? '--ui-primary-200' :
                     index === 3 ? '--ui-primary-300' :
                     index === 4 ? '--ui-primary-400' :
                     index === 5 ? '--ui-primary-500' :
                     index === 6 ? '--ui-primary-600' :
                     index === 7 ? '--ui-primary-700' :
                     index === 8 ? '--ui-primary-800' :
                     index === 9 ? '--ui-primary-900' :
                     '--ui-primary-950'
        root.style.setProperty(uiVar, `var(${shadeVar})`)
      })
  
      selectedPrimary.value = colorName
      localStorage.setItem('theme-primary', colorName)
    }
  
    const applyNeutralColor = (colorName: string) => {
      if (!colorSchemes.neutral[colorName as keyof typeof colorSchemes.neutral]) return
  
      const colorScheme = colorSchemes.neutral[colorName as keyof typeof colorSchemes.neutral]
  
      // 更新 CSS 變數
      const root = document.documentElement
      root.style.setProperty('--ui-neutral', `var(${colorScheme.variable})`)
  
      // 根據當前模式選擇對應的色階
      const isDark = document.documentElement.classList.contains('dark')
      const shades = isDark ? colorScheme.darkShades : colorScheme.lightShades
  
      shades.forEach((shadeVar, index) => {
        const uiVar = index === 0 ? '--ui-neutral-50' :
                     index === 1 ? '--ui-neutral-100' :
                     index === 2 ? '--ui-neutral-200' :
                     index === 3 ? '--ui-neutral-300' :
                     index === 4 ? '--ui-neutral-400' :
                     index === 5 ? '--ui-neutral-500' :
                     index === 6 ? '--ui-neutral-600' :
                     index === 7 ? '--ui-neutral-700' :
                     index === 8 ? '--ui-neutral-800' :
                     index === 9 ? '--ui-neutral-900' :
                     '--ui-neutral-950'
        root.style.setProperty(uiVar, `var(${shadeVar})`)
      })
  
      selectedNeutral.value = colorName
      localStorage.setItem('theme-neutral', colorName)
    }
  
    // 監聽 dark mode 變化
    const setupDarkModeListener = () => {
      // 使用 MutationObserver 監聽 class 變化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            // 當 dark mode 切換時，重新應用 neutral 顏色
            applyNeutralColor(selectedNeutral.value)
          }
        })
      })
  
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
    }
  
    // 初始化時應用儲存的設定
    const initTheme = () => {
      applyPrimaryColor(selectedPrimary.value)
      applyNeutralColor(selectedNeutral.value)
      setupDarkModeListener()
    }
  
    // 重置主題
    const resetTheme = () => {
      applyPrimaryColor('blue')
      applyNeutralColor('stone')
    }
  
    return {
      selectedPrimary: readonly(selectedPrimary),
      selectedNeutral: readonly(selectedNeutral),
      applyPrimaryColor,
      applyNeutralColor,
      initTheme,
      resetTheme,
      colorSchemes: readonly(colorSchemes)
    }
  }