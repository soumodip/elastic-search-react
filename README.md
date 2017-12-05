<h3 style="color: #4C8EF7;">Elastic Search & React App</h3>
<hr/>
<p>As we all know, <i style="font-size:18px;"><b>Elastic Search</b></i> is search engine based on Lucene. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents. So we are going to us it to do some fuzzy searches and get some result back.</p>
<p style="margin-top: 10px;">So on frontend, I have used <i style="font-size:18px;"><b>React</b></i>, which is a  JavaScript library for building user interfaces along with <i style="font-size:18px;"><b>Node JS & Express</b></i> to build our backend.</p>
<hr/>
<h3 style="color: #4C8EF7;">Steps</h3>
<ul>
    <li>
        <p>Install Elastic Search and run it on your PC</p>
        <div style="margin:5px 0px 10px 0px;padding:0px 15px 15px 15px; border: 1px dashed white;">
            <p>On Local System</p>
            <ul>
                <li>Download Elastic Search : <a href="https://www.elastic.co/downloads/elasticsearch">https://www.elastic.co/downloads/elasticsearch</a></li>
                <li>Unzip the folder and move inside the folder</li>
                <li>Run <span style="color: #FF6684;">bin/elasticsearch</span> (or <span style="color: #FF6684;">bin\elasticsearch.bat</span> on Windows)</li>
                <li>Run  <span style="color: #FF6684;">curl http://localhost:9200/</span> on terminal</li>
            </ul>
            <p>On Production System</p>
            <ul>
                <li>Follow the link : <a href="https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-ubuntu-16-04">https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-ubuntu-16-04</a></li>
            </ul>
        </div>
    </li>
    <li>
        <p>Clone the elastic-search-react application from Github into your PC and install the node modules for both the frontend and backend application.</p>
        <div style="margin:5px 0px 10px 0px;padding:15px; border: 1px dashed white;">
            <ul>
                <li>Move into any directory in your PC ( /Desktop or /Documents etc )</li>
                <li>Type <span style="color: #FF6684;">$ git clone https://github.com/soumodip/elastic-search-react.git</span> in your terminal</li>
                <li>Type <span style="color: #FF6684;">$ cd elastic-search-react</span> in your terminal to move into the folder</li>
                <li>The are two application - react and backend</li>
                <li>First, install node modules of the React application by typing <span style="color: #FF6684;">$ npm install</span> in your terminal</li>
                <li>Then, install node modules of the Backend application by typing <span style="color: #FF6684;">$ cd backend/</span> and then <span style="color: #FF6684;">$ npm install</span> in your terminal</li>
            </ul>
        </div>
    </li>
    <li>Run the frontend and backend application separately.</li>
        <div style="margin:5px 0px 10px 0px;padding:15px; border: 1px dashed white;">
            <ul>
                <li>Before this step make sure that Elastic Search is running by typing <span style="color: #FF6684;">$ curl http://localhost:9200/</span> on terminal. If not restart it</li>
                <li>Now run the React application by typing <span style="color: #FF6684;">$ npm start</span> on terminal</li>
                <li>So now you can visit <span style="color: #FF6684;">http://localhost:3000</span> on your browser</li>
                <li>Now run the Backend application by typing <span style="color: #FF6684;">$ cd backend/ </span> and then <span style="color: #FF6684;">$ npm start</span> on terminal</li>
                <li>Now <i>Elastic Search React application</i> is up and running !!!</li>
            </ul>
        </div>
    <li>Whoah done ! Feel free to work and improve it ( MIT License 😎 )</li>
</ul>
<hr/>
<h3 style="color: #4C8EF7;">Tips</h3>
<ul>
    <li>In this application, I have used Redux as a state management utility and in some parts I have used local state too. Read more about <a href="https://redux.js.org/">Redux</a></li>
    <li>Also, when you are deploying this application on Production Server, try to use PM2 for deployment. Read more about <a href="http://pm2.keymetrics.io/">PM2</a></li>
</ul>
<hr/>
<p>Developed by <a href="http://www.soumodippaul.com">Soumodip Paul</a></p>

