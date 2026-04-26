export default function cors($httpProvider) {
  $httpProvider.defaults.useXDomain = true; // habilita chamadas x-domain
  delete $httpProvider.defaults.headers.common['X-Requested-With']; // remove header usado pra identificacao de chamadas de cors
};

cors.$inject = ['$httpProvider'];
