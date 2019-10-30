export default{
    path: '/cinema',
    name: 'cinema',
    component: () => import('@/views/Cinema') //懒加载的方式导入：按需导入
}