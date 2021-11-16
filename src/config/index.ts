import dotenvExtended from 'dotenv-extended'
import dotenvParseVariables from 'dotenv-parse-variables'
 
const env = dotenvExtended.load({
  path: process.env.ENV_FILE,
  defaults: './config/.env.defaults',
  schema: './config/.env.schema',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true
})

const parsedEnv = dotenvParseVariables(env)
 
// Define log levels type (silent + Winston default npm)
type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

interface Config {
  privateKeyFile: string
  privateKeyPassphrase: string
  publicKeyFile: string,
  mongo: {
    url: string,
    useCreateIndex: boolean,
    autoIndex: boolean
  },
  morganLogger: boolean
  morganBodyLogger: boolean
  exmplDevLogger: boolean
  // delare loggerLevel config property
  loggerLevel: LogLevel 
  localCacheTtl: number
}

const config: Config = {
  privateKeyFile: parsedEnv.PRIVATE_KEY_FILE as string,
  privateKeyPassphrase: parsedEnv.PRIVATE_KEY_PASSPHRASE as string,
  publicKeyFile: parsedEnv.PUBLIC_KEY_FILE as string,
  mongo: {
    url: parsedEnv.MONGO_URL as string,
    useCreateIndex: parsedEnv.MONGO_CREATE_INDEX as boolean,
    autoIndex: parsedEnv.MONGO_AUTO_INDEX as boolean
  },
  morganLogger: parsedEnv.MORGAN_LOGGER as boolean,
  morganBodyLogger: parsedEnv.MORGAN_BODY_LOGGER as boolean,
  exmplDevLogger: parsedEnv.EXMPL_DEV_LOGGER as boolean,
  // read the value from environment variable
  loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel,
  localCacheTtl: parsedEnv.LOCAL_CACHE_TTL as number
}

export default config