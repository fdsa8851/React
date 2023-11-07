import './App.css';
import { useState } from 'react';

function Article(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <article title={props.title} body={props.body}>{props.body}</article>
    </div>
  )
}

function Nav(props) {
  let list=[];

  for (let i=0; i<props.topics.length; i++) {
   let t = props.topics[i];
   list.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={event=>{
    event.preventDefault();
    props.onChangeMode(Number(event.target.id));
   }}>{t.title}</a></li>); 
  }
  return(
    <div>
      <nav>
        <ol>
          {list}
        </ol>
      </nav>
    </div>
    )
}

function Header(props) {
  return (
    <div>
      <header><h1><a href="/" onClick={function(e) {
         e.preventDefault();
         props.onChangeMode();
      }}>{props.title}</a></h1></header>
    </div>
  )
}

function Create(props) {
  return(
    <div>
      <article>
        <h2>Create</h2>
        <form onSubmit={event=>{
          event.preventDefault();
          const title = event.target.title.value;
          const body =  event.target.body.value;
          props.onUpdate(title, body);
        }}>
          <p>
            <input type="text" name="title" placeholder="title"/>
          </p>
          <p>
          <textarea name="body" placeholder='body'></textarea>
          </p>
          <p>
            <input type="submit" value="create"></input>
          </p>
        </form>
      </article>
    </div>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
  return(
    <div>
      <article>
        <h2>Create</h2>
        <form onSubmit={event=>{
          event.preventDefault();
          const title = event.target.title.value;
          const body =  event.target.body.value;
          props.onUpdate(title, body);
        }}>
          <p>
            <input type="text" name="title" placeholder="title" value={title} onChange={e=>{
              setTitle(e.target.value);
            }}/>
          </p>
          <p>
          <textarea name="body" placeholder='body' value={body} onChange={e=>{
            setBody(e.target.value)
          }}></textarea>
          </p>
          <p>
            <input type="submit" value="update"></input>
          </p>
        </form>
      </article>
    </div>
  );
}

function App() {
  let contextCtrl= null;
  let content = null;
  const [mode, setMode] = useState('READ');
  const [id, setId] = useState(null);
   const [topics, setTopic] = useState([
    {id:1, title:'title', body : 'html is ...'},
    {id:2, title:'css', body : 'css is ...'},
    {id:3, title:'javascript', body : 'javascript is ...'}
  ]);

  const [nextId, setNextId] = useState(4);
  // const updateTopic = {id:id, title:title, body:body};
  
  if(mode === 'WELCOME') {
    setMode('WELCOME');
    content = <Article title="WELCOME" body = "Hello, WEB"></Article> 
  } else if (mode === 'READ') {
    let title, body = null;
    for(let i = 0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article> 
    contextCtrl = <li>
                    <a href={"/update"+id} onClick={e=>{
                      e.preventDefault();
                      setMode("UPDATE");
                    }}>Update</a>
                  </li>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title,_body)=> {
      const newTopic = {id:nextId, title : _title, body:_body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopic(newTopics);
      setNextId(nextId+1);
      console.log(nextId, id);
      setId(nextId);
      setMode("READ");
      
      console.log(nextId, id);
    }}/> 
  } else if (mode === "UPDATE") {
    let title, body = null;
    for(let i = 0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpdate={(_title,_body) => {

    }}></Update>


  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=> {
        alert('Header')
      }}></Header>
      <Nav topics={topics} onChangeMode={_id=>{
        setId(_id)
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={e=>{
            setMode("CREATE");
            e.preventDefault();
          }}>Create</a>
        </li>
        {contextCtrl}
    </ul>
    </div>
  );
}

/* event 
  onclick = (function(event) {
  } )
  ->
  onclick={event=>{  
  }}
*/

export default App;
