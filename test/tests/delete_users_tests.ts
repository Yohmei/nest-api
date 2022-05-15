export const delete_users_tests = {
  smoke_test: {
    description: 'should receive a 201 with ok email',
    message: { email: 'lol@mail.com' },
    status_code: 201,
    expected_result: { count: 1 },
  },
};
