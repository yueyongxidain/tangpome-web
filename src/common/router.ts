const routerConfig = [
    {
        component: require('../routes/user/user').default,
        store:require('src/routes/childrenSong/childrenSongStore').default,
        name: '用户管理',
        path: '/user',

    },
    {
        component: require('../routes/carousel/carousel').default,
        store:require('src/routes/childrenSong/childrenSongStore').default,
        name: '轮播图管理',
        path: '/carousel'
    },
    {
        component: require('../routes/childrenSong/childrenSong').default,
        store:require('src/routes/childrenSong/childrenSongStore').default,
        name: '儿歌管理',
        path: '/childrenSong'
    },
    {
        component: require('../routes/lullaby/lullaby').default,
        store:require('src/routes/lullaby/lullabyStore').default,
        name: '摇篮曲管理',
        path: '/merchant'
    }
]


export default routerConfig