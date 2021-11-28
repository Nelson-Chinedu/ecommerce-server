import winstonEnvLogger from 'winston-env-logger';
import Stripe from 'stripe';

import IContext from '../../../../interface/IContext';

import { Order } from '../../../../db';

const stripe = new Stripe(process.env.STRIPE_SK as string, {
  apiVersion: '2020-08-27',
});

const CheckoutPayment = async (
  _parent: unknown,
  args: { price: number; productItems: string[]; merchantId: string[] },
  { user: { id } }: IContext
) => {
  const { price, productItems, merchantId } = args;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'NGN',
            product_data: {
              name: ` Multibuy`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/payment/failure`,
    });
    if (session) {
      productItems.map((productItem: any, index: number) => {
        const newOrder: Order = Order.create({
          product: productItem,
          merchantId: merchantId[index],
          customerId: id,
        });

        newOrder.save();
      });
    }

    return { token: session.id };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
  }
};

export default CheckoutPayment;
