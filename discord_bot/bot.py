import discord
import time

client = discord.Client()

f = open('./discord_bot/auth.txt', 'r')
try:
    token = f.read()
except FileNotFoundError() as error:
    print('An error occurred: {error}')
finally:
    f.close()

@client.event
async def on_ready():
    print('Logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

    if message.content.startswith('$time'):
        await message.channel.send('Start')
        time.sleep(5.5)
        await message.channel.send('Done!')

client.run(token)