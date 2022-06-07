import flask, repltalk, asyncio

app = flask.Flask('')
client = repltalk.Client()

async def get_trending():
  posts = []
  async for post in client.boards.all.get_posts(sort='hot', search=''):
    posts.append(post)
    return post

async def get_query(query=''):
	async for post in client.boards.all.get_posts(sort='hot', search=query):
		print(post.title)

@app.route('/')
def home():
  trending = asyncio.get_event_loop().run_until_complete(get_trending())
  for post in trending: print(post)
  return flask.render_template('index.html')

app.run('0.0.0.0', 8080)