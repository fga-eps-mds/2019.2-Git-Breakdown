# SSH connection
set -e

eval $(ssh-agent -s)
echo "$PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

# disable the host key checking.
./deploy/disableHostKeyChecking.sh

echo "deploying to $DEPLOY_SERVERS"
ssh ubuntu@$DEPLOY_SERVERS 'bash' < ./deploy/updateAndRestart.sh
