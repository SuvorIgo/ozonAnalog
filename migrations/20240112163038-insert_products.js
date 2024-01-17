module.exports = {
  async up(db, client) {
    return await db.collection('Products').insertMany(
      [ 
        {
          id: 1,
          offer_id: 'OLO111',
          price: 400,
          action_price: 0,
          max_action_price: 300,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 2,
          offer_id: 'OLO112',
          price: 300,
          action_price: 0,
          max_action_price: 200,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 3,
          offer_id: 'OLO122',
          price: 200,
          action_price: 0,
          max_action_price: 100,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 4,
          offer_id: 'OLO121',
          price: 100,
          action_price: 0,
          max_action_price: 50,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 5,
          offer_id: 'OLO211',
          price: 400,
          action_price: 0,
          max_action_price: 300,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 6,
          offer_id: 'OLO221',
          price: 300,
          action_price: 0,
          max_action_price: 200,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 7,
          offer_id: 'OLO212',
          price: 200,
          action_price: 0,
          max_action_price: 100,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 8,
          offer_id: 'OLO222',
          price: 100,
          action_price: 0,
          max_action_price: 50,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 9,
          offer_id: 'OLO223',
          price: 200,
          action_price: 0,
          max_action_price: 100,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 10,
          offer_id: 'OLO232',
          price: 100,
          action_price: 0,
          max_action_price: 50,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 11,
          offer_id: 'OLO322',
          price: 400,
          action_price: 0,
          max_action_price: 300,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 12,
          offer_id: 'OLO332',
          price: 300,
          action_price: 0,
          max_action_price: 200,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 13,
          offer_id: 'OLO233',
          price: 200,
          action_price: 0,
          max_action_price: 100,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 14,
          offer_id: 'OLO323',
          price: 100,
          action_price: 0,
          max_action_price: 50,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 15,
          offer_id: 'OLO333',
          price: 400,
          action_price: 0,
          max_action_price: 300,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 16,
          offer_id: 'OLO334',
          price: 300,
          action_price: 0,
          max_action_price: 200,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 17,
          offer_id: 'OLO343',
          price: 200,
          action_price: 0,
          max_action_price: 100,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 18,
          offer_id: 'OLO433',
          price: 100,
          action_price: 0,
          max_action_price: 50,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 19,
          offer_id: 'OLO344',
          price: 200,
          action_price: 0,
          max_action_price: 100,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
        {
          id: 20,
          offer_id: 'OLO443',
          price: 100,
          action_price: 0,
          max_action_price: 50,
          add_mode: '',
          min_stock: 0,
          stock: 0,
          is_action: false,
          date_day_promo: '',
        },
      ]
    );
  },

  async down(db, client) {
    return await db.collection('Products').deleteMany({});
  }
};