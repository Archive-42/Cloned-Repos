<?php

namespace MediaCloud\Vendor\Aws\ApiGatewayV2;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **AmazonApiGatewayV2** service.
 * @method \MediaCloud\Vendor\Aws\Result createApi(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createApiAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createApiMapping(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createApiMappingAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createAuthorizer(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createAuthorizerAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createDeployment(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createDeploymentAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createDomainName(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createDomainNameAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createIntegration(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createIntegrationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createIntegrationResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createIntegrationResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createModel(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createModelAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createRoute(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createRouteAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createRouteResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createRouteResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createStage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createStageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createVpcLink(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createVpcLinkAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteAccessLogSettings(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteAccessLogSettingsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteApi(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteApiAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteApiMapping(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteApiMappingAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteAuthorizer(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteAuthorizerAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteCorsConfiguration(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteCorsConfigurationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteDeployment(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteDeploymentAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteDomainName(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteDomainNameAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteIntegration(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteIntegrationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteIntegrationResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteIntegrationResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteModel(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteModelAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteRoute(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteRouteAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteRouteRequestParameter(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteRouteRequestParameterAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteRouteResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteRouteResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteRouteSettings(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteRouteSettingsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteStage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteStageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteVpcLink(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteVpcLinkAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result exportApi(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise exportApiAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getApiResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getApiResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getApiMapping(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getApiMappingAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getApiMappings(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getApiMappingsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getApis(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getApisAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getAuthorizer(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getAuthorizerAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getAuthorizers(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getAuthorizersAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getDeployment(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getDeploymentAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getDeployments(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getDeploymentsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getDomainName(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getDomainNameAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getDomainNames(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getDomainNamesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getIntegration(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getIntegrationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getIntegrationResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getIntegrationResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getIntegrationResponses(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getIntegrationResponsesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getIntegrations(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getIntegrationsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getModel(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getModelAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getModelTemplate(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getModelTemplateAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getModels(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getModelsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getRoute(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getRouteAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getRouteResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getRouteResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getRouteResponses(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getRouteResponsesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getRoutes(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getRoutesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getStage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getStageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getStages(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getStagesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getTags(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getTagsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getVpcLink(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getVpcLinkAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getVpcLinks(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getVpcLinksAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result importApi(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise importApiAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result reimportApi(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise reimportApiAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result tagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise tagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result untagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise untagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateApi(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateApiAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateApiMapping(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateApiMappingAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateAuthorizer(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateAuthorizerAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateDeployment(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateDeploymentAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateDomainName(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateDomainNameAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateIntegration(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateIntegrationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateIntegrationResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateIntegrationResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateModel(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateModelAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateRoute(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateRouteAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateRouteResponse(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateRouteResponseAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateStage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateStageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateVpcLink(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateVpcLinkAsync(array $args = [])
 */
class ApiGatewayV2Client extends AwsClient {}
