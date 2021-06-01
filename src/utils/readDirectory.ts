import { Command } from '..'
import { promises } from 'fs'
import { resolve } from 'path'
import logger from './logger'

/**
 * Get the `.js` or `.ts` files as an interface (Only modules).
 *
 * @async
 * @function
 * @param { string } directory
 * @param { boolean } is_commands_directory
 * @returns { Promise<{ [key: string]: T }> }
 */
async function readDirectory<T>(
  directory: string,
  is_commands_directory = false
): Promise<{ [key: string]: T }> {
  let objects: { [key: string]: T } = {}

  // Get the readdir function from the `fs` promises.
  const { readdir, stat } = promises

  // Get the files names
  const filesNames = await readdir(directory)

  if (filesNames.length) {
    for await (const fileName of filesNames) {
      // Get the file path.
      const filePath = `${directory}/${fileName}`

      // Get the file stat.
      const pathStat = await stat(filePath)

      // Check if the current path is a directory.
      if (pathStat.isDirectory()) {
        // Get the objects from the sub directory.
        const subDirObjects = await readDirectory<T>(
          filePath,
          is_commands_directory
        )

        // Append the new objects to the objects list.
        objects = {
          ...objects,
          ...subDirObjects
        }
      }
      // Check if the current path is a file.
      else if (pathStat.isFile()) {
        // Ignore files without `.js` or `.ts`.
        if (!fileName.endsWith('.js') && !fileName.endsWith('.ts')) {
          continue
        }

        // Import the module.
        const mod = await import(filePath)

        // Check if the module has an default export.
        if (mod && mod.default) {
          const fileNameParts = fileName.split('.')

          // Remove the file extension.
          fileNameParts.pop()

          // Get the file name.
          let name = fileNameParts.join('.')

          // Check if is commands directory.
          if (is_commands_directory) {
            if (mod.default.name) {
              name = mod.default.name
            } else if (mod.default.names) {
              for (name of mod.default.names) {
                objects[name] = mod.default
              }

              continue
            } else {
              logger.verbose(`'${filePath}' is not a valid command.`)
              continue
            }
          }

          // Append the module to the objects list.
          objects[name] = mod.default
        }
      }
    }
  }

  return objects
}

/**
 * Get all commands from the `./src/commands/` directory.
 *
 * @exports
 * @async
 * @function
 * @returns { Promise<{ [key: string]: Command }> }
 */
export async function getCommands(): Promise<{ [key: string]: Command }> {
  return readDirectory<Command>(resolve(__dirname, '../commands/'), true)
}

export default readDirectory
