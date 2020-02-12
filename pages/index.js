import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import WinnerChart from '../components/winner'
import WinningDifference from '../components/winningDifference'
import play from 'play-war'

const Home = () => {
  const [shouldPlay, setShouldPlay] = useState(false)
  const [playerOneWins, setPlayerOneWins] = useState(0)
  const [playerTwoWins, setPlayerTwoWins] = useState(0)
  const [differences, setDifferences] = useState([])

  useEffect(() => {
    if (!shouldPlay) return
    const interval = setInterval(() => {
      const results = play(1)

      const [playerOneWin, playerTwoWin, diffs] = results.reduce((acc, res) => {
        const [playerOneWin, playerTwoWin, diffs] = acc
        const { winner, winningDifferences } = res
        const nextPlayerOneWin = (winner === 0 ? 1 : 0) + playerOneWin
        const nextPlayerTwoWin = (winner === 1 ? 1 : 0) + playerTwoWin
        const nextDiffs = winningDifferences.reduce((arr, diff, idx) => {
          arr[idx] = (diffs[idx] || 0) + diff
          return arr
        }, [])
        return [nextPlayerOneWin, nextPlayerTwoWin, nextDiffs]
      }, [0, 0, []])

      const nextDifferences = diffs.map((val, idx) => ({
        x: idx, y: val + ((differences[idx] || {}).y || 0)
      }))

      setPlayerOneWins(playerOneWins + playerOneWin)
      setPlayerTwoWins(playerTwoWins + playerTwoWin)
      setDifferences(nextDifferences)
    }, 20)

    return () => clearInterval(interval)
  }, [shouldPlay, playerOneWins, playerTwoWins, differences])

  function togglePlaying () {
    setShouldPlay(!shouldPlay)
  }

  return (
    <div className='wrapper'>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='./styles.css' />
      </Head>

      <div className='main'>
        <div />
        <div className='controls'>
          <h1>War</h1>
          <p className='description'>Data visualizations of the boring card game called War.</p>
          <button onClick={togglePlaying}>{shouldPlay ? 'Stop' : 'Start'} Playing</button>
        </div>
        <div />
        <div className='winner-chart'>
          <h3>Winners</h3>
          <p className='description'>The player to win the complete game</p>
          <WinnerChart playerOneWins={playerOneWins} playerTwoWins={playerTwoWins} />
        </div>
        <div className='winning-difference-chart'>
          <h3>Winning Differences</h3>
          <p className='description'>The difference between the winning card and the losing card in a single turn</p>
          <WinningDifference differences={differences} />
        </div>
        <div className='other-stuff'>
          <h3>Some Other Stuff</h3>
          <p className='description'>TBD</p>
        </div>
      </div>
    </div>

  )
}

export default Home
