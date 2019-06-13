const routes = [
  // first one commented out , and used to testing in dev
  // {
  //   path: '/',
  //   component: () => import('layouts/BaseLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('pages/Views/ListViews/ModelListView.vue')
  //     }
  //   ]
  // },

  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/calendar',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Calendar.vue') }]
  },
  {
    path: '/specialists',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Specialists.vue') }]
  },
  {
    path: '/about',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutUs.vue') }]
  },
  {
    path: '/home',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/login',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Auth/Login.vue') }]
  },
  {
    path: '/register',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Auth/Register.vue') }]
  },

  {
    path: '/sales',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/nutritionist/profile/',

    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'Nut Profile',
        component: () => import('pages/Nutritionists/Profile.vue')
      }
    ]
  },
  {
    path: '/nutritionist/profile/update',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Nutritionists/Forms/UpdateNutProfile.vue')
      }
    ]
  },
  {
    path: '/nutritionist/clients/add',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Nutritionists/Forms/RegisterClient.vue')
      }
    ]
  },
  {
    path: '/nutritionist/clients',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Nutritionists/ClientList.vue')
      }
    ]
  },
  {
    path: '/nutritionist/clients/:id/',

    props: true,

    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', name: 'ClientDetail', component: () => import('pages/Nutritionists/ClientDetail.vue') }]
  },
  {
    path: '/nutritionist/clients/:id/update',
    props: true,
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Nutritionists/Forms/ClientUpdate.vue') }]
  },
  {
    path: '/nutritionist/clients/:id/menu/:tid/',
    props: true,
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Nutritionists/Forms/MenuGetter.vue') }]
  },
  {

    path: '/nutritionist/menus/:mid/',
    props: true,

    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', name: 'MenuDetail', component: () => import('pages/Nutritionists/MenuDetailView.vue') }]
  },
  {
    path: '/nutritionist/menus',
    props: true,
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Nutritionists/MenuList.vue') }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/Error404.vue') }]
  })
}

export default routes
