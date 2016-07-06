#!/bin/bash
debconf-set-selections <<< 'mysql-server mysql-server/root_password password qwe123'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password qwe123'

echo "Installing apache2 and wordpress prerequisites"
apt-get update
apt-get install -y apache2 curl mysql-server php5 libapache2-mod-php5 php5-gd php5-curl libssh2-php php5-mysql wordpress

#latest node
#Ignore the fsevents warning known npm issue (node6.2.1, npm3.9.3)
#- https://github.com/npm/npm/issues/11632
echo "## Installing node"
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs


#setup apache
if [ ! -h /var/www ];
then
#apache
echo "## Apache Setup"
    a2enmod rewrite && a2enmod vhost_alias
    mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.old
    cp /home/app/setup/000-default.conf /etc/apache2/sites-available/000-default.conf

#php
echo "## Php Setup"
    chown -R www-data:www-data /var/www

#wordpress 4.5
echo "## Download Wordpress Latest"
    rm -rf /usr/share/wordpress
    wget http://wordpress.org/latest.tar.gz -P ~/
    tar xzvf ~/latest.tar.gz  -C /usr/share
    rm ~/latest.tar.gz

#wordpress
echo "## Wordpress Setup"
    #mkdir /etc/wordpress - made by apt-get wordpress
    bash /home/app/setup/setup-mysql -n wordpress localhost
    cp /etc/wordpress/config-localhost.php /usr/share/wordpress/wp-config.php
    sed -i '/\/srv\/www\/wp-content\/localhost/c //' /usr/share/wordpress/wp-config.php
    sed -i '/?>/c define("FS_METHOD", "direct");\ndefine("WP_CONTENT_DIR", "/usr/share/wordpress/wp-content");\ndefine("WP_PLUGIN_DIR", "/usr/share/wordpress/wp-content/plugins");\n$table_prefix  = "wp_";\nif ( !defined("ABSPATH") )\n  define("ABSPATH", dirname(__FILE__) . "/");\nrequire_once(ABSPATH . "wp-settings.php");\n?>' /usr/share/wordpress/wp-config.php
    chown -R www-data:www-data /usr/share/wordpress
    find /usr/share/wordpress/wp-content -type d -exec chmod -R 775 {} \;
    find /usr/share/wordpress/wp-content -type f -exec chmod -R 664 {} \;
    #/var/log/apache2/error.log - check for errors


    sudo /etc/init.d/apache2 restart
fi

echo "## Node Setup"
cd /home/app/src
rm -rf node_modules
# sudo npm install
