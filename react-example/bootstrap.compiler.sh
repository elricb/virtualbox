#!/bin/bash

echo "Installing apache2 and curl"
apt-get update
apt-get install -y apache2 curl

#latest node
#Ignore the fsevents warning known npm issue (node6.2.1, npm3.9.3)
#- https://github.com/npm/npm/issues/11632
echo "Installing node"
#curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
#sudo ln -s /usr/bin/nodejs /usr/bin/node

#setup apache
if [ ! -h /var/www ];
then
    rm -rf /var/www
    sudo ln -s /home/app/public /var/www
    a2enmod rewrite
    sed -i '/AllowOverride None/c AllowOverride All' /etc/apache2/sites-available/default
    service apache2 restart
fi


echo "Setting up node"
cd /home/app/src
rm -rf node_modules
sudo npm install
