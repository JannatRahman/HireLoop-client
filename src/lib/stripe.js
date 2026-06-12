import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID= {
  'seeker_pro' : 'price_1TgnltETnwl3wrObrGYjVBH3',
  'seeker_premium' : 'price_1TgoP1ETnwl3wrObt3ugvKQp',
  'recruiter_growth': 'price_1TgoPsETnwl3wrOb4uhEiaox' ,
  'recruiter_enterprise' : 'price_1TgoOJETnwl3wrObI7AJPUZj',
  
}