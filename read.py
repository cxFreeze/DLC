import pandas as pd


df = pd.read_csv('title.basics.tsv', sep='\t', low_memory=False)
ratings = pd.read_csv('title.ratings.tsv', sep='\t', low_memory=False)
crew = pd.read_csv('title.crew.tsv', sep='\t', low_memory=False)	
df = pd.merge(df, ratings, on='tconst')
df = pd.merge(df, crew, on='tconst')
print df.head()

name = pd.read_csv('name.basics.tsv', sep='\t', low_memory=False)
dicname = {}
i = 0
while i < len(name['nconst']):
	dicname[name['nconst'][i]] = name['primaryName'][i]
	i+=1
print "fin dic"
i = 0
while i < len(df):
	temp = []
	if df['directors'][i] != "\N":
		split = df['directors'][i].split(',')
		for nconst in split:
			temp.append(dicname[nconst])
	df['directors'][i] = temp
	temp = []
	if df['writers'][i] != "\N":
		split = df['writers'][i].split(',')
		for nconst in split:
			temp.append(dicname[nconst])
	df['writers'][i] = temp
	i+=1
	if i > 10000:
		break;

print df.head()
