import { XMLParser, XMLBuilder} from 'fast-xml-parser'
import * as fs from 'fs'
import * as Docker from 'dockerode'
import * as sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { configs } from './src/config'

const docker = new Docker({socketPath: '/var/run/docker.sock'});
const parser = new XMLParser();
const builder = new XMLBuilder({
  format: true,
});

async function main() {
  // Sonarr, Radarr
  for (const [key, config] of Object.entries(configs)) {
    console.log(`🔨 handling ${key}`)
    const initialXMLdata = fs.readFileSync(config.path, 'utf8')
    const json = parser.parse(initialXMLdata);

    let dirty = false
    // Update XML config
    for (const [key, value] of Object.entries(config.xml)) {
      if (json.Config[key] !== value) {
        json.Config[key] = value
        dirty = true
      }
    }
    const newXMLdata = builder.build(json);
    fs.writeFileSync(config.path, newXMLdata)

    // Update config paths
    if (config.db) {
      const db = await open({
        filename: config.db.filename,
        driver: sqlite3.Database
      })

      async function updatePaths(table: string) {
        let count = 0
        const rows = await db.all<{Id: number, Path: string}[]>(`SELECT * FROM ${table}`)
        console.log(`Found ${rows.length} items in ${table} to check...`)
        for (const row of rows) {
          const path = row.Path.replace('\\\\', '\\')
          const oldPathPrefix = Object.keys(config.db.paths).find(_path => path.startsWith(_path))
          if (oldPathPrefix) {
            const newPath = path.replace(oldPathPrefix, config.db.paths[oldPathPrefix])
            await db.run(`UPDATE ${table} SET Path = ? WHERE Id = ?`, newPath, row.Id)
            dirty = true
            count++
          }
        }
        console.log(`✅ Updated ${count} paths in ${table}..`)
      }

      await updatePaths(config.db.table)
      await updatePaths('RootFolders')
    }

    // Trigger container restart if needed
    if (dirty) {
      const container = docker.getContainer(key);
      const status = await container.inspect()
      if (status.State.Running) {
        console.log('Restarting container to apply config changes')
        await container.restart()
        console.log('✅ restarted!')
      }
    }
  }
}

main()