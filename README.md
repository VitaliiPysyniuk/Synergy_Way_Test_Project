<h1>Django REST + React test application</h1>

<h2 style="margin-bottom: 0">Requirements</h2>
<hr style="margin-top: 0"/>
Before running the application on your machine you need to have docker and docker-compose installed. 
The installation guide you can find <a href="https://docs.docker.com/desktop/">here</a>.
<br>Also you need to add .env and .env.db file to the root directory of the project.
Example of .env file:
<pre>
<code><b>
TIME_ZONE=Etc/GMT-3
DEBUG=True
HOST_DB=database #this parameter must be the same</b></code>
</pre>
Example of .env.db file:
<pre>
<code><b>
POSTGRES_DB=synergy_way_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1111</b></code>
</pre>

<h2 style="margin-bottom: 0">Installation</h2>
<hr style="margin-top: 0"/>
Before launching application, you need to execute the following commands.<br/>
1. In the frontend directory run:
<pre>
<code><b>npm install && npm run build</b></code>
</pre>
2. To build images of you containers run in the root directory:
<pre>
<code><b>docker-compose build</b></code>
</pre>
3. To start your containers in the background run in the root directory:
<pre>
<code><b>docker-compose up -d</b></code>
</pre>
4. To apply migrations to the newly created database run in the root directory:
<pre>
<code><b>docker-compose exec backend python manage.py migrate</b></code>
</pre>
Open <b>http://localhost</b> with your browser to see the result.
