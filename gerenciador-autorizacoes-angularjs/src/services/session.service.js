export default function SessionService($http, $q, $rootScope, $window, $log) {
  let session;

  function publish(nextSession) {
    session = nextSession;
    $rootScope.$broadcast('betha:session-changed', session);
    return session;
  }

  function redirectToLogin() {
    $window.location.assign('/login');
  }

  function notifyError(error) {
    $log.error('[Integração Betha] Falha na requisição ao backend', {
      method: error && error.config && error.config.method,
      url: error && error.config && error.config.url,
      status: error && error.status,
      response: error && error.data
    });
    const errorCode = error && error.data && error.data.code;
    const upstreamUnauthorized = errorCode === 'BETHA_UPSTREAM_UNAUTHORIZED'
      || errorCode === 'BETHA_REQUEST_DENIED';
    if (error && error.status === 401 && !upstreamUnauthorized) {
      redirectToLogin();
    } else if (error && error.status === 403) {
      $rootScope.$broadcast('betha:access-restricted', Object.assign({}, error.data || {
        code: 'ACCESS_DENIED',
        message: 'A Plataforma Betha negou o acesso.'
      }, { httpStatus: error.status }));
    }
  }

  function handleError(error) {
    notifyError(error);
    return $q.reject(error);
  }

  function load() {
    return $http.get('/api/session')
      .then(response => publish(response.data))
      .catch(handleError);
  }

  function selectContext(accessId, exercise) {
    return $http.post('/api/session/context', { accessId, exercise })
      .then(response => publish(response.data))
      .catch(handleError);
  }

  function verify() {
    return $http.get('/api/session/verify')
      .then(() => true)
      .catch(handleError);
  }

  function activity() {
    return $http.post('/api/session/activity', {})
      .then(() => true)
      .catch(handleError);
  }

  function getTerm() {
    return $http.get('/api/session/term')
      .then(response => response.data)
      .catch(handleError);
  }

  function acceptTerm() {
    return $http.put('/api/session/term/accept', {})
      .then(() => load())
      .catch(handleError);
  }

  function logout() {
    return $http.post('/api/logout', {})
      .then(response => $window.location.assign(response.data.redirectUrl));
  }

  function can(menu, action) {
    const menuCapabilities = session && session.capabilities && session.capabilities[menu];
    return !!(menuCapabilities && menuCapabilities[action || 'read']);
  }

  return {
    load,
    selectContext,
    verify,
    activity,
    getTerm,
    acceptTerm,
    logout,
    handleError,
    notifyError,
    can,
    current: () => session,
  };
}

SessionService.$inject = ['$http', '$q', '$rootScope', '$window', '$log'];
