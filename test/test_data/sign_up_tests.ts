export const sign_up_tests = {
  empty_email_test: {
    description: 'should receive a 400 with an empty email',
    message: { email: '', password: 'pass' },
    status_code: 400,
    expected_result: {
      statusCode: 400,
      message: ['email should not be empty', 'email must be an email'],
      error: 'Bad Request',
    },
  },
  bad_email_test: {
    description: 'should receive a 400 with bad email',
    message: { email: 'lol', password: 'pass' },
    status_code: 400,
    expected_result: {
      statusCode: 400,
      message: ['email must be an email'],
      error: 'Bad Request',
    },
  },
  correct_email_test: {
    description: 'should receive a 201 with ok email and password',
    message: { email: 'lol@mail.com', password: 'pass' },
    status_code: 201,
    expected_result: { access_token: expect.any(String) },
  },
  second_user_test: {
    description: 'should receive a 500 with email already taken',
    message: { email: 'lol@mail.com', password: 'pass' },
    status_code: 403,
    expected_result: {
      statusCode: 403,
      message: 'Credentials already taken',
      error: 'Forbidden',
    },
  },
};
