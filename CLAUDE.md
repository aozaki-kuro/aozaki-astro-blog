# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes type checking)
- `npm run preview` - Preview production build
- `npm run check` - Run Biome linter/formatter with auto-fix
- `npm run deploy` - Deploy to Cloudflare Workers (runs check + build + deploy)

### Image Management

- `npm run image-import` - Generate image imports from public/assets/images (required after adding new images)

### Type Checking

- `npm run astro check` - Check TypeScript types (included in build)

## Architecture Overview

### Tech Stack

- **Framework**: Astro with static output
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Deployment**: Cloudflare Workers via Wrangler
- **Content**: File-based content collections
- **Images**: Static assets with auto-generated imports

### Key Architectural Patterns

#### Content Management

- Blog posts stored in `src/content/post/` as Markdown files
- Content schema defined in `src/content/config.ts`
- Photography and commission data in JSON files under `src/collections/`

#### Image Handling

- All images stored in `public/assets/images/` with organized subdirectories
- Auto-generated import mapping via `src/scripts/generateImageImports.ts`
- Commission images: `public/assets/images/commission/`
- Photography images: `public/assets/images/photography/` (organized by date folders)
- Run `npm run image-import` after adding new images to update `src/data/imageImports.ts`

#### Styling System

- Tailwind CSS v4 with custom configuration in `src/styles/global.css`
- Dark mode support with system preference detection
- Custom animations for theme transitions (sun/moon toggle)
- Maple Mono font for monospace text

#### Component Structure

- Layout components in `src/layouts/`
- Page components in `src/pages/`
- Reusable components in `src/components/` (organized by feature)
- Shared utilities in `src/utils/`

#### Theme System

- Dark/light mode toggle with localStorage persistence
- System preference detection with `prefers-color-scheme`
- Animated theme transitions using CSS animations
- Theme state managed in `src/assets/js/main.js`

### Important Configuration Files

#### Tailwind CSS Integration

Currently using `@tailwindcss/vite` plugin in `astro.config.ts`. Project has both `@astrojs/tailwind` and `@tailwindcss/vite` installed - choose one integration method for consistency.

#### Content Collections

- Post schema requires: `title`, `description`, `dateFormatted` (string format)
- Optional `image` field for post thumbnails
- Date format: `YYYY/MM/DD` string format, not JavaScript Date objects

#### Image Import System

- Commission images: key = filename without extension
- Photography images: key = `{folder}_{filename}` or just filename for root level
- Generated mapping available in `src/data/imageImports.ts`

### Development Notes

#### Adding New Images

1. Place images in appropriate `public/assets/images/` subdirectory
2. Run `npm run image-import` to update import mappings
3. Use `imageImports[key]` in components to reference images

#### Theme Development

- Theme toggle logic in `src/assets/js/main.js`
- CSS animations defined in `src/styles/global.css`
- Dark mode classes follow pattern: `dark:class-name`

#### Build Process

- Build includes automatic type checking via `astro check`
- Deployment automatically runs check + build + Wrangler deploy
- Static site generation for optimal performance

### Known Issues to Address

- Resource paths in layout files may need adjustment
- Some CSS animations missing units (`translate3d` values)
- Function name typo: `stickyHeaderFuncionality` should be `stickyHeaderFunctionality`
