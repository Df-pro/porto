// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PortfolioVerifier
 * @notice Smart contract for on-chain verification of portfolio projects
 * @dev Deploy to Polygon Mumbai Testnet (chainId: 80001)
 */
contract PortfolioVerifier {
    address public owner;

    struct Project {
        bytes32 contentHash;
        string name;
        uint256 timestamp;
        bool verified;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    event ProjectVerified(
        uint256 indexed id,
        bytes32 contentHash,
        string name,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    /**
     * @notice Verify a project on-chain
     * @param name Project name
     * @param description Project description (used for hash generation)
     * @return id The project ID
     */
    function verifyProject(
        string memory name,
        string memory description
    ) external onlyOwner returns (uint256) {
        bytes32 hash = keccak256(
            abi.encodePacked(name, description, block.timestamp)
        );
        uint256 id = projectCount++;
        projects[id] = Project(hash, name, block.timestamp, true);
        emit ProjectVerified(id, hash, name, block.timestamp);
        return id;
    }

    /**
     * @notice Get project details
     * @param id Project ID
     * @return contentHash, name, timestamp, verified status
     */
    function getProject(uint256 id) external view returns (
        bytes32, string memory, uint256, bool
    ) {
        require(projects[id].verified, "Project not found");
        Project memory p = projects[id];
        return (p.contentHash, p.name, p.timestamp, p.verified);
    }

    /**
     * @notice Check if a project is verified
     * @param id Project ID
     * @return bool Whether the project is verified
     */
    function isVerified(uint256 id) external view returns (bool) {
        return projects[id].verified;
    }
}
