export const signed_out_user_tests = {
  signed_out_user: {
    description: 'should receive a 401',
    status_code: 401,
    expected_result: {
      statusCode: 401,
      message: 'Unauthorized',
    },
  },
};
