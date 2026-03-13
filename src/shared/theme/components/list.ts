/*
 ============================================================
 CHAKRA UI v3 MIGRATION - STYLE CONFIG CHANGES
 ============================================================

 The following style config patterns were found and need migration:
 - createMultiStyleConfigHelpers

 These have been replaced with:
 - defineRecipe (for single-part components)
 - defineSlotRecipe (for multi-part components)

 Key differences:
 1. Recipes use a different structure (base, variants, defaultVariants)
 2. No more "parts" - use "slots" in slot recipes
 3. Variants are defined directly, not in a separate object
 4. Default variants use "defaultVariants" key

 Documentation:
 - Recipes: https://chakra-ui.com/docs/theming/recipes
 - Slot Recipes: https://chakra-ui.com/docs/theming/slot-recipes
 - Migration Guide: https://chakra-ui.com/docs/get-started/migration

 ============================================================
*/

// TEMPORARILY DISABLED - Chakra UI v3 doesn't support createMultiStyleConfigHelpers
// This needs to be rewritten using defineSlotRecipe

// import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

// const helper = createMultiStyleConfigHelpers(['container', 'item'])
// export const List = helper.defineMultiStyleConfig({
//   baseStyle: {
//     container: {
//       bg: 'brand.100',
//       border: 'none',
//       fontSize: 'initial',
//       fontWeight: 'medium',
//       padding: 2,
//       borderRadius: 'md',
//       display: 'flex',
//       flexDirection: 'column',
//       _dark: {
//         bg: 'brand.900',
//       },
//     },
//     item: {
//       paddingX: 3,
//       paddingY: 1,
//       alignItems: 'center',
//       borderRadius: 'md',
//       fontSize: 'small',
//       fontWeight: 'normal',
//       _hover: {
//         bg: 'brand.200',
//         _dark: {
//           bg: 'brand.700',
//         },
//       },
//     },
//   },
// })

export const List = {}
