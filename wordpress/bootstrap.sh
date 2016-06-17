#!/usr/bin/env bash


#install mysql

debconf-set-selections <<< 'mysql-server mysql-server/root_password password qwe123'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password qwe123'
apt-get update
apt-get install -y apache2 mysql-server php5 php5-mysql wordpress

#setup wordpress database

if [ ! -f /var/log/databasesetup ];
then
	echo "CREATE USER 'wordpressuser'@'localhost' IDENTIFIED BY 'wordpresspass'" | mysql -uroot -pqwe123
	echo "CREATE DATABASE wordpress" | mysql -uroot -pqwe123
	echo "GRANT ALL ON wordpress.* TO 'wordpressuser'@'localhost'" | mysql -uroot -pqwe123
	echo "flush privileges" | mysql -uroot -pqwe123

	touch /var/log/databasesetup

	if [ -f /vagrant/data/initial.sql ];
	then
		mysql -uroot -pqwe123 wordpress < /vagrant/data/initial.sql
	fi
fi


#setup apache

if [ ! -h /var/www ];
then 
	rm -rf /var/www
	sudo ln -s /vagrant/public /var/www

	a2enmod rewrite

	sed -i '/AllowOverride None/c AllowOverride All' /etc/apache2/sites-available/default

	service apache2 restart
fi
