# Chakra UI Theme Customization

## Theme Structure

```
src/theme/
├── index.ts              # Main theme export
├── foundations/          # Core design tokens
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── components/           # Component style overrides
│   ├── Button.ts
│   ├── Input.ts
│   ├── Card.ts
│   └── index.ts
├── semanticTokens.ts     # Light/dark mode tokens
└── styles.ts             # Global styles
```

## Theme Setup

### Main Theme File

```ts
// src/theme/index.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { foundations } from './foundations'
import { components } from './components'
import { semanticTokens } from './semanticTokens'
import { styles } from './styles'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  ...foundations,
  semanticTokens,
  components,
  styles,
})

export type Theme = typeof theme
```

## Foundations (Design Tokens)

### Colors

```ts
// src/theme/foundations/colors.ts
export const colors = {
  brand: {
    50: '#e6f2ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#0073e6', // Primary
    600: '#005bb3',
    700: '#004280',
    800: '#002a4d',
    900: '#00111a',
  },
  accent: {
    50: '#fff5e6',
    100: '#ffe0b3',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa31a',
    500: '#e68a00',
    600: '#b36b00',
    700: '#804d00',
    800: '#4d2e00',
    900: '#1a1000',
  },
}
```

### Typography

```ts
// src/theme/foundations/typography.ts
export const fonts = {
  heading: `'Plus Jakarta Sans', -apple-system, sans-serif`,
  body: `'Inter', -apple-system, sans-serif`,
  mono: `'JetBrains Mono', Consolas, monospace`,
}

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  md: '1rem',       // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
}

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

export const lineHeights = {
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: 2,
}
```

### Spacing & Sizing

```ts
// src/theme/foundations/spacing.ts
export const space = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
}

export const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}
```

## Semantic Tokens (Light/Dark Mode)

```ts
// src/theme/semanticTokens.ts
export const semanticTokens = {
  colors: {
    // Background
    'bg.canvas': {
      default: 'gray.50',
      _dark: 'gray.900',
    },
    'bg.surface': {
      default: 'white',
      _dark: 'gray.800',
    },
    'bg.subtle': {
      default: 'gray.100',
      _dark: 'gray.700',
    },
    'bg.muted': {
      default: 'gray.200',
      _dark: 'gray.600',
    },
    
    // Text
    'text.default': {
      default: 'gray.900',
      _dark: 'gray.100',
    },
    'text.muted': {
      default: 'gray.600',
      _dark: 'gray.400',
    },
    'text.subtle': {
      default: 'gray.500',
      _dark: 'gray.500',
    },
    
    // Border
    'border.default': {
      default: 'gray.200',
      _dark: 'gray.700',
    },
    'border.muted': {
      default: 'gray.100',
      _dark: 'gray.800',
    },
    
    // Brand
    'brand.default': {
      default: 'brand.500',
      _dark: 'brand.400',
    },
    'brand.muted': {
      default: 'brand.50',
      _dark: 'brand.900',
    },
  },
}
```

## Component Styles

### Button Component

```ts
// src/theme/components/Button.ts
import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'lg',
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 2,
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 3,
    },
    lg: {
      fontSize: 'lg',
      px: 8,
      py: 4,
    },
  },
  variants: {
    solid: {
      bg: 'brand.default',
      color: 'white',
      _hover: {
        bg: 'brand.600',
        _disabled: {
          bg: 'brand.default',
        },
      },
    },
    outline: {
      borderColor: 'brand.default',
      color: 'brand.default',
      _hover: {
        bg: 'brand.muted',
      },
    },
    ghost: {
      color: 'brand.default',
      _hover: {
        bg: 'brand.muted',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
})
```

### Input Component

```ts
// src/theme/components/Input.ts
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    borderRadius: 'lg',
  },
})

const variants = {
  outline: definePartsStyle({
    field: {
      borderColor: 'border.default',
      _hover: {
        borderColor: 'gray.400',
      },
      _focus: {
        borderColor: 'brand.default',
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
      },
    },
  }),
  filled: definePartsStyle({
    field: {
      bg: 'bg.subtle',
      _hover: {
        bg: 'bg.muted',
      },
      _focus: {
        bg: 'bg.surface',
        borderColor: 'brand.default',
      },
    },
  }),
}

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: 'outline',
  },
})
```

## Global Styles

```ts
// src/theme/styles.ts
import { Styles } from '@chakra-ui/theme-tools'

export const styles: Styles = {
  global: {
    'html, body': {
      bg: 'bg.canvas',
      color: 'text.default',
    },
    '*::selection': {
      bg: 'brand.100',
    },
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '::-webkit-scrollbar-track': {
      bg: 'bg.subtle',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'gray.400',
      borderRadius: 'full',
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: 'gray.500',
    },
  },
}
```

## Usage in Provider

```tsx
// src/App.tsx
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme } from './theme'

export function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {/* Your app */}
      </ChakraProvider>
    </>
  )
}
```

## Color Mode Toggle

```tsx
import { IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
    />
  )
}
```

## Custom Font Loading

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
  rel="stylesheet"
/>
```

Or with `@fontsource`:

```bash
pnpm add @fontsource/inter @fontsource/plus-jakarta-sans
```

```tsx
// src/main.tsx
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
```
