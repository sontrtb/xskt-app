import { useTheme } from "@/stores/useTheme";
import { colors, darkColors } from "@/theme/color";

function useColor() {
  const {theme} = useTheme()

  return theme === 'light' ? colors : darkColors
}

export default useColor