import Vue from 'vue'
import Router from 'vue-router'

const Error = () => import('components/error/error')
const Personal = () => import('components/personal/personal')
const Ticket = () => import('components/ticket/ticket')
const Advert = () => import('components/advert/advert')
const Payment = () => import('components/payment/payment')
const SendGift = () => import('components/user/gift/send-gift')
const ReceiveGift = () => import('components/user/gift/receive-gift')
const Recharge = () => import('components/user/recharge/recharge')
const RechargeRecord = () => import('components/user/recharge/recharge-record')
const Withdraw = () => import('components/user/withdraw/withdraw')
const WithdrawRecord = () => import('components/user/withdraw/withdraw-record')
const UserEdit = () => import('components/user/edit/edit')
const Disclaimer = () => import('components/disclaimer/disclaimer')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/error',
      component: Error
    },
    {
      path: '/personal/:roomId/:createId',
      component: Personal,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/ticket',
      component: Ticket,
      meta: {
        title: '相亲交友'
      }
    },
    {
      path: '/advert/:id',
      component: Advert,
      meta: {
        title: '详情'
      }
    },
    {
      path: '/payment',
      component: Payment,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/user/gift/send',
      component: SendGift,
      meta: {
        title: '我送出的礼物'
      }
    },
    {
      path: '/user/gift/receive',
      component: ReceiveGift,
      meta: {
        title: '我收到的礼物'
      }
    },
    {
      path: '/user/recharge',
      component: Recharge,
      meta: {
        title: '充值'
      }
    },
    {
      path: '/user/recharge/record',
      component: RechargeRecord,
      meta: {
        title: '充值记录'
      }
    },
    {
      path: '/user/withdraw',
      component: Withdraw,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/user/withdraw/record',
      component: WithdrawRecord,
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/user/edit',
      component: UserEdit,
      meta: {
        title: '编辑'
      }
    },
    {
      path: '/disclaimer',
      component: Disclaimer,
      meta: {
        title: '免责申明'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
