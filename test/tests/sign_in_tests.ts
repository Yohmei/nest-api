export const sign_in_tests = {
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
  unexpected_field_test: {
    description: 'should receive a 201 with ok email and password',
    message: {
      email: 'lol@mail.com',
      password: 'pass',
      unexpected_field_test: 'i will mess up your app',
    },
    status_code: 201,
    expected_result: { access_token: expect.any(String) },
  },
  wrong_email_test: {
    description: 'should receive a 403 with wrong email',
    message: { email: 'lolo@mail.com', password: 'pass' },
    status_code: 403,
    expected_result: {
      statusCode: 403,
      message: 'Credentials incorrect',
      error: 'Forbidden',
    },
  },
  wrong_pass_test: {
    description: 'should receive a 403 with wrong email',
    message: { email: 'lol@mail.com', password: 'passs' },
    status_code: 403,
    expected_result: {
      statusCode: 403,
      message: 'Credentials incorrect',
      error: 'Forbidden',
    },
  },
};
