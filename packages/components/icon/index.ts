
import { withInstall } from '@smart-design/utils/with-intall'

import Icon from './src/icon.vue'

/**
 * 使用的时候 app.use(SIcon);  所以需要有个install方法 - withInstall所有的组件都需要
 *  
 */
export const SIcon = withInstall(Icon)
export default SIcon