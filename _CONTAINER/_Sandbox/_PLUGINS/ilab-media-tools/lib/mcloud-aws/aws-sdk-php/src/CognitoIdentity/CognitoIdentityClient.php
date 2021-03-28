<?php

namespace MediaCloud\Vendor\Aws\CognitoIdentity;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **Amazon Cognito Identity** service.
 *
 * @method \MediaCloud\Vendor\Aws\Result createIdentityPool(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createIdentityPoolAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteIdentities(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteIdentitiesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteIdentityPool(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteIdentityPoolAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeIdentity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeIdentityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeIdentityPool(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeIdentityPoolAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getCredentialsForIdentity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getCredentialsForIdentityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getId(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getIdAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getIdentityPoolRoles(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getIdentityPoolRolesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getOpenIdToken(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getOpenIdTokenAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getOpenIdTokenForDeveloperIdentity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getOpenIdTokenForDeveloperIdentityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listIdentities(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listIdentitiesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listIdentityPools(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listIdentityPoolsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listTagsForResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listTagsForResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result lookupDeveloperIdentity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise lookupDeveloperIdentityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result mergeDeveloperIdentities(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise mergeDeveloperIdentitiesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result setIdentityPoolRoles(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise setIdentityPoolRolesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result tagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise tagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result unlinkDeveloperIdentity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise unlinkDeveloperIdentityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result unlinkIdentity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise unlinkIdentityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result untagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise untagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateIdentityPool(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateIdentityPoolAsync(array $args = [])
 */
class CognitoIdentityClient extends AwsClient {}
