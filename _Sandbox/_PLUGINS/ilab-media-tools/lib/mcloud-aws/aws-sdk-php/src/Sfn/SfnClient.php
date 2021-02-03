<?php

namespace MediaCloud\Vendor\Aws\Sfn;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **AWS Step Functions** service.
 * @method \MediaCloud\Vendor\Aws\Result createActivity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createActivityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createStateMachine(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createStateMachineAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteActivity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteActivityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteStateMachine(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteStateMachineAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeActivity(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeActivityAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeExecution(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeExecutionAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeStateMachine(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeStateMachineAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeStateMachineForExecution(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeStateMachineForExecutionAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getActivityTask(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getActivityTaskAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getExecutionHistory(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getExecutionHistoryAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listActivities(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listActivitiesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listExecutions(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listExecutionsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listStateMachines(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listStateMachinesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listTagsForResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listTagsForResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result sendTaskFailure(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise sendTaskFailureAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result sendTaskHeartbeat(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise sendTaskHeartbeatAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result sendTaskSuccess(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise sendTaskSuccessAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result startExecution(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise startExecutionAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result stopExecution(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise stopExecutionAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result tagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise tagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result untagResource(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise untagResourceAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateStateMachine(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateStateMachineAsync(array $args = [])
 */
class SfnClient extends AwsClient {}
