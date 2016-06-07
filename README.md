# virtualbox
virtual environment config
*need to have vagrant and virtualbox installed*


## vagrant build includes:

ubuntu14.04
mysql
php5.5
wordpress


## In short:

* ./public/html - is the webroot
* http://127.0.0.1:8080



## Vagrant 101


<pre><code>
vagrant global-status

vagrant init
vagrant box add ubuntu/trusty64 (Ubuntu 14.04)
vim VagrantFile (reserved filename)
    config.vm.box = "ubuntu/trusty64"
vagrant up
vagrant ssh
vagrant halt
vagrant destroy
vagrant box remove

vagrant up
vim bootstrap.sh
    #!/usr/bin/env bash
    apt-get update
    apt-get install -y apache2
    if ! [ -L /var/www ]; then
      rm -rf /var/www
      ln -fs /vagrant /var/www
    fi
vim Vagrantfile
    Vagrant.configure("2") do |config|
      config.vm.box = "hashicorp/precise64"
      config.vm.provision :shell, path: "bootstrap.sh"
      config.vm.network :forwarded_port, guest: 80, host: 4567
      config.vm.synced_folder "src/", "/srv/website"
    end
vagrant reload --provision
</code></pre>


## Multiple Machines
https://www.vagrantup.com/docs/multi-machine/

<pre><code>
cd multiple-machines
vagrant up
vagrant ssh webserver (exit)
vagrant global-status
</code></pre>

## Node Example

Note:  At time of creation, "nodejs-legacy" was require for "npm run start" command.

<pre><code>
cd node-example
vagrant up
curl -i http://127.0.0.1:8080
vagrant global-status
</code></pre>


## Kill a Rouge Process
ps aux (or top -o command)
kill [pid]
