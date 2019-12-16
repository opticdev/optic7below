//@ts-ignore
import {LocalStorage} from 'node-localstorage'
import * as path from 'path'
import * as os from 'os'
//@ts-ignore
import {hri} from 'human-readable-ids'
import {trackSlack} from './analytics'

const homeFolder = os.homedir()
const localStorage = new LocalStorage(path.join(homeFolder, '.opticrc'))

interface ICLIUser {
  user_id: string
  doNotTrack: boolean
}

export function ensureLocalConfig() {
  if (!localStorage.getItem('user_id')) {
    const id = hri.random()
    trackSlack('New CLI Download', id)
    localStorage.setItem('user_id', id)
    localStorage.setItem('doNotTrack', (false).toString())
  }
}

export function readLocalConfig(): ICLIUser {
  ensureLocalConfig()
  return {
    user_id: localStorage.getItem('user_id'),
    doNotTrack: localStorage.getItem('doNotTrack') === 'true'
  }
}

export function setDoNotTrack() {
  localStorage.setItem('doNotTrack', (true).toString())
}
