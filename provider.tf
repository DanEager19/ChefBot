terraform {
    required_providers {
        digitalocean = {
            source = "digitalocean/digitalocean"
            version = "~> 2.0"
        }
    }
}
variable "do_token" {}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
  name = "terraform"
}

resource "digitalocean_droplet" "chefbot" {
    image   = "ubuntu-18-04-x64"
    name    = "chef-bot"
    region  = "nyc2"
    size    = "s-1vcpu-1gb"
}