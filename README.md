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
- For logs, click on Docker Desktop > docker > docker_graph_node_1
