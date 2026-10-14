export default function cors($httpProvider) {
  // O frontend usa o backend como BFF na mesma origem. O AngularJS envia
  // automaticamente X-XSRF-TOKEN a partir do cookie XSRF-TOKEN.
  $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN';
  $httpProvider.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
};

cors.$inject = ['$httpProvider'];
