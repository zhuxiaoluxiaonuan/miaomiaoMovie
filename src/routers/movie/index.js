export default{
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'comingsoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'nowplaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: 'detail/1/:movieId',
            components:{
                default: () => import('@/components/NowPlaying'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true //使用props解耦
            }
        },
        {
            path: 'detail/2/:movieId',
            components:{
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true //使用props解耦
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowplaying'
        }
    ],
    linkActiveClass: 'active'
}