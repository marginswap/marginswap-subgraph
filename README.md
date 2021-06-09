## Running Locally
- Clone Graph Node `git clone https://github.com/graphprotocol/graph-node/`
- Enter the Graph Node's Docker directory: `cd graph-node/docker`
- Linux users need to run: `./setup.sh`
- `docker-compose up -d`
  - If this fails with a Mounts Denied error on mac, in docker desktop, go to Preferences > Resources > File Sharing and add the graph's docker directory as an allowed directory
- Make your edits to the subgraph code
- Create the subgraph locally: `yarn create-local`
- Run codegen `yarn codegen`
- Build the code `yarn build`
- Deploy the subgraph locally: `yarn deploy-local`
- Visit `http://localhost:8000/subgraphs/name/marginswap/marginswap-subgraph/graphql`

### Logs
There are two options for getting logs:
1. For basic logs, click on Docker Desktop > docker > docker_graph_node_1
2. For more detailed, debug logs, run `sudo docker ps -a` then get the ID for the graph-node container, and then run `sudo docker logs -f <project-id>`

## Local Chain
- For local dev, this will talk to the local chain from the marginswap-core hardhat script. However, you'll need to swap out the infura URL in the hardhat config for an Alchemy one so you get the full archive node. Archive nodes are required for making contract method calls like we do in the margin-router event event handler.
