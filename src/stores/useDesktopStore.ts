import { defineStore } from 'pinia'

export interface DesktopFile {
  id: string
  name: string
  content: string
  x: number
  y: number
  parentId?: string | null  // null = desktop, string = folder id
}

export interface DesktopFolder {
  id: string
  name: string
  x: number
  y: number
  parentId?: string | null  // null = desktop, string = parent folder id
}

export const useDesktopStore = defineStore('desktop', {
  state: () => ({
    files: [] as DesktopFile[],
    folders: [] as DesktopFolder[],
  }),
  persist: true,
  getters: {
    // Files directly on desktop (no parent)
    desktopFiles: (state) =>
      state.files.filter(f => !f.parentId),

    // Folders directly on desktop (no parent)
    desktopFolders: (state) =>
      state.folders.filter(f => !f.parentId),

    // Files inside a specific folder
    filesInFolder: (state) => (folderId: string) =>
      state.files.filter(f => f.parentId === folderId),

    // Folders inside a specific folder
    foldersInFolder: (state) => (folderId: string) =>
      state.folders.filter(f => f.parentId === folderId),
  },
  actions: {
    // ── Files ──────────────────────────────────────────
    createFile(name: string, x: number, y: number, parentId: string | null = null) {
      this.files.push({
        id: crypto.randomUUID(),
        name: name.endsWith('.txt') ? name : `${name}.txt`,
        content: '',
        x,
        y,
        parentId,
      })
    },
    updateFileContent(id: string, content: string) {
      const file = this.files.find(f => f.id === id)
      if (file) file.content = content
    },
    deleteFile(id: string) {
      this.files = this.files.filter(f => f.id !== id)
    },
    renameFile(id: string, name: string) {
      const file = this.files.find(f => f.id === id)
      if (file) file.name = name.endsWith('.txt') ? name : `${name}.txt`
    },

    // ── Folders ────────────────────────────────────────
    createFolder(name: string, x: number, y: number, parentId: string | null = null) {
      this.folders.push({
        id: crypto.randomUUID(),
        name,
        x,
        y,
        parentId,
      })
    },
    deleteFolder(id: string) {
      // Recursively delete all children
      const childFolderIds = this.folders
        .filter(f => f.parentId === id)
        .map(f => f.id)

      childFolderIds.forEach(childId => this.deleteFolder(childId))

      // Delete all files inside this folder
      this.files = this.files.filter(f => f.parentId !== id)

      // Delete the folder itself
      this.folders = this.folders.filter(f => f.id !== id)
    },
    renameFolder(id: string, name: string) {
      const folder = this.folders.find(f => f.id === id)
      if (folder) folder.name = name
    },
  },
})