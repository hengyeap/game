import Index from '../compontent/Index'
import ShareImg from '../compontent/ShareImg.vue'
import Rules from '../compontent/Rules.vue'
import ToTmm from '../compontent/ToTmm.vue'
import Register from '../compontent/Register.vue'

export default [{
		component: Index,
		name: 'index',
		path: '/'
	},
	{
		component: ShareImg,
		name: 'shareImg',
		path: '/share'
	},
	{
		component: Rules,
		name: 'rules',
		path: '/rules'
	},
	{
		component: ToTmm,
		name: 'toTmm',
		path: '/toTmm'
	},
	{
		component: Register,
		name: 'register',
		path: '/register'
	}
]
