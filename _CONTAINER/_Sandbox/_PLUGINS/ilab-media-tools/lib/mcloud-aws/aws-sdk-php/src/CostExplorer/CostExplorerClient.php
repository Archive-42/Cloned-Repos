<?php

namespace MediaCloud\Vendor\Aws\CostExplorer;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **AWS Cost Explorer Service** service.
 * @method \MediaCloud\Vendor\Aws\Result createCostCategoryDefinition(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createCostCategoryDefinitionAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteCostCategoryDefinition(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteCostCategoryDefinitionAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result describeCostCategoryDefinition(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise describeCostCategoryDefinitionAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getCostAndUsage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getCostAndUsageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getCostAndUsageWithResources(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getCostAndUsageWithResourcesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getCostForecast(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getCostForecastAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getDimensionValues(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getDimensionValuesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getReservationCoverage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getReservationCoverageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getReservationPurchaseRecommendation(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getReservationPurchaseRecommendationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getReservationUtilization(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getReservationUtilizationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getRightsizingRecommendation(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getRightsizingRecommendationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getSavingsPlansCoverage(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getSavingsPlansCoverageAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getSavingsPlansPurchaseRecommendation(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getSavingsPlansPurchaseRecommendationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getSavingsPlansUtilization(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getSavingsPlansUtilizationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getSavingsPlansUtilizationDetails(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getSavingsPlansUtilizationDetailsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getTags(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getTagsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getUsageForecast(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getUsageForecastAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listCostCategoryDefinitions(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listCostCategoryDefinitionsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateCostCategoryDefinition(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateCostCategoryDefinitionAsync(array $args = [])
 */
class CostExplorerClient extends AwsClient {}
