<?php
declare(strict_types=1);

// ProxyChecker SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ProxyCheckerUtility::setRegistrar(function (ProxyCheckerUtility $u): void {
    $u->clean = [ProxyCheckerClean::class, 'call'];
    $u->done = [ProxyCheckerDone::class, 'call'];
    $u->make_error = [ProxyCheckerMakeError::class, 'call'];
    $u->feature_add = [ProxyCheckerFeatureAdd::class, 'call'];
    $u->feature_hook = [ProxyCheckerFeatureHook::class, 'call'];
    $u->feature_init = [ProxyCheckerFeatureInit::class, 'call'];
    $u->fetcher = [ProxyCheckerFetcher::class, 'call'];
    $u->make_fetch_def = [ProxyCheckerMakeFetchDef::class, 'call'];
    $u->make_context = [ProxyCheckerMakeContext::class, 'call'];
    $u->make_options = [ProxyCheckerMakeOptions::class, 'call'];
    $u->make_request = [ProxyCheckerMakeRequest::class, 'call'];
    $u->make_response = [ProxyCheckerMakeResponse::class, 'call'];
    $u->make_result = [ProxyCheckerMakeResult::class, 'call'];
    $u->make_point = [ProxyCheckerMakePoint::class, 'call'];
    $u->make_spec = [ProxyCheckerMakeSpec::class, 'call'];
    $u->make_url = [ProxyCheckerMakeUrl::class, 'call'];
    $u->param = [ProxyCheckerParam::class, 'call'];
    $u->prepare_auth = [ProxyCheckerPrepareAuth::class, 'call'];
    $u->prepare_body = [ProxyCheckerPrepareBody::class, 'call'];
    $u->prepare_headers = [ProxyCheckerPrepareHeaders::class, 'call'];
    $u->prepare_method = [ProxyCheckerPrepareMethod::class, 'call'];
    $u->prepare_params = [ProxyCheckerPrepareParams::class, 'call'];
    $u->prepare_path = [ProxyCheckerPreparePath::class, 'call'];
    $u->prepare_query = [ProxyCheckerPrepareQuery::class, 'call'];
    $u->result_basic = [ProxyCheckerResultBasic::class, 'call'];
    $u->result_body = [ProxyCheckerResultBody::class, 'call'];
    $u->result_headers = [ProxyCheckerResultHeaders::class, 'call'];
    $u->transform_request = [ProxyCheckerTransformRequest::class, 'call'];
    $u->transform_response = [ProxyCheckerTransformResponse::class, 'call'];
});
