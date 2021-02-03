<?php

namespace MediaCloud\Vendor\Aws\SecretsManager;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **AWS Secrets Manager** service.
 * @method \MediaCloud\Vendor\Aws\Result cancelRotateSecret(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise cancelRotateSecretAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createSecret(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createSecretAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteResourcePolicy(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteResourcePolicyAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteSecret(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteSecretAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeSecret(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeSecretAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getRandomPassword(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getRandomPasswordAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getResourcePolicy(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getResourcePolicyAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getSecretValue(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getSecretValueAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listSecretVersionIds(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listSecretVersionIdsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listSecrets(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listSecretsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result putResourcePolicy(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise putResourcePolicyAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result putSecretValue(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise putSecretValueAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result restoreSecret(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise restoreSecretAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result rotateSecret(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise rotateSecretAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result tagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise tagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result untagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise untagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateSecret(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateSecretAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateSecretVersionStage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateSecretVersionStageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result validateResourcePolicy(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise validateResourcePolicyAsync(array $args = [])
 */
class SecretsManagerClient extends AwsClient {}
