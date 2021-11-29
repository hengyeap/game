import Index from '../component/Index'
import Rules from '../component/Rules.vue'
import Details from '../component/Details.vue'



export default [{
  component: Index,
  name: 'index',
  path: '/'
},
  {
    component: Rules,
    name: 'rules',
    path: '/rules'
  },
  {
    component: Details,
    name: 'details',
    path: '/details'
  },

]
