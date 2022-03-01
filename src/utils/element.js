import * as ElIconModules from '@element-plus/icons-vue'

const useElIcon = (fn) => {
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      fn(iconName, item)
    }
  }
}

export default useElIcon