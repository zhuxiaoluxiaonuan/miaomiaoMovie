export default{
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            name: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'comingsoon',
            name: 'comingsoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'nowplaying',
            name: 'nowplaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'search',
            name: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: '/movie',
            redirect: '/movie/nowplaying'
        }
    ],
    linkActiveClass: 'active'
}