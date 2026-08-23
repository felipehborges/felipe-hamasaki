import { sites } from '@openai/sites-vite-plugin'
import tailwindcss from '@tailwindcss/postcss'
import vinext from 'vinext'
import { type UserConfig, defineConfig } from 'vite'
import hostingConfig from './.openai/hosting.json'

const { d1, r2 } = hostingConfig

async function createConfig(): Promise<UserConfig> {
  process.env.WRANGLER_WRITE_LOGS ??= 'false'
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs'
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry'

  const { cloudflare } = await import('@cloudflare/vite-plugin')

  return {
    css: { postcss: { plugins: [tailwindcss() as never] } },
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: {
          main: 'vinext/server/app-router-entry',
          compatibility_flags: ['nodejs_compat'],
          d1_databases: d1 ? [] : [],
          r2_buckets: r2 ? [] : []
        }
      })
    ]
  }
}

export default defineConfig(createConfig)
