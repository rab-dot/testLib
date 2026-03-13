import { IconButton, Menu } from '@chakra-ui/react'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { ConditionalTooltip } from '../../ui/ConditionalTooltip'

const ThemeSwitcher = () => {
  const [colorMode, setColorModeState] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Получаем текущую тему из HTML элемента
    const isDark = document.documentElement.classList.contains('dark')
    setColorModeState(isDark ? 'dark' : 'light')
  }, [])

  const handleSetColorMode = (details: { value: string }) => {
    const nextValue = details.value
    if (nextValue === 'light' || nextValue === 'dark') {
      setColorModeState(nextValue as 'light' | 'dark')
      // Обновляем класс на HTML элементе
      if (nextValue === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      // Сохраняем в localStorage
      localStorage.setItem('chakra-ui-color-mode', nextValue)
    }
  }

  return (
    <Menu.Root>
      {/* @ts-ignore - Chakra UI v3 types issue */}
      <Menu.Trigger asChild>
        <IconButton
          aria-label="Theme switcher"
          variant="ghost"
          size="md"
          borderRadius="full"
          _hover={{ bg: { base: 'gray.100', _dark: 'brand.700' } }}
        >
          <ConditionalTooltip content="Сменить тему">
            {colorMode === 'dark' ? (
              <BsFillMoonStarsFill size={18} color="currentColor" />
            ) : (
              <BsFillSunFill size={18} color="currentColor" />
            )}
          </ConditionalTooltip>
        </IconButton>
      </Menu.Trigger>
      {/* @ts-ignore - Chakra UI v3 types issue */}
      <Menu.Positioner placement="bottom">
        {/* @ts-ignore - Chakra UI v3 types issue */}
        <Menu.Content>
          {/* @ts-ignore - Chakra UI v3 types issue */}
          <Menu.RadioItemGroup
            value={colorMode}
            onValueChange={handleSetColorMode}
          >
            {/* @ts-ignore - Chakra UI v3 types issue */}
            <Menu.RadioItem value="light" cursor="pointer">
              <BsFillSunFill />
              Светлая
              <Menu.ItemIndicator />
            </Menu.RadioItem>
            {/* @ts-ignore - Chakra UI v3 types issue */}
            <Menu.RadioItem value="dark" cursor="pointer">
              <BsFillMoonStarsFill />
              Темная
              <Menu.ItemIndicator />
            </Menu.RadioItem>
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export default ThemeSwitcher
