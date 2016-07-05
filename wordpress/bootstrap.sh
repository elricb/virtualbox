#!/bin/bash
debconf-set-selections <<< 'mysql-server mysql-server/root_password password qwe123'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password qwe123'

echo "Installing apache2 and wordpress prerequisites"
apt-get update
apt-get install -y apache2 curl mysql-server php5 libapache2-mod-php5 php5-gd php5-curl libssh2-php wordpress

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
#apache
    #rm -rf /var/www
    #sudo ln -s /home/app/public /var/www
    sed -i '/AllowOverride None/c AllowOverride All' /etc/apache2/sites-available/000-default.conf
    a2enmod rewrite && a2enmod vhost_alias
    mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.old
    cp /home/app/000-default.conf /etc/apache2/sites-available/000-default.conf

#php
    #sed -i '/expose_php = On/c expose_php = Off' /etc/php5/apache2/php.ini
    #sed -i '/allow_url_fopen = On/c allow_url_fopen = Off' /etc/php5/apache2/php.ini
    chown -R www-data:www-data /var/www/html/

#wordpress
    chown -R www-data:www-data /usr/share/wordpress
    ln -s /usr/share/wordpress /var/www/html/wordpress
    sudo chown -h www-data:www-data /var/www/html/wordpress
    gzip -d /usr/share/doc/wordpress/examples/setup-mysql.gz
    bash /usr/share/doc/wordpress/examples/setup-mysql -n wordpress localhost
    cp /etc/wordpress/config-localhost.php /etc/wordpress/config-127.0.0.1.php
    chown www-data:www-data /etc/wordpress/config-127.0.0.1.php
    find /usr/share/wordpress/wp-content -type d -exec chmod -R 775 {} \;
    find /usr/share/wordpress/wp-content -type f -exec chmod -R 664 {} \;
    #/var/log/apache2/error.log - check for errors

    sed -i '/?>/c define("FS_METHOD", "direct");\n?>' /etc/wordpress/config-127.0.0.1.php
    #cat "define('FS_METHOD', 'direct');define('FTP_BASE', '/usr/share/wordpress/');define('FTP_CONTENT_DIR', '/usr/share/wordpress/wp-content/');define('FTP_PLUGIN_DIR','/usr/share/wordpress/wp-content/plugins/');" >> /etc/wordpress/config-127.0.0.1.php

    sudo /etc/init.d/apache2 restart
fi

echo "Setting up node"
cd /home/app/src
rm -rf node_modules
# sudo npm install
