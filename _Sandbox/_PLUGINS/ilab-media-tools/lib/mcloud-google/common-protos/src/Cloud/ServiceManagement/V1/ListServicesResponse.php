<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/api/servicemanagement/v1/servicemanager.proto

namespace MediaCloud\Vendor\Google\Cloud\ServiceManagement\V1;
use MediaCloud\Vendor\Google\Protobuf\Internal\GPBType;
use MediaCloud\Vendor\Google\Protobuf\Internal\RepeatedField;
use MediaCloud\Vendor\Google\Protobuf\Internal\GPBUtil;

/**
 * Response message for `ListServices` method.
 *
 * Generated from protobuf message <code>google.api.servicemanagement.v1.ListServicesResponse</code>
 */
class ListServicesResponse extends \MediaCloud\Vendor\Google\Protobuf\Internal\Message
{
    /**
     * The returned services will only have the name field set.
     *
     * Generated from protobuf field <code>repeated .google.api.servicemanagement.v1.ManagedService services = 1;</code>
     */
    private $services;
    /**
     * Token that can be passed to `ListServices` to resume a paginated query.
     *
     * Generated from protobuf field <code>string next_page_token = 2;</code>
     */
    private $next_page_token = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \MediaCloud\Vendor\Google\Cloud\ServiceManagement\V1\ManagedService[]|\Google\Protobuf\Internal\RepeatedField $services
     *           The returned services will only have the name field set.
     *     @type string $next_page_token
     *           Token that can be passed to `ListServices` to resume a paginated query.
     * }
     */
    public function __construct($data = NULL) { \MediaCloud\Vendor\GPBMetadata\Google\Api\Servicemanagement\V1\Servicemanager::initOnce();
        parent::__construct($data);
    }

    /**
     * The returned services will only have the name field set.
     *
     * Generated from protobuf field <code>repeated .google.api.servicemanagement.v1.ManagedService services = 1;</code>
     * @return \MediaCloud\Vendor\Google\Protobuf\Internal\RepeatedField
     */
    public function getServices()
    {
        return $this->services;
    }

    /**
     * The returned services will only have the name field set.
     *
     * Generated from protobuf field <code>repeated .google.api.servicemanagement.v1.ManagedService services = 1;</code>
     * @param \MediaCloud\Vendor\Google\Cloud\ServiceManagement\V1\ManagedService[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setServices($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \MediaCloud\Vendor\Google\Protobuf\Internal\GPBType::MESSAGE, \MediaCloud\Vendor\Google\Cloud\ServiceManagement\V1\ManagedService::class);
        $this->services = $arr;

        return $this;
    }

    /**
     * Token that can be passed to `ListServices` to resume a paginated query.
     *
     * Generated from protobuf field <code>string next_page_token = 2;</code>
     * @return string
     */
    public function getNextPageToken()
    {
        return $this->next_page_token;
    }

    /**
     * Token that can be passed to `ListServices` to resume a paginated query.
     *
     * Generated from protobuf field <code>string next_page_token = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setNextPageToken($var)
    {
        GPBUtil::checkString($var, True);
        $this->next_page_token = $var;

        return $this;
    }

}

