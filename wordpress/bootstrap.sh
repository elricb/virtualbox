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
    sed -i '/AllowOverride None/c AllowOverride All' /etc/apache2/sites-available/000-default.conf
    a2enmod rewrite && a2enmod vhost_alias
    mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.old
    cp /home/app/000-default.conf /etc/apache2/sites-available/000-default.conf
#    cp /home/app/wordpress.conf /etc/apache2/sites-available/wordpress.conf
#    sudo a2ensite wordpress
#    systemctl restart apache2.service

#php
    chown -R www-data:www-data /var/www

#wordpress
    chown -R www-data:www-data /usr/share/wordpress
    gzip -d /usr/share/doc/wordpress/examples/setup-mysql.gz
    bash /usr/share/doc/wordpress/examples/setup-mysql -n wordpress localhost
    ln -s /etc/wordpress/config-localhost.php /etc/wordpress/config-127.0.0.1.php
    sed -i '/define("WP_CONTENT_DIR", "/srv/www/wp-content/localhost");/c //' /etc/wordpress/config-localhost.php
    sed -i '/?>/c define("FS_METHOD", "direct");\ndefine("WP_CONTENT_DIR", "/usr/share/wordpress/wp-content");\ndefine("WP_PLUGIN_DIR", "/usr/share/wordpress/wp-content/plugins");\n?>' /etc/wordpress/config-localhost.php
    chown -h www-data:www-data /etc/wordpress/config-127.0.0.1.php
    chown www-data:www-data /etc/wordpress/config-localhost.php
    find /usr/share/wordpress/wp-content -type d -exec chmod -R 775 {} \;
    find /usr/share/wordpress/wp-content -type f -exec chmod -R 664 {} \;
    #/var/log/apache2/error.log - check for errors

    sudo /etc/init.d/apache2 restart
fi

echo "Setting up node"
cd /home/app/src
rm -rf node_modules
# sudo npm install
