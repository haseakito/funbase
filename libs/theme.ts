import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

// Theme configs
const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: false
}

const theme = extendTheme({ config })

export { theme }