install-service:
	cp ./project-cronjob.service /etc/systemd/system/project-cronjob.service
	systemctl enable project-cronjob.service
	systemctl start project-cronjob.service
	echo "Service installed and started"
