export default class ApiError extends Error {
  constructor(message, info) {
    super(message);
    this.name = 'ApiError';

    //   {httpStatus: 500, source: 'controller' }

    Object.entries(info).forEach(([key, value]) => {
      this[key] = value;
    });
  // this.httpStatus = info.httpStatus
  // this.source = info.source
  }
}
