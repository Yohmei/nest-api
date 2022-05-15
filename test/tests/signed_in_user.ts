export const signed_in_user_tests = {
  signed_in_user: {
    description: 'should receive a 200',
    status_code: 200,
    expected_result: {
      id: expect.any(String),
      email: 'lol@mail.com',
      created_at: expect.any(String),
      updated_at: expect.any(String),
      first_name: null,
      last_name: null,
    },
  },
};
