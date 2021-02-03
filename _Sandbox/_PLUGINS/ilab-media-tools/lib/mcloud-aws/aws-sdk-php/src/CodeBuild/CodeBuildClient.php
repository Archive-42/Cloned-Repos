<?php

namespace MediaCloud\Vendor\Aws\CodeBuild;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **AWS CodeBuild** service.
 * @method \MediaCloud\Vendor\Aws\Result batchDeleteBuilds(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise batchDeleteBuildsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result batchGetBuildBatches(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise batchGetBuildBatchesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result batchGetBuilds(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise batchGetBuildsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result batchGetProjects(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise batchGetProjectsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result batchGetReportGroups(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise batchGetReportGroupsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result batchGetReports(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise batchGetReportsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createProject(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createProjectAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createReportGroup(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createReportGroupAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createWebhook(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createWebhookAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteBuildBatch(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteBuildBatchAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteProject(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteProjectAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteReport(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteReportAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteReportGroup(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteReportGroupAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteResourcePolicy(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteResourcePolicyAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteSourceCredentials(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteSourceCredentialsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteWebhook(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteWebhookAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeCodeCoverages(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeCodeCoveragesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeTestCases(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeTestCasesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getResourcePolicy(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getResourcePolicyAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result importSourceCredentials(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise importSourceCredentialsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result invalidateProjectCache(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise invalidateProjectCacheAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listBuildBatches(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listBuildBatchesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listBuildBatchesForProject(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listBuildBatchesForProjectAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listBuilds(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listBuildsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listBuildsForProject(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listBuildsForProjectAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listCuratedEnvironmentImages(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listCuratedEnvironmentImagesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listProjects(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listProjectsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listReportGroups(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listReportGroupsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listReports(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listReportsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listReportsForReportGroup(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listReportsForReportGroupAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listSharedProjects(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listSharedProjectsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listSharedReportGroups(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listSharedReportGroupsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listSourceCredentials(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listSourceCredentialsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result putResourcePolicy(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise putResourcePolicyAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result retryBuild(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise retryBuildAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result retryBuildBatch(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise retryBuildBatchAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result startBuild(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise startBuildAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result startBuildBatch(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise startBuildBatchAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result stopBuild(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise stopBuildAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result stopBuildBatch(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise stopBuildBatchAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateProject(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateProjectAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateReportGroup(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateReportGroupAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateWebhook(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateWebhookAsync(array $args = [])
 */
class CodeBuildClient extends AwsClient {}
