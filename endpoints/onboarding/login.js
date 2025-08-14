const { createHandler } = require('@app-core/server');
const loginService = require('@app/services/onboarding/login');

module.exports = createHandler({
  path: '/login',
  method: 'post',
  middlewares: [],
  async handler(rc, helpers) {
    const payload = rc.body;

    const response = await loginService(payload);
    return {
      status: helpers.http_statuses.HTTP_200_OK,
      data: response,
    };
  },
});
