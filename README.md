# Personal Portfolio Site

A modern portfolio website built with Next.js, featuring MDX support for content creation and interactive features.

## Features

### Current Features

- 📝 MDX Support for dynamic content
- 🌍 English + Turkish (`next-intl`) — English at `/`, Turkish at `/tr`, with `hreflang`, localized metadata, Open Graph images and sitemap
- 🎨 Modern and clean design
- 💨 TailwindCSS for styling
- 🚀 Next.js 15 for optimal performance
- 📱 Fully responsive design

### Upcoming Features

- 💬 AI-powered chat integration
- 🔖 Bookmark system
- 📚 Interactive blog posts
- 🤖 AI assistant for visitor interactions

## Tech Stack

- Next.js 15
- TypeScript
- TailwindCSS
- MDX
- Supabase (for upcoming features)
- shadcn/ui

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

## Content Management

Content is written in MDX format, allowing for:

- Interactive components within markdown
- Custom React components
- Dynamic content rendering

## Languages

English is the source language and lives at the bare path; Turkish is a
translation and lives under `/tr`. The routing is `next-intl` with
`localePrefix: 'as-needed'` (`src/i18n/routing.ts`), so every pre-i18n URL
still resolves unchanged.

| What              | English                                                   | Turkish                                                         |
| ----------------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| UI strings        | `messages/en.json`                                        | `messages/tr.json`                                              |
| Homepage          | `src/content/home.mdx`                                    | `src/content/home.tr.mdx`                                       |
| Essays (`/paper`) | `src/content/paper/<slug>.mdx` + `src/writing.ts`         | `src/content/paper/<slug>.tr.mdx` + `src/writing.tr.ts`         |
| Garden notes      | `src/garden/notes/<id>/<slug>.mdx` + `src/garden/<id>.ts` | `src/garden/notes/<id>/<slug>.tr.mdx` + `src/garden/<id>.tr.ts` |

Translations are overlays: anything a `.tr.ts` file leaves out (a title, a
summary, a whole note) falls back to English, so content can be translated one
piece at a time without ever rendering a hole. Slugs are shared across
languages — `/paper/fisle` and `/tr/paper/fisle` are the same post — which is
what lets the language switcher, `hreflang` tags and the sitemap pair pages
by path alone.

Internal links go through `@/components/link`, which prefixes the current
locale and keeps the view transitions. Never hand-write `/tr/...` in content.

## Development

This project follows modern development practices:

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Husky for git hooks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
