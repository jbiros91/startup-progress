// libs
import React, { useCallback, useState, FC } from 'react'


// component
import { CenteredContainer } from "./components/CenteredContainer";
import { StartupProgress } from "./StartupProgress";

// others
import {useFetchRandomFact} from "./useFetchRandomFact";

import './App.css';



interface RandomFactProps {
    show?: boolean
    loading: boolean
}
const RandomFact: FC<RandomFactProps> = ({children, loading = false, show= true}) => {
    return show ? (<>
        <h1>Random Fact</h1>
        <span>
            {loading && '...Loading'}
            {!loading && children}
        </span>
    </>) : <></>
}

const App: FC = () => {
    const [completed, setCompleted] = useState(false)
    const { data, loading, fetch } = useFetchRandomFact()

    const onComplete = useCallback((completed) => {
        setCompleted(completed)
        if (completed)
            fetch()
    }, [fetch])

    return (
      <CenteredContainer>
          <StartupProgress onCompleted={onComplete}/>
          <RandomFact show={completed} loading={loading} >
              {data ? data.text : "Error"}
          </RandomFact>
      </CenteredContainer>
  );
}

export default App;
