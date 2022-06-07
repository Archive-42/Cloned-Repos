// @ts-check

// A script which uses Facebook's watchman to run `yarn build` in different modules
// in a standard monorepo.

const watchman = require("fb-watchman")
const client = new watchman.Client({})
const chalk = require("chalk")
const { spawn, exec } = require("child_process")
const { join } = require("path")
const { existsSync, readFileSync } = require("fs")

const { log } = console

/**
 * @typedef {Object} WatchmanFile - a User account
 * @property {string} name - the full path
 * @property {string} type - the type of file changed, f = file, the rest = meh
 * @property {boolean} exists - was it deleted?
 */

/**
 *
 * @param {WatchmanFile} file
 */
const projectForFile = file => {
  // Any output
  if (file.name.includes("/dist/") || file.name.includes("/out/")) return
  if (file.name.includes("/typescriptlang-org/")) return
  if (file.name.includes(".test.ts")) return
  if (file.name.startsWith("packages/")) {
    return file.name.split("/")[1]
  }
}

let upcomingCommand = null
let currentProcess = null

// All this is basically a bunch of boilerplate code to set up a watchman
// for the project which looks only at .ts and .md files in the repo.

// Startup watchman
client.command(["watch-project", process.cwd()], function (error, resp) {
  if (error) {
    console.error("Error initiating watch:", error)
    return
  }

  if ("warning" in resp) {
    log("warning: ", resp.warning)
  }

  // // The default subscribe behavior is to deliver a list of all current files
  // // when you first subscribe, so you don't need to walk the tree for yourself
  // // on startup.  If you don't want this behavior, you should issue a `clock`
  // // command and use it to give a logical time constraint on the subscription.
  // // See further below for an example of this.

  // // watch-project may re-use an existing watch at a higher level in the
  // // filesystem.  It will tell us the relative path to the directory that
  // // we expressed interest in, so we need to adjust for it in our results
  var path_prefix = ""
  var root = resp.watch
  if ("relative_path" in resp) {
    path_prefix = resp.relative_path
  }

  // Subscribe to notifications about .js files
  // https://facebook.github.io/watchman/docs/cmd/subscribe.html
  client.command(
    [
      "subscribe",
      root,
      "Monorepo Builder",
      {
        expression: ["anyof", ["match", "*.ts"], ["match", "*.md"], ["match", "*.tsx"], ["match", "*.json"]],
        relative_root: path_prefix,
        fields: ["name", "exists", "type"],
      },
    ],
    function (error, resp) {
      if (error) {
        console.error("failed to subscribe: ", error)
        return
      }
      log(`${chalk.green("success")} connected to Watchman`)
    }
  )

  // @ts-ignore
  client.on("subscription", function (resp) {
    // NOOP for large amounts of files
    if (resp.files.length > 10) return

    const projectsToBuild = resp.files.map(projectForFile).filter(Boolean)
    const uniqueProjects = Array.from(new Set(projectsToBuild))

    // I don't wanna handle multiple processes
    const commandToRun = uniqueProjects.map(project => {
      const packageJSONPath = join("packages", project, "package.json")
      if (!existsSync(packageJSONPath)) return

      const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf8"))
      if (!packageJSON.scripts || !packageJSON.scripts.build) return

      const buildCommand = `workspace ${packageJSON.name} run build`
      return buildCommand
    })

    if (commandToRun[0]) {
      if (currentProcess) {
        upcomingCommand = commandToRun[0]
      } else {
        runCommand(commandToRun[0])
      }
    }
  })
})

// @ts-ignore
client.on("end", function () {
  // Called when the connection to watchman is terminated
  log("watch over")
})

// @ts-ignore
client.on("error", function (error) {
  console.error("Error while talking to watchman: ", error)
})

client.capabilityCheck({ required: ["relative_root"] }, function (error, resp) {
  if (error) {
    console.error("Error checking capabilities:", error)
    return
  }
  // log("Talking to watchman version", resp.version)
})

const runCommand = argString => {
  if (currentProcess) return

  const prefix = chalk.gray("> ")
  const cmd = chalk.bold("yarn " + argString)
  log(prefix + cmd)

  const build = spawn("yarn", argString.split(" "))
  build.stdout.on("data", l => {
    if (l.toString().includes("Done in")) return
    log("  " + l.toString().trim())
  })
  build.stderr.on("data", l => console.error("  " + l.toString().trim()))

  build.on("close", code => {
    const codeString = code === 0 ? chalk.green("" + code) : chalk.bold.red("" + code)
    log(`[${codeString}] --------- `)

    if (process.platform === "darwin") {
      exec(playCommand(".vscode/done.aiff", "0.05"))
    }

    currentProcess = null
    if (upcomingCommand === argString || !upcomingCommand) {
      // NOOP if you've tried running the same thing a few times
      upcomingCommand = null
    } else {
      // re-launch the next command
      const commandToRun = upcomingCommand
      upcomingCommand = null
      runCommand(commandToRun)
    }
  })

  currentProcess = build
}

const playCommand = (path, volume) => `afplay \"${path}\" -v ${volume}`
