# Updating and restarting APIs
set -e

cd /home/ubuntu/2019.2-Git-Breakdown
sudo docker-compose down
cd ..


# Delete the old repo
rm -rf /home/ubuntu/2019.2-Git-Breakdown/

# clone the repo again
git clone https://github.com/fga-eps-mds/2019.2-Git-Breakdown.git

cd /home/ubuntu/2019.2-Git-Breakdown

sudo docker-compose build --no-cache
sudo docker-compose up -d
exit