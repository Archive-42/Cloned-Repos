<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/cloud/vision/v1/image_annotator.proto

namespace MediaCloud\Vendor\Google\Cloud\Vision\V1;
use MediaCloud\Vendor\Google\Protobuf\Internal\GPBType;
use MediaCloud\Vendor\Google\Protobuf\Internal\RepeatedField;
use MediaCloud\Vendor\Google\Protobuf\Internal\GPBUtil;

/**
 * Single crop hint that is used to generate a new crop when serving an image.
 *
 * Generated from protobuf message <code>google.cloud.vision.v1.CropHint</code>
 */
class CropHint extends \MediaCloud\Vendor\Google\Protobuf\Internal\Message
{
    /**
     * The bounding polygon for the crop region. The coordinates of the bounding
     * box are in the original image's scale.
     *
     * Generated from protobuf field <code>.google.cloud.vision.v1.BoundingPoly bounding_poly = 1;</code>
     */
    private $bounding_poly = null;
    /**
     * Confidence of this being a salient region.  Range [0, 1].
     *
     * Generated from protobuf field <code>float confidence = 2;</code>
     */
    private $confidence = 0.0;
    /**
     * Fraction of importance of this salient region with respect to the original
     * image.
     *
     * Generated from protobuf field <code>float importance_fraction = 3;</code>
     */
    private $importance_fraction = 0.0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \MediaCloud\Vendor\Google\Cloud\Vision\V1\BoundingPoly $bounding_poly
     *           The bounding polygon for the crop region. The coordinates of the bounding
     *           box are in the original image's scale.
     *     @type float $confidence
     *           Confidence of this being a salient region.  Range [0, 1].
     *     @type float $importance_fraction
     *           Fraction of importance of this salient region with respect to the original
     *           image.
     * }
     */
    public function __construct($data = NULL) { \MediaCloud\Vendor\GPBMetadata\Google\Cloud\Vision\V1\ImageAnnotator::initOnce();
        parent::__construct($data);
    }

    /**
     * The bounding polygon for the crop region. The coordinates of the bounding
     * box are in the original image's scale.
     *
     * Generated from protobuf field <code>.google.cloud.vision.v1.BoundingPoly bounding_poly = 1;</code>
     * @return \MediaCloud\Vendor\Google\Cloud\Vision\V1\BoundingPoly
     */
    public function getBoundingPoly()
    {
        return $this->bounding_poly;
    }

    /**
     * The bounding polygon for the crop region. The coordinates of the bounding
     * box are in the original image's scale.
     *
     * Generated from protobuf field <code>.google.cloud.vision.v1.BoundingPoly bounding_poly = 1;</code>
     * @param \MediaCloud\Vendor\Google\Cloud\Vision\V1\BoundingPoly $var
     * @return $this
     */
    public function setBoundingPoly($var)
    {
        GPBUtil::checkMessage($var, \MediaCloud\Vendor\Google\Cloud\Vision\V1\BoundingPoly::class);
        $this->bounding_poly = $var;

        return $this;
    }

    /**
     * Confidence of this being a salient region.  Range [0, 1].
     *
     * Generated from protobuf field <code>float confidence = 2;</code>
     * @return float
     */
    public function getConfidence()
    {
        return $this->confidence;
    }

    /**
     * Confidence of this being a salient region.  Range [0, 1].
     *
     * Generated from protobuf field <code>float confidence = 2;</code>
     * @param float $var
     * @return $this
     */
    public function setConfidence($var)
    {
        GPBUtil::checkFloat($var);
        $this->confidence = $var;

        return $this;
    }

    /**
     * Fraction of importance of this salient region with respect to the original
     * image.
     *
     * Generated from protobuf field <code>float importance_fraction = 3;</code>
     * @return float
     */
    public function getImportanceFraction()
    {
        return $this->importance_fraction;
    }

    /**
     * Fraction of importance of this salient region with respect to the original
     * image.
     *
     * Generated from protobuf field <code>float importance_fraction = 3;</code>
     * @param float $var
     * @return $this
     */
    public function setImportanceFraction($var)
    {
        GPBUtil::checkFloat($var);
        $this->importance_fraction = $var;

        return $this;
    }

}

