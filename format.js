import fs from 'fs'
import transform from 'rollup-plugin-transform-input'
import prettier from 'prettier'
import postcss from 'postcss'
import sorting from 'postcss-sorting'

function formatContents(filepath, source) {
  const options = prettier.resolveConfig.sync(filepath)
  return prettier.format(source, { filepath, ...options })
}

function formatCss(filepath, source, zen, zenTailwind) {
  return filepath && (filepath.endsWith('.svelte') || filepath.endsWith('.html'))
    ? source
        .replace(/(?<=class=").+?(?=")/g, o =>
          (o.match(/(?:[^\s]+)?{.+}(?:[^\s]+)?|[^\s]+/g) || [])
            .sort((a, b) =>
              a.startsWith('{') && b.startsWith('{')
                ? a > b
                  ? -1
                  : 1
                : a.startsWith('{')
                ? -1
                : b.startsWith('{')
                ? 1
                : zenTailwind.indexOf(a) - zenTailwind.indexOf(b)
            )
            .join(' ')
        )
        .replace(/<style(.*?)>(.+?)<\/style>/gs, (_, p1, p2) => `<style${p1}>${formatCss(null, p2, zen)}</style>`)
    : postcss([sorting({ 'properties-order': zen })]).process(source, {
        from: filepath,
        to: filepath,
      }).css
}

export default function (options) {
  const zen = fs.readFileSync('zen', 'utf8').split('\n')
  const zenTailwind = fs.readFileSync('zen-tailwind', 'utf8')

  return {
    ...transform({
      ...options,
      transform(source, filepath) {
        let formatted = formatContents(filepath, source)
        if (filepath.endsWith('.svelte') || filepath.endsWith('.html') || filepath.endsWith('.css'))
           formatted = formatCss(filepath, formatted, zen, zenTailwind)

        return formatted
      },
    }),
    name: 'format',
  }
}
