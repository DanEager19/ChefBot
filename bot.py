import discord
from discord.ext import commands
from googlesearch import search

bot = commands.Bot(command_prefix='&')

f = open('auth.txt', 'r')
try:
    token = f.read()
except FileNotFoundError() as error:
    print(f'An error occurred: {error}')
finally:
    f.close()

@bot.event
async def on_ready():
    print('Logged in as {0.user}'.format(bot))
    Channel = bot.get_channel(889222322819567716)
    Text = "Ahaha"
    Moji = await Channel.send(Text)
    await Moji.add_reaction('🍔')

@bot.event
async def on_reaction_add(reaction, user):
    channel = bot.get_channel(889222322819567716)
    if reaction.message.channel.id != channel.id:
        return
    if reaction.emoji == '🍔':
        Role = discord.utils.get(user.server.roles, name="Cooks")
        await user.add_roles(Role)

@bot.command()
async def recipe(ctx, name):
    query = f"Recipes with {name}"
    for j in search(query, tld="co.in", num=5, stop=5, pause=2):
        await ctx.send(f"<{j}>")

bot.run(token)