<?php

namespace MediaCloud\Vendor\Aws\SnowBall;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **Amazon Import/Export Snowball** service.
 * @method \MediaCloud\Vendor\Aws\Result cancelCluster(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise cancelClusterAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result cancelJob(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise cancelJobAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createAddress(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createAddressAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createCluster(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createClusterAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createJob(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createJobAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeAddress(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeAddressAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeAddresses(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeAddressesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeCluster(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeClusterAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeJob(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeJobAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getJobManifest(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getJobManifestAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getJobUnlockCode(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getJobUnlockCodeAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getSnowballUsage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getSnowballUsageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getSoftwareUpdates(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getSoftwareUpdatesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listClusterJobs(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listClusterJobsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listClusters(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listClustersAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listCompatibleImages(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listCompatibleImagesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listJobs(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listJobsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateCluster(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateClusterAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateJob(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateJobAsync(array $args = [])
 */
class SnowBallClient extends AwsClient {}
