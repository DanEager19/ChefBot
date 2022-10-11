terraform {
    required_providers {
        digitalocean = {
            source = "digitalocean/digitalocean"
            version = "~> 2.0"
        }
    }
}
variable "do_token" {}

variable "pvt_key" {}

variable "discord_api_token" {}

variable "guild_id" {}

variable "client_id" {}

variable "sendgrid_api_key" {}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "win-10" {
  name = "win-10"
}

