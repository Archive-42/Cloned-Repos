<?php

namespace MediaCloud\Vendor\Aws\ManagedBlockchain;
use MediaCloud\Vendor\Aws\AwsClient;

/**
 * This client is used to interact with the **Amazon Managed Blockchain** service.
 * @method \MediaCloud\Vendor\Aws\Result createMember(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createMemberAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createNetwork(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createNetworkAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createNode(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createNodeAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result createProposal(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise createProposalAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteMember(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteMemberAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result deleteNode(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise deleteNodeAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getMember(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getMemberAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getNetwork(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getNetworkAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getNode(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getNodeAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result getProposal(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise getProposalAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listInvitations(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listInvitationsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listMembers(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listMembersAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listNetworks(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listNetworksAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listNodes(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listNodesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listProposalVotes(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listProposalVotesAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result listProposals(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise listProposalsAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result rejectInvitation(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise rejectInvitationAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateMember(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateMemberAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result updateNode(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise updateNodeAsync(array $args = [])
 * @method \MediaCloud\Vendor\Aws\Result voteOnProposal(array $args = [])
 * @method \MediaCloud\Vendor\GuzzleHttp\Promise\Promise voteOnProposalAsync(array $args = [])
 */
class ManagedBlockchainClient extends AwsClient {}
