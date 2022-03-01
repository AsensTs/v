import * as ElIconModules from '@element-plus/icons-vue'

const useElIcon = (component) => {
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      component(iconName, item)
    }
  }
}

export default useElIcon