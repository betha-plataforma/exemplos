export default function app($compileProvider, $logProvider, IS_DEV) {
  $compileProvider.debugInfoEnabled(IS_DEV);
  $logProvider.debugEnabled(IS_DEV);
};

app.$inject = ['$compileProvider', '$logProvider'];
