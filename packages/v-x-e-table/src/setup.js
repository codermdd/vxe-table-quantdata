import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils/ctor'

/**
 * 全局参数设置
 */
function setup (options = {}) {
  // 在 v3.0 中废弃 setup.menu
  if (options.menu && !(options.menuConfig || options.contextMenu)) {
    options.contextMenu = options.menu
    options.menuConfig = options.menu
    console.warn('[vxe-table] parameter "menu" has been replaced by "menuConfig"')
  }
  return XEUtils.merge(GlobalConfig, options)
}

export default setup
