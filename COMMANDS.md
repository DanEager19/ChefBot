# CHEF-BOT COMMAND USAGE

## \/additem
### Description:
Officer/Admin only; Adds an item into inventory.
### Usage:
```sh
/additem name: [String] description: [String] inventory: [Integer]
```
## \/getitems
### Description:
Gets all items from inventory.
### Usage:
```sh
/getitems
```
## \/getreservations
### Description:
Gets all current and past reservations.
### Usage:
```sh
/getreservations
```
## \/monadomonday
### Description:
Sends Monado Monday video and pings Ben.
### Usage:
```sh
/monadomonday
```
## \/removeitem
### Description:
Officer/Admin only; Removes an item from inventory.
### Usage:
```sh
/removeitem id: [Integer]
```
## \/reserve
### Description:
Members only; Request an item for reservation. Reservations start the next day and end in two weeks. Rservations cannot start on weekends.
### Usage:
```sh
/reserve itemid: [Integer] email: [String]
```
## \/reserve
### Description:
Members only; Return an item from reservation. 
### Usage:
```sh
/return orderid: [Integer]
```
## \/rolereact
### Description:
Officer/Admin only; Start a reaction collector that grants roles corresponding with an emoji.
### Usage:
```sh
/rolereact
```
## \/twitter
### Description:
Returns the Cooking Gardening Club Twitter.
### Usage:
```sh
/twitter
```
## \/updateitem
### Description:
Officer/Admin only; Updates an item from inventory.
### Usage:
```sh
/updatetem id: [Integer] name: [String] description: [String] inventory: [Integer]
```