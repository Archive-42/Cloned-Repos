<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/cloud/vision/v1/product_search_service.proto

namespace MediaCloud\Vendor\Google\Cloud\Vision\V1;
use MediaCloud\Vendor\Google\Protobuf\Internal\GPBType;
use MediaCloud\Vendor\Google\Protobuf\Internal\RepeatedField;
use MediaCloud\Vendor\Google\Protobuf\Internal\GPBUtil;

/**
 * Metadata for the batch operations such as the current state.
 * This is included in the `metadata` field of the `Operation` returned by the
 * `GetOperation` call of the `google::longrunning::Operations` service.
 *
 * Generated from protobuf message <code>google.cloud.vision.v1.BatchOperationMetadata</code>
 */
class BatchOperationMetadata extends \MediaCloud\Vendor\Google\Protobuf\Internal\Message
{
    /**
     * The current state of the batch operation.
     *
     * Generated from protobuf field <code>.google.cloud.vision.v1.BatchOperationMetadata.State state = 1;</code>
     */
    private $state = 0;
    /**
     * The time when the batch request was submitted to the server.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp submit_time = 2;</code>
     */
    private $submit_time = null;
    /**
     * The time when the batch request is finished and
     * [google.longrunning.Operation.done][google.longrunning.Operation.done] is set to true.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp end_time = 3;</code>
     */
    private $end_time = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type int $state
     *           The current state of the batch operation.
     *     @type \MediaCloud\Vendor\Google\Protobuf\Timestamp $submit_time
     *           The time when the batch request was submitted to the server.
     *     @type \MediaCloud\Vendor\Google\Protobuf\Timestamp $end_time
     *           The time when the batch request is finished and
     *           [google.longrunning.Operation.done][google.longrunning.Operation.done] is set to true.
     * }
     */
    public function __construct($data = NULL) { \MediaCloud\Vendor\GPBMetadata\Google\Cloud\Vision\V1\ProductSearchService::initOnce();
        parent::__construct($data);
    }

    /**
     * The current state of the batch operation.
     *
     * Generated from protobuf field <code>.google.cloud.vision.v1.BatchOperationMetadata.State state = 1;</code>
     * @return int
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * The current state of the batch operation.
     *
     * Generated from protobuf field <code>.google.cloud.vision.v1.BatchOperationMetadata.State state = 1;</code>
     * @param int $var
     * @return $this
     */
    public function setState($var)
    {
        GPBUtil::checkEnum($var, \MediaCloud\Vendor\Google\Cloud\Vision\V1\BatchOperationMetadata_State::class);
        $this->state = $var;

        return $this;
    }

    /**
     * The time when the batch request was submitted to the server.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp submit_time = 2;</code>
     * @return \MediaCloud\Vendor\Google\Protobuf\Timestamp
     */
    public function getSubmitTime()
    {
        return $this->submit_time;
    }

    /**
     * The time when the batch request was submitted to the server.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp submit_time = 2;</code>
     * @param \MediaCloud\Vendor\Google\Protobuf\Timestamp $var
     * @return $this
     */
    public function setSubmitTime($var)
    {
        GPBUtil::checkMessage($var, \MediaCloud\Vendor\Google\Protobuf\Timestamp::class);
        $this->submit_time = $var;

        return $this;
    }

    /**
     * The time when the batch request is finished and
     * [google.longrunning.Operation.done][google.longrunning.Operation.done] is set to true.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp end_time = 3;</code>
     * @return \MediaCloud\Vendor\Google\Protobuf\Timestamp
     */
    public function getEndTime()
    {
        return $this->end_time;
    }

    /**
     * The time when the batch request is finished and
     * [google.longrunning.Operation.done][google.longrunning.Operation.done] is set to true.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp end_time = 3;</code>
     * @param \MediaCloud\Vendor\Google\Protobuf\Timestamp $var
     * @return $this
     */
    public function setEndTime($var)
    {
        GPBUtil::checkMessage($var, \MediaCloud\Vendor\Google\Protobuf\Timestamp::class);
        $this->end_time = $var;

        return $this;
    }

}

