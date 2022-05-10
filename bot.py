import discord
from discord.ext import commands
import calendar
import datetime
import schedule
import time

class EventScheduler:
    def __init__(self):
        year = datetime.datetime.now().year
        print(calendar.calendar(year, 1))

    def event_once(name):

        return schedule.CancelJob
    async def run():
        while True:
            schedule.run_pending()
            time.sleep(1)

event = EventScheduler

def day_selector(day, event):
    if day == 'Weds':
        schedule.every().wednesday.at("12:00").do(event.event_once(event))

bot = commands.Bot(command_prefix='&')

f = open('auth.txt', 'r')
try:
    token = f.read()
except FileNotFoundError() as error:
    print('An error occurred: {error}')
finally:
    f.close()

@bot.event
async def on_ready():
    print('Logged in as {0.user}'.format(bot))

@bot.command()
async def test(ctx, *args):
    await ctx.send('Hello!')
    time.sleep(5.5)
    arguments = ', '.join(args)
    await ctx.send(f'{len(args)} Args: {arguments}')

@bot.command()
async def persona(ctx):
    await ctx.send('I\'ll reveal your true form!')

@bot.command()
async def schedule(ctx, reps, day, event_name):
    if reps == 'once':
        day_selector(day, event_name)
    elif reps == 'weekly':
        await ctx.send('Weekly')
    elif reps == 'monthly':
        await ctx.send('Monthly')


bot.run(token)