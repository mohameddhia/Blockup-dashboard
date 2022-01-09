## About
1. This project has been build as Proof of concept to test the faisability of the Decentralized backup storage for cloud providers .
2. this concept has been made by Block++ team in order to achieve some realistic results .

## How to run it . 

# prepare for the celo blockchain alfajores network 
export CELO_IMAGE=us.gcr.io/celo-org/geth:alfajores
docker pull $CELO_IMAGE

mkdir celo-data-dir
cd celo-data-dir

docker run -v $PWD:/root/.celo --rm -it $CELO_IMAGE account new

export CELO_ACCOUNT_ADDRESS=<YOUR-ACCOUNT-ADDRESS>

docker run --name celo-ultralight-node -d --restart unless-stopped -p 127.0.0.1:8545:8545 -v $PWD:/root/.celo $CELO_IMAGE --verbosity 3  --syncmode lightest --rpc --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,debug,admin,personal --etherbase $CELO_ACCOUNT_ADDRESS --alfajores --datadir=/root/.celo --allow-insecure-unlock

docker logs -f celo-ultralight-node

docker exec celo-ultralight-node geth attach --exec 'eth.getBalance("<YOUR-ACCOUNT-ADDRESS>")'

docker exec celo-ultralight-node geth attach --exec 'personal.unlockAccount("<YOUR-ACCOUNT-ADDRESS>", "<YOUR-ACCOUNT-PASSWORD>")'

truffle migrate --network alfajores

## Run the frontend :

npm install 
npm run start