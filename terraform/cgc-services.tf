resource "digitalocean_droplet" "cgc-services" {
  image   = "ubuntu-18-04-x64"
  name    = "cgc-services"
  region  = "nyc1"
  size    = "s-1vcpu-1gb"
  ssh_keys = [ data.digitalocean_ssh_key.win-10.id ]
  connection {
    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      "export PATH=$PATH:/usr/bin",
      "apt-get update && apt-get upgrade -y",
      "apt-get install git ufw -y",
      "git clone https://github.com/DanEager19/cgc-service-devops /root/cgc-service-devops",
      "apt-get install ca-certificates gnupg lsb-release curl -y",
      "mkdir -p /etc/apt/keyrings",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg",
      "echo \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",
      "chmod a+r /etc/apt/keyrings/docker.gpg",
      "apt-get update",
      "apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y",
      "git clone https://github.com/DanEager19/kitchenware-request-api  /root/cgc-service-devops/kitchenware-request-api",
      "git clone https://github.com/DanEager19/chef-bot  /root/cgc-service-devops/chef-bot",
      "touch /root/cgc-service-devops/kitchenware-request-api/.env",
      "touch /root/cgc-service-devops/chef-bot/.env",
      "echo TOKEN=${var.discord_api_token} >> /root/cgc-service-devops/chef-bot/.env",
      "echo GUILD_ID=${var.guild_id} >> /root/cgc-service-devops/chef-bot/.env",
      "echo CLIENT_ID${var.client_id} >> /root/cgc-service-devops/chef-bot/.env",
      "echo SENDGRID_API_KEY=${var.sendgrid_api_key} >> /root/cgc-service-devops/kitchenware-request-api/.env",
      "docker compose -f /root/cgc-service-devops/docker-compose.yml up --build -d "
    ]
  }
}