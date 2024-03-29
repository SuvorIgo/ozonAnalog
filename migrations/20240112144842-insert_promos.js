module.exports = {
  async up(db, client) {

    return await db.collection('Promos').insertMany(
      [ 
        {
          id: 1,
          hotsale_id: null,
          title: 'Promo 1',
          description: 'Promo 1 description',
          date_start: '2023-12-01T00:00:00Z',
          date_end: '2023-12-03T00:00:00Z',
          freeze_date: '2023-12-02T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 2,
          hotsale_id: null,
          title: 'Promo 2',
          description: 'Promo 2 description',
          date_start: '2023-12-04T00:00:00Z',
          date_end: '2023-12-05T00:00:00Z',
          freeze_date: '2023-12-06T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 3,
          hotsale_id: null,
          title: 'Promo 3',
          description: 'Promo 3 description',
          date_start: '2023-12-07T00:00:00Z',
          date_end: '2023-12-08T00:00:00Z',
          freeze_date: '2023-12-09T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 4,
          hotsale_id: null,
          title: 'Promo 4',
          description: 'Promo 4 description',
          date_start: '2023-12-10T00:00:00Z',
          date_end: '2023-12-11T00:00:00Z',
          freeze_date: '2023-12-12T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 5,
          hotsale_id: null,
          title: 'Promo 5',
          description: 'Promo 5 description',
          date_start: '2023-12-13T00:00:00Z',
          date_end: '2023-12-14T00:00:00Z',
          freeze_date: '2023-12-15T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 6,
          hotsale_id: null,
          title: 'Promo 6',
          description: 'Promo 6 description',
          date_start: '2023-12-16T00:00:00Z',
          date_end: '2023-12-17T00:00:00Z',
          freeze_date: '2023-12-18T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 7,
          hotsale_id: null,
          title: 'Promo 7',
          description: 'Promo 7 description',
          date_start: '2023-12-19T00:00:00Z',
          date_end: '2023-12-20T00:00:00Z',
          freeze_date: '2023-12-21T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 8,
          hotsale_id: null,
          title: 'Promo 8',
          description: 'Promo 8 description',
          date_start: '2023-12-22T00:00:00Z',
          date_end: '2023-12-23T00:00:00Z',
          freeze_date: '2023-12-24T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 9,
          hotsale_id: null,
          title: 'Promo 9',
          description: 'Promo 9 description',
          date_start: '2023-12-25T00:00:00Z',
          date_end: '2023-12-26T00:00:00Z',
          freeze_date: '2023-12-27T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 10,
          hotsale_id: null,
          title: 'Promo 10',
          description: 'Promo 10 description',
          date_start: '2023-12-28T00:00:00Z',
          date_end: '2023-12-29T00:00:00Z',
          freeze_date: '2023-12-30T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: false,
          products: [],
        },
        {
          id: 11,
          hotsale_id: 1,
          title: 'Promo Hotsale 1',
          description: 'Promo Hotsale 1 description',
          date_start: '2023-12-01T00:00:00Z',
          date_end: '2023-12-03T00:00:00Z',
          freeze_date: '2023-12-03T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: true,
          products: [],
        },
        {
          id: 12,
          hotsale_id: 2,
          title: 'Promo Hotsale 2',
          description: 'Promo Hotsale 2 description',
          date_start: '2023-12-04T00:00:00Z',
          date_end: '2023-12-05T00:00:00Z',
          freeze_date: '2023-12-06T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: true,
          products: [],
        },
        {
          id: 13,
          hotsale_id: 3,
          title: 'Promo Hotsale 3',
          description: 'Promo Hotsale 3 description',
          date_start: '2023-12-07T00:00:00Z',
          date_end: '2023-12-08T00:00:00Z',
          freeze_date: '2023-12-09T00:00:00Z',
          potential_products_count: 0,
          participating_products_count: 0,
          is_participating: false,
          is_voucher_action: true,
          banned_products_count: 0,
          with_targeting: false,
          order_amount: 0,
          discount_type: 'UNKNOWN',
          discount_value: 0,
          is_hotsale: true,
          products: [],
        },
      ]
    );
  },

  async down(db, client) {
    return await db.collection('Promos').deleteMany({});
  }
};
