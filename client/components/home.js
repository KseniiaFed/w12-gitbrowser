import React from 'react'
import{ Switch, Route } from 'react-router-dom'
import Head from './head'
import Main from './main'
import RepoList from './repoList'
import RepoReadMe from './repoReadMe'


const Home = () => {
  return (
    <div>
      <Head title="Hello" />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:userName" component={RepoList} />
        <Route exact path="/:userName/:repositoryName" component={RepoReadMe} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
